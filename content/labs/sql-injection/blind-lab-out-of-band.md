---
title: "Blind SQL injection with out-of-band interaction"
tags:
  - portswigger
  - sql-injection
lab_url: "https://portswigger.net/web-security/sql-injection/blind/lab-out-of-band"
difficulty: Practitioner
note_kind: problem
---

# Blind SQL injection with out-of-band interaction

## 문제 조건과 설명

**주어진 조건**

추적 쿠키가 비동기 SQL 조회에 사용되어 조회 결과가 응답에 영향을 주지 않는다. 외부 도메인과의 상호작용은 가능하지만 실습 방화벽은 임의의 외부 시스템을 차단한다.

**완료 조건**

SQL 삽입으로 Burp Collaborator의 DNS 조회를 발생시킨다. 기본 공개 Burp Collaborator 서버를 사용해야 한다.

**문제 설명**

응답에 변화가 없는 대신 별도 네트워크 상호작용으로 실행 여부를 확인하는 유형이다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/sql-injection/blind/lab-out-of-band)

## 탐색 및 풀이 기록

아직 작성하지 않았다. 직접 확인한 요청·응답, 시도한 이유와 결과를 이 파일에 이어서 기록한다.
