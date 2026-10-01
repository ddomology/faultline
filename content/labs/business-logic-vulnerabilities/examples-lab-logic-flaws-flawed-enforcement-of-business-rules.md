---
title: "Flawed enforcement of business rules"
tags:
  - portswigger
  - business-logic-vulnerabilities
lab_url: "https://portswigger.net/web-security/logic-flaws/examples/lab-logic-flaws-flawed-enforcement-of-business-rules"
difficulty: Apprentice
note_kind: problem
---

# Flawed enforcement of business rules

## 문제 조건과 설명

**주어진 조건**

구매 흐름에서 비즈니스 규칙이 잘못 적용된다. 자신의 계정은 `wiener:peter`이며 목표 상품은 `Lightweight l33t leather jacket`이다. 할인·혜택·제한 등 어떤 규칙이 실제로 있는지는 사이트의 구매 화면과 요청을 보고 확인해야 한다.

**완료 조건**

목표 재킷을 구매한다. 가격 표시의 변화, 장바구니 담기, 주문 확정은 각각 다른 단계다.

**문제 설명과 판단 기준**

정상 구매 흐름에서 장바구니, 할인 적용, 결제 금액 확정의 순서를 관찰한다. 각 규칙이 한 번만 적용되는지, 적용 조건이 상태 변화 후에도 유지되는지, 총액 계산에 일관되게 반영되는지 비교한다. 화면에 보이는 혜택이 실제 서버 주문 금액에 반영되는지까지 확인해야 논리 오류를 판단할 수 있다.

가능한 규칙을 발견하면 적용 전후의 서버 응답과 계정 잔액·주문 내역을 비교한다. 목표 재킷의 구매 완료가 확인될 때까지 각 판단의 근거를 아래에 기록한다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/logic-flaws/examples/lab-logic-flaws-flawed-enforcement-of-business-rules)

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
