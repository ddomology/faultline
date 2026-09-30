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

## 문제 조건과 설명

**주어진 조건**

JWT 세션을 사용하지만 서버가 서명되지 않은 토큰도 수락하도록 설정돼 있다. 자신의 계정은 `wiener:peter`다. 앞 문제처럼 모든 서명을 무시하는 조건이 아니라, 서명 없는 형식이 허용되는지가 핵심이다.

**완료 조건**

세션 토큰을 바꿔 `/admin`에 접근하고 `carlos`를 삭제한다. JWT를 서명 없이 만들었다는 사실과 서버가 이를 관리자 세션으로 받아들였다는 사실은 구별해야 한다.

**문제 설명과 판단 기준**

정상 토큰의 헤더에서 알고리즘 표시와 서명 부분을 확인한다. 서명 없는 방식으로 토큰을 표현했을 때 서버가 형식 자체를 거부하는지, 페이로드를 신뢰하는지 비교한다. 알고리즘 필드만 바꾸고 나머지 구조가 맞지 않으면 검증 결함이 있어도 토큰이 처리되지 않을 수 있다.

서버 응답이 실제 관리자 계정을 가리키는지 `/admin`에서 확인한 뒤 삭제 결과를 검증한다. 토큰 헤더·페이로드·서명 처리의 차이를 아래에 기록한다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/jwt/lab-jwt-authentication-bypass-via-flawed-signature-verification)

## 탐색 및 풀이 기록

### 초기 관찰
<!-- 직접 확인한 내용과 아직 확인하지 못한 점 -->

### 실행 과정
<!-- 무엇을 왜 했는지 → 실제 결과 → 해석 -->
<!-- 필요할 때 코드·요청·응답·스크린샷 첨부 -->

## 최종 결과
<!-- 완료 여부와 확인 근거 -->

## 배운 점
<!-- 새로 알게 된 내용, 잘못 생각했던 부분 -->
