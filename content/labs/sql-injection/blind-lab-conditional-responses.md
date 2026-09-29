---
title: "Blind SQL injection with conditional responses"
tags:
  - portswigger
  - sql-injection
lab_url: "https://portswigger.net/web-security/sql-injection/blind/lab-conditional-responses"
difficulty: Practitioner
note_kind: problem
---

# Blind SQL injection with conditional responses

## 문제 조건과 설명

**주어진 조건**

분석용 추적 쿠키 값이 SQL 조회에 들어가지만 결과나 오류는 표시되지 않는다. 조회가 행을 반환하면 페이지에 `Welcome back` 메시지가 나온다. `users(username, password)` 테이블이 있다.

**완료 조건**

`administrator`의 비밀번호를 알아내 해당 계정으로 로그인한다.

**문제 설명**

조회 결과 대신 `Welcome back` 메시지 유무가 조건의 참·거짓을 구별하는 관찰 신호다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/sql-injection/blind/lab-conditional-responses)

## 탐색 및 풀이 기록

아직 작성하지 않았다. 직접 확인한 요청·응답, 시도한 이유와 결과를 이 파일에 이어서 기록한다.
