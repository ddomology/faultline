---
title: "Reflected XSS into a JavaScript string with single quote and backslash escaped"
tags:
  - portswigger
  - cross-site-scripting
lab_url: "https://portswigger.net/web-security/cross-site-scripting/contexts/lab-javascript-string-single-quote-backslash-escaped"
difficulty: Practitioner
note_kind: problem
---

# Reflected XSS into a JavaScript string with single quote and backslash escaped

## 문제 조건

검색어 추적 기능에 반사형 XSS가 있으며 입력은 JavaScript 문자열 안에 놓인다. 작은따옴표와 백슬래시는 이스케이프된다.

## 완료 조건

문자열 문맥을 벗어나 `alert` 함수를 호출한다.

## 문제 설명

이스케이프되는 문자와 스크립트 문맥을 함께 고려해야 한다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/cross-site-scripting/contexts/lab-javascript-string-single-quote-backslash-escaped)
