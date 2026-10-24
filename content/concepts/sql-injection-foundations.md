---
title: SQL 기초와 SQL 인젝션이 생기는 원리
category: sql-injection
category_title: SQL 인젝션
tags: [SQL, 데이터베이스, SQL 인젝션, 매개변수화 쿼리]
note_kind: note
---

# SQL 기초와 SQL 인젝션이 생기는 원리

## SQL 한 문장 읽기

다음 쿼리는 `products` 테이블에서 카테고리가 `Gifts`이고 공개 상태인 상품의 `id`, `name`을 가져온다.

```sql
SELECT id, name
FROM products
WHERE category = 'Gifts' AND released = 1;
```

`SELECT`는 가져올 열, `FROM`은 테이블, `WHERE`는 행을 고르는 조건이다. `AND`로 묶인 두 조건이 모두 참인 상품만 결과에 남는다.

## 입력이 SQL 문법이 되는 경우

서버가 사용자가 보낸 `category`를 SQL 문자열에 직접 끼워 넣는다고 하자.

```python
sql = (
    "SELECT id, name FROM products "
    f"WHERE category = '{category}' AND released = 1"
)
rows = connection.execute(sql).fetchall()
```

`category`가 `Gifts' OR 1=1 -- `이면 실행되는 SQL은 이렇게 바뀐다.

```sql
SELECT id, name
FROM products
WHERE category = 'Gifts' OR 1=1 -- ' AND released = 1;
```

입력의 `'`가 문자열을 끝내고, `OR 1=1`이 항상 참인 조건을 만든다. `--` 뒤의 `AND released = 1`은 주석이 되어 적용되지 않는다. 그래서 원래는 제외해야 할 상품까지 조회된다. **입력값이 SQL의 값 자리를 벗어나 조건식을 바꾼 것**이 SQL 인젝션이다.

## 값을 값으로만 전달하기

자리표시자 `?`에 값을 따로 전달하면 입력은 SQL 문법으로 해석되지 않는다.

```python
rows = connection.execute(
    "SELECT id, name FROM products WHERE category = ? AND released = 1",
    (category,),
).fetchall()
```

같은 입력을 넣어도 데이터베이스는 `Gifts' OR 1=1 -- ` 전체를 카테고리 이름으로 찾는다. 그런 카테고리가 없다면 결과는 0건이고, `WHERE` 조건은 그대로다.

## 참고

- [OWASP — SQL Injection Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html)
- [SQLite — 값 바인딩](https://www.sqlite.org/c3ref/bind_blob.html)

