---
title: "Stored XSS into onclick event with angle brackets and double quotes HTML-encoded and single quotes and backslash escaped"
tags:
  - portswigger
  - cross-site-scripting
lab_url: "https://portswigger.net/web-security/cross-site-scripting/contexts/lab-onclick-event-angle-brackets-double-quotes-html-encoded-single-quotes-backslash-escaped"
difficulty: Practitioner
note_kind: problem
---

# Stored XSS into onclick event with angle brackets and double quotes HTML-encoded and single quotes and backslash escaped

## 문제 조건

댓글 기능에 저장형 XSS가 있다. 문제 제목에 따르면 입력은 `onclick` 이벤트 문맥에 놓이고 꺾쇠괄호·큰따옴표는 인코딩되며 작은따옴표·백슬래시는 이스케이프된다.

## 완료 조건

작성자 이름을 클릭했을 때 `alert` 함수가 호출되는 댓글을 제출한다.

## 문제 설명

저장된 댓글과 작성자 이름 클릭이 함께 실행 조건이 된다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/cross-site-scripting/contexts/lab-onclick-event-angle-brackets-double-quotes-html-encoded-single-quotes-backslash-escaped)
