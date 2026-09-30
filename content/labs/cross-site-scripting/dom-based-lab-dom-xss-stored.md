---
title: "Stored DOM XSS"
tags:
  - portswigger
  - cross-site-scripting
lab_url: "https://portswigger.net/web-security/cross-site-scripting/dom-based/lab-dom-xss-stored"
difficulty: Practitioner
note_kind: problem
---

# Stored DOM XSS

## 문제 조건과 설명

**주어진 조건**

블로그의 댓글 기능에 저장형 DOM XSS 취약점이 있다. 공격자가 남긴 댓글은 저장된 뒤 블로그 글을 보는 브라우저에 다시 제공된다. 문제는 단순히 서버가 위험한 HTML을 응답했다는 사실보다, 브라우저의 스크립트가 저장된 값을 읽어 DOM에 반영하는 과정에 초점을 맞춘다.

**완료 조건**

저장한 댓글을 통해 글을 볼 때 `alert()`가 실행되어야 한다. 댓글 작성 화면에 입력이 보이거나 응답에 문자열이 포함되는 것만으로는 실행을 확인할 수 없다.

**문제 설명과 판단 기준**

저장형이라는 말은 공격자가 입력한 값이 다음 조회까지 남는다는 뜻이고, DOM이라는 말은 페이지에서 실행되는 JavaScript의 처리 경로를 살펴야 한다는 뜻이다. 따라서 댓글 제출 요청과 저장 후 글 페이지의 응답, 스크립트 실행이 끝난 DOM을 구분해서 보는 것이 출발점이다. 세 위치의 문자열이 같아 보여도, 어느 단계에서 HTML로 해석되는지는 다를 수 있다.

먼저 댓글의 어떤 필드가 글 페이지에 나타나는지 확인하고, 페이지 스크립트가 그 값을 어디서 읽어 어떤 DOM API에 전달하는지 추적한다. 이어 원문·응답·실행 후 DOM에서 특수문자가 어떻게 달라지는지 비교하면 실행 지점을 좁힐 수 있다. 구체적인 필터, 스크립트 코드, 성공한 입력은 아직 직접 확인되지 않았다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/cross-site-scripting/dom-based/lab-dom-xss-stored)

## 탐색 및 풀이 기록

### 초기 관찰
<!-- 직접 확인한 내용과 아직 확인하지 못한 점 -->

### 실행 과정
<!-- 무엇을 왜 했는지 → 실제 결과 → 해석 -->
<!-- 필요할 때 코드·요청·응답·스크린샷 첨부 -->

## 최종 결과
<!-- 완료 여부와 확인 근거 -->

## 배운 점
<!-- 새로 알게 된 내용, 잘못 생각했던 부분 -->
