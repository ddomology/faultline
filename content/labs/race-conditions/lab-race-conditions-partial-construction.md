---
title: "Partial construction race conditions"
tags:
  - portswigger
  - race-conditions
lab_url: "https://portswigger.net/web-security/race-conditions/lab-race-conditions-partial-construction"
difficulty: Expert
note_kind: problem
---

# Partial construction race conditions

## 문제 조건

가입 과정의 경쟁 상태로 이메일 확인을 우회해 소유하지 않은 주소로 등록할 수 있다. Burp Suite 2023.9 이상과 최신 Turbo Intruder 사용이 권장된다.

## 완료 조건

임의의 이메일 주소로 계정을 만든 뒤 로그인해 carlos를 삭제한다.

## 문제 설명

계정이 완성되기 전 임시 상태에서 검증되지 않은 주소가 받아들여지는지 살피는 문제다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/race-conditions/lab-race-conditions-partial-construction)
