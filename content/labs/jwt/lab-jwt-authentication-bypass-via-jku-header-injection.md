---
title: "JWT authentication bypass via jku header injection"
tags:
  - portswigger
  - jwt
lab_url: "https://portswigger.net/web-security/jwt/lab-jwt-authentication-bypass-via-jku-header-injection"
difficulty: Practitioner
note_kind: problem
---

# JWT authentication bypass via jku header injection

## 문제 조건

JWT 헤더의 jku 매개변수가 가리키는 URL에서 검증 키를 가져오지만, 신뢰할 수 있는 도메인인지 검사하지 않는다. 개인 계정은 wiener:peter로 로그인한다.

## 완료 조건

JWT를 위조해 /admin에 접근하고 carlos를 삭제한다.

## 문제 설명

검증 키를 가져올 외부 URL의 신뢰 경계를 살피는 문제다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/jwt/lab-jwt-authentication-bypass-via-jku-header-injection)
