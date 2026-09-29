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

구매 흐름에 경쟁 상태가 있어 의도하지 않은 가격으로 상품을 살 수 있다. 개인 계정은 wiener:peter로 로그인하며 Burp Suite 2023.9 이상이 필요하다.

**완료 조건**

Lightweight L33t Leather Jacket을 구매한다.

**문제 설명**

동시 구매 요청이 가격이나 잔액 제한을 어긋나게 만드는지 확인하는 문제다. Burp Suite Professional의 Trigger race conditions 기능이 권장된다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/race-conditions/lab-race-conditions-limit-overrun)

## 탐색 및 풀이 기록

아직 작성하지 않았다. 직접 확인한 요청·응답, 시도한 이유와 결과를 이 파일에 이어서 기록한다.
