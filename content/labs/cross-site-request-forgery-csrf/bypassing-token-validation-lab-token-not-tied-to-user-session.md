---
title: "CSRF where token is not tied to user session"
tags:
  - portswigger
  - cross-site-request-forgery-csrf
lab_url: "https://portswigger.net/web-security/csrf/bypassing-token-validation/lab-token-not-tied-to-user-session"
difficulty: Practitioner
note_kind: problem
---

# CSRF where token is not tied to user session

## 문제 조건과 설명

**주어진 조건**

이메일 변경 기능은 CSRF 토큰을 사용하지만 그 토큰이 사이트 세션 처리와 연결되어 있지 않다. 사용할 수 있는 두 계정은 `wiener:peter`, `carlos:montoya`다.

**완료 조건**

exploit server의 HTML 페이지로 방문자의 이메일 주소를 변경한다.

**문제 설명**

토큰이 특정 로그인 세션에 묶여 있는지가 핵심 조건이다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/csrf/bypassing-token-validation/lab-token-not-tied-to-user-session)

## 탐색 및 풀이 기록

아직 작성하지 않았다. 직접 확인한 요청·응답, 시도한 이유와 결과를 이 파일에 이어서 기록한다.
