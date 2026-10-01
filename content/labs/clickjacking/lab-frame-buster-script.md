---
title: "Clickjacking with a frame buster script"
tags:
  - portswigger
  - clickjacking
lab_url: "https://portswigger.net/web-security/clickjacking/lab-frame-buster-script"
difficulty: Apprentice
note_kind: problem
---

# Clickjacking with a frame buster script

## 문제 조건과 설명

**주어진 조건**

계정 페이지에는 프레임 표시를 막으려는 frame buster 스크립트가 있다. 모의 피해자는 Chrome을 사용한다. 자기 계정은 `wiener:peter`이며, 공격 페이지에서는 `Click me`를 누르게 해야 한다.

**완료 조건**

방어 스크립트가 있는 계정 페이지를 공격 HTML의 프레임에서 사용할 수 있게 만들고, 미끼 클릭으로 피해자의 이메일을 변경한다. 프레임이 잠깐 표시되거나 스크립트 오류가 나는 것과 실제 변경 성공은 다르다.

**문제 설명과 판단 기준**

frame buster는 페이지가 상위 창에 갇혀 있는지를 확인해 프레임에서 벗어나려는 클라이언트 측 방어다. 이 방어가 언제 실행되고 상위 페이지와 어떻게 상호작용하는지를 이해해야 클릭 가능한 상태로 계정 페이지를 유지할 수 있다. 응답 헤더의 프레임 제한과 페이지 스크립트의 동작도 구분해서 살펴야 한다.

자기 계정의 계정 페이지를 프레임에 넣어 Chrome에서 실제로 어떤 이동이나 오류가 생기는지 관찰한다. 방어 스크립트와 프레임의 최종 DOM을 조사한 뒤 미끼 요소의 좌표를 확인한다. 클릭 후 이메일 변경 요청과 계정 상태까지 검증한다. 아직 우회 동작이나 성공 결과는 기록되지 않았다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/clickjacking/lab-frame-buster-script)

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
