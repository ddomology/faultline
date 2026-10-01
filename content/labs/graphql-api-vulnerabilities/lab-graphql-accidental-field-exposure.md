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

## 문제 조건과 설명

**주어진 조건**

사용자 관리 기능이 GraphQL 엔드포인트를 사용한다. 접근 제어 결함 때문에 원래 공개되지 않아야 할 사용자 자격 증명 필드가 API 응답에 드러날 수 있다. 어느 조회와 필드에서 누출되는지는 직접 확인해야 한다.

**완료 조건**

관리자 계정으로 로그인한 뒤 `carlos` 사용자를 삭제한다. 필드 이름을 찾거나 자격 증명 값을 조회하는 단계만으로는 실습이 끝나지 않는다.

**문제 설명과 판단 기준**

먼저 사용자 관리 화면의 GraphQL 요청에서 어떤 객체와 필드가 조회되는지 관찰한다. 응답이 화면에 표시하는 정보보다 더 많은 필드를 제공하는지 살피되, 필드가 스키마에 있다는 사실과 실제로 민감한 값이 반환된다는 사실은 구분한다. 관리자와 관련된 자격 증명 값을 얻었다면 정상 로그인 절차에서 유효한지 확인해야 한다.

로그인 후 관리자 기능 접근과 `carlos` 삭제를 각각 검증한다. 필드 조회, 응답, 인증 및 삭제 결과를 아래에 기록한다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/graphql/lab-graphql-accidental-field-exposure)

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
