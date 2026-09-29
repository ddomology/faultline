---
title: "Broken brute-force protection, multiple credentials per request"
tags:
  - portswigger
  - authentication
lab_url: "https://portswigger.net/web-security/authentication/password-based/lab-broken-brute-force-protection-multiple-credentials-per-request"
difficulty: Expert
note_kind: problem
---

# Broken brute-force protection, multiple credentials per request

## 문제 조건

비밀번호 무차별 대입 방어에 논리적 결함이 있다. 피해자 이름은 `carlos`이며 비밀번호 후보 목록이 제공된다.

## 완료 조건

Carlos의 비밀번호를 찾아 그의 계정 페이지에 접속한다.

## 문제 설명

한 요청에 여러 자격 증명을 담는 경우에도 시도 제한이 적용되는지 확인한다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/authentication/password-based/lab-broken-brute-force-protection-multiple-credentials-per-request)
