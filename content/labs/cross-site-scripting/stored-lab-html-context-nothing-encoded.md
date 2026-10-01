---
title: "Stored XSS into HTML context with nothing encoded"
tags:
  - portswigger
  - cross-site-scripting
lab_url: "https://portswigger.net/web-security/cross-site-scripting/stored/lab-html-context-nothing-encoded"
difficulty: Apprentice
note_kind: problem
---

# Stored XSS into HTML context with nothing encoded

## 문제 조건과 설명

공식 설명은 **댓글 기능에 저장형 XSS 취약점**이 있다고 알려 준다. 제목은 저장된 값이 HTML 문맥에 놓이고 인코딩되지 않는다는 단서를 준다. 검색 요청 한 번의 응답에 입력이 되돌아오는 19번과 달리, 여기서는 댓글을 제출한 뒤 블로그 글을 다시 열 때 그 내용이 표시되는 흐름을 확인해야 한다.

**제출 성공과 실행 성공은 다르다**

댓글 제출 요청이 정상 처리되었다고 해서 곧바로 XSS가 실행된 것은 아니다. 먼저 댓글이 저장되어 블로그 글의 어느 위치에 나타나는지 확인해야 한다. 그다음 새로 렌더링된 페이지에서 브라우저가 그 내용을 단순한 글자로 보여 주는지, HTML로 해석해 스크립트를 실행하는지 구분한다. 문제 제목이 “nothing encoded”라고 해도 실제 댓글이 놓이는 요소와 주변 마크업은 관찰 대상이다.

**완료 조건은 댓글을 제출하고 블로그 글을 볼 때 `alert` 함수가 호출되도록 하는 것**이다. 제출 직후의 응답에서 문자열이 보이는 것만으로는 부족하다. 글을 다시 조회하는 단계에서 함수 호출이 일어나는지와 실습 완료 상태를 확인해야 한다.

문제 설명은 댓글 양식의 필드 이름, 저장 후 표시되는 HTML 구조, 필요한 입력 형태를 제공하지 않는다. 따라서 일반 댓글로 제출·표시 과정을 먼저 확인하고, 그 관찰을 기준으로 실행 여부를 검증하는 순서가 타당하다. 아래에는 실제 댓글 요청, 저장된 표시 위치와 블로그 글 조회 결과를 구분해 기록한다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/cross-site-scripting/stored/lab-html-context-nothing-encoded)

## 탐색 및 풀이 기록

<!-- 아직 이 실습의 댓글 제출이나 블로그 글 조회 결과를 직접 기록하지 않았다. 저장 여부와 `alert` 실행 여부를 따로 확인해 같은 파일에 이어서 적는다. -->

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
