---
title: "SQL injection attack, listing the database contents on Oracle"
tags:
  - portswigger
  - sql-injection
lab_url: "https://portswigger.net/web-security/sql-injection/examining-the-database/lab-listing-database-contents-oracle"
difficulty: Practitioner
note_kind: problem
---

# SQL injection attack, listing the database contents on Oracle

## 문제 조건

Oracle 데이터베이스의 상품 카테고리 필터에 SQL 삽입 취약점이 있고, 조회 결과가 응답에 표시된다. 사용자 이름과 비밀번호를 담은 이름 미상의 테이블과 로그인 기능이 있다.

## 완료 조건

해당 테이블과 열을 찾아 모든 사용자 이름·비밀번호를 조회한 후 `administrator`로 로그인한다.

## 문제 설명

`UNION`으로 다른 테이블의 조회 결과를 표시할 수 있지만, 계정 테이블 구조는 미리 주어지지 않는다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/sql-injection/examining-the-database/lab-listing-database-contents-oracle)
