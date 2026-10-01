---
title: "Bypassing rate limits via race conditions"
tags:
  - portswigger
  - race-conditions
lab_url: "https://portswigger.net/web-security/race-conditions/lab-race-conditions-bypassing-rate-limits"
difficulty: Practitioner
note_kind: problem
---

# Bypassing rate limits via race conditions

## 문제 조건과 설명

**주어진 조건**

로그인에는 무차별 대입을 막는 요청 제한이 있지만 경쟁 조건으로 우회할 수 있다. 자신의 계정은 `wiener:peter`이고, 공식 문제는 후보 비밀번호 목록을 제공한다.

**완료 조건**

요청 제한을 우회해 `carlos`의 비밀번호를 찾고 로그인한 다음, 관리자 패널에서 `carlos`를 삭제한다. 비밀번호 후보를 알아내는 단계와 관리 작업의 성공을 분리해 확인해야 한다.

**문제 설명과 판단 기준**

먼저 정상적인 실패 응답과 제한이 발동한 응답을 비교한다. 로그인 시도와 제한 횟수 갱신이 겹칠 때 여러 후보가 실제 비밀번호 검사까지 도달하는지 관찰한다. 단순히 제한 오류가 줄어든 것만으로는 우회가 입증되지 않으므로, 유효한 자격 증명으로 세션이 만들어지는지 확인한다.

제한 조건, 동시에 처리된 시도, `carlos` 로그인 및 삭제 결과를 아래에 기록한다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/race-conditions/lab-race-conditions-bypassing-rate-limits)

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
