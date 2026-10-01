---
title: "DOM XSS in jQuery anchor href attribute sink using location.search source"
tags:
  - portswigger
  - cross-site-scripting
lab_url: "https://portswigger.net/web-security/cross-site-scripting/dom-based/lab-jquery-href-attribute-sink"
difficulty: Apprentice
note_kind: problem
---

# DOM XSS in jQuery anchor href attribute sink using location.search source

## 문제 조건과 설명

피드백 제출 페이지의 브라우저 스크립트가 jQuery의 `$` 선택자로 **앵커 링크**를 찾고, URL의 `location.search`에서 가져온 데이터로 그 링크의 `href` 속성을 바꾼다. 취약한 흐름은 검색어나 댓글을 HTML 본문에 넣는 것이 아니라, **URL 입력이 링크의 이동 주소가 되는 과정**에 있다.

**실행 시점이 중요한 이유**

`href`가 바뀌었다는 사실과 JavaScript가 실행되었다는 사실은 다르다. 페이지를 열 때 링크 주소만 설정되고, 실제 동작은 사용자가 그 링크를 눌렀을 때 나타날 수 있다. 공식 완료 조건도 단순한 화면 표시가 아니라, **`back` 링크를 통해 `document.cookie`가 `alert` 창에 표시되도록 하는 것**이다. 임의의 경고창을 띄우는 것과 요구된 값이 경고창에 나타나는 것도 구별해야 한다.

**확인할 정보와 순서**

문제 설명은 `location.search`의 어떤 파라미터가 쓰이는지, jQuery가 고르는 앵커의 실제 구조, 변경 전후 `href` 값을 알려 주지 않는다. 먼저 정상적인 피드백 페이지에서 `back` 링크의 주소를 확인하고, 쿼리 입력을 바꾼 뒤 실행 후 DOM의 `href`가 어떻게 달라지는지 비교해야 한다. 그다음 링크를 눌렀을 때 브라우저에서 일어나는 동작을 확인한다.

이 실습은 링크에 문자열이 보이는 것만으로 완료되지 않는다. 아래에는 실제 URL 입력, 바뀐 링크 주소, 클릭 후의 `alert(document.cookie)` 결과를 각각 확인한 뒤 기록한다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/cross-site-scripting/dom-based/lab-jquery-href-attribute-sink)

## 탐색 및 풀이 기록

<!-- 아직 이 실습의 링크 주소나 클릭 결과를 직접 기록하지 않았다. 공식 설명이 지정한 출처와 `href` 변경을 실제 DOM에서 확인한 뒤 이어서 적는다. -->

### 초기 관찰
<!-- 직접 확인한 내용과 아직 확인하지 못한 점 -->

### 실행 과정
<!-- 무엇을 왜 했는지 → 실제 결과 → 해석 -->
<!-- 필요할 때 코드·요청·응답·스크린샷 첨부 -->

## 최종 결과
<!-- 완료 여부와 확인 근거 -->

## 배운 점
<!-- 새로 알게 된 내용, 잘못 생각했던 부분 -->

## 관련 개념
<!-- 필요한 개념 노트 링크를 목록으로 추가 -->
