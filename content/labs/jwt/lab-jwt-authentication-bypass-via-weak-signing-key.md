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

JWT는 비밀 키로 서명·검증되지만 키가 매우 약해 흔한 비밀 값의 목록으로 찾을 수 있다. 실습 계정은 `wiener:peter`다. 공식 설명은 JWT 작업에 익숙해질 것과 `hashcat`을 이용한 키 탐색을 권장하지만, 실제 키 값은 주어지지 않는다.

**완료 조건**

서명 키를 확인하고 관리자 권한을 나타내는 수정 JWT에 올바르게 서명한 뒤 `/admin`에 접근해 `carlos`를 삭제한다. 후보 키 하나로 토큰을 만들 수 있다는 것과 서버 검증을 통과하는 것은 다르다.

**문제 설명과 판단 기준**

정상 세션 토큰에서 알고리즘과 서명 데이터를 확인해 후보 키를 검증할 기준을 만든다. 흔한 비밀 값 목록을 대상으로 서명이 일치하는 키를 찾은 뒤, 원래 토큰이 그 키로 재현되는지 확인해야 한다. 서명 확인 후에야 페이로드의 사용자 값을 바꿔 새 토큰을 만들 근거가 생긴다.

수정 토큰의 관리자 접근과 삭제 결과를 각각 검증한다. 키를 확정한 근거, 토큰 서명, 서버 응답을 아래에 기록한다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/jwt/lab-jwt-authentication-bypass-via-weak-signing-key)

## 탐색 및 풀이 기록

아직 작성하지 않았다. 직접 확인한 요청·응답, 시도한 이유와 결과를 이 파일에 이어서 기록한다.
