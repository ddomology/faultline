---
title: "JWT authentication bypass via algorithm confusion with no exposed key"
tags:
  - portswigger
  - jwt
lab_url: "https://portswigger.net/web-security/jwt/algorithm-confusion/lab-jwt-authentication-bypass-via-algorithm-confusion-with-no-exposed-key"
difficulty: Expert
note_kind: problem
---

# JWT authentication bypass via algorithm confusion with no exposed key

## 문제 조건과 설명

**주어진 조건**

JWT 세션은 RSA 키 쌍을 사용하지만 알고리즘 혼동 공격에 취약하다. 개인 계정은 wiener:peter로 로그인한다.

**완료 조건**

서버 공개 키를 알아내고 수정한 토큰에 서명해 /admin에 접근한 뒤 carlos를 삭제한다.

**문제 설명**

기존 토큰에서 검증에 사용되는 공개 키를 파악할 수 있는지까지 살피는 문제다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/jwt/algorithm-confusion/lab-jwt-authentication-bypass-via-algorithm-confusion-with-no-exposed-key)

## 탐색 및 풀이 기록

아직 작성하지 않았다. 직접 확인한 요청·응답, 시도한 이유와 결과를 이 파일에 이어서 기록한다.
