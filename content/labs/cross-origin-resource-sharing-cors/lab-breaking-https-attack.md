---
title: "CORS vulnerability with trusted insecure protocols"
tags:
  - portswigger
  - cross-origin-resource-sharing-cors
lab_url: "https://portswigger.net/web-security/cors/lab-breaking-https-attack"
difficulty: Practitioner
note_kind: problem
---

# CORS vulnerability with trusted insecure protocols

## 문제 조건

사이트가 프로토콜에 관계없이 모든 하위 도메인을 CORS에서 신뢰한다. 자기 계정은 `wiener:peter`다.

## 완료 조건

CORS로 관리자 API 키를 가져오는 JavaScript를 exploit server에 올리고 키를 제출한다.

## 문제 설명

허용 출처 판단에서 하위 도메인과 프로토콜을 어떻게 취급하는지가 조건이다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/cors/lab-breaking-https-attack)
