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

## 문제 조건과 설명

**주어진 조건**

MongoDB 기반 사용자 조회 기능에 NoSQL 주입 취약점이 있다. 자신의 계정 `wiener:peter`가 제공되며, 관리자 비밀번호는 미리 주어지지 않는다.

**완료 조건**

주입으로 `administrator`의 비밀번호를 추출한 뒤 그 값으로 관리자 계정에 로그인한다. 조회 조건이 조작된다는 사실만 확인해서는 완료되지 않는다.

**문제 설명과 판단 기준**

자신의 계정 조회를 기준으로 어떤 입력이 사용자 검색에 반영되는지 찾는다. 참·거짓 조건에 따라 응답이 일관되게 달라진다면 비밀번호에 대한 조건을 차례로 검증할 수 있다. 길이나 문자에 대한 한 번의 반응을 곧바로 정답으로 취급하지 말고, 반대 조건과 반복 요청으로 차이를 확인해야 한다.

추출 과정을 통해 얻은 값은 정상 로그인에서 검증한다. 비교한 요청·응답과 관리자 세션 결과를 아래에 기록한다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/nosql-injection/lab-nosql-injection-extract-data)

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
