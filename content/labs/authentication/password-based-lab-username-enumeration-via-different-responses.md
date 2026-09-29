---
title: "Username enumeration via different responses"
tags:
  - portswigger
  - authentication
lab_url: "https://portswigger.net/web-security/authentication/password-based/lab-username-enumeration-via-different-responses"
difficulty: Apprentice
note_kind: problem
---

# Username enumeration via different responses

## 문제 조건

로그인 기능에서 사용자 이름 존재 여부에 따라 응답이 달라지고 비밀번호 무차별 대입에도 취약하다. 공식 문제에는 사용자 이름·비밀번호 후보 목록이 제공된다.

## 완료 조건

유효한 사용자 이름을 찾고 비밀번호를 알아내 그 계정 페이지에 접속한다.

## 문제 설명

로그인 실패 응답의 차이가 계정 존재 여부를 드러내는지 살펴본다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/authentication/password-based/lab-username-enumeration-via-different-responses)
