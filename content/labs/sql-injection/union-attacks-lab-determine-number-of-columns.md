---
title: "SQL injection UNION attack, determining the number of columns returned by the query"
tags:
  - portswigger
  - sql-injection
lab_url: "https://portswigger.net/web-security/sql-injection/union-attacks/lab-determine-number-of-columns"
difficulty: Practitioner
note_kind: problem
---

# SQL injection UNION attack, determining the number of columns returned by the query

## 문제 조건과 설명

**주어진 조건**

상품 카테고리 필터에 SQL 삽입 취약점이 있고 조회 결과가 응답에 나타난다. `UNION` 공격에 필요한 반환 열의 개수는 알려지지 않았다.

**완료 조건**

`NULL` 값으로 구성된 추가 행을 반환하는 `UNION` 삽입으로 열 개수를 알아낸다.

**문제 설명**

`UNION`으로 두 조회 결과를 합치려면 결과의 열 개수가 맞아야 한다는 점을 다루는 문제다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/sql-injection/union-attacks/lab-determine-number-of-columns)

## 탐색 및 풀이 기록

아직 작성하지 않았다. 직접 확인한 요청·응답, 시도한 이유와 결과를 이 파일에 이어서 기록한다.
