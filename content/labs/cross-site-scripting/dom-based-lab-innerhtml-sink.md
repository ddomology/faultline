---
title: "DOM XSS in innerHTML sink using source location.search"
tags:
  - portswigger
  - cross-site-scripting
lab_url: "https://portswigger.net/web-security/cross-site-scripting/dom-based/lab-innerhtml-sink"
difficulty: Apprentice
note_kind: problem
---

# DOM XSS in innerHTML sink using source location.search

## 문제 조건과 설명

블로그 검색 기능에서 브라우저 스크립트가 URL의 `location.search` 값을 읽는다. 공식 설명은 그 값을 사용해 **`div` 요소의 `innerHTML`을 바꾸는 동작**에 DOM 기반 XSS가 있다고 알려 준다. 21번처럼 `document.write`로 문서에 쓰는 방식이 아니라, 이미 있는 요소의 HTML 내용을 교체하는 방식이다.

### 출처와 출력 지점을 연결하기

검색어가 URL에 들어간다는 사실만으로 XSS가 성립하지는 않는다. 스크립트가 쿼리 문자열의 어느 부분을 사용하고, 그 값이 `div` 안에서 어떤 HTML로 해석되는지가 핵심이다. `innerHTML`에 들어간 값은 텍스트로만 취급되는 입력과 다르게 DOM 구조를 바꿀 수 있지만, **태그가 만들어지는 것과 JavaScript가 실행되는 것은 별도**로 확인해야 한다.

**완료 조건은 해당 DOM 흐름으로 `alert` 함수를 호출하는 것**이다. 검색 결과에 임의의 태그나 문자열이 보이는 것만으로 성공이라고 적을 수 없다. 실제 브라우저 실행과 실습 완료 상태가 판정 근거다.

### 아직 확인할 것

공식 설명은 실제 쿼리 파라미터 이름, 스크립트가 `div`에 넣는 주변 마크업, 입력값의 변환 여부를 알려 주지 않는다. 정상 검색과 구별되는 표시 문자열로 입력이 들어가는 위치를 먼저 찾고, 페이지 소스와 실행 후 DOM을 비교해야 한다. 이렇게 해야 서버가 처음부터 반환한 내용과 브라우저가 `innerHTML`로 새로 만든 내용을 혼동하지 않는다. 아래에는 직접 본 URL, DOM 변화, 함수 호출 여부를 순서대로 기록한다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/cross-site-scripting/dom-based/lab-innerhtml-sink)

## 탐색 및 풀이 기록

아직 이 실습의 쿼리 입력·DOM 변화·`alert` 실행을 직접 기록하지 않았다. 공식 설명에서 알려 준 `innerHTML` 흐름을 실제 페이지에서 확인한 뒤 이어서 적는다.
