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

구매 흐름에 여러 엔드포인트가 관여하며 경쟁 상태로 의도하지 않은 가격에 상품을 살 수 있다. 개인 계정은 wiener:peter로 로그인하며 Burp Suite 2023.9 이상이 필요하다.

**완료 조건**

Lightweight L33t Leather Jacket을 구매한다.

**문제 설명**

서로 다른 구매 요청이 같은 상태를 어떻게 처리하는지 확인하는 문제다. 실험할 때는 기프트 카드를 구매해 잔액을 복구하는 방식을 권장한다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/race-conditions/lab-race-conditions-multi-endpoint)

## 탐색 및 풀이 기록

아직 작성하지 않았다. 직접 확인한 요청·응답, 시도한 이유와 결과를 이 파일에 이어서 기록한다.
