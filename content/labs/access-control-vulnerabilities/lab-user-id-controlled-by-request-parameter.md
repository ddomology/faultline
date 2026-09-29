---
title: "User ID controlled by request parameter"
tags:
  - portswigger
  - access-control-vulnerabilities
lab_url: "https://portswigger.net/web-security/access-control/lab-user-id-controlled-by-request-parameter"
difficulty: Apprentice
note_kind: problem
---

# User ID controlled by request parameter

## 문제 조건

사용자 계정 페이지에 수평적 권한 상승 취약점이 있다. 제공된 계정은 `wiener:peter`다.

## 완료 조건

`carlos`의 API 키를 얻어 제출한다.

## 문제 설명

계정 페이지가 요청 대상의 사용자 정보를 올바르게 제한하는지 확인하는 문제다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/access-control/lab-user-id-controlled-by-request-parameter)
