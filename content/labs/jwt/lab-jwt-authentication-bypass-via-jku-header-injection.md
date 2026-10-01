---
title: "JWT authentication bypass via jku header injection"
tags:
  - portswigger
  - jwt
lab_url: "https://portswigger.net/web-security/jwt/lab-jwt-authentication-bypass-via-jku-header-injection"
difficulty: Practitioner
note_kind: problem
---

# JWT authentication bypass via jku header injection

## 문제 조건과 설명

**주어진 조건**

서버는 JWT 헤더의 `jku` URL에서 서명 검증 키를 가져오지만 그 URL이 신뢰할 수 있는 도메인인지 확인하지 않는다. 자신의 계정은 `wiener:peter`다. `jwk`처럼 키를 토큰에 직접 넣는 방식과 달리, 이번에는 서버가 외부 주소에서 키 자료를 가져오는 흐름을 확인해야 한다.

**완료 조건**

JWT를 위조해 `/admin`에 접근하고 `carlos`를 삭제한다. 지정한 URL로 요청이 갔다는 사실과 제공한 키로 서명된 토큰이 실제로 수락됐다는 사실은 다르다.

**문제 설명과 판단 기준**

먼저 정상 토큰의 키 식별 방식과 서명 알고리즘을 확인한다. `jku` 값이 바뀔 때 서버가 키를 가져올 목적지도 바뀌는지 관찰하고, 가져온 키가 토큰 서명 검증에 쓰이는지 검증해야 한다. URL 검증 실패가 핵심이므로, 외부 요청 가능성만 확인하고 관리자 권한을 얻었다고 단정하지 않는다.

키 제공, 서명된 토큰 처리, `/admin` 접근, 삭제 결과를 순서대로 확인한다. 요청 URL과 서버 반응을 아래에 기록한다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/jwt/lab-jwt-authentication-bypass-via-jku-header-injection)

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
