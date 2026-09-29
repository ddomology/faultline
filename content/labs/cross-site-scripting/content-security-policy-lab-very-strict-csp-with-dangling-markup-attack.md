---
title: "Reflected XSS protected by very strict CSP, with dangling markup attack"
tags:
  - portswigger
  - cross-site-scripting
lab_url: "https://portswigger.net/web-security/cross-site-scripting/content-security-policy/lab-very-strict-csp-with-dangling-markup-attack"
difficulty: Practitioner
note_kind: problem
---

# Reflected XSS protected by very strict CSP, with dangling markup attack

## 문제 조건과 설명

**주어진 조건**

엄격한 CSP가 외부 도메인의 하위 리소스 로드를 막는다. 클릭 유도 문구에는 `Click`이 필요하고 자기 계정은 `wiener:peter`다. 외부 상호작용에는 제공된 exploit server를 사용해야 한다.

**완료 조건**

폼 하이재킹으로 모의 피해자의 CSRF 토큰을 얻어 이메일을 `hacker@evil-user.net`으로 바꾼다.

**문제 설명**

CSP와 클릭 유도 조건 아래에서 이메일 변경에 필요한 토큰을 다루는 문제다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/cross-site-scripting/content-security-policy/lab-very-strict-csp-with-dangling-markup-attack)

## 탐색 및 풀이 기록

아직 작성하지 않았다. 직접 확인한 요청·응답, 시도한 이유와 결과를 이 파일에 이어서 기록한다.
