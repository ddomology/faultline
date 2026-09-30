---
title: "DOM XSS in jQuery selector sink using a hashchange event"
tags:
  - portswigger
  - cross-site-scripting
lab_url: "https://portswigger.net/web-security/cross-site-scripting/dom-based/lab-jquery-selector-hash-change-event"
difficulty: Apprentice
note_kind: problem
---

# DOM XSS in jQuery selector sink using a hashchange event

## 문제 조건과 설명

홈페이지에는 게시물 제목을 받아 해당 게시물로 자동 스크롤하는 기능이 있다. 공식 설명에 따르면 제목은 URL의 **`location.hash`**로 전달되고, 페이지 스크립트가 jQuery의 `$()` 선택자로 게시물을 찾는다. 제목은 `hashchange` 이벤트를 함께 지목한다. 즉 확인할 흐름은 **해시 값 → 브라우저 이벤트 → jQuery 선택자 처리**다.

**앞의 `location.search` 문제와 다른 점**

해시는 URL의 `#` 뒤 부분이다. 일반적인 URL 쿼리 문자열과 다른 위치에 있으며, 브라우저 안에서 변경될 수 있다. 따라서 쿼리 파라미터만 바꾸는 테스트로는 이 기능을 제대로 관찰할 수 없다. 정상적인 게시물 제목을 넣었을 때 스크롤이 일어나는지, 해시를 바꿀 때 선택자 처리가 언제 다시 실행되는지부터 확인해야 한다.

`$()`가 입력을 단순한 제목 문자열이 아닌 선택자 표현으로 해석한다면 위험한 동작으로 이어질 수 있다. 그러나 해시가 주소창에 보이거나 스크롤이 움직이는 것만으로 XSS가 실행되었다고 볼 수는 없다. 실제 스크립트 실행의 증거가 필요하다.

**완료 기준**

**완료 조건은 공격을 피해자에게 전달해 피해자의 브라우저에서 `print()` 함수를 호출하는 것**이다. 이 실습은 `alert` 호출을 요구하지 않으며, 자신의 브라우저에서 한 번 재현하는 것과 피해자에게 전달된 공격이 실행되는 것도 구별해야 한다. 문제 설명은 해시의 정확한 문법이나 전달 화면의 조작 방법을 제공하지 않는다. 아래에는 정상 해시의 동작, 변경된 해시에서의 이벤트, 실제 전달 결과를 확인한 뒤 순서대로 기록한다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/cross-site-scripting/dom-based/lab-jquery-selector-hash-change-event)

## 탐색 및 풀이 기록

<!-- 아직 이 실습의 `hashchange` 동작이나 피해자 브라우저의 `print()` 실행을 직접 기록하지 않았다. 확인한 이벤트와 전달 결과를 같은 파일에 이어서 적는다. -->

### 초기 관찰
<!-- 직접 확인한 내용과 아직 확인하지 못한 점 -->

### 실행 과정
<!-- 무엇을 왜 했는지 → 실제 결과 → 해석 -->
<!-- 필요할 때 코드·요청·응답·스크린샷 첨부 -->

## 최종 결과
<!-- 완료 여부와 확인 근거 -->

## 배운 점
<!-- 새로 알게 된 내용, 잘못 생각했던 부분 -->
