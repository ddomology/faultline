---
title: "JWT authentication bypass via weak signing key"
tags:
  - portswigger
  - jwt
lab_url: "https://portswigger.net/web-security/jwt/lab-jwt-authentication-bypass-via-weak-signing-key"
difficulty: Practitioner
note_kind: problem
---

# JWT authentication bypass via weak signing key

## 문제 조건과 설명

**주어진 조건**

JWT의 서명과 검증에 매우 약한 비밀 키를 사용한다. 흔한 비밀 값의 목록으로 키를 무차별 대입할 수 있다. 개인 계정은 wiener:peter로 로그인한다.

**완료 조건**

비밀 키를 알아내고 수정한 세션 토큰에 서명해 /admin에 접근한 뒤 carlos를 삭제한다.

**문제 설명**

서명 검증 자체가 있어도 키가 약하면 토큰의 신뢰성이 사라지는지 살피는 문제다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/jwt/lab-jwt-authentication-bypass-via-weak-signing-key)

## 탐색 및 풀이 기록

아직 작성하지 않았다. 직접 확인한 요청·응답, 시도한 이유와 결과를 이 파일에 이어서 기록한다.
