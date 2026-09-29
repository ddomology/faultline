---
title: "SQL injection UNION attack, retrieving data from other tables"
tags:
  - portswigger
  - sql-injection
lab_url: "https://portswigger.net/web-security/sql-injection/union-attacks/lab-retrieve-data-from-other-tables"
difficulty: Practitioner
note_kind: problem
---

# SQL injection UNION attack, retrieving data from other tables

## 문제 조건과 설명

**주어진 조건**

상품 카테고리 필터의 SQL 삽입 결과가 응답에 표시된다. 데이터베이스에 `username`, `password` 열을 가진 `users` 테이블이 별도로 있다.

**완료 조건**

`UNION` 삽입으로 모든 사용자 이름과 비밀번호를 조회하고 `administrator`로 로그인한다.

**문제 설명**

상품 조회 결과에 계정 테이블의 값을 합쳐 표시할 수 있는지가 핵심이다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/sql-injection/union-attacks/lab-retrieve-data-from-other-tables)

## 탐색 및 풀이 기록

아직 작성하지 않았다. 직접 확인한 요청·응답, 시도한 이유와 결과를 이 파일에 이어서 기록한다.
