---
title: "High-level logic vulnerability"
tags:
  - portswigger
  - business-logic-vulnerabilities
lab_url: "https://portswigger.net/web-security/logic-flaws/examples/lab-logic-flaws-high-level"
difficulty: Apprentice
note_kind: problem
---

# High-level logic vulnerability

## 문제 조건과 설명

**주어진 조건**

구매 과정에서 사용자 입력 검증이 부족해 의도하지 않은 가격으로 상품을 살 수 있다. 실습 계정은 `wiener:peter`이고 목표 상품은 `Lightweight l33t leather jacket`이다. 공식 조건은 특정 매개변수 하나를 지목하지 않으므로, 장바구니부터 결제까지의 상태 변화를 폭넓게 살펴야 한다.

**완료 조건**

목표 재킷의 구매를 완료한다. 장바구니에 담는 것, 총액을 낮추는 것, 실제 주문이 확정되는 것은 서로 다른 단계다.

**문제 설명과 판단 기준**

정상 구매 흐름에서 상품 추가·수정·제거와 결제 시점의 요청·응답을 순서대로 기록한다. 각 단계에서 수량, 가격, 잔액, 총액이 어떻게 갱신되는지 비교하면 개별 입력의 단순 조작인지 여러 단계의 상태 처리 오류인지 구분할 수 있다. 제목의 ‘상위 수준’이라는 표현만으로 특정 요청 필드나 우회 방법을 미리 정하지 않는다.

서버가 계산한 최종 금액과 구매 내역에 목표 재킷이 들어갔는지 검증한다. 어느 상태 전환에서 의도하지 않은 가격이 생겼는지 근거와 함께 아래에 기록한다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/logic-flaws/examples/lab-logic-flaws-high-level)

## 탐색 및 풀이 기록

아직 작성하지 않았다. 직접 확인한 요청·응답, 시도한 이유와 결과를 이 파일에 이어서 기록한다.
