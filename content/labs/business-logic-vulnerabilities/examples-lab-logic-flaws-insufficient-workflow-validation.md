---
title: "Insufficient workflow validation"
tags:
  - portswigger
  - business-logic-vulnerabilities
lab_url: "https://portswigger.net/web-security/logic-flaws/examples/lab-logic-flaws-insufficient-workflow-validation"
difficulty: Practitioner
note_kind: problem
---

# Insufficient workflow validation

## 문제 조건과 설명

**주어진 조건**

구매 과정이 각 단계의 실행 순서를 잘못 가정한다. 계정은 `wiener:peter`, 목표 상품은 `Lightweight l33t leather jacket`이다. 정상 절차에서 어떤 요청이 상품 선택, 결제, 주문 확정을 담당하는지는 먼저 확인해야 한다.

**완료 조건**

목표 재킷의 구매를 완료한다. 최종 화면을 요청하는 데 성공해도 서버의 주문 내역에 상품이 없으면 목표를 달성하지 못한다.

**문제 설명과 판단 기준**

정상 구매 흐름을 요청 단위로 기록하고 각 단계 후 장바구니·잔액·주문 상태가 어떻게 바뀌는지 확인한다. 그런 다음 단계의 순서를 바꾸거나 중간 단계를 생략한 요청을 비교해 서버가 이전 상태를 재검증하는지 살핀다. 결제를 마치지 않은 상태가 구매 완료 단계에서 수락되는지 여부가 핵심 판단 지점이다.

우회처럼 보이는 응답 뒤에는 실제 주문 내역과 잔액을 확인한다. 건너뛴 단계, 서버가 인정한 상태, 최종 재킷 구매 결과를 아래에 기록한다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/logic-flaws/examples/lab-logic-flaws-insufficient-workflow-validation)

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
