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

사이트는 JWT로 세션을 관리하지만 서버가 받은 JWT의 서명을 검증하지 않는다. 자신의 계정은 `wiener:peter`다. JWT가 헤더·페이로드·서명으로 구성된다는 사실과, 서버가 실제로 신뢰하는 사용자 필드는 정상 로그인 토큰을 확인해 연결해야 한다.

**완료 조건**

세션 토큰을 수정해 `/admin`에 접근하고 `carlos`를 삭제한다. 토큰을 디코딩하거나 페이로드 값을 바꾸는 것만으로는 서버가 관리자 권한을 인정했는지 알 수 없다.

**문제 설명과 판단 기준**

먼저 정상 JWT의 각 부분을 확인하고 자신의 계정 정보가 어느 클레임에 들어 있는지 파악한다. 페이로드만 바꾼 토큰에 대해 서버가 유효한 서명 없이도 사용자 신원을 받아들이는지 비교하면 결함을 검증할 수 있다. 토큰 형식 오류와 권한 거부는 다른 결과이므로 응답을 구분해야 한다.

관리자 화면 접근 뒤에는 삭제 요청에도 변경된 토큰이 적용되는지 확인한다. 토큰 변경 내용과 `/admin` 응답, `carlos` 삭제 결과를 아래에 기록한다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/jwt/lab-jwt-authentication-bypass-via-unverified-signature)

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
