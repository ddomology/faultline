---
title: "Reflected XSS into attribute with angle brackets HTML-encoded"
tags:
  - portswigger
  - cross-site-scripting
lab_url: "https://portswigger.net/web-security/cross-site-scripting/contexts/lab-attribute-angle-brackets-html-encoded"
difficulty: Apprentice
note_kind: problem
---

# Reflected XSS into attribute with angle brackets HTML-encoded

## 문제 조건과 설명

블로그 검색 기능에 반사형 XSS 취약점이 있다. 제목은 검색 입력이 **HTML 태그의 속성 위치**에 반사되고, 꺾쇠괄호 `<`와 `>`는 HTML 인코딩된다고 알려 준다. 입력이 일반 텍스트 영역에 출력되는 문제와 달리, 기존 태그의 속성 문맥을 이해해야 한다.

**인코딩이 막는 경로와 남는 질문**

꺾쇠괄호가 인코딩되면 입력만으로 새 HTML 태그를 여는 방식은 기대한 대로 동작하지 않을 수 있다. 그러나 이 실습의 완료 조건은 **속성을 주입하여 `alert` 함수를 호출하는 것**이다. 따라서 핵심은 새 태그를 만들 수 있는지가 아니라, 기존 태그 안에서 입력이 속성값으로 어디까지 해석되는지와 추가 속성으로 이어질 수 있는지를 확인하는 데 있다.

공식 설명은 어떤 HTML 요소와 속성에 검색어가 들어가는지, 속성값을 감싼 따옴표가 무엇인지, 꺾쇠괄호 이외의 문자가 어떻게 처리되는지 알려 주지 않는다. `<`와 `>`가 인코딩된다는 사실만으로 따옴표도 같게 처리된다고 가정해서는 안 된다.

**확인할 순서**

먼저 일반 검색어를 넣은 요청과 응답 HTML을 대조해 반사 위치를 찾는다. 화면에 표시된 글자뿐 아니라 **원본 HTML의 속성 경계**를 봐야 한다. 이어 입력을 바꿨을 때 브라우저가 실제로 어떤 속성을 구성하는지 확인하고, 마지막에 `alert`의 호출 여부와 실습 완료 상태를 판정한다. 검색어가 페이지에 보이거나 HTML에 낯선 문자열이 들어간 것만으로는 완료가 아니다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/cross-site-scripting/contexts/lab-attribute-angle-brackets-html-encoded)

## 탐색 및 풀이 기록

<!-- 아직 이 실습의 검색 응답 HTML이나 속성 변화, `alert` 실행을 직접 기록하지 않았다. 실제 반사 문맥을 확인한 뒤 같은 파일에 이어서 적는다. -->

### 초기 관찰
<!-- 직접 확인한 내용과 아직 확인하지 못한 점 -->

### 실행 과정
<!-- 무엇을 왜 했는지 → 실제 결과 → 해석 -->
<!-- 필요할 때 코드·요청·응답·스크린샷 첨부 -->

## 최종 결과
<!-- 완료 여부와 확인 근거 -->

## 배운 점
<!-- 새로 알게 된 내용, 잘못 생각했던 부분 -->
