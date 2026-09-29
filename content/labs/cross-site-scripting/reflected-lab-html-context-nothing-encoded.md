---
title: "Reflected XSS into HTML context with nothing encoded"
tags:
  - portswigger
  - cross-site-scripting
lab_url: "https://portswigger.net/web-security/cross-site-scripting/reflected/lab-html-context-nothing-encoded"
difficulty: Apprentice
note_kind: problem
---

# Reflected XSS into HTML context with nothing encoded

## 문제 조건

검색 기능에서 입력값이 HTML에 반사되며 별도의 인코딩이 없는 XSS 취약점이 있다.

## 완료 조건

XSS로 `alert` 함수를 호출한다.

## 문제 설명

검색 요청의 입력이 곧바로 응답의 HTML 문맥에 나타나는 유형이다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/cross-site-scripting/reflected/lab-html-context-nothing-encoded)
