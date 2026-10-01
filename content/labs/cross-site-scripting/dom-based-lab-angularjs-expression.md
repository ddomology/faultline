---
title: "DOM XSS in AngularJS expression with angle brackets and double quotes HTML-encoded"
tags:
  - portswigger
  - cross-site-scripting
lab_url: "https://portswigger.net/web-security/cross-site-scripting/dom-based/lab-angularjs-expression"
difficulty: Practitioner
note_kind: problem
---

# DOM XSS in AngularJS expression with angle brackets and double quotes HTML-encoded

## 문제 조건과 설명

검색 기능에 AngularJS 표현식과 관련된 DOM 기반 XSS 취약점이 있다. 공식 설명에 따르면 AngularJS는 `ng-app` 지시자가 붙은 HTML 노드의 내용을 살피고, 그 영역에서 이중 중괄호 `{{ ... }}` 안의 표현식을 해석한다. 제목은 꺾쇠괄호와 큰따옴표가 HTML 인코딩된다는 제약도 알려 준다.

**HTML 태그 삽입과 다른 실행 경로**

꺾쇠괄호가 인코딩되면 새 태그를 삽입하는 방식만으로는 실행을 기대하기 어렵다. 그러나 입력이 AngularJS가 해석하는 영역에 들어가면 브라우저의 HTML 파서와 별개로 **프레임워크의 표현식 평가**가 일어날 수 있다. 이 실습에서 중요한 질문은 문자열이 페이지에 보이는지가 아니라, 실제로 `ng-app` 영역 안에 놓여 표현식으로 평가되는지다.

**완료 조건은 AngularJS 표현식을 실행해 `alert` 함수를 호출하는 것**이다. `{{ ... }}` 모양의 문자열이 화면에 그대로 보이는 경우는 표현식이 평가되었다는 증거가 아니다. 반대로 입력이 평가되더라도 요구한 함수가 호출되었는지 별도로 확인해야 한다.

공식 설명은 검색어가 DOM의 정확히 어느 노드에 놓이는지, 주변 지시자와 표현식의 실제 구조, 사용할 수 있는 표현식의 범위를 알려 주지 않는다. 정상 검색의 DOM에서 `ng-app` 영역을 먼저 찾고, 입력이 그 안에 들어가는지와 AngularJS가 이를 평가하는지를 순서대로 확인해야 한다. 아래에는 실제 DOM 위치와 평가 결과를 관찰한 뒤 기록한다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/cross-site-scripting/dom-based/lab-angularjs-expression)

## 탐색 및 풀이 기록

<!-- 아직 이 실습의 `ng-app` 영역이나 표현식 평가, `alert` 실행을 직접 기록하지 않았다. 확인한 DOM과 실행 결과를 같은 파일에 이어서 적는다. -->

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
