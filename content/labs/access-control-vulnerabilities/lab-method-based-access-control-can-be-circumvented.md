---
title: "Method-based access control can be circumvented"
tags:
  - portswigger
  - access-control-vulnerabilities
lab_url: "https://portswigger.net/web-security/access-control/lab-method-based-access-control-can-be-circumvented"
difficulty: Practitioner
note_kind: problem
---

# Method-based access control can be circumvented

## 문제 조건

요청의 HTTP 메서드에 따라 접근을 부분적으로 제어한다. 관리자 기능을 확인할 계정은 `administrator:admin`, 일반 계정은 `wiener:peter`다.

## 완료 조건

`wiener`로 로그인해 자신의 권한을 관리자로 높인다.

## 문제 설명

같은 기능이 메서드에 따라 다르게 보호되는지 확인하는 문제다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/access-control/lab-method-based-access-control-can-be-circumvented)
