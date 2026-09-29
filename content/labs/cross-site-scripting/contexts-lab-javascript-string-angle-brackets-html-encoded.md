---
title: "Reflected XSS into a JavaScript string with angle brackets HTML encoded"
tags:
  - portswigger
  - cross-site-scripting
lab_url: "https://portswigger.net/web-security/cross-site-scripting/contexts/lab-javascript-string-angle-brackets-html-encoded"
difficulty: Apprentice
note_kind: problem
---

# Reflected XSS into a JavaScript string with angle brackets HTML encoded

## 문제 조건

검색어 추적 기능에서 입력이 JavaScript 문자열 안에 반사되며 꺾쇠괄호는 인코딩된다.

## 완료 조건

문자열 문맥을 벗어나 `alert` 함수를 호출한다.

## 문제 설명

입력이 HTML 본문이 아닌 스크립트 문자열 안에 배치된다는 점을 확인해야 한다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/cross-site-scripting/contexts/lab-javascript-string-angle-brackets-html-encoded)
