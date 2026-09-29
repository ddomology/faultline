---
title: "Blind SQL injection with out-of-band data exfiltration"
tags:
  - portswigger
  - sql-injection
lab_url: "https://portswigger.net/web-security/sql-injection/blind/lab-out-of-band-data-exfiltration"
difficulty: Practitioner
note_kind: problem
---

# Blind SQL injection with out-of-band data exfiltration

## 문제 조건과 설명

**주어진 조건**

추적 쿠키가 비동기 SQL 조회에 사용되어 응답에는 결과가 나타나지 않는다. 외부 상호작용이 가능하고 `users(username, password)` 테이블이 있다. 실습 방화벽 때문에 기본 공개 Burp Collaborator 서버를 사용해야 한다.

**완료 조건**

외부 통신을 이용해 `administrator` 비밀번호를 알아내고 해당 계정으로 로그인한다.

**문제 설명**

응답 본문 대신 별도의 네트워크 경로를 통해 정보를 확인하는 문제다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/sql-injection/blind/lab-out-of-band-data-exfiltration)

## 탐색 및 풀이 기록

아직 작성하지 않았다. 직접 확인한 요청·응답, 시도한 이유와 결과를 이 파일에 이어서 기록한다.
