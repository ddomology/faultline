---
title: "CSRF where token validation depends on request method"
tags:
  - portswigger
  - cross-site-request-forgery-csrf
lab_url: "https://portswigger.net/web-security/csrf/bypassing-token-validation/lab-token-validation-depends-on-request-method"
difficulty: Practitioner
note_kind: problem
---

# CSRF where token validation depends on request method

## 문제 조건

이메일 변경 기능에 CSRF 취약점이 있다. 방어가 특정 요청 방식에만 적용되며 자신의 계정은 `wiener:peter`다.

## 완료 조건

exploit server에 HTML 페이지를 올려 방문자의 이메일 주소를 변경한다.

## 문제 설명

요청 방식에 따라 CSRF 토큰 검증 여부가 달라지는 조건이다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/csrf/bypassing-token-validation/lab-token-validation-depends-on-request-method)
