---
title: "Reflected XSS in a JavaScript URL with some characters blocked"
tags:
  - portswigger
  - cross-site-scripting
lab_url: "https://portswigger.net/web-security/cross-site-scripting/contexts/lab-javascript-url-some-characters-blocked"
difficulty: Expert
note_kind: problem
---

# Reflected XSS in a JavaScript URL with some characters blocked

## 문제 조건

입력이 JavaScript URL에 반사되지만 애플리케이션이 일부 문자를 차단한다.

## 완료 조건

`alert` 메시지 어딘가에 문자열 `1337`이 포함되도록 호출한다.

## 문제 설명

URL의 스크립트 문맥과 문자 차단을 동시에 다루는 문제다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/cross-site-scripting/contexts/lab-javascript-url-some-characters-blocked)
