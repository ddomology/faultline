---
title: "Basic clickjacking with CSRF token protection"
tags:
  - portswigger
  - clickjacking
lab_url: "https://portswigger.net/web-security/clickjacking/lab-basic-csrf-protected"
difficulty: Apprentice
note_kind: problem
---

# Basic clickjacking with CSRF token protection

## 문제 조건과 설명

**주어진 조건**

사이트에 로그인 기능이 있고, 계정 페이지의 삭제 버튼은 CSRF 토큰으로 보호된다. 모의 사용자는 미끼 사이트에서 `click`이라는 단어가 보이는 요소를 누르고 Chrome을 사용한다. 자기 계정 `wiener:peter`로 화면과 버튼 위치를 확인할 수 있다.

**완료 조건**

계정 페이지를 프레임에 넣은 HTML로 사용자의 클릭을 실제 계정 삭제 버튼에 전달해 계정을 삭제한다. 미끼 문구를 눌렀다는 사실만으로는 완료가 아니며 삭제 결과까지 확인해야 한다.

**문제 설명과 판단 기준**

CSRF 토큰은 공격자가 별도의 삭제 요청을 꾸며 보내는 것을 어렵게 하지만, 이미 로그인한 사용자가 자신의 브라우저에서 정당한 버튼을 누르는 상황은 다른 문제다. 클릭재킹은 미끼 요소와 프레임 안의 실제 버튼을 겹쳐 사용자의 클릭 대상을 속인다. 프레임이 허용되는지, 화면 배치가 Chrome에서 맞는지는 직접 시험해야 한다.

자기 계정에서 삭제 페이지의 URL·버튼·프레임 가능 여부를 확인한다. exploit server HTML에 프레임과 `click` 문구를 배치하고 Chrome에서 실제 클릭 좌표가 삭제 버튼에 닿는지 검증한다. 마지막에는 계정 삭제 여부를 확인한다. 현재 프레임 동작이나 성공 결과는 기록되지 않았다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/clickjacking/lab-basic-csrf-protected)

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
