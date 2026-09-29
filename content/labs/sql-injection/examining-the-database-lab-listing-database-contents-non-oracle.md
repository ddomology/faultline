---
title: "SQL injection attack, listing the database contents on non-Oracle databases"
tags:
  - portswigger
  - sql-injection
lab_url: "https://portswigger.net/web-security/sql-injection/examining-the-database/lab-listing-database-contents-non-oracle"
difficulty: Practitioner
draft: true
---

# SQL injection attack, listing the database contents on non-Oracle databases

공개 풀이를 참고하지 않고, 실습에서 확인한 요청과 응답을 순서대로 기록한다. 아직 Solved는 확인하지 않았다.

## 1. 주입 가능성 확인

**실행:**

~~~sql
' OR 1=1 --
~~~

**관찰:** 이 요청이 먹히는 것을 사용자가 확인했다. 구체적인 응답 내용은 아직 기록하지 않았다.

**판단:** 입력이 SQL 조건식에 영향을 줄 수 있다. 이 결과만으로 원래 조회의 열 수나 데이터베이스 종류를 단정하지 않는다.

**다음 행동:** 성공한 주석 형태를 유지하고 `ORDER BY`의 위치 번호를 바꾸어 반환 열 수를 확인한다.

## 2. 반환 열 수 확인

**실행:**

~~~sql
' OR 1=1 ORDER BY 1 --
' OR 1=1 ORDER BY 2 --
' OR 1=1 ORDER BY 3 --
~~~

**관찰:** 1과 2는 정상 응답했고, 3부터 HTTP 500이 발생했다.

**판단:** 세 번째 정렬 위치에서 오류가 시작되므로 원래 조회는 두 열을 반환한다고 추정한다. HTTP 500의 내부 원인은 아직 확인하지 않았다.

**다음 행동:** 두 열을 맞춘 `UNION SELECT`에서 시험 문자열을 각 열에 번갈아 넣어 문자열을 출력할 수 있는 위치를 확인한다.
