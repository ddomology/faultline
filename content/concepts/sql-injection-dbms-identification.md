---
title: SQL 인젝션에서 DB 종류 알아내기
category: sql-injection
category_title: SQL 인젝션
tags: [SQL, SQL 인젝션, 데이터베이스]
note_kind: note
---

# SQL 인젝션에서 DB 종류 알아내기

여기서 **DB 종류**는 `shop` 같은 데이터베이스 이름이 아니라 SQLite·MySQL·MariaDB·PostgreSQL·Oracle·SQL Server 중 어떤 DBMS가 쿼리를 실행하는지를 뜻한다. 종류를 알아야 그 DBMS에 맞는 문법과 테이블 목록을 사용할 수 있다.

## 1. 오류에서 후보 좁히기

`ORA-`처럼 DBMS를 드러내는 오류 문구가 있으면 후보를 좁힌다. 앱이 오류를 숨기거나 다른 문구로 바꿀 수 있으므로, 메시지만으로 확정하지 않는다.

## 2. 버전 정보 표시하기

아래 예시는 상품 검색의 `category`에 입력하며, 원래 조회가 두 열을 반환하고 첫째 열이 화면에 보인다고 가정한다.

```sql fragment
Gifts' UNION SELECT sqlite_version(), NULL-- -
```

첫째 칸에 SQLite 버전이 나타나면 SQLite라는 강한 단서다. 같은 자리에 다른 DBMS의 버전 조회식을 넣어 확인할 수 있다. 표의 `SELECT` 앞에는 `Gifts' UNION `, 뒤에는 `-- -`를 붙인다.

| 후보 | 시험할 `SELECT` | 확인할 결과 |
| --- | --- | --- |
| SQLite | `SELECT sqlite_version(), NULL` | SQLite 버전 번호 |
| PostgreSQL | `SELECT version(), NULL` | `PostgreSQL`이 포함된 문자열 |
| MySQL·MariaDB | `SELECT @@version, NULL` | MySQL 계열 버전 문자열 |
| SQL Server | `SELECT @@VERSION, NULL` | `Microsoft SQL Server`가 포함된 문자열 |
| Oracle | `SELECT banner, NULL FROM v$version` | `Oracle Database`가 포함된 문자열 |

## 3. 겹치는 문법 교차 확인하기

`version()`은 PostgreSQL과 MySQL에서, `@@version`은 MySQL 계열과 SQL Server에서 모두 통한다. 따라서 **쿼리가 성공했다는 사실보다 반환된 문자열**이 중요하다. `@@version`이 숫자만 보여 MySQL 계열인지 헷갈린다면 `SELECT DATABASE(), NULL`을 시험할 수 있다. 이 함수는 MySQL에서 현재 데이터베이스 이름을 반환한다.

한 번의 실패로 다른 DBMS라고 단정할 수는 없다. 예를 들어 Oracle의 `v$version` 조회는 권한 때문에 막힐 수 있다. 그때는 `SELECT SYS_CONTEXT('USERENV', 'DB_NAME'), NULL FROM DUAL`처럼 다른 Oracle 함수를 시험한다. 이 결과는 버전이 아니라 데이터베이스 이름이다. 또한 `FROM DUAL`만 성공한 것은 Oracle의 증거가 아니다. MySQL도 `DUAL`을 허용한다.

DBMS를 좁힌 다음에는 [UNION으로 테이블과 열 찾기](sql-injection-union-workflow.html)에서 해당 DBMS의 목록 조회 방법을 고르면 된다.

## 참고

- [PortSwigger — SQL injection cheat sheet](https://portswigger.net/web-security/sql-injection/cheat-sheet)
- [SQLite — Built-In Scalar SQL Functions](https://www.sqlite.org/lang_corefunc.html#sqlite_version)
- [PostgreSQL — System Information Functions](https://www.postgresql.org/docs/current/functions-info.html)
- [MySQL — Information Functions](https://dev.mysql.com/doc/refman/8.4/en/information-functions.html), [SELECT Statement](https://dev.mysql.com/doc/refman/8.4/en/select.html)
- [Microsoft — @@VERSION](https://learn.microsoft.com/en-us/sql/t-sql/functions/version-transact-sql-configuration-functions?view=sql-server-ver17)
- [Oracle — V$VERSION](https://docs.oracle.com/en/database/oracle/oracle-database/19/refrn/V-VERSION.html), [SYS_CONTEXT](https://docs.oracle.com/en/database/oracle/oracle-database/26/sqlrf/SYS_CONTEXT.html)
