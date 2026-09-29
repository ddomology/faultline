---
title: "Brute-forcing a stay-logged-in cookie"
tags:
  - portswigger
  - authentication
lab_url: "https://portswigger.net/web-security/authentication/other-mechanisms/lab-brute-forcing-a-stay-logged-in-cookie"
difficulty: Practitioner
note_kind: problem
---

# Brute-forcing a stay-logged-in cookie

## 문제 조건

브라우저를 닫아도 로그인 상태를 유지하는 쿠키가 무차별 대입에 취약하다. 자신의 계정은 `wiener:peter`, 피해자 이름은 `carlos`이며 비밀번호 후보 목록이 제공된다.

## 완료 조건

Carlos의 로그인 유지 쿠키를 알아내 `My account` 페이지에 접근한다.

## 문제 설명

장기 로그인 쿠키의 값이 충분히 보호되는지 확인하는 문제다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/authentication/other-mechanisms/lab-brute-forcing-a-stay-logged-in-cookie)
