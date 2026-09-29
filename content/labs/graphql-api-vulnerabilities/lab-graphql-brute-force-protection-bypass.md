---
title: "Bypassing GraphQL brute force protections"
tags:
  - portswigger
  - graphql-api-vulnerabilities
lab_url: "https://portswigger.net/web-security/graphql/lab-graphql-brute-force-protection-bypass"
difficulty: Practitioner
note_kind: problem
---

# Bypassing GraphQL brute force protections

## 문제 조건

로그인에 GraphQL API를 사용하며, 같은 출처에서 짧은 시간 안에 많은 요청이 오면 오류를 반환하는 요청 제한이 있다.

## 완료 조건

인증 실습의 비밀번호 목록을 사용해 carlos의 비밀번호를 무차별 대입하고 로그인한다.

## 문제 설명

GraphQL 요청 단위와 로그인 시도 제한이 어떻게 맞물리는지 살피는 문제다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/graphql/lab-graphql-brute-force-protection-bypass)
