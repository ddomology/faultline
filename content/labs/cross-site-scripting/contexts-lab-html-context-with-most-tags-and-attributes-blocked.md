---
title: "Reflected XSS into HTML context with most tags and attributes blocked"
tags:
  - portswigger
  - cross-site-scripting
lab_url: "https://portswigger.net/web-security/cross-site-scripting/contexts/lab-html-context-with-most-tags-and-attributes-blocked"
difficulty: Practitioner
note_kind: problem
---

# Reflected XSS into HTML context with most tags and attributes blocked

## 문제 조건

검색 기능에 반사형 XSS가 있지만 WAF가 흔한 XSS 입력을 막는다. 사용자의 추가 동작 없이 실행되어야 한다.

## 완료 조건

WAF를 통과하는 입력으로 피해자 브라우저에서 `print()`를 호출한다.

## 문제 설명

자기 브라우저에서 수동으로 `print()`를 호출하는 것은 완료 조건을 충족하지 않는다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/cross-site-scripting/contexts/lab-html-context-with-most-tags-and-attributes-blocked)
