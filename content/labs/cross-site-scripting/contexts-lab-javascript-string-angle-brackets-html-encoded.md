---
title: "Reflected XSS into a JavaScript string with angle brackets HTML encoded"
tags:
  - portswigger
  - cross-site-scripting
lab_url: "https://portswigger.net/web-security/cross-site-scripting/contexts/lab-javascript-string-angle-brackets-html-encoded"
difficulty: Apprentice
note_kind: problem
---

# Reflected XSS into a JavaScript string with angle brackets HTML encoded

## 문제 조건과 설명

검색어 추적 기능에 반사형 XSS 취약점이 있다. 공식 설명은 입력이 **JavaScript 문자열 안에 반사**되고, 꺾쇠괄호가 인코딩된다고 알려 준다. 이는 검색어가 HTML 본문이나 태그 속성에 놓이는 25번과 다른 문맥이다. HTML에서 새 태그가 만들어지는지만 확인해서는 이 문제의 실행 경로를 설명할 수 없다.

**왜 JavaScript 문자열 문맥을 봐야 하나**

브라우저는 먼저 HTML에서 스크립트 내용을 읽고, 그 안의 문자열을 JavaScript 문법으로 해석한다. 입력이 문자열 안에 머문다면 코드가 아니라 데이터다. **완료 조건은 그 문자열 문맥을 벗어나 `alert` 함수를 호출하는 것**이다. 꺾쇠괄호가 인코딩된다는 사실은 HTML 태그를 여는 경로에 영향을 주지만, 문자열 경계를 어떻게 처리하는지까지 알려 주지는 않는다.

문제 설명은 스크립트의 실제 줄, 문자열 구분 문자, 따옴표·역슬래시의 처리 방식, 입력 앞뒤에 붙는 코드의 내용을 제공하지 않는다. 따라서 단순히 검색어가 응답에 반사되는지를 보는 데서 그치지 않고, **응답 소스의 스크립트 문맥**을 확인해야 한다. 입력을 바꾼 뒤 문법 오류가 나는 것과 실행 가능한 코드가 되는 것도 구별해야 한다.

정상 검색 요청을 기준으로 반사된 문자열의 위치를 찾고, 입력 변화가 스크립트 구조에 어떤 영향을 주는지 비교한 다음 실제 함수 호출 여부를 판정한다. 아래에는 관찰한 스크립트와 실행 결과만 기록한다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/cross-site-scripting/contexts/lab-javascript-string-angle-brackets-html-encoded)

## 탐색 및 풀이 기록

아직 이 실습의 스크립트 반사 위치나 `alert` 실행을 직접 기록하지 않았다. 문자열 경계와 입력 처리 방식을 확인한 뒤 같은 파일에 이어서 적는다.
