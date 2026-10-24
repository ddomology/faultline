---
title: SQL 기초와 SQL 인젝션이 생기는 원리
category: sql-injection
category_title: SQL 인젝션
tags: [SQL, 데이터베이스, SQL 인젝션, 매개변수화 쿼리]
note_kind: note
---

# SQL 기초와 SQL 인젝션이 생기는 원리

SQL 인젝션(SQL injection, SQLi)을 이해하려면 복잡한 공격 문자열보다 먼저 **SQL이 무엇을 조회하는지**, **웹의 입력값이 어디에 들어가는지**, **그 값이 언제 SQL 문법으로 해석되는지**를 보면 된다. 이 글에서는 상품 목록을 조회하는 작은 예제로 그 경계를 따라간다.

## 먼저 알아둘 SQL

관계형 데이터베이스의 *테이블*은 열(column)과 행(row)으로 이루어진다. 예를 들어 `products` 테이블에 다음 데이터가 있다고 하자. 여기서 `released`의 `1`은 공개된 상품, `0`은 아직 공개하지 않은 상품을 뜻한다.

| id | name | category | released |
| ---: | --- | --- | ---: |
| 1 | 머그컵 | Gifts | 1 |
| 2 | 미공개 엽서 | Gifts | 0 |
| 3 | 개발 서적 | Books | 1 |

다음 SQL은 `Gifts` 카테고리의 공개된 상품을 조회한다.

```sql
SELECT id, name
FROM products
WHERE category = 'Gifts' AND released = 1;
```

- `FROM products`: 조회할 테이블을 정한다.
- `WHERE category = 'Gifts' AND released = 1`: **두 조건을 모두** 만족하는 행만 남긴다. 작은따옴표로 감싼 `'Gifts'`는 문자열 값이다.
- `SELECT id, name`: 남은 행에서 보여 줄 열을 고른다.

따라서 결과는 `id=1`인 머그컵 한 행이다. `id=2`는 공개 조건에서, `id=3`은 카테고리 조건에서 제외된다. 이 예제의 `WHERE`는 각 행에 대해 참인지 판단하는 필터라고 생각하면 된다. 실제 데이터베이스의 내부 실행 순서까지 이 설명과 같다는 뜻은 아니다.

## 웹 입력은 어떻게 쿼리에 들어갈까

사용자가 `/filter?category=Gifts`를 요청하면 서버는 `category` 값을 읽어 상품 조회에 사용할 수 있다. 검색어, 폼 필드, 쿠키, JSON 본문의 값도 같은 방식으로 데이터베이스 쿼리에 영향을 줄 수 있다. **입력이 어디서 왔느냐보다, 서버가 그 값을 SQL에 어떻게 넣느냐가 중요하다.**

아래 Python 예시는 `category`를 SQL 문자열에 직접 이어 붙인다. 설명을 위한 코드이며 `connection`은 SQLite 연결이라고 가정한다.

```python
sql = (
    "SELECT id, name FROM products "
    f"WHERE category = '{category}' AND released = 1"
)
rows = connection.execute(sql).fetchall()
```

`category`가 `Gifts`라면 처음 본 쿼리와 같은 뜻이 된다. 하지만 서버는 **완성된 SQL 문자열 전체**를 데이터베이스에 넘긴다. 데이터베이스는 어느 부분이 개발자가 작성한 문법이고 어느 부분이 사용자 입력이었는지 알 수 없다.

## SQL 인젝션은 어느 순간에 생길까

학습용 예시로 입력값을 `Gifts' OR 1=1 -- `로 바꿔 보자. 작은따옴표가 원래 문자열을 끝내고, `OR 1=1`은 항상 참인 조건을 추가한다. 이 예제에서 `-- ` 뒤는 주석이 되어 원래의 `AND released = 1` 조건이 쿼리에 적용되지 않는다.

```sql
SELECT id, name
FROM products
WHERE category = 'Gifts' OR 1=1 -- ' AND released = 1;
```

이제 `WHERE` 조건이 모든 행에서 참이므로 미공개 엽서와 다른 카테고리의 개발 서적까지 결과에 포함된다. **입력값이 데이터로 남지 않고 SQL의 조건과 주석을 바꾸는 문법으로 해석된 것**이 SQL 인젝션의 핵심이다. 주석·따옴표 문법과 실제 결과는 DBMS 및 원래 쿼리의 구조에 따라 달라진다. 이 예시는 위의 간단한 SQLite 쿼리를 설명하기 위한 것이다.

취약점은 특정 단어를 입력했다는 사실만으로 생기지 않는다. **신뢰할 수 없는 값을 SQL 문자열에 결합한 뒤, 그 전체를 다시 SQL로 해석하게 만드는 코드**에서 생긴다. 반대로 작은따옴표가 입력에 들어가도 값으로만 처리된다면 쿼리 구조는 바뀌지 않는다.

## 구조와 값을 분리하면

SQLite의 자리표시자 `?`를 사용해 SQL 구조를 먼저 정하고 값을 별도로 전달할 수 있다.

```python
rows = connection.execute(
    "SELECT id, name FROM products "
    "WHERE category = ? AND released = ?",
    (category, 1),
).fetchall()
```

이때 `category`가 `Gifts' OR 1=1 -- `여도 데이터베이스는 그 **전체를 하나의 카테고리 값**으로 취급한다. 그런 이름의 카테고리가 없다면 결과가 없을 뿐, `WHERE` 조건이 새로 만들어지지 않는다. 자리표시자의 표기와 호출 방법은 언어·드라이버마다 다르다. 테이블명이나 열 이름처럼 값이 아닌 SQL 구성 요소를 동적으로 고를 때는 허용된 이름에 매핑하는 설계가 필요하다.

## 기억할 경계

1. SQL의 `WHERE`는 결과에 남길 행을 결정한다.
2. 사용자 입력을 SQL 문자열에 직접 결합하면 입력의 따옴표·연산자·주석이 **문법**이 될 수 있다.
3. 매개변수화 쿼리는 SQL **구조**와 입력 **값**을 분리한다. 입력 필터나 특수문자 차단만으로 이 분리를 대신할 수 없다.

다음 질문에 답할 수 있다면 원리를 이해한 것이다. `released = 1`이 왜 사라졌는가? 같은 입력을 매개변수로 전달하면 왜 모든 상품이 조회되지 않는가? 검색어가 쿠키에서 왔다면 위험을 판단하는 기준이 달라지는가?

## 연결해서 읽기

- [WHERE 조건을 바꿔 숨겨진 상품을 조회한 실습](../labs/sql-injection/lab-retrieve-hidden-data.md)
- [로그인 조건을 바꾼 실습](../labs/sql-injection/lab-login-bypass.md)

## 참고 자료

- [PortSwigger Web Security Academy — SQL injection](https://portswigger.net/web-security/sql-injection)
- [OWASP — SQL Injection Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html)
- [SQLite — SELECT 문과 WHERE 절](https://www.sqlite.org/lang_select.html)
- [SQLite — 준비된 문장에 값 바인딩하기](https://www.sqlite.org/c3ref/bind_blob.html)

