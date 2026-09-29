---
title: "Broken brute-force protection, IP block"
tags:
  - portswigger
  - authentication
lab_url: "https://portswigger.net/web-security/authentication/password-based/lab-broken-bruteforce-protection-ip-block"
difficulty: Practitioner
note_kind: problem
---

# Broken brute-force protection, IP block

## 문제 조건

IP 차단에 기반한 비밀번호 무차별 대입 방어에 논리적 결함이 있다. 자신의 계정은 `wiener:peter`, 피해자 이름은 `carlos`이며 비밀번호 후보 목록이 제공된다.

## 완료 조건

Carlos의 비밀번호를 알아내 로그인하고 계정 페이지에 접속한다.

## 문제 설명

로그인 시도 제한의 상태 관리가 충분한지 살펴보는 문제다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/authentication/password-based/lab-broken-bruteforce-protection-ip-block)
