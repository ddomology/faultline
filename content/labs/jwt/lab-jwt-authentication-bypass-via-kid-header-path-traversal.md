---
title: "JWT authentication bypass via kid header path traversal"
tags:
  - portswigger
  - jwt
lab_url: "https://portswigger.net/web-security/jwt/lab-jwt-authentication-bypass-via-kid-header-path-traversal"
difficulty: Practitioner
note_kind: problem
---

# JWT authentication bypass via kid header path traversal

## 문제 조건과 설명

**주어진 조건**

서버는 JWT 헤더의 kid 매개변수로 파일 시스템에서 서명 검증 키를 찾는다. 개인 계정은 wiener:peter로 로그인한다.

**완료 조건**

JWT를 위조해 /admin에 접근하고 carlos를 삭제한다.

**문제 설명**

키 식별자가 서버의 파일 경로 선택에 영향을 미치는지 확인하는 문제다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/jwt/lab-jwt-authentication-bypass-via-kid-header-path-traversal)

## 탐색 및 풀이 기록

아직 작성하지 않았다. 직접 확인한 요청·응답, 시도한 이유와 결과를 이 파일에 이어서 기록한다.
