---
title: "Clickjacking with form input data prefilled from a URL parameter"
tags:
  - portswigger
  - clickjacking
lab_url: "https://portswigger.net/web-security/clickjacking/lab-prefilled-form-input"
difficulty: Apprentice
note_kind: problem
---

# Clickjacking with form input data prefilled from a URL parameter

## 문제 조건과 설명

**주어진 조건**

앞선 기본 클릭재킹 문제와 달리, 계정 페이지의 이메일 변경 양식을 URL 매개변수로 미리 채울 수 있다. 모의 사용자는 Chrome을 쓰고, 자기 계정 `wiener:peter`로 폼의 동작을 확인할 수 있다. 공격 HTML은 계정 페이지를 프레임에 넣어야 한다.

**완료 조건**

사용자가 `Click me` 미끼를 클릭했다고 생각하는 동안 프레임 안의 `Update email` 버튼을 누르게 해 이메일 주소를 실제로 변경한다. 미리 채운 값이 화면에 보이거나 버튼이 눌린 것만으로 완료라고 판단하지 않는다.

**문제 설명과 판단 기준**

URL 매개변수는 공격자가 이메일 입력값을 준비할 수 있다는 단서이고, 클릭재킹은 사용자의 클릭을 실제 폼 제출 버튼에 전달하는 단계다. 두 조건이 모두 맞아야 피해자의 계정 상태가 바뀐다. 프레임 안에서 폼이 정상적으로 로드되는지와 미끼 문구의 클릭 좌표가 버튼에 닿는지도 따로 확인해야 한다.

먼저 자기 계정에서 URL 값이 폼 입력란에 어떻게 반영되는지 확인한다. Chrome에서 프레임의 크기·위치와 `Click me` 요소를 조정하고, 클릭 후 발생한 요청과 이메일 변경 결과를 기록한다. 아직 사용 가능한 URL 매개변수나 성공한 배치는 직접 확인되지 않았다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/clickjacking/lab-prefilled-form-input)

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
