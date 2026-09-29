---
title: "Inconsistent handling of exceptional input"
tags:
  - portswigger
  - business-logic-vulnerabilities
lab_url: "https://portswigger.net/web-security/logic-flaws/examples/lab-logic-flaws-inconsistent-handling-of-exceptional-input"
difficulty: Practitioner
note_kind: problem
---

# Inconsistent handling of exceptional input

## 문제 조건

가입 절차에서 예외적인 입력을 충분히 검증하지 않아 관리 기능에 접근할 수 있다.

## 완료 조건

관리자 패널에 접근해 carlos를 삭제한다.

## 문제 설명

계정 등록 값의 처리 차이가 권한 판정으로 이어지는지 확인하는 문제다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/logic-flaws/examples/lab-logic-flaws-inconsistent-handling-of-exceptional-input)
