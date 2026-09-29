---
title: "Reflected XSS into attribute with angle brackets HTML-encoded"
tags:
  - portswigger
  - cross-site-scripting
lab_url: "https://portswigger.net/web-security/cross-site-scripting/contexts/lab-attribute-angle-brackets-html-encoded"
difficulty: Apprentice
note_kind: problem
---

# Reflected XSS into attribute with angle brackets HTML-encoded

## 문제 조건

블로그 검색 입력이 HTML 속성에 반사되고 꺾쇠괄호는 HTML 인코딩된다.

## 완료 조건

속성을 삽입해 `alert` 함수를 호출한다.

## 문제 설명

입력값이 태그 본문이 아니라 속성 문맥에 놓인다는 제약이 있다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/cross-site-scripting/contexts/lab-attribute-angle-brackets-html-encoded)
