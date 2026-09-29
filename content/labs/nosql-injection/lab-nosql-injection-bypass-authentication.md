---
title: "Exploiting NoSQL operator injection to bypass authentication"
tags:
  - portswigger
  - nosql-injection
lab_url: "https://portswigger.net/web-security/nosql-injection/lab-nosql-injection-bypass-authentication"
difficulty: Apprentice
note_kind: problem
---

# Exploiting NoSQL operator injection to bypass authentication

## 문제 조건

로그인 기능이 MongoDB를 사용하며 MongoDB 연산자를 통한 NoSQL 삽입에 취약하다. 개인 계정은 wiener:peter로 로그인한다.

## 완료 조건

administrator 사용자로 로그인한다.

## 문제 설명

로그인 조건에 삽입된 연산자가 사용자 확인 결과를 바꿀 수 있는지 살피는 문제다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/nosql-injection/lab-nosql-injection-bypass-authentication)
