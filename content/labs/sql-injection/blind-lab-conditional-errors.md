---
title: "Blind SQL injection with conditional errors"
tags:
  - portswigger
  - sql-injection
lab_url: "https://portswigger.net/web-security/sql-injection/blind/lab-conditional-errors"
difficulty: Practitioner
note_kind: problem
---

# Blind SQL injection with conditional errors

## 문제 조건과 설명

**주어진 조건**

추적 쿠키가 SQL 조회에 사용된다. 결과는 보이지 않고 행 반환 여부로 응답도 달라지지 않지만, SQL 오류가 나면 사용자 지정 오류 메시지가 나온다. `users(username, password)` 테이블이 있다.

**완료 조건**

`administrator` 비밀번호를 알아내 로그인한다.

**문제 설명**

정상 조회의 내용은 감춰져 있으므로 오류 응답이 관찰 가능한 차이다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/sql-injection/blind/lab-conditional-errors)

## 탐색 및 풀이 기록

아직 작성하지 않았다. 직접 확인한 요청·응답, 시도한 이유와 결과를 이 파일에 이어서 기록한다.
