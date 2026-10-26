---
title: Burp Collaborator 공개 서버용 CLI 클라이언트 구현
category: essential-skills
category_title: 보안 분석 도구
tags: [DNS, 해시, 인코딩, 분석 기초]
note_kind: note
---

# Burp Collaborator 공개 서버용 CLI 클라이언트 구현

웹 응답에 결과가 드러나지 않는 테스트에서는 별도의 DNS 조회를 관찰 지점으로 쓸 수 있다. Burp Collaborator는 고유한 하위 도메인에 들어온 조회를 기록하고, 주소를 만든 클라이언트가 비밀값으로 해당 기록을 가져오게 한다. 여기서는 **공개 Collaborator 서버에 맞는 주소 생성과 수신 조회**만 다룬다. 어떤 입력으로 대상 시스템의 외부 상호작용을 유도할지는 이 클라이언트의 역할과 별개다.

이 글의 Python 구현은 비공식 [OAST-Community 클라이언트](https://github.com/Groppoxx/OAST-Community)의 주소 생성 방식을 참고했다. PortSwigger가 보장하는 공개 API는 아니므로 서버의 주소 형식이나 조회 방식이 바뀌면 다시 검증해야 한다. PortSwigger는 비밀값에서 파생한 식별자가 요청에 포함되고, 비밀값은 HTTPS 조회에만 사용된다고 설명한다. [PortSwigger — Collaborator data security](https://portswigger.net/burp/documentation/collaborator/server/security)

## 주소와 비밀값의 관계

```text
32바이트 난수 ──Base64──> BIID(로컬에 보관)
       │
       └──SHA-1·인코딩·검사 문자·암호화──> 고유 식별자.oastify.com

DNS 조회 ──> 공개 Collaborator 서버에 기록
BIID로 HTTPS 조회 ──> 그 식별자의 수신 기록 반환
```

`BIID`는 수신 기록을 읽는 데 필요한 비밀값이다. 주소만 안다고 해당 기록을 조회할 수는 없다. 비밀값은 DNS 이름에 넣지 않고 로컬에 보관하며, 폴링 요청의 `biid` 매개변수로만 보낸다. [PortSwigger — Collaborator data security](https://portswigger.net/burp/documentation/collaborator/server/security)

## 1. 비밀값에서 주소 만들기

먼저 암호학적 난수 32바이트를 만든다. 주소에 들어갈 키 해시는 원본 바이트의 SHA-1 다이제스트를 부호 없는 정수로 해석한 뒤, `a-z0-9` 순서의 36진 문자열로 바꾸어 만든다. 앞을 `a`로 채워 최소 20자로 만든 뒤 첫 20자를 쓴다.

그 20자를 열 글자씩 나누어 각 부분의 **문자 ASCII 코드 합계**를 36으로 나눈 나머지로 검사 문자를 붙인다. `alphabet.index(char)`의 합계가 아니라 `ord(char)`의 합계라는 점이 중요하다. 이렇게 만든 22자 뒤에 형식 문자 `1g`, 16진수 카운터와 `y`, 끝의 `z`를 이어 붙인다. 아래 코드는 첫 주소의 카운터를 `0`으로 시작한다.

```python
import base64
import hashlib
import secrets

ALPHABET = "abcdefghijklmnopqrstuvwxyz0123456789"

def base36(number):
    digits = []
    while number:
        number, remainder = divmod(number, 36)
        digits.append(ALPHABET[remainder])
    return "".join(reversed(digits)) or "a"

def check_char(value):
    return ALPHABET[sum(ord(char) for char in value) % 36]

def make_hostname(secret, counter=0):
    digest = hashlib.sha1(secret).digest()
    key = base36(int.from_bytes(digest, "big")).rjust(20, "a")[:20]
    key_hash = (
        key[:10] + check_char(key[:10])
        + key[10:] + check_char(key[10:])
    )
    plaintext = f"{key_hash}1g{counter:x}yz"

    salt = [secrets.choice(ALPHABET), secrets.choice(ALPHABET)]
    state = salt.copy()
    encrypted = []
    for index, char in enumerate(plaintext):
        register = index % 2
        value = (ALPHABET.index(char) + ALPHABET.index(state[register])) % 36
        output = ALPHABET[value]
        encrypted.append(output)
        state[register] = output

    identifier = "".join(salt) + check_char("".join(salt)) + "".join(encrypted)
    return f"{identifier}.oastify.com"

secret = secrets.token_bytes(32)
biid = base64.b64encode(secret).decode("ascii")
hostname = make_hostname(secret, counter=0)
print(hostname)  # BIID는 출력하지 않는다.
```

암호화 단계는 두 개의 소금 문자로 상태 레지스터를 시작하고, 평문의 짝수·홀수 위치에 서로 다른 레지스터를 번갈아 적용한다. 매번 출력 문자를 다음 상태로 갱신한다. 마지막으로 두 소금 문자와 그 검사 문자를 암호문 앞에 붙인다. 같은 비밀값으로 새 주소를 만들 때는 카운터를 증가시키고, **BIID와 카운터를 함께 로컬에 보관**해야 한다.

## 2. DNS 조회와 수신 기록 확인

생성된 이름을 DNS로 조회한 뒤 공개 서버의 폴링 주소에 BIID를 URL 인코딩해 보낸다. 실제 CLI에서는 응답의 `responses`를 **먼저 파일에 저장한 다음** 요약을 출력한다. 폴링한 이벤트는 서버에서 다시 반환되지 않을 수 있기 때문이다. [OAST-Community — Persistent Interaction History](https://github.com/Groppoxx/OAST-Community#persistent-interaction-history)

```python
import json
import socket
import urllib.parse
import urllib.request

socket.getaddrinfo(hostname, 80)  # 내가 만든 주소로 자체 DNS 조회

query = urllib.parse.urlencode({"biid": biid})
request = urllib.request.Request(
    f"https://polling.oastify.com/burpresults?{query}",
    headers={"Accept": "application/json"},
)
with urllib.request.urlopen(request, timeout=20) as response:
    interactions = json.load(response).get("responses", [])

for item in interactions:
    print(item.get("protocol"), item.get("data", {}).get("subDomain"))
```

DNS 이벤트의 `protocol`은 `dns`, `data.subDomain`은 실제로 조회된 호스트 이름이다. `A`와 `AAAA` 조회나 여러 리졸버의 요청으로 같은 주소가 여러 이벤트로 나타날 수 있다. 직접 만든 주소에 조회를 한 뒤 동일한 BIID로 폴링한 시험에서는 **DNS 이벤트 4건**이 수신되었다. 이 확인은 클라이언트의 주소 생성·조회 조합이 작동한다는 뜻이며, 대상 시스템에서 어떤 동작이 일어났다는 증거는 아니다.

처음 구현할 때 키 해시의 검사 문자를 `alphabet.index(char)`의 합계로 계산하자 DNS 조회는 되었지만 해당 BIID의 폴링 결과가 비어 있었다. 이를 `sum(ord(char) for char in value)`로 고친 뒤 자체 DNS 이벤트가 반환되었다. **DNS 이름이 해석되는 것과 비밀값으로 그 이벤트를 읽을 수 있는 것은 별개 검증**이다.

## 로컬 상태 관리

CLI로 나누어 실행할 때는 BIID, 다음 카운터, 생성한 주소 목록을 사용자만 읽을 수 있는 로컬 상태 파일에 저장한다. 수신 기록은 폴링 직후 별도 로그에 저장한다. 상태 파일을 Git에 커밋하거나 BIID를 실행 로그에 출력하면 다른 사람이 수신 기록을 조회할 수 있으므로 피한다. `*.oastify.com`과 `polling.oastify.com`은 여기서 검증한 공개 서버 조합이며, 제공 도메인은 바뀔 수 있다. [PortSwigger — Getting started with Burp Collaborator](https://portswigger.net/burp/documentation/desktop/tools/collaborator/getting-started)

## 참고 구현의 라이선스

주소 생성 코드의 기준이 된 [OAST-Community](https://github.com/Groppoxx/OAST-Community)는 MIT 라이선스로 배포된다. 저작권 및 허가 고지는 다음과 같다.

```text
Copyright (c) 2026 Iam Anthony Marcelo Alvarez Orellana

MIT License: Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including without
limitation the rights to use, copy, modify, merge, publish, distribute,
sublicense, and/or sell copies of the Software, and to permit persons to whom
the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
