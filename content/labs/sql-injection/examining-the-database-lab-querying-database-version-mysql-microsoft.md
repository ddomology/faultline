---
title: "SQL injection attack, querying the database type and version on MySQL and Microsoft"
tags:
  - portswigger
  - sql-injection
lab_url: "https://portswigger.net/web-security/sql-injection/examining-the-database/lab-querying-database-version-mysql-microsoft"
difficulty: Practitioner
note_kind: solution
---

# SQL injection attack, querying the database type and version on MySQL and Microsoft

## 문제 조건과 설명

상품 카테고리 필터에 SQL injection 취약점이 있다. 공식 설명에 따르면 `UNION`으로 추가한 조회 결과도 상품 목록 화면에 표시된다. 이 문제에서는 **데이터베이스 버전 문자열을 페이지에 출력**하면 된다.

**제목과 문제 설명에서 구분할 정보**

제목에는 MySQL과 Microsoft 계열이 함께 나오지만, 실제 서버가 어느 쪽인지와 버전 값은 아직 알 수 없다. 원래 상품 조회의 열 수나 각 열의 자료형, 화면에 표시되는 열도 확인해야 한다.

**탐색을 시작할 때의 판단**

첫 요청이 실패한 뒤 주석 형태를 고정하고 정상 응답과 오류 응답을 비교해 `UNION`에 필요한 열 수를 찾았다. 이어 시험 문자열을 각 열에 넣어 화면에 보이는지 확인하고, 확인된 위치에 버전 값을 넣었다.

첫 `ORDER BY` 요청은 HTTP 500이어서 주석 형태부터 바꿔 다시 확인했다. 실제 서버 종류와 버전은 마지막에 화면에 나온 값을 기준으로 적었다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/sql-injection/examining-the-database/lab-querying-database-version-mysql-microsoft)

## 탐색 및 풀이 기록

### 초기 관찰

#### 1. 첫 `ORDER BY` 요청에서 500

원래 조회의 열 개수를 알아보려고 `category`에 다음 값을 넣었다.

~~~sql fragment
' ORDER BY 1 --
~~~

응답은 HTTP 500이었다. 이것만으로 열 개수를 판단하기는 어려웠다. 따옴표와 주석만 넣은 요청을 먼저 확인한 뒤, 같은 주석 형태로 `ORDER BY 1`을 다시 보냈다.

### 실행 과정

#### 2. 주석 형태를 고정해 대조

따옴표와 주석만 넣은 요청을 `ORDER BY 1`을 붙인 요청과 비교했다.

~~~sql fragment
' -- -
' ORDER BY 1 -- -
~~~

두 요청 모두 정상 응답했다. 따라서 `ORDER BY 1` 자체가 500을 일으킨 것은 아니었다. `-- -`로 바꾸자 응답이 달라졌으므로 처음 요청에서는 주석 끝 처리나 공백 전달이 문제였을 가능성이 있다. 서버 내부 오류의 정확한 내용은 확인하지 못했다. 같은 주석 형태를 유지하고 정렬 번호만 늘려 봤다.

#### 3. 정렬 번호의 경계 확인

정렬 번호를 1부터 3까지 올려 보냈다.

~~~sql fragment
' ORDER BY 1 -- -
' ORDER BY 2 -- -
' ORDER BY 3 -- -
~~~

1과 2는 정상 응답했고, 3에서는 HTTP 500이 났다. 같은 주석 형태에서 세 번째 정렬 위치부터 오류가 나므로 원래 조회는 **2개 열**을 반환한다고 볼 수 있다. 이어 각 열에 시험 문자열을 넣어 화면에 표시되는지 확인했다.

#### 4. 두 열의 문자열 출력 확인

첫 번째 열에 `probe`를 넣었다.

~~~sql fragment
' UNION SELECT 'probe', NULL -- -
~~~

화면에 `probe`가 표시됐다.

![첫 번째 열의 probe 출력](https://raw.githubusercontent.com/ddomology/portswigger-lab-notes/main/content/labs/sql-injection/images/lab-querying-database-version-mysql-microsoft/01-probe-first-column.png)

두 번째 열에 같은 문자열을 넣었다.

~~~sql fragment
' UNION SELECT NULL, 'probe' -- -
~~~

두 번째 열에 넣었을 때도 `probe`가 보였다.

![두 번째 열의 probe 출력](https://raw.githubusercontent.com/ddomology/portswigger-lab-notes/main/content/labs/sql-injection/images/lab-querying-database-version-mysql-microsoft/02-probe-second-column.png)

두 열 모두 문자열을 받아 화면에 표시할 수 있었다. 첫 번째 열을 이용해 서버 버전 정보를 조회했다.

#### 5. 버전 정보 조회와 완료

첫 번째 열에 서버 버전 정보를 반환하는 `@@version`을 넣었다.

~~~sql fragment
' UNION SELECT @@version, NULL -- -
~~~

MySQL에서 `@@version`은 서버의 `version` 시스템 변수이고, SQL Server에서는 버전 정보를 반환하는 내장 함수다.

## 최종 결과

화면에 `8.0.42-0ubuntu0.20.04.1`이 표시됐다. 이 요청 이후 랩의 **Solved** 상태도 확인했다.

![@@version 조회 결과](https://raw.githubusercontent.com/ddomology/portswigger-lab-notes/main/content/labs/sql-injection/images/lab-querying-database-version-mysql-microsoft/03-version-output.png)

출력된 문자열은 MySQL 8.0.42의 Ubuntu 빌드 버전을 가리킨다.

## 배운 점

`ORDER BY`로 열 수를 확인하고 `probe`로 화면에 표시되는 열을 찾은 뒤, 그 자리에 `@@version`을 넣어 버전 문자열을 확인했다.

## 관련 개념
<!-- 필요한 개념 노트 링크를 목록으로 추가 -->
