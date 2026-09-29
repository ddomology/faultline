---
title: "SQL injection with filter bypass via XML encoding"
tags:
  - portswigger
  - sql-injection
lab_url: "https://portswigger.net/web-security/sql-injection/lab-sql-injection-with-filter-bypass-via-xml-encoding"
difficulty: Practitioner
note_kind: problem
---

# SQL injection with filter bypass via XML encoding

## 문제 조건과 설명

**주어진 조건**

재고 확인 기능에 SQL 삽입 취약점이 있고, 조회 결과가 응답에 표시된다. `users` 테이블에 등록 사용자의 이름과 비밀번호가 있다.

**완료 조건**

관리자 계정의 인증 정보를 조회해 그 계정으로 로그인한다.

**문제 설명**

재고 조회 결과에 다른 테이블의 데이터를 합칠 수 있다. 문제 제목은 XML 인코딩을 통한 필터 우회를 다룬다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/sql-injection/lab-sql-injection-with-filter-bypass-via-xml-encoding)

## 탐색 및 풀이 기록

아직 작성하지 않았다. 직접 확인한 요청·응답, 시도한 이유와 결과를 이 파일에 이어서 기록한다.
