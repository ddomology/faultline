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

## 문제 조건과 설명

**주어진 조건**

로그인 기능이 GraphQL API를 사용한다. 같은 출처에서 짧은 시간에 요청을 많이 보내면 오류를 반환하는 요청 제한이 있다. 실습에서 제공하는 인증 비밀번호 목록을 후보로 사용한다.

**완료 조건**

요청 제한을 넘는 방식으로 `carlos`의 비밀번호를 찾아 해당 계정으로 로그인한다. GraphQL 요청이 성공적으로 접수됐다는 사실과 로그인 성공은 구분해야 한다.

**문제 설명과 판단 기준**

정상 로그인 요청의 GraphQL 연산, 변수, 실패 응답을 기준으로 잡는다. 이어 제한 오류가 요청 횟수와 출처에 어떻게 연결되는지 관찰하고, 후보 비밀번호 시도가 실제 인증 판정까지 도달하는지 확인한다. 오류 없이 반환된 응답이라도 인증 실패일 수 있으므로 성공 신호는 세션 또는 로그인 후 화면으로 검증한다.

제한이 걸린 조건, 우회 후 처리된 요청, 최종 로그인 결과를 아래에 구분해 기록한다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/graphql/lab-graphql-brute-force-protection-bypass)

## 탐색 및 풀이 기록

### 초기 관찰
<!-- 직접 확인한 내용과 아직 확인하지 못한 점 -->

### 실행 과정
<!-- 무엇을 왜 했는지 → 실제 결과 → 해석 -->
<!-- 필요할 때 코드·요청·응답·스크린샷 첨부 -->

## 최종 결과
<!-- 완료 여부와 확인 근거 -->

## 배운 점
<!-- 새로 알게 된 내용, 잘못 생각했던 부분 -->
