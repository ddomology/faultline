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

## 문제 조건과 설명

**주어진 조건**

사용자 관리 기능이 GraphQL 엔드포인트를 사용하고, 이 엔드포인트는 `application/x-www-form-urlencoded` 요청도 받아 CSRF에 노출된다. 자신의 계정 `wiener:peter`와 exploit server가 제공된다.

**완료 조건**

방문자의 이메일 주소를 바꾸는 CSRF HTML을 작성해 exploit server에 업로드한다. 자신의 계정에서 이메일 변경 요청이 성공하는 것만으로는 피해자 대상 공격의 완료를 뜻하지 않는다.

**문제 설명과 판단 기준**

자신의 계정으로 이메일 변경 때 보내는 GraphQL 연산과 필요한 입력을 먼저 확인한다. 같은 동작을 브라우저가 다른 출처의 HTML에서 전송할 수 있는 형식으로 표현했을 때, 엔드포인트가 이를 수락하는지 비교한다. 요청 본문이 유효하더라도 피해자의 인증 상태에서 실행되지 않으면 CSRF 목표에 도달하지 못한다.

HTML 업로드와 피해자 전달 후 이메일 변경 여부를 확인한다. 요청 형식, 서버 응답, 최종 상태를 아래에 기록한다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/graphql/lab-graphql-csrf-via-graphql-api)

## 탐색 및 풀이 기록

아직 작성하지 않았다. 직접 확인한 요청·응답, 시도한 이유와 결과를 이 파일에 이어서 기록한다.
