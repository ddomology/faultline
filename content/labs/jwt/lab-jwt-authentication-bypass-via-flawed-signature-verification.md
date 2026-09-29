---
title: "JWT authentication bypass via flawed signature verification"
tags:
  - portswigger
  - jwt
lab_url: "https://portswigger.net/web-security/jwt/lab-jwt-authentication-bypass-via-flawed-signature-verification"
difficulty: Apprentice
note_kind: problem
---

# JWT authentication bypass via flawed signature verification

## 문제 조건

세션에 JWT를 사용하며 서버가 서명 없는 JWT도 수락하도록 설정되어 있다. 개인 계정은 wiener:peter로 로그인한다.

## 완료 조건

세션 토큰을 바꿔 /admin에 접근하고 carlos를 삭제한다.

## 문제 설명

JWT의 서명 알고리즘과 서버의 허용 정책을 확인하는 문제다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/jwt/lab-jwt-authentication-bypass-via-flawed-signature-verification)
