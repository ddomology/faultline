---
title: "Visible error-based SQL injection"
tags:
  - portswigger
  - sql-injection
lab_url: "https://portswigger.net/web-security/sql-injection/blind/lab-sql-injection-visible-error-based"
difficulty: Practitioner
note_kind: problem
---

# Visible error-based SQL injection

## 문제 조건

분석용 추적 쿠키가 SQL 조회에 들어가며 조회 결과는 응답에 표시되지 않는다. 별도 `users` 테이블에 `username`, `password` 열이 있다.

## 완료 조건

`administrator`의 비밀번호를 노출시킬 방법을 찾아 그 계정에 로그인한다.

## 문제 설명

문제 제목처럼 표시되는 오류를 통해 데이터가 드러날 수 있는지를 살피는 유형이다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/sql-injection/blind/lab-sql-injection-visible-error-based)
