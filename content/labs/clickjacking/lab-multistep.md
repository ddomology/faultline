---
title: "Multistep clickjacking"
tags:
  - portswigger
  - clickjacking
lab_url: "https://portswigger.net/web-security/clickjacking/lab-multistep"
difficulty: Practitioner
note_kind: problem
---

# Multistep clickjacking

## 문제 조건

계정 삭제 기능은 CSRF 토큰과 확인 대화상자로 보호된다. 피해자는 Chrome을 사용하고 자기 계정은 `wiener:peter`다.

## 완료 조건

`Click me first`, `Click me next` 두 미끼 요소를 눌러 계정 삭제 버튼과 확인 대화상자를 차례로 처리하게 한다.

## 문제 설명

한 번의 클릭이 아닌 두 단계의 사용자 동작이 필요한 클릭재킹 문제다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/clickjacking/lab-multistep)
