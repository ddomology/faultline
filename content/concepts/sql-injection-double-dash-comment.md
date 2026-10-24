---
title: SQL 인젝션에서 -- -를 쓰는 이유
category: sql-injection
category_title: SQL 인젝션
tags: [SQL, SQL 인젝션]
note_kind: note
---

# `-- -`의 마지막 하이픈은 왜 있을까?

MySQL에서 `--` 뒤에 공백이 오면 그 줄의 나머지가 주석이 된다. SQL 인젝션 예시에서는 입력 뒤에 원래 쿼리가 이어 붙이는 따옴표나 조건을 무시할 때 쓴다.

```sql
SELECT name FROM products WHERE category = 'Gifts' -- -' AND released = 1;
```

위 쿼리에서 `-- -` 뒤의 `' AND released = 1`은 주석이다. 주석은 **그 줄 끝까지만** 이어진다.

MySQL은 두 번째 `-` 바로 뒤에 공백이나 제어 문자가 있어야 `--`를 주석 시작으로 인식한다. 따라서 `--x`는 주석이 아니지만 `-- x`는 주석이다.

`-- -`는 `--` + 공백 + `-`로 나눠 읽으면 된다. 마지막 `-`에는 특별한 기능이 없다. 입력이 `-- `처럼 공백으로 끝나면 전달 과정에서 그 공백이 제거될 수 있다. 뒤에 글자를 하나 더 붙이면 필요한 공백이 가운데에 남는다. 같은 이유로 `-- ^o^`도 공백이 그대로 전달된다면 주석으로 동작한다.

## 참고

- [MySQL — Comments](https://dev.mysql.com/doc/refman/8.0/en/comments.html)
- [PortSwigger — SQL injection cheat sheet](https://portswigger.net/web-security/sql-injection/cheat-sheet)

