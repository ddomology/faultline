---
title: "Low-level logic flaw"
tags:
  - portswigger
  - business-logic-vulnerabilities
lab_url: "https://portswigger.net/web-security/logic-flaws/examples/lab-logic-flaws-low-level"
difficulty: Practitioner
note_kind: problem
---

# Low-level logic flaw

## 문제 조건과 설명

**주어진 조건**

구매 기능이 사용자 입력을 충분히 검증하지 않아 상품을 의도하지 않은 가격으로 살 수 있다. 계정은 `wiener:peter`, 목표 상품은 `Lightweight l33t leather jacket`이다. 제목은 낮은 수준의 값 처리에 초점을 맞추지만 구체적인 매개변수와 허용 범위는 알려져 있지 않다.

**완료 조건**

목표 재킷을 실제로 구매한다. 요청을 반복 처리하게 만들거나 장바구니 숫자만 바꾸는 데 그치면 완료가 아니다.

**문제 설명과 판단 기준**

먼저 한 상품을 담고 수량을 바꾸는 정상 요청에서 입력 형식과 서버의 총액 계산을 확인한다. 값의 경계, 부호, 큰 수, 반복 갱신이 어떻게 처리되는지 관찰하면 계산 단계의 오류를 찾을 수 있다. 숫자가 화면에 표시되는 방식과 서버가 저장한 잔액·총액이 다를 수 있으므로 두 결과를 함께 비교한다.

의도하지 않은 금액이 만들어지는 지점을 확인한 뒤, 해당 상태가 결제까지 유지되는지 검증한다. 보낸 값, 중간 계산, 최종 주문 결과를 아래에 순서대로 기록한다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/logic-flaws/examples/lab-logic-flaws-low-level)

## 탐색 및 풀이 기록

아직 작성하지 않았다. 직접 확인한 요청·응답, 시도한 이유와 결과를 이 파일에 이어서 기록한다.
