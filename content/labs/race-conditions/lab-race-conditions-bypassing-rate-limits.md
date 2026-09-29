---
title: "Bypassing rate limits via race conditions"
tags:
  - portswigger
  - race-conditions
lab_url: "https://portswigger.net/web-security/race-conditions/lab-race-conditions-bypassing-rate-limits"
difficulty: Practitioner
note_kind: problem
---

# Bypassing rate limits via race conditions

## 문제 조건

로그인 시도 횟수 제한이 있지만 경쟁 상태로 우회할 수 있다. 개인 계정은 wiener:peter로 로그인하며 제시된 후보 비밀번호 목록을 사용한다.

## 완료 조건

요청 제한을 우회해 carlos의 비밀번호를 찾고 로그인한 뒤 관리자 패널에서 carlos를 삭제한다.

## 문제 설명

동시 로그인 시도가 요청 제한의 집계 방식에 영향을 주는지 살피는 문제다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/race-conditions/lab-race-conditions-bypassing-rate-limits)
