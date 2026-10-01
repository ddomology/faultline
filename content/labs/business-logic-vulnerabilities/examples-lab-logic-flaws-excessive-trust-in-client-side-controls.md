---
title: "Excessive trust in client-side controls"
tags:
  - portswigger
  - business-logic-vulnerabilities
lab_url: "https://portswigger.net/web-security/logic-flaws/examples/lab-logic-flaws-excessive-trust-in-client-side-controls"
difficulty: Apprentice
note_kind: problem
---

# Excessive trust in client-side controls

## 문제 조건과 설명

**주어진 조건**

구매 기능이 클라이언트에서 전달된 입력을 충분히 검증하지 않아 상품을 의도하지 않은 가격으로 살 수 있다. 실습 계정은 `wiener:peter`이며 목표 상품은 `Lightweight l33t leather jacket`이다. 어떤 구매 값이 클라이언트에 의해 결정되는지는 정상 주문 요청에서 확인해야 한다.

**완료 조건**

목표 재킷을 실제로 구매한다. 장바구니의 표시 가격이 바뀌거나 주문 요청이 접수된 것처럼 보이는 단계와 구매 완료는 구별한다.

**문제 설명과 판단 기준**

정상적으로 상품을 장바구니에 담고 결제하는 흐름을 관찰해 상품 ID, 수량, 가격, 총액 중 무엇을 브라우저가 전송하는지 확인한다. 서버가 자체 상품 가격을 다시 계산하는지, 클라이언트가 보낸 값을 그대로 주문 상태에 반영하는지 응답과 장바구니 변화를 비교한다. 한 화면의 표시만 바뀌고 결제 금액이 그대로라면 가격 조작이 실제 구매에 영향을 준 것은 아니다.

목표 상품과 최종 결제 금액을 확인하며 구매 완료 상태를 검증한다. 변경한 요청 값과 서버가 확정한 결과를 아래에 기록한다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/logic-flaws/examples/lab-logic-flaws-excessive-trust-in-client-side-controls)

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
