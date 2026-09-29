---
title: "SQL injection vulnerability allowing login bypass"
tags:
  - portswigger
  - sql-injection
lab_url: "https://portswigger.net/web-security/sql-injection/lab-login-bypass"
difficulty: Apprentice
draft: false
---

# SQL injection vulnerability allowing login bypass

## 문제 조건

이 실습의 **로그인 기능에는 SQL injection 취약점**이 존재한다. 이를 이용해 애플리케이션에 `administrator` 사용자로 로그인해야 한다.

- **취약점 위치:** 로그인 기능.
- **목표 계정:** `administrator`.
- **해결 조건:** SQL injection으로 인증을 우회하여 해당 계정으로 로그인한다.
- **제공되지 않은 정보:** 실제 로그인 처리 SQL과 데이터베이스 종류는 문제 설명에 명시되어 있지 않다.

> [!info] 문제에서 주어진 정보
> 위 내용은 공식 문제 설명에서 제공한 조건이다. 직접 관찰한 요청과 응답, 시도한 입력 및 결과는 탐색 과정에 기록한다.

## 탐색 과정

## 해결 과정

## 배운 점

-

## 참고

- [PortSwigger 원본 실습](https://portswigger.net/web-security/sql-injection/lab-login-bypass)
