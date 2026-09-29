---
title: "Accidental exposure of private GraphQL fields"
tags:
  - portswigger
  - graphql-api-vulnerabilities
lab_url: "https://portswigger.net/web-security/graphql/lab-graphql-accidental-field-exposure"
difficulty: Practitioner
note_kind: problem
---

# Accidental exposure of private GraphQL fields

## 문제 조건

사용자 관리 기능이 GraphQL 엔드포인트를 사용하며, 접근 제어 결함으로 사용자 자격 증명 필드가 노출될 수 있다.

## 완료 조건

administrator로 로그인해 carlos를 삭제한다.

## 문제 설명

GraphQL 필드별 권한 검증이 충분한지 살피는 문제다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/graphql/lab-graphql-accidental-field-exposure)
