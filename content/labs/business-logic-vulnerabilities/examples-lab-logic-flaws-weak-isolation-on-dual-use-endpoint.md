---
title: "Weak isolation on dual-use endpoint"
tags:
  - portswigger
  - business-logic-vulnerabilities
lab_url: "https://portswigger.net/web-security/logic-flaws/examples/lab-logic-flaws-weak-isolation-on-dual-use-endpoint"
difficulty: Practitioner
note_kind: problem
---

# Weak isolation on dual-use endpoint

## 문제 조건

계정 관리 기능이 사용자 입력을 근거로 권한 수준을 잘못 가정한다. 개인 계정은 wiener:peter로 로그인한다.

## 완료 조건

administrator 계정에 접근한 뒤 carlos를 삭제한다.

## 문제 설명

한 요청 지점이 여러 용도로 쓰일 때 사용자 권한이 제대로 분리되는지 살피는 문제다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/logic-flaws/examples/lab-logic-flaws-weak-isolation-on-dual-use-endpoint)
