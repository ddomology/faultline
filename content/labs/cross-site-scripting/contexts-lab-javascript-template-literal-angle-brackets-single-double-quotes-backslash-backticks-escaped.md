---
title: "Reflected XSS into a template literal with angle brackets, single, double quotes, backslash and backticks Unicode-escaped"
tags:
  - portswigger
  - cross-site-scripting
lab_url: "https://portswigger.net/web-security/cross-site-scripting/contexts/lab-javascript-template-literal-angle-brackets-single-double-quotes-backslash-backticks-escaped"
difficulty: Practitioner
note_kind: problem
---

# Reflected XSS into a template literal with angle brackets, single, double quotes, backslash and backticks Unicode-escaped

## 문제 조건

블로그 검색 입력이 JavaScript 템플릿 문자열 안에 반사된다. 꺾쇠괄호와 작은따옴표·큰따옴표는 HTML 인코딩되고 백틱은 이스케이프된다.

## 완료 조건

템플릿 문자열 안에서 `alert` 함수를 호출한다.

## 문제 설명

일반 HTML 문맥과 다른 문자열 문맥 및 문자 처리 조건을 다룬다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/cross-site-scripting/contexts/lab-javascript-template-literal-angle-brackets-single-double-quotes-backslash-backticks-escaped)
