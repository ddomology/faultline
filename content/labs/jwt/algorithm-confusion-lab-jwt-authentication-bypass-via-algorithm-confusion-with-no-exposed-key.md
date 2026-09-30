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

RSA 키 쌍을 쓰는 JWT 세션이 알고리즘 혼동에 취약하지만 공개 키를 바로 가져올 수 있는 엔드포인트는 제공되지 않는다. 자신의 계정은 `wiener:peter`다. 공식 설명은 기존 토큰에서 공개 키를 도출하는 데 도움이 되는 간소화된 `jwt_forgery.py` 도구를 제공한다.

**완료 조건**

서버 공개 키를 알아내 수정 JWT를 서명하고 `/admin`에 접근해 `carlos`를 삭제한다. 키 도출 단계와 토큰의 실제 서버 검증은 별도로 확인해야 한다.

**문제 설명과 판단 기준**

먼저 정상 로그인으로 얻은 토큰의 알고리즘·서명·페이로드를 확인한다. 공개 키가 노출되지 않은 만큼 기존 서명 토큰에서 키를 도출할 수 있는 조건과 결과를 검증해야 한다. 도출한 키의 바이트 표현이 서버가 쓰는 검증 키와 다르면 알고리즘을 바꾸어도 서명이 맞지 않을 수 있다.

도구의 출력이 정상 토큰과 일치하는지 확인한 뒤 수정 토큰의 관리자 접근과 삭제 결과를 검증한다. 토큰 자료, 키 도출 근거, 서버 반응을 아래에 기록한다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/jwt/algorithm-confusion/lab-jwt-authentication-bypass-via-algorithm-confusion-with-no-exposed-key)

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
