---
title: "Blind SQL injection with time delays and information retrieval"
tags:
  - portswigger
  - sql-injection
lab_url: "https://portswigger.net/web-security/sql-injection/blind/lab-time-delays-info-retrieval"
difficulty: Practitioner
note_kind: problem
---

# Blind SQL injection with time delays and information retrieval

## 문제 조건과 설명

**주어진 조건**

추적 쿠키가 SQL 조회에 들어가며 결과·행 반환 여부·오류가 응답에 드러나지 않는다. 조회는 동기식이고 `users(username, password)` 테이블이 있다.

**완료 조건**

시간 지연을 관찰해 `administrator` 비밀번호를 알아내고 로그인한다.

**문제 설명**

정보를 직접 읽을 수 없는 대신 조건에 따른 처리 시간으로 정보를 추론하는 문제다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/sql-injection/blind/lab-time-delays-info-retrieval)

## 탐색 및 풀이 기록

아직 작성하지 않았다. 직접 확인한 요청·응답, 시도한 이유와 결과를 이 파일에 이어서 기록한다.
