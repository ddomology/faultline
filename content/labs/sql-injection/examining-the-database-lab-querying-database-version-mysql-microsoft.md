---
title: "SQL injection attack, querying the database type and version on MySQL and Microsoft"
tags:
  - portswigger
  - sql-injection
lab_url: "https://portswigger.net/web-security/sql-injection/examining-the-database/lab-querying-database-version-mysql-microsoft"
difficulty: Practitioner
draft: false
---

# SQL injection attack, querying the database type and version on MySQL and Microsoft

공개 풀이를 참고하지 않고, 실습에서 직접 확인한 요청과 응답을 순서대로 기록한다. 마지막에 사용자가 랩의 Solved 상태를 확인했다.

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

**다음 행동:** 두 열을 맞춘 `UNION SELECT`에서 시험 문자열을 각 열에 번갈아 넣어 표시 여부를 확인했다.

## 4. 두 열의 문자열 출력 확인

첫 번째 열에 `probe`를 넣었다.

~~~sql
' UNION SELECT 'probe', NULL -- -
~~~

**관찰:** 화면에 `probe`가 표시됐다.

![첫 번째 열의 probe 출력](https://raw.githubusercontent.com/ddomology/portswigger-lab-notes/main/content/labs/sql-injection/images/lab-querying-database-version-mysql-microsoft/01-probe-first-column.png)

두 번째 열에 같은 문자열을 넣었다.

~~~sql
' UNION SELECT NULL, 'probe' -- -
~~~

**관찰:** 이 요청에서도 화면에 `probe`가 표시됐다.

![두 번째 열의 probe 출력](https://raw.githubusercontent.com/ddomology/portswigger-lab-notes/main/content/labs/sql-injection/images/lab-querying-database-version-mysql-microsoft/02-probe-second-column.png)

**판단:** 두 열 모두 문자열을 받아 화면에 표시할 수 있다. 아직 데이터베이스 종류나 버전은 조회하지 않았다.

**다음 행동:** 첫 번째 열에 서버 버전 정보를 반환하는 식을 넣어 확인한다.

## 5. 버전 정보 조회와 완료

**질문:** 문자열을 표시할 수 있는 첫 번째 열에 서버 버전 정보를 넣으면 랩의 목표를 충족할까?

**실행:**

~~~sql
' UNION SELECT @@version, NULL -- -
~~~

`@@version`은 MySQL에서는 서버의 `version` 시스템 변수이고, SQL Server에서는 버전 정보를 반환하는 내장 함수다. 앞서 확인한 두 열의 형태를 유지하면서 첫 번째 열에 이 값을 넣었다.

**관찰:** 사용자가 이 단계 이후 랩의 **Solved** 상태를 확인했다. 응답에 표시된 정확한 제품명과 버전 문자열은 별도로 전달받지 못했으므로 기록하지 않는다.

**판단:** `ORDER BY`로 열 수를 확인하고, `probe`로 문자열 출력 위치를 검증한 뒤, 같은 위치에 `@@version`을 넣는 순서로 목표에 도달했다.
