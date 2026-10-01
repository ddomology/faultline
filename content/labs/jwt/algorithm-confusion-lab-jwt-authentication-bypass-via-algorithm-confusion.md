---
title: "JWT authentication bypass via algorithm confusion"
tags:
  - portswigger
  - jwt
lab_url: "https://portswigger.net/web-security/jwt/algorithm-confusion/lab-jwt-authentication-bypass-via-algorithm-confusion"
difficulty: Expert
note_kind: problem
---

# JWT authentication bypass via algorithm confusion

## 문제 조건과 설명

**주어진 조건**

사이트는 강한 RSA 키 쌍으로 JWT를 서명·검증하지만 구현 결함으로 알고리즘 혼동이 가능하다. 서버 공개 키는 표준 엔드포인트에 노출되어 있고 계정은 `wiener:peter`다. 비밀 키가 유출됐다는 조건이 아니라, 알고리즘과 키의 용도 선택이 어긋날 수 있다는 조건이다.

**완료 조건**

공개 키를 확보해 수정한 세션 토큰을 만들고 `/admin`에 접근해 `carlos`를 삭제한다. 공개 키를 읽는 것만으로는 관리자 토큰을 얻은 것이 아니다.

**문제 설명과 판단 기준**

정상 JWT 헤더의 알고리즘과 공개 키 엔드포인트의 키 형식을 확인한다. 토큰이 선언한 알고리즘을 서버가 그대로 따른다면 RSA 검증용 공개 키를 다른 서명 방식의 재료로 잘못 사용할 가능성이 있다. 실제로 서버가 변경한 알고리즘과 키를 어떻게 처리하는지 응답으로 검증해야 한다.

수정 토큰의 서명, `/admin` 응답, 삭제 결과를 순서대로 확인한다. 공개 키를 얻은 위치와 토큰 처리 결과를 아래에 기록한다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/jwt/algorithm-confusion/lab-jwt-authentication-bypass-via-algorithm-confusion)

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

## 관련 개념
<!-- 필요한 개념 노트 링크를 목록으로 추가 -->
