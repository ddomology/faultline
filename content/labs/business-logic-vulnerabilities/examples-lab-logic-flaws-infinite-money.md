---
title: "Infinite money logic flaw"
tags:
  - portswigger
  - business-logic-vulnerabilities
lab_url: "https://portswigger.net/web-security/logic-flaws/examples/lab-logic-flaws-infinite-money"
difficulty: Practitioner
note_kind: problem
---

# Infinite money logic flaw

## 문제 조건과 설명

**주어진 조건**

구매 흐름의 논리 오류를 이용해 목표 상품을 살 수 있다. 계정은 `wiener:peter`, 목표는 `Lightweight l33t leather jacket`이다. 제목은 돈이나 계정 잔액을 반복해서 늘릴 수 있는 상황을 암시하지만, 실제로 어떤 거래·혜택이 잔액에 영향을 주는지는 확인해야 한다.

**완료 조건**

목표 재킷을 실제로 구매한다. 계정 잔액을 올리거나 특정 상품을 되사는 단계만으로는 완료되지 않는다.

**문제 설명과 판단 기준**

정상 구매와 환불·크레딧·혜택 등 사이트가 제공하는 금전 관련 흐름을 관찰해 잔액 변화를 기록한다. 각 거래의 전후 금액을 비교하면 같은 가치를 반복 처리할 수 있는지, 지급 금액과 차감 금액 사이에 차이가 생기는지 확인할 수 있다. 어떤 기능이 존재하는지는 화면과 요청을 보고 판단하며, 제목만으로 특정 수단을 단정하지 않는다.

잔액 증가가 지속되는지와 최종 결제에 실제로 쓸 수 있는지를 검증한다. 거래별 잔액 변화와 재킷 구매 완료를 아래에 순서대로 기록한다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/logic-flaws/examples/lab-logic-flaws-infinite-money)

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
