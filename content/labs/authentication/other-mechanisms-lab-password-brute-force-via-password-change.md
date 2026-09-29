---
title: "Password brute-force via password change"
tags:
  - portswigger
  - authentication
lab_url: "https://portswigger.net/web-security/authentication/other-mechanisms/lab-password-brute-force-via-password-change"
difficulty: Practitioner
note_kind: problem
---

# Password brute-force via password change

## 문제 조건

비밀번호 변경 기능을 통한 무차별 대입이 가능하다. 자신의 계정은 `wiener:peter`, 피해자 이름은 `carlos`이며 비밀번호 후보 목록이 제공된다.

## 완료 조건

Carlos의 비밀번호를 찾아 그의 `My account` 페이지에 접근한다.

## 문제 설명

변경 화면의 확인 동작이 비밀번호 검증 정보로 이용되는지 살펴본다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/authentication/other-mechanisms/lab-password-brute-force-via-password-change)
