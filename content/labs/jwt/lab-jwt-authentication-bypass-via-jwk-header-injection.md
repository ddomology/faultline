---
title: "JWT authentication bypass via jwk header injection"
tags:
  - portswigger
  - jwt
lab_url: "https://portswigger.net/web-security/jwt/lab-jwt-authentication-bypass-via-jwk-header-injection"
difficulty: Practitioner
note_kind: problem
---

# JWT authentication bypass via jwk header injection

## 문제 조건

JWT 헤더의 jwk 매개변수로 검증 키를 토큰에 포함할 수 있지만, 서버가 키의 신뢰 출처를 확인하지 않는다. 개인 계정은 wiener:peter로 로그인한다.

## 완료 조건

JWT를 수정하고 서명해 /admin에 접근한 뒤 carlos를 삭제한다.

## 문제 설명

토큰이 제시한 검증 키를 그대로 받아들이는지 확인하는 문제다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/jwt/lab-jwt-authentication-bypass-via-jwk-header-injection)
