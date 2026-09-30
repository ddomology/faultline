---
title: "SQL injection attack, listing the database contents on Oracle"
tags:
  - portswigger
  - sql-injection
lab_url: "https://portswigger.net/web-security/sql-injection/examining-the-database/lab-listing-database-contents-oracle"
difficulty: Practitioner
note_kind: problem
---

# SQL injection attack, listing the database contents on Oracle

## 문제 조건과 설명

공식 설명에 따르면 상품 카테고리 필터에 SQL injection 취약점이 있고, 조회 결과가 페이지 응답에 표시된다. 따라서 상품 조회에 `UNION`으로 다른 조회를 합쳐 그 결과를 읽을 수 있다. 애플리케이션에는 로그인 기능이 있으며, 데이터베이스 어딘가에 사용자 이름과 비밀번호를 담은 테이블이 있다.

**주어진 사실과 찾아야 할 값**

| 구분 | 내용 |
| --- | --- |
| 주어진 사실 | 계정 정보를 저장한 테이블이 존재하고, 카테고리 필터의 조회 결과가 화면에 보인다. |
| 찾아야 할 구조 | 계정 테이블의 실제 이름, 그 테이블을 구분할 소유자 정보, 사용자 이름·비밀번호가 담긴 열의 이름. |
| 찾아야 할 데이터 | 계정 행에 저장된 사용자 이름과 비밀번호. |

제목은 Oracle 데이터베이스를 대상으로 한다는 단서를 주지만, 이전 실습에서 보았던 테이블명이나 열 이름이 이 인스턴스에도 같다는 뜻은 아니다. 특히 문제 설명은 계정 테이블의 이름을 `users`라고 알려 주지 않는다. 테이블과 열을 찾는 과정 자체가 이 문제의 일부다.

**완료 기준과 탐색의 순서**

**완료 조건은 모든 사용자의 이름과 비밀번호를 조회한 뒤 `administrator`로 로그인하는 것**이다. 계정 테이블 후보를 찾거나 관리자 행을 화면에 출력한 것만으로는 로그인 목표를 달성했다고 볼 수 없다.

우선 원래 상품 조회의 반환 열 수와 문자열이 실제로 보이는 열을 확인해야 한다. 그다음 Oracle에서 현재 조회할 수 있는 객체 목록을 살펴 계정 테이블 후보를 좁히고, 후보의 열을 확인한 다음 계정 행을 출력하는 순서가 타당하다. 후보가 여러 개면 이름만 보고 결정하지 말고, 열 구성과 반환 데이터로 판별해야 한다. 아래 풀이 영역에는 이 순서에서 **직접 관찰한 요청과 응답**만 기록한다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/sql-injection/examining-the-database/lab-listing-database-contents-oracle)

## 탐색 및 풀이 기록

<!-- 아직 이 실습의 요청·응답을 직접 기록하지 않았다. 위 탐색 순서는 문제 조건에서 세운 계획이며, 성공한 쿼리나 테이블 이름을 확인한 결과가 아니다. -->

### 초기 관찰
<!-- 직접 확인한 내용과 아직 확인하지 못한 점 -->

### 실행 과정
<!-- 무엇을 왜 했는지 → 실제 결과 → 해석 -->
<!-- 필요할 때 코드·요청·응답·스크린샷 첨부 -->

## 최종 결과
<!-- 완료 여부와 확인 근거 -->

## 배운 점
<!-- 새로 알게 된 내용, 잘못 생각했던 부분 -->
