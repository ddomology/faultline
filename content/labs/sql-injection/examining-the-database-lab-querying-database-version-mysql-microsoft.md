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

**다음 행동:** 같은 주석 형태로 정렬 번호를 늘려, 처음 500이 나는 지점을 확인했다.

## 3. 정렬 번호의 경계 확인

**실행:**

~~~sql
' ORDER BY 1 -- -
' ORDER BY 2 -- -
' ORDER BY 3 -- -
~~~

**관찰:** 1과 2는 정상 응답했고, 3부터 HTTP 500이었다.

**판단:** 주석 형태를 고정했을 때 세 번째 정렬 위치에서만 오류가 시작됐다. 따라서 원래 조회의 반환 열은 **2개**라는 판단이 가장 타당하다. 아직 어느 열이 문자열을 표시하는지는 모른다.

**다음 행동:** 두 열을 맞춘 `UNION SELECT`에서 무해한 시험 문자열을 첫 번째 열, 두 번째 열에 번갈아 넣고 표시 여부를 확인한다. 아래 요청은 아직 실행하지 않았다.

~~~sql
' UNION SELECT 'probe', NULL -- -
' UNION SELECT NULL, 'probe' -- -
~~~
