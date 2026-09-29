---
title: "CORS vulnerability with trusted null origin"
tags:
  - portswigger
  - cross-origin-resource-sharing-cors
lab_url: "https://portswigger.net/web-security/cors/lab-null-origin-whitelisted-attack"
difficulty: Apprentice
note_kind: problem
---

# CORS vulnerability with trusted null origin

## 문제 조건

사이트의 CORS 설정이 `null` origin을 신뢰한다. 자기 계정은 `wiener:peter`다.

## 완료 조건

CORS를 이용해 관리자 API 키를 얻는 JavaScript를 exploit server에 올리고 키를 제출한다.

## 문제 설명

특정 출처 값에 대한 신뢰가 관리자 정보 접근으로 이어지는지 다룬다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/cors/lab-null-origin-whitelisted-attack)
