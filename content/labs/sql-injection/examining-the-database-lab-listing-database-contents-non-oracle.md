---
title: "SQL injection attack, listing the database contents on non-Oracle databases"
tags:
  - portswigger
  - sql-injection
lab_url: "https://portswigger.net/web-security/sql-injection/examining-the-database/lab-listing-database-contents-non-oracle"
difficulty: Practitioner
note_kind: solution
draft: false
---

# SQL injection attack, listing the database contents on non-Oracle databases

## 문제 조건과 설명

상품 카테고리 필터에 SQL injection 취약점이 있고, 조회 결과가 화면에 표시되는 실습이다. `UNION`을 이용하면 다른 테이블의 행도 상품 조회 결과에 섞어 보여 줄 수 있다. 별도의 로그인 기능도 있다.

**주어진 정보와 아직 찾아야 할 정보**

데이터베이스에 사용자 이름과 비밀번호를 저장한 테이블이 있다는 사실은 알려져 있다. 다만 **테이블 이름과 두 열의 이름은 주어지지 않는다.** 제목의 “non-Oracle”만 보고 데이터베이스 제품이나 메타데이터 구조를 미리 정할 수도 없다. 실제 이름은 조회 결과를 보면서 찾아야 한다.

**완료 조건은 사용자들의 이름과 비밀번호를 조회한 뒤 `administrator` 계정으로 로그인하는 것**이다. 계정 정보를 조회한 다음 로그인까지 해야 한다.

**탐색 순서가 필요한 이유**

먼저 원래 조회가 몇 개의 열을 반환하는지, 어느 열에 문자열을 표시할 수 있는지 확인했다. 그다음 접근 가능한 테이블을 살펴보고 계정 테이블로 보이는 곳의 열 이름을 찾았다. 확인한 열로 계정 정보를 조회한 뒤 관리자 계정으로 로그인하는 순서로 진행했다.

아래에 나오는 `users_ntqhfo` 같은 이름은 문제에 주어진 값이 아니라 이 실습 인스턴스에서 직접 확인한 값이다. 어떤 요청으로 그 이름을 찾았는지 순서대로 적었다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/sql-injection/examining-the-database/lab-listing-database-contents-non-oracle)


## 탐색 및 풀이 기록

### 초기 관찰

#### 1. 주입 가능성 확인

카테고리 값에 다음 문자열을 넣어 주입이 되는지 확인했다.

~~~sql fragment
' OR 1=1 --
~~~

입력이 반영되는 것은 확인했지만, 구체적인 응답 내용은 남기지 않았다. 이때 알 수 있는 것은 입력이 SQL 조건식에 영향을 준다는 점까지다. 같은 주석 형태를 유지한 채 `ORDER BY` 번호를 바꿔 반환 열 수를 확인했다.

### 실행 과정

#### 2. 반환 열 수 확인

`ORDER BY` 뒤의 숫자를 1부터 늘려 보았다.

~~~sql fragment
' OR 1=1 ORDER BY 1 --
' OR 1=1 ORDER BY 2 --
' OR 1=1 ORDER BY 3 --
~~~

1과 2에서는 정상 응답이 왔고, 3부터 HTTP 500이 발생했다. 세 번째 정렬 위치에서 오류가 나므로 원래 조회는 두 열을 반환한다고 봤다. HTTP 500의 내부 원인은 확인하지 못했다. 이어서 두 열에 맞춘 `UNION SELECT`에 시험 문자열을 번갈아 넣었다.

#### 3. 문자열 출력 위치 확인

두 열 중 어디에 문자열이 표시되는지 확인했다.

~~~sql fragment
' UNION SELECT 'probe', NULL --
' UNION SELECT NULL, 'probe' --
~~~

어느 열에 넣어도 화면에 `probe`가 표시됐다. 따라서 두 열 모두 문자열 출력에 사용할 수 있었다. 아직 테이블 이름은 모르므로 메타데이터에서 접근 가능한 테이블부터 찾아봤다.

#### 4. `ALL_VIEWS` 조회 시도

먼저 `ALL_VIEWS`를 조회해 봤다.

~~~sql fragment
' UNION SELECT view_name, NULL FROM all_views --
~~~

응답은 HTTP 500이었다. 오류 내용이나 서버 로그가 없어 `ALL_VIEWS`가 없는 것인지, 다른 이유로 실패한 것인지는 알 수 없었다. 앞서 확인한 두 열의 `UNION` 형태는 그대로 두고 다른 메타데이터 조회를 시도했다.

#### 5. `information_schema.tables`로 테이블 목록 확인

이번에는 `information_schema.tables`에서 스키마와 테이블 이름을 조회했다.

~~~sql fragment
' UNION SELECT table_schema, table_name FROM information_schema.tables --
~~~

요청은 성공했다. 출력에는 스키마와 테이블 이름 쌍이 179개 있었고, `pg_catalog`가 116개, `information_schema`가 61개, `public`이 2개였다. `public`에 있는 테이블은 다음 두 개였다.

~~~text
public  users_ntqhfo
public  products
~~~

`products`는 상품 화면에 쓰이는 테이블로 보였고, `users_ntqhfo`는 계정 테이블일 가능성이 있었다. `pg_catalog`와 `public`이라는 이름은 PostgreSQL 계열을 떠올리게 하지만, 여기서는 실제로 반환된 테이블 이름만 확인했다. 이어서 `public.users_ntqhfo`의 열을 살펴봤다.

#### 6. 계정 테이블의 열 확인

`information_schema.columns`에서 `users_ntqhfo`의 열 이름과 자료형을 조회했다.

~~~sql fragment
' UNION SELECT column_name, data_type
FROM information_schema.columns
WHERE table_schema = 'public'
  AND table_name = 'users_ntqhfo' --
~~~

화면에는 `email`, `password_zdayfw`, `username_hxfyzh`가 표시됐다. 세 열의 자료형은 모두 `character varying`이었다.

![users_ntqhfo 열 목록](https://raw.githubusercontent.com/ddomology/portswigger-lab-notes/main/content/labs/sql-injection/images/lab-listing-database-contents-non-oracle/01-columns.png)

이름으로 보면 `username_hxfyzh`와 `password_zdayfw`에 필요한 값이 들어 있을 가능성이 높았다. 실제 내용을 확인하려고 두 열을 `UNION SELECT`의 출력 위치에 넣었다.

#### 7. 계정 행 출력

확인한 열 이름으로 계정 행을 조회했다.

~~~sql fragment
' UNION SELECT username_hxfyzh, password_zdayfw FROM public.users_ntqhfo --
~~~

화면에 `administrator`, `wiener`, `carlos`의 사용자 이름과 각 비밀번호가 두 열로 표시됐다. 실제 값은 이 실습 인스턴스의 화면 캡처에 남겼다.

![계정 조회 결과](https://raw.githubusercontent.com/ddomology/portswigger-lab-notes/main/content/labs/sql-injection/images/lab-listing-database-contents-non-oracle/02-accounts.png)

이 행들을 보고 `users_ntqhfo`가 찾던 계정 테이블이라는 것을 확인했다. 이제 화면에 나온 `administrator` 계정 정보로 로그인할 수 있었다.

## 최종 결과

`administrator` 계정으로 로그인에 성공했고, 랩이 **Solved**로 표시됐다.

## 배운 점

계정 테이블 이름을 몰라도 메타데이터에서 테이블과 열을 차례로 조회하니 찾을 수 있었다. 계정 행을 화면에 표시한 뒤에는 `administrator`로 로그인해야 랩이 끝났다.

## 관련 개념
<!-- 필요한 개념 노트 링크를 목록으로 추가 -->
