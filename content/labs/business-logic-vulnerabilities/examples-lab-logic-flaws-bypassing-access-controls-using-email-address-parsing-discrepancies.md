---
title: "Bypassing access controls using email address parsing discrepancies"
tags:
  - portswigger
  - business-logic-vulnerabilities
lab_url: "https://portswigger.net/web-security/logic-flaws/examples/lab-logic-flaws-bypassing-access-controls-using-email-address-parsing-discrepancies"
difficulty: Expert
note_kind: problem
---

# Bypassing access controls using email address parsing discrepancies

## 문제 조건

가입 과정에서 허용되지 않은 도메인의 이메일 주소를 막지만, 검증 로직과 이메일 파서의 해석이 다르다.

## 완료 조건

이 차이를 이용해 계정을 등록하고 carlos를 삭제한다.

## 문제 설명

같은 이메일 주소를 서로 다르게 해석할 때 도메인 기반 접근 제어가 무너지는지 확인하는 문제다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/logic-flaws/examples/lab-logic-flaws-bypassing-access-controls-using-email-address-parsing-discrepancies)
