---
title: "Username enumeration via response timing"
tags:
  - portswigger
  - authentication
lab_url: "https://portswigger.net/web-security/authentication/password-based/lab-username-enumeration-via-response-timing"
difficulty: Practitioner
note_kind: problem
---

# Username enumeration via response timing

## 문제 조건과 설명

**주어진 조건**

로그인 처리 시간의 차이가 사용자 이름의 유효성을 드러낸다. 자신의 계정 `wiener:peter`와 후보 사용자 이름·비밀번호 목록이 제공된다. 응답 본문만으로 차이를 찾기 어렵거나 일정하지 않을 수 있으며, 네트워크 지연도 측정값에 섞인다.

**완료 조건**

유효한 사용자 이름과 비밀번호를 찾고 해당 계정 페이지에 접속한다. 느린 응답 하나를 관찰하는 것은 유효한 이름의 확증도, 로그인 성공도 아니다.

**문제 설명과 판단 기준**

같은 조건의 로그인 요청에서 사용자 이름만 바꾸고 응답 시간을 반복 측정한다. 제공된 자신의 계정과 임의의 잘못된 이름을 기준으로 삼으면 정상적인 시간 변동 폭을 파악할 수 있다. 시간 차이가 비밀번호 길이, 요청 간 간격, 잠금이나 제한 상태에 따라 바뀌는지도 확인해야 원인을 잘못 귀속하지 않는다.

일관된 차이로 이름을 좁힌 다음 비밀번호 후보를 확인한다. 실제 인증 성공 응답과 계정 페이지 접근으로 결과를 검증하고, 측정 조건과 비교 횟수를 아래에 남긴다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/authentication/password-based/lab-username-enumeration-via-response-timing)

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
