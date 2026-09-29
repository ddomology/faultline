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

## 문제 조건과 설명

**주어진 조건**

블로그 검색어가 JavaScript 템플릿 문자열에 반사된다. 공식 설명에는 꺾쇠괄호와 작은따옴표·큰따옴표의 HTML 인코딩, 백틱 이스케이프가 명시된다. 제목에는 백슬래시 처리도 언급되므로 실제 응답에서 그 결과를 확인할 필요가 있다.

**완료 조건**

템플릿 문자열 안에서 `alert()`를 호출한다. HTML 요소를 새로 만들거나 템플릿 자체를 종료하는 시도만을 성공 기준으로 삼을 수 없다.

**문제 설명과 판단 기준**

백틱으로 둘러싸인 템플릿 문자열은 일반적인 작은따옴표 문자열과 문법이 다르다. 문자열 내부에도 표현식으로 평가되는 구간이 있을 수 있어, 구분자가 이스케이프되는 조건만으로 모든 코드 실행 경로를 판단할 수 없다. 다만 어떤 문자 조합이 실제로 보존되는지는 주어진 설명이 아니라 응답 소스를 통해 확인해야 한다.

검색어가 들어간 스크립트의 앞뒤 코드를 읽어 템플릿 경계와 평가 지점을 찾는다. 문자별 입력을 보내 네트워크 응답, 스크립트 파싱, 실행 여부를 순서대로 기록한다. 아직 직접 확인한 변환 결과나 성공한 입력은 없다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/cross-site-scripting/contexts/lab-javascript-template-literal-angle-brackets-single-double-quotes-backslash-backticks-escaped)

## 탐색 및 풀이 기록

아직 작성하지 않았다. 직접 확인한 요청·응답, 시도한 이유와 결과를 이 파일에 이어서 기록한다.
