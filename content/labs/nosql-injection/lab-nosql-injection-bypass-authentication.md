---
title: "Exploiting NoSQL operator injection to bypass authentication"
tags:
  - portswigger
  - nosql-injection
lab_url: "https://portswigger.net/web-security/nosql-injection/lab-nosql-injection-bypass-authentication"
difficulty: Apprentice
note_kind: problem
---

# Exploiting NoSQL operator injection to bypass authentication

## 문제 조건과 설명

**주어진 조건**

로그인 기능이 MongoDB를 사용하며, MongoDB 연산자를 이용한 NoSQL 주입에 취약하다. 자신의 계정 `wiener:peter`로 정상 로그인 흐름을 확인할 수 있다.

**완료 조건**

`administrator` 사용자로 애플리케이션에 로그인한다. 다른 계정의 세션을 얻거나 로그인 오류가 사라지는 것만으로는 완료되지 않는다.

**문제 설명과 판단 기준**

먼저 정상 로그인과 잘못된 비밀번호의 요청·응답을 비교해 사용자명과 비밀번호가 어떤 형식으로 전달되는지 확인한다. 입력이 단순 문자열로 다뤄지는지, 데이터베이스 연산자로 해석될 수 있는 구조를 서버가 받아들이는지 시험한다. 인증 조건이 느슨해져도 어느 사용자가 선택되는지 확인해야 관리자 계정 우회라고 판단할 수 있다.

우회 입력의 처리 결과와 로그인 후 표시되는 계정·권한을 아래에 기록한다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/nosql-injection/lab-nosql-injection-bypass-authentication)

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
