---
title: "CSRF where token validation depends on token being present"
tags:
  - portswigger
  - cross-site-request-forgery-csrf
lab_url: "https://portswigger.net/web-security/csrf/bypassing-token-validation/lab-token-validation-depends-on-token-being-present"
difficulty: Practitioner
note_kind: problem
---

# CSRF where token validation depends on token being present

## 문제 조건

이메일 변경 기능에 CSRF 취약점이 있다. 문제 제목처럼 토큰 검증이 토큰의 존재 여부에 좌우된다. 자신의 계정은 `wiener:peter`다.

## 완료 조건

exploit server의 HTML 페이지를 통해 방문자의 이메일 주소를 변경한다.

## 문제 설명

토큰 처리 방식이 이메일 변경 요청의 방어 수준을 결정한다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/csrf/bypassing-token-validation/lab-token-validation-depends-on-token-being-present)
