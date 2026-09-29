---
title: "2FA simple bypass"
tags:
  - portswigger
  - authentication
lab_url: "https://portswigger.net/web-security/authentication/multi-factor/lab-2fa-simple-bypass"
difficulty: Apprentice
note_kind: problem
---

# 2FA simple bypass

## 문제 조건

이중 인증을 우회할 수 있다. 자신의 계정은 `wiener:peter`, 피해자 계정의 알려진 자격 증명은 `carlos:montoya`이며 피해자의 2FA 코드는 알 수 없다.

## 완료 조건

Carlos의 계정 페이지에 접근한다.

## 문제 설명

비밀번호 확인 뒤의 인증 단계가 모든 요청에 강제되는지 확인하는 문제다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/authentication/multi-factor/lab-2fa-simple-bypass)
