---
title: "CSRF where token is tied to non-session cookie"
tags:
  - portswigger
  - cross-site-request-forgery-csrf
lab_url: "https://portswigger.net/web-security/csrf/bypassing-token-validation/lab-token-tied-to-non-session-cookie"
difficulty: Practitioner
note_kind: problem
---

# CSRF where token is tied to non-session cookie

## 문제 조건

이메일 변경 기능의 CSRF 토큰은 비세션 쿠키와 연결되지만 사이트의 세션 처리에 완전히 통합되어 있지 않다. 계정은 `wiener:peter`, `carlos:montoya`가 제공된다.

## 완료 조건

exploit server에서 제공하는 HTML로 방문자의 이메일 주소를 변경한다.

## 문제 설명

토큰과 쿠키의 관계가 실제 사용자 세션을 충분히 검증하는지 확인하는 문제다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/csrf/bypassing-token-validation/lab-token-tied-to-non-session-cookie)
