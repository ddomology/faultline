---
title: "2FA broken logic"
tags:
  - portswigger
  - authentication
lab_url: "https://portswigger.net/web-security/authentication/multi-factor/lab-2fa-broken-logic"
difficulty: Practitioner
note_kind: problem
---

# 2FA broken logic

## 문제 조건과 설명

**주어진 조건**

이중 인증 절차의 논리에 결함이 있다. 자신의 계정은 `wiener:peter`, 대상 사용자 이름은 `carlos`이며, 자신의 인증 코드는 제공된 이메일 서버에서 받을 수 있다. Carlos의 코드나 비밀번호가 주어진 것은 아니다.

**완료 조건**

Carlos의 계정 페이지에 접근한다. 자신의 2FA를 통과하거나 Carlos의 이름을 요청에 넣는 것만으로는 완료되지 않는다.

**문제 설명과 판단 기준**

먼저 자신의 계정으로 로그인해 코드 발급, 이메일 수신, 코드 제출, 계정 페이지 접근까지의 요청을 순서대로 관찰한다. 각 단계에서 어떤 값이 인증 대상 사용자와 연결되는지 살펴보면 서버가 코드의 소유자와 최종 로그인 대상을 일치시키는지 판단할 수 있다. 화면의 사용자 표시와 실제 세션이 가리키는 계정도 구분해야 한다.

대상 값을 바꾸는 탐색은 정상 흐름의 어느 단계가 그 값을 신뢰하는지 확인한 뒤 진행한다. 최종 응답에 Carlos의 계정 정보가 나타나는지 검증하고, 코드의 출처와 요청 대상, 세션 결과를 아래에 기록한다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/authentication/multi-factor/lab-2fa-broken-logic)

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
