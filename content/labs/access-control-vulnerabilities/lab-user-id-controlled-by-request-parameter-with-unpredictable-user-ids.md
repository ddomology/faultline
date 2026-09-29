---
title: "User ID controlled by request parameter, with unpredictable user IDs"
tags:
  - portswigger
  - access-control-vulnerabilities
lab_url: "https://portswigger.net/web-security/access-control/lab-user-id-controlled-by-request-parameter-with-unpredictable-user-ids"
difficulty: Apprentice
note_kind: problem
---

# User ID controlled by request parameter, with unpredictable user IDs

## 문제 조건

사용자 계정 페이지에 수평적 권한 상승 취약점이 있지만 사용자 식별자에는 `GUID`가 쓰인다. 제공된 계정은 `wiener:peter`다.

## 완료 조건

`carlos`의 GUID를 찾고 그의 API 키를 제출한다.

## 문제 설명

예측하기 어려운 식별자와 접근 제어가 별개의 문제임을 확인한다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/access-control/lab-user-id-controlled-by-request-parameter-with-unpredictable-user-ids)
