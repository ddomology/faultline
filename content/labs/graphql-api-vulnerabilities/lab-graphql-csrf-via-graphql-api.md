---
title: "Performing CSRF exploits over GraphQL"
tags:
  - portswigger
  - graphql-api-vulnerabilities
lab_url: "https://portswigger.net/web-security/graphql/lab-graphql-csrf-via-graphql-api"
difficulty: Practitioner
note_kind: problem
---

# Performing CSRF exploits over GraphQL

## 문제 조건

사용자 관리용 GraphQL 엔드포인트가 x-www-form-urlencoded 요청을 받아 CSRF에 취약하다. 개인 계정은 wiener:peter로 로그인한다.

## 완료 조건

방문자의 이메일 주소를 바꾸는 CSRF HTML을 작성해 exploit server에 업로드한다.

## 문제 설명

GraphQL 요청도 브라우저에서 전송 가능한 형식이라면 사이트 간 요청으로 이어질 수 있는지 확인하는 문제다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/graphql/lab-graphql-csrf-via-graphql-api)
