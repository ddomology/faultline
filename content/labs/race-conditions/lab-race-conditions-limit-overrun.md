---
title: "Limit overrun race conditions"
tags:
  - portswigger
  - race-conditions
lab_url: "https://portswigger.net/web-security/race-conditions/lab-race-conditions-limit-overrun"
difficulty: Apprentice
note_kind: problem
---

# Limit overrun race conditions

## 문제 조건과 설명

**주어진 조건**

구매 흐름에 경쟁 조건이 있어 의도하지 않은 가격으로 물건을 살 수 있다. 계정은 `wiener:peter`이고 Burp Suite 2023.9 이상이 필요하다. 공식 문제는 Professional 버전의 Trigger race conditions 기능을 더 빠른 실행 수단으로 권장한다.

**완료 조건**

`Lightweight L33t Leather Jacket`을 실제로 구매한다. 가격이 일시적으로 다르게 보이거나 요청 하나가 성공하는 것으로는 구매 완료를 확인할 수 없다.

**문제 설명과 판단 기준**

정상 구매에서 잔액, 가격, 주문 상태가 어느 요청 전후로 바뀌는지 먼저 기록한다. 같은 제한을 확인하고 갱신하는 요청들이 동시에 처리될 때 결과가 달라지는지 비교하면 경쟁 구간을 찾을 수 있다. 응답 화면의 가격과 최종 주문 내역을 구분해, 실제로 의도하지 않은 가격이 적용됐는지 판단한다.

동시 요청의 순서와 응답, 잔액 및 재킷 구매 결과를 아래에 기록한다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/race-conditions/lab-race-conditions-limit-overrun)

## 탐색 및 풀이 기록

아직 작성하지 않았다. 직접 확인한 요청·응답, 시도한 이유와 결과를 이 파일에 이어서 기록한다.
