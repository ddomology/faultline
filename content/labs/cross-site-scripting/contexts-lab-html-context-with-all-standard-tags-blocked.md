---
title: "Reflected XSS into HTML context with all tags blocked except custom ones"
tags:
  - portswigger
  - cross-site-scripting
lab_url: "https://portswigger.net/web-security/cross-site-scripting/contexts/lab-html-context-with-all-standard-tags-blocked"
difficulty: Practitioner
note_kind: problem
---

# Reflected XSS into HTML context with all tags blocked except custom ones

## 문제 조건

사이트가 표준 HTML 태그를 모두 차단하고 사용자 정의 태그만 허용한다.

## 완료 조건

사용자 정의 태그를 넣어 `document.cookie`를 자동으로 경고창에 표시한다.

## 문제 설명

허용되는 태그 종류와 자동 실행 조건이 이 문제의 제약이다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/cross-site-scripting/contexts/lab-html-context-with-all-standard-tags-blocked)
