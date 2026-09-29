---
title: "SQL injection attack, querying the database type and version on Oracle"
tags:
  - portswigger
  - sql-injection
lab_url: "https://portswigger.net/web-security/sql-injection/examining-the-database/lab-querying-database-version-oracle"
difficulty: Practitioner
draft: false
---

# SQL injection attack, querying the database type and version on Oracle

## 문제 조건

이 실습의 **상품 카테고리 필터에는 SQL injection 취약점**이 존재한다. `UNION` 공격을 통해 삽입한 쿼리의 결과를 조회할 수 있으며, 이를 이용해 **데이터베이스의 버전 문자열을 화면에 표시**해야 한다.

- **취약점 위치:** 상품 카테고리 필터.
- **데이터베이스 종류:** Oracle.
- **사용 가능한 공격 방식:** `UNION`을 이용해 삽입한 쿼리의 조회 결과를 가져올 수 있다.
- **해결 조건:** 데이터베이스 버전 문자열을 화면에 표시한다.
- **직접 확인할 사항:** 원래 쿼리의 반환 열 개수와 각 열의 자료형, 결과가 화면에 표시되는 위치 등은 탐색 과정에서 확인한다.

> [!info] 문제에서 주어진 정보
> 위 내용은 공식 문제 설명과 제목을 기준으로 정리했다. 실제 요청, 시도한 입력값과 관찰 결과는 탐색 과정에 기록한다.

## 탐색 과정

## 해결 과정

## 배운 점

-

## 참고

- [PortSwigger 원본 실습](https://portswigger.net/web-security/sql-injection/examining-the-database/lab-querying-database-version-oracle)
