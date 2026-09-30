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

## 문제 조건과 설명

**주어진 조건**

서버는 JWT 헤더의 `jwk` 매개변수를 지원해 검증 키를 토큰 안에 담을 수 있다. 하지만 그 키가 신뢰할 수 있는 출처에서 왔는지 확인하지 않는다. 자신의 계정은 `wiener:peter`다. 서명이 없어서 문제가 되는 것이 아니라, 서명을 검증할 키의 선택을 토큰 작성자에게 맡기는 상황이다.

**완료 조건**

수정한 JWT에 서명해 `/admin`에 접근하고 `carlos`를 삭제한다. 토큰에 키 정보를 넣은 것만으로 서버가 해당 키를 사용했다는 증거는 아니다.

**문제 설명과 판단 기준**

정상 토큰의 알고리즘과 헤더 구조를 살핀 뒤, 서버가 `jwk` 값으로 검증 키를 바꾸는지 확인한다. 자신이 제어하는 키로 서명한 토큰을 서버가 받아들인다면 키 출처 검증이 빠졌다는 근거가 된다. 키 표현이 올바르지 않아 생긴 파싱 실패와 서명 검증 실패도 분리해서 해석해야 한다.

새 토큰이 관리자 권한으로 처리되는지와 사용자 삭제 결과를 확인한다. 헤더의 키 정보, 서명 검증 반응, 최종 상태를 아래에 기록한다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/jwt/lab-jwt-authentication-bypass-via-jwk-header-injection)

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
