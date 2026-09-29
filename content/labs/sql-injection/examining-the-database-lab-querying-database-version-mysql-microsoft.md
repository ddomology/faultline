---
title: "SQL injection attack, querying the database type and version on MySQL and Microsoft"
tags:
  - portswigger
  - sql-injection
lab_url: "https://portswigger.net/web-security/sql-injection/examining-the-database/lab-querying-database-version-mysql-microsoft"
difficulty: Practitioner
draft: true
---

# SQL injection attack, querying the database type and version on MySQL and Microsoft

공개 풀이를 참고하지 않고, 실습에서 직접 본 요청과 응답만 기록한다. **아직 Solved 여부는 확인하지 않았다.**

## 1. 첫 `ORDER BY` 요청에서 500

**질문:** `category` 입력으로 원래 조회의 열 개수를 알아낼 수 있을까?

**실행:**

~~~sql
' ORDER BY 1 --
~~~

**관찰:** HTTP 500이 반환됐다.

**판단:** 이 응답 하나로 열 개수를 추정할 수 없다. 따옴표, 주석 처리, 요청 전달 방식 등 어느 지점에서 오류가 났는지 분리해야 한다.

**다음 행동:** `ORDER BY`를 빼고 따옴표와 주석만 시험한 다음, 같은 주석 형태로 `ORDER BY 1`을 다시 보낸다.

## 2. 주석 형태를 고정해 대조

**실행:**

~~~sql
' -- -
' ORDER BY 1 -- -
~~~

**관찰:** 두 요청 모두 정상 응답했다.

**판단:** `ORDER BY 1` 자체가 500을 만든다고 볼 수 없다. 끝을 `-- -`로 바꾸었을 때 응답이 달라졌으므로, 첫 요청의 주석 끝 처리나 공백 전달이 원인 후보이다. 정확한 서버 내부 오류는 아직 확인하지 못했다.

**다음 행동:** `-- -` 형태를 그대로 유지하고 `ORDER BY 2`, `ORDER BY 3`을 차례로 비교한다. 처음 오류가 나는 번호와 정상 요청의 화면 변화를 함께 기록한 뒤 반환 열 개수를 판단한다.
