---
title: "SQL injection UNION attack, finding a column containing text"
tags:
  - portswigger
  - sql-injection
lab_url: "https://portswigger.net/web-security/sql-injection/union-attacks/lab-find-column-containing-text"
difficulty: Practitioner
note_kind: problem
---

# SQL injection UNION attack, finding a column containing text

## 문제 조건

상품 카테고리 필터의 SQL 삽입 결과를 `UNION`으로 화면에 표시할 수 있다. 실습에서 표시해야 할 임의 문자열이 제공된다.

## 완료 조건

제공된 값을 담은 추가 행을 출력해 문자열과 호환되는 열을 찾는다.

## 문제 설명

반환 열의 개수를 확인한 다음 문자열 값을 받을 수 있는 열을 구별하는 단계다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/sql-injection/union-attacks/lab-find-column-containing-text)
