---
title: "JWT authentication bypass via unverified signature"
tags:
  - portswigger
  - jwt
lab_url: "https://portswigger.net/web-security/jwt/lab-jwt-authentication-bypass-via-unverified-signature"
difficulty: Apprentice
note_kind: problem
---

# JWT authentication bypass via unverified signature

## 문제 조건과 설명

**주어진 조건**

세션에 JWT를 사용하지만 서버가 받은 토큰의 서명을 검증하지 않는다. 개인 계정은 wiener:peter로 로그인한다.

**완료 조건**

세션 토큰을 바꿔 /admin에 접근하고 carlos를 삭제한다.

**문제 설명**

토큰 내용과 실제 서명 검증이 분리되어 있는지 확인하는 문제다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/jwt/lab-jwt-authentication-bypass-via-unverified-signature)

## 탐색 및 풀이 기록

아직 작성하지 않았다. 직접 확인한 요청·응답, 시도한 이유와 결과를 이 파일에 이어서 기록한다.
