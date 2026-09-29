---
title: "Reflected XSS with AngularJS sandbox escape without strings"
tags:
  - portswigger
  - cross-site-scripting
lab_url: "https://portswigger.net/web-security/cross-site-scripting/contexts/client-side-template-injection/lab-angular-sandbox-escape-without-strings"
difficulty: Expert
note_kind: problem
---

# Reflected XSS with AngularJS sandbox escape without strings

## 문제 조건

AngularJS가 특이하게 사용되어 `$eval` 함수를 쓸 수 없고 AngularJS 입력에서 문자열도 사용할 수 없다.

## 완료 조건

`$eval` 없이 AngularJS 샌드박스를 벗어나 `alert` 함수를 실행한다.

## 문제 설명

사용 가능한 표현식이 제한된 AngularJS 실행 환경이다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/cross-site-scripting/contexts/client-side-template-injection/lab-angular-sandbox-escape-without-strings)
