---
title: "Detecting NoSQL injection"
tags:
  - portswigger
  - nosql-injection
lab_url: "https://portswigger.net/web-security/nosql-injection/lab-nosql-injection-detection"
difficulty: Apprentice
note_kind: problem
---

# Detecting NoSQL injection

## 문제 조건과 설명

**주어진 조건**

상품 카테고리 필터가 MongoDB 기반 NoSQL 데이터베이스에 질의하며 주입에 취약하다. 평소에는 출시된 상품만 보이므로, 필터 입력이 데이터베이스의 조회 조건을 바꿀 수 있는지가 핵심이다.

**완료 조건**

NoSQL 주입으로 출시되지 않은 상품을 화면에 표시한다. 오류나 검색 결과 수 변화만으로는 목표 상품이 노출됐다고 판단할 수 없다.

**문제 설명과 판단 기준**

정상 카테고리별 상품 목록을 기준으로 잡고 입력의 따옴표·논리 조건처럼 쿼리 해석에 영향을 줄 수 있는 변화가 응답에 미치는 영향을 비교한다. 응답 차이가 단순히 유효하지 않은 카테고리 때문인지, 원래 조회 조건이 달라진 결과인지 구분해야 한다. 상품의 출시 상태를 확인할 수 있는 근거까지 확보하면 주입의 효과를 설명할 수 있다.

기준 요청, 바꾼 입력, 새로 표시된 미출시 상품과 화면 결과를 아래에 기록한다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/nosql-injection/lab-nosql-injection-detection)

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

## 관련 개념
<!-- 필요한 개념 노트 링크를 목록으로 추가 -->
