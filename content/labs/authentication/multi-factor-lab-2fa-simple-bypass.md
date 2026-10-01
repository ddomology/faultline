---
title: "2FA simple bypass"
tags:
  - portswigger
  - authentication
lab_url: "https://portswigger.net/web-security/authentication/multi-factor/lab-2fa-simple-bypass"
difficulty: Apprentice
note_kind: problem
---

# 2FA simple bypass

## 문제 조건과 설명

**주어진 조건**

이중 인증 절차를 우회할 수 있는 실습이다. 자신의 계정 `wiener:peter`와 피해자 계정의 1차 자격 증명 `carlos:montoya`가 주어졌지만 Carlos의 2FA 코드는 알 수 없다. 비밀번호를 안다는 사실만으로 인증이 끝난 상태는 아니다.

**완료 조건**

Carlos의 계정 페이지에 접근한다. 비밀번호 단계 통과, 2FA 화면 표시, 실제 계정 페이지 열람은 서로 다른 상태다.

**문제 설명과 판단 기준**

먼저 자신의 계정에서 정상 로그인과 2FA를 거친 뒤 계정 페이지가 어떤 경로와 세션 상태를 요구하는지 관찰한다. Carlos의 알려진 자격 증명으로 1차 단계를 통과했을 때 발급되는 세션과 다음 단계의 응답을 비교하면, 2FA 완료 여부가 각 보호 요청에 강제되는지 판단할 수 있다.

2FA 코드를 추측하는 것보다 인증 단계 사이에 접근 가능한 경로가 있는지 확인하는 것이 주어진 조건에 맞다. 최종 응답에 Carlos의 계정 정보가 나타나는지 검증하고, 어떤 단계까지 확인했는지 아래에 남긴다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/authentication/multi-factor/lab-2fa-simple-bypass)

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
