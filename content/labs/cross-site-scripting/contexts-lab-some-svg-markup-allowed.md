---
title: "Reflected XSS with some SVG markup allowed"
tags:
  - portswigger
  - cross-site-scripting
lab_url: "https://portswigger.net/web-security/cross-site-scripting/contexts/lab-some-svg-markup-allowed"
difficulty: Practitioner
note_kind: problem
---

# Reflected XSS with some SVG markup allowed

## 문제 조건

반사형 XSS가 있고 사이트는 일반적인 태그를 차단하지만 일부 SVG 태그와 이벤트를 놓친다.

## 완료 조건

`alert()` 함수를 호출한다.

## 문제 설명

필터가 HTML 입력을 전부 동일하게 처리하지 않는다는 조건이 주어졌다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/cross-site-scripting/contexts/lab-some-svg-markup-allowed)
