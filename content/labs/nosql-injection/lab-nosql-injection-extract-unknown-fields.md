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

## 문제 조건과 설명

**주어진 조건**

MongoDB 기반 사용자 조회 기능이 NoSQL 주입에 취약하다. 문제 제목은 필요한 데이터의 필드 이름을 처음부터 알 수 없다는 점을 드러낸다. 조회 가능한 문서의 구조와 인증에 필요한 값은 직접 알아내야 한다.

**완료 조건**

`carlos` 사용자로 로그인한다. 필드 이름을 발견하거나 관련 값을 일부 얻는 단계만으로는 완료되지 않는다.

**문제 설명과 판단 기준**

먼저 사용자 조회에서 연산자 형태의 입력이 어떤 응답 차이를 만드는지 확인한다. 예상한 필드명이 응답이나 조건 평가에 쓰이지 않는다면, 관찰 가능한 차이로 후보 필드의 존재부터 좁혀야 한다. 필드 이름을 식별한 뒤에도 그 값이 로그인에 필요한 정보인지 별도로 확인해야 탐색이 산만해지지 않는다.

필드 존재를 판단한 근거, 필요한 값의 확인 과정, `carlos` 로그인 결과를 아래에 기록한다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/nosql-injection/lab-nosql-injection-extract-unknown-fields)

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
