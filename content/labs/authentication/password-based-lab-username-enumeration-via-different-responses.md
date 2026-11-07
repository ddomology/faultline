---
title: "Username enumeration via different responses"
tags:
  - portswigger
  - authentication
lab_url: "https://portswigger.net/web-security/authentication/password-based/lab-username-enumeration-via-different-responses"
difficulty: Apprentice
note_kind: solution
draft: false
---

# Username enumeration via different responses

## 문제 조건과 설명

**주어진 조건**

로그인 기능에서 사용자 이름의 유효성에 따라 응답이 달라지며 비밀번호 시도에도 취약하다. 공식 문제는 후보 사용자 이름 목록과 후보 비밀번호 목록을 제공한다. 어느 문자열이나 응답 속성이 계정 존재 여부를 드러내는지는 실습 요청으로 확인해야 한다.

**완료 조건**

유효한 사용자 이름을 찾고 해당 계정의 비밀번호를 알아낸 뒤 계정 페이지에 접속한다. 이름 식별, 비밀번호 확인, 로그인 후 페이지 접근을 각각 검증한다.

**문제 설명과 판단 기준**

동일한 비밀번호를 두고 사용자 이름만 바꾼 로그인 응답을 비교한다. 상태 코드, 오류 문구, 본문 구조 또는 리디렉션의 일관된 차이가 있는지 살피면 비밀번호가 틀렸더라도 계정 존재 여부를 추론할 수 있다. 동적으로 바뀌는 값이나 일시적 오류를 구분 신호로 잘못 읽지 않도록 같은 조건에서 재확인한다.

유효한 이름의 근거가 확보되면 제공된 비밀번호 후보를 그 계정에 대해 확인한다. 성공으로 보이는 응답 뒤에는 실제 세션이 생겼는지와 계정 페이지가 열리는지 검증하고, 발견 과정을 아래에 기록한다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/authentication/password-based/lab-username-enumeration-via-different-responses)

## 탐색 및 풀이 기록

### 초기 관찰

입력 지점은 `POST /login` 폼(`username`, `password`)이었다. 비밀번호는 항상 틀린 값으로 고정하고 사용자 이름만 바꾸면서 응답을 비교했다. 상태 코드는 실패 시 전부 HTTP 200이어서 상태 코드만으로는 구분되지 않았고, 본문 안의 오류 문구와 본문 길이에 차이가 있었다.

| 입력 | 상태 | 본문 길이 | 오류 문구 |
| --- | --- | --- | --- |
| 존재하지 않는 사용자 이름 | 200 | 3244B | `Invalid username` |
| 존재하는 사용자 이름 + 잘못된 비밀번호 | 200 | 3246B | `Incorrect password` |
| 올바른 자격 증명 | 302 | 리디렉션 `/my-account?id=<사용자>` | — |

후보 목록은 공식 문제 페이지의 링크에서 받아왔다. 후보 사용자 이름 99개(중복 제거 후), 후보 비밀번호 100개.

또 한 가지, lab 인스턴스는 임시였다. 인스턴스가 만료되면 모든 페이지에서 504 Gateway Timeout이 나왔고, 새로 열면 URL이 바뀌었고, 인스턴스마다 유효한 사용자 이름도 달랐다.

### 실행 과정

**1단계 — 사용자 이름 enumeration.** 각 후보 사용자 이름에 임의의 비밀번호를 붙여 `POST /login`으로 보내고, 응답 본문을 해시로 지문해 그룹화했다. 98개 후보는 전부 동일한 응답(200, 3244B, `Invalid username`)이었고, 단 1개 후보만 다른 응답(200, 3246B, `Incorrect password`)을 반환했다. 문구가 `Incorrect password`로 바뀐다는 것은 서버가 사용자 이름은 알고 있다는 뜻이므로 이 1개가 유효한 사용자 이름이다.

~~~bash
for u in $(cat usernames.txt); do
  code=$(curl -s -o /tmp/r.html -w "%{http_code}" \
    -H "Content-Type: application/x-www-form-urlencoded" \
    --data-urlencode "username=$u" --data-urlencode "password=invalidpass123" \
    "$BASE/login")
  echo "$u $code $(md5sum /tmp/r.html | cut -d' ' -f1)"
done
~~~

첫 인스턴스에서 이상치가 `guest`였다. 나머지 98개와 본문 길이가 2B 차이나는 이유가 문구(`Invalid username` vs `Incorrect password`)의 길이 차이임을 diff로 확인했다.

**2단계 — 비밀번호 브루트포스.** 1단계에서 찾은 사용자 이름에 후보 비밀번호 100개를 순서대로 시도했고, 상태 코드와 리디렉션 URL을 확인했다. 실패는 200이 유지됐고, 성공은 302 리디렉션으로 나타났다.

~~~bash
for p in $(cat passwords.txt); do
  curl -s -o /dev/null -w "%{http_code} %{redirect_url}\n" \
    -H "Content-Type: application/x-www-form-urlencoded" \
    --data-urlencode "username=guest" --data-urlencode "password=$p" \
    "$BASE/login"
done
~~~

51번째 후보 `thomas`에서 `302 /my-account?id=guest`가 돌아와 로그인이 성립했다.

인스턴스가 죽어(504) 새로 provision한 인스턴스에서는 같은 절차를 다시 돌렸다. 이번엔 유효한 사용자 이름이 `al`이었고, 28번째 후보 `7777777`에서 `302 /my-account?id=al`을 확인했다. 즉 유효 사용자 이름은 인스턴스마다 랜덤이며, 자격 증명은 인스턴스 단위로만 유효하다.

## 최종 결과

첫 인스턴스에서 `guest` / `thomas`, 재실행 인스턴스에서 `al` / `7777777`로 로그인에 성공했다. 302 리디렉션 후 `/my-account` 페이지가 열렸고, 페이지 상단에 `Congratulations, you solved the lab!` 배너가 표시되어 완료 조건(유효한 사용자 이름 발견 → 비밀번호 확인 → 계정 페이지 접근)을 모두 충족했다.

## 배운 점

- 오류 문구가 존재 여부에 따라 달라진다는 것 자체가 enumeration 채널이다. `Invalid username`과 `Incorrect password`가 구분되면, 비밀번호를 맞출 필요 없이 이름만 판정할 수 있다.
- 상태 코드는 실패·실패·성공이 200/200/302로 갈리지만, 실패 둘 사이를 가르는 신호는 본문 문구(또는 본문 길이)였다. 길이만 봐도 2B 차이로 충분했다.
- 로그인 성공은 302 리디렉션이다. 리디렉션을 자동으로 따라가는 클라이언트(예: PowerShell의 `Invoke-WebRequest`)를 쓰면 성공 응답이 200으로 보이고 신호가 사라진다. `curl -w "%{http_code} %{redirect_url}"`처럼 리디렉션을 추적하지 않고 상태만 보는 편이 안전하다.
- PortSwigger lab 인스턴스는 임시 자원이다. 504가 계속되면 인스턴스 자체가 죽은 것이므로, 다시 열어서 새 URL로 재시작해야 한다. 이 lab은 유효 사용자 이름이 인스턴스마다 다르므로 죽었다 새로 열 때마다 1단계를 처음부터 다시 해야 한다.

## 관련 개념
<!-- 필요한 개념 노트 링크를 목록으로 추가 -->
