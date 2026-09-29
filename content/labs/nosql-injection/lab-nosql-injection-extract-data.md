---
title: "Exploiting NoSQL injection to extract data"
tags:
  - portswigger
  - nosql-injection
lab_url: "https://portswigger.net/web-security/nosql-injection/lab-nosql-injection-extract-data"
difficulty: Practitioner
note_kind: problem
---

# Exploiting NoSQL injection to extract data

## 문제 조건

MongoDB를 쓰는 사용자 조회 기능이 NoSQL 삽입에 취약하다. 개인 계정은 wiener:peter로 로그인한다.

## 완료 조건

administrator의 비밀번호를 추출한 뒤 해당 계정에 로그인한다.

## 문제 설명

조회 응답의 차이로 저장된 자격 증명 값을 알아낼 수 있는지 확인하는 문제다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/nosql-injection/lab-nosql-injection-extract-data)
