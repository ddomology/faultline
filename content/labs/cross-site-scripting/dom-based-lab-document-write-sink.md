---
title: "DOM XSS in document.write sink using source location.search"
tags:
  - portswigger
  - cross-site-scripting
lab_url: "https://portswigger.net/web-security/cross-site-scripting/dom-based/lab-document-write-sink"
difficulty: Apprentice
note_kind: problem
---

# DOM XSS in document.write sink using source location.search

## 문제 조건과 설명

공식 설명은 **검색어 추적 기능**에 DOM 기반 XSS가 있다고 알려 준다. 이 기능은 브라우저 URL의 쿼리 문자열인 `location.search`에서 데이터를 읽고, JavaScript의 `document.write`로 페이지에 쓴다. URL을 바꿔 입력을 제어할 수 있으며, 문제가 지목한 흐름은 **URL → 브라우저 스크립트 → HTML 출력**이다.

**어디에서 문제가 생기나**

`location.search`는 `?` 뒤의 쿼리 부분이다. 검색어가 서버의 HTML 응답에 처음부터 들어 있었는지보다, 페이지를 연 뒤 스크립트가 그 값을 어떻게 읽어 `document.write`에 전달하는지가 중요하다. `document.write`는 받은 문자열을 문서에 써서 브라우저가 HTML로 해석하게 할 수 있으므로, 입력이 단순 글자로 표시되는 경우와 실행 가능한 마크업이 되는 경우를 구분해야 한다.

**완료 조건은 이 흐름을 이용해 `alert` 함수를 호출하는 것**이다. 쿼리 값이 페이지에 보인다는 사실만으로 성공을 판정할 수 없다. 실제 함수 호출과 실습 완료 상태가 확인되어야 한다.

**탐색 출발점**

문제 설명은 쿼리 파라미터의 실제 이름이나 `document.write` 호출에 들어가는 주변 문자열을 알려 주지 않는다. 먼저 일반 검색어를 넣은 URL과 페이지의 결과를 관찰하고, 생성된 DOM에서 그 값이 어떤 태그·속성 문맥에 들어갔는지 확인해야 한다. 이후 입력을 바꿀 때는 **서버가 돌려준 원본 HTML**과 **브라우저가 스크립트를 실행한 뒤의 DOM**을 구분해 기록한다. 아래에는 직접 확인한 호출 위치와 실행 결과만 풀이로 남긴다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/cross-site-scripting/dom-based/lab-document-write-sink)

## 탐색 및 풀이 기록

<!-- 아직 이 실습의 URL 입력이나 DOM 변화, `alert` 실행을 직접 기록하지 않았다. 위 내용은 공식 문제 조건과 그에 따른 확인 계획이다. -->

### 초기 관찰
<!-- 직접 확인한 내용과 아직 확인하지 못한 점 -->

### 실행 과정
<!-- 무엇을 왜 했는지 → 실제 결과 → 해석 -->
<!-- 필요할 때 코드·요청·응답·스크린샷 첨부 -->

## 최종 결과
<!-- 완료 여부와 확인 근거 -->

## 배운 점
<!-- 새로 알게 된 내용, 잘못 생각했던 부분 -->
