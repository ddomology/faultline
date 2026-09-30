---
title: "Multi-endpoint race conditions"
tags:
  - portswigger
  - race-conditions
lab_url: "https://portswigger.net/web-security/race-conditions/lab-race-conditions-multi-endpoint"
difficulty: Practitioner
note_kind: problem
---

# Multi-endpoint race conditions

## 문제 조건과 설명

**주어진 조건**

여러 구매 엔드포인트가 공유하는 상태에 경쟁 조건이 있어 의도하지 않은 가격으로 물건을 살 수 있다. 계정은 `wiener:peter`이고 Burp Suite 2023.9 이상이 필요하다. 공식 문제는 실험 중 크레딧이 소진되지 않도록, 나중에 상환할 수 있는 기프트 카드 구매를 권장한다.

**완료 조건**

`Lightweight L33t Leather Jacket`을 실제로 구매한다. 한 엔드포인트의 응답만 바뀌었다면 주문 결과와 잔액을 더 확인해야 한다.

**문제 설명과 판단 기준**

정상 구매를 관찰해 상품 선택, 장바구니 변경, 결제 등 어떤 요청이 공유 상태를 읽거나 쓰는지 구분한다. 서로 다른 엔드포인트의 요청이 겹칠 때 가격 계산과 최종 결제가 다른 상태를 보게 되는지 비교하면 경쟁 구간을 좁힐 수 있다. 실험용 구매는 자금 상태에 영향을 주므로 매 시도 후 잔액을 확인한다.

겹친 요청의 응답, 최종 결제 금액, 재킷 주문 여부를 아래에 기록한다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/race-conditions/lab-race-conditions-multi-endpoint)

## 탐색 및 풀이 기록

아직 작성하지 않았다. 직접 확인한 요청·응답, 시도한 이유와 결과를 이 파일에 이어서 기록한다.
