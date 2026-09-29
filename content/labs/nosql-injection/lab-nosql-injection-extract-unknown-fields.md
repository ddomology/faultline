---
title: "Exploiting NoSQL operator injection to extract unknown fields"
tags:
  - portswigger
  - nosql-injection
lab_url: "https://portswigger.net/web-security/nosql-injection/lab-nosql-injection-extract-unknown-fields"
difficulty: Practitioner
note_kind: problem
---

# Exploiting NoSQL operator injection to extract unknown fields

## 문제 조건

MongoDB를 쓰는 사용자 조회 기능이 NoSQL 삽입에 취약하다.

## 완료 조건

carlos로 로그인한다.

## 문제 설명

필드 이름을 모르는 상태에서도 사용자 데이터의 필요한 값을 찾아낼 수 있는지 살피는 문제다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/nosql-injection/lab-nosql-injection-extract-unknown-fields)
