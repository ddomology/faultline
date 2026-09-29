---
title: "Authentication bypass via encryption oracle"
tags:
  - portswigger
  - business-logic-vulnerabilities
lab_url: "https://portswigger.net/web-security/logic-flaws/examples/lab-logic-flaws-authentication-bypass-via-encryption-oracle"
difficulty: Practitioner
note_kind: problem
---

# Authentication bypass via encryption oracle

## 문제 조건

사용자가 암호화 오라클로 악용할 수 있는 논리 오류가 있다. 개인 계정은 wiener:peter로 로그인한다.

## 완료 조건

관리자 패널에 접근해 carlos를 삭제한다.

## 문제 설명

애플리케이션이 제공하는 암호화 기능이 권한 확인에 필요한 값을 만들 수 있는지 살피는 문제다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/logic-flaws/examples/lab-logic-flaws-authentication-bypass-via-encryption-oracle)
