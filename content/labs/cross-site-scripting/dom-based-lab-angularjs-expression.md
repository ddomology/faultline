---
title: "DOM XSS in AngularJS expression with angle brackets and double quotes HTML-encoded"
tags:
  - portswigger
  - cross-site-scripting
lab_url: "https://portswigger.net/web-security/cross-site-scripting/dom-based/lab-angularjs-expression"
difficulty: Practitioner
note_kind: problem
---

# DOM XSS in AngularJS expression with angle brackets and double quotes HTML-encoded

## 문제 조건

검색 기능이 AngularJS 표현식에 입력값을 넣는다. `ng-app` 영역에서는 이중 중괄호 표현식이 해석되며 꺾쇠괄호는 인코딩된다.

## 완료 조건

AngularJS 표현식을 실행해 `alert` 함수를 호출한다.

## 문제 설명

일반 HTML 태그 대신 AngularJS 표현식 해석이 관찰 대상이다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/cross-site-scripting/dom-based/lab-angularjs-expression)
