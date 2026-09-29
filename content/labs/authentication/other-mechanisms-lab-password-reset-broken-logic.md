---
title: "Password reset broken logic"
tags:
  - portswigger
  - authentication
lab_url: "https://portswigger.net/web-security/authentication/other-mechanisms/lab-password-reset-broken-logic"
difficulty: Apprentice
note_kind: problem
---

# Password reset broken logic

## 문제 조건

비밀번호 재설정 기능에 취약점이 있다. 자신의 계정은 `wiener:peter`, 피해자 사용자 이름은 `carlos`다.

## 완료 조건

Carlos의 비밀번호를 재설정하고 로그인해 `My account` 페이지에 접속한다.

## 문제 설명

재설정 절차가 실제 대상 계정을 올바르게 확인하는지 살펴본다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/authentication/other-mechanisms/lab-password-reset-broken-logic)
