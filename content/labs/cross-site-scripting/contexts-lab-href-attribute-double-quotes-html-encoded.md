---
title: "Stored XSS into anchor href attribute with double quotes HTML-encoded"
tags:
  - portswigger
  - cross-site-scripting
lab_url: "https://portswigger.net/web-security/cross-site-scripting/contexts/lab-href-attribute-double-quotes-html-encoded"
difficulty: Apprentice
note_kind: problem
---

# Stored XSS into anchor href attribute with double quotes HTML-encoded

## 문제 조건

댓글 기능의 저장형 XSS 입력이 앵커의 `href` 속성에 들어가며 큰따옴표는 HTML 인코딩된다.

## 완료 조건

댓글 작성자 이름을 클릭할 때 `alert` 함수가 호출되게 한다.

## 문제 설명

저장된 댓글의 링크 속성과 사용자 클릭이 실행 조건이다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/cross-site-scripting/contexts/lab-href-attribute-double-quotes-html-encoded)
