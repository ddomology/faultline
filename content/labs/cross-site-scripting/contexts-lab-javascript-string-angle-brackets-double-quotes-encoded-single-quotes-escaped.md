---
title: "Reflected XSS into a JavaScript string with angle brackets and double quotes HTML-encoded and single quotes escaped"
tags:
  - portswigger
  - cross-site-scripting
lab_url: "https://portswigger.net/web-security/cross-site-scripting/contexts/lab-javascript-string-angle-brackets-double-quotes-encoded-single-quotes-escaped"
difficulty: Practitioner
note_kind: problem
---

# Reflected XSS into a JavaScript string with angle brackets and double quotes HTML-encoded and single quotes escaped

## 문제 조건과 설명

**주어진 조건**

검색어 추적 기능의 입력이 JavaScript 문자열에 반사된다. 꺾쇠괄호와 큰따옴표는 HTML 인코딩되고, 작은따옴표는 이스케이프된다. 앞선 문자열 문맥 문제보다 서로 다른 문자 변환이 추가된 조건이다.

**완료 조건**

이 변환을 거친 입력으로 문자열 문맥을 벗어나 `alert()`를 호출한다. 화면 표시, HTML 소스, 실제 스크립트 해석 결과를 혼동하지 않아야 한다.

**문제 설명과 판단 기준**

HTML 인코딩과 JavaScript 문자열 이스케이프는 적용되는 층이 다르다. 개발자 도구에서 보이는 문자와 네트워크 응답의 문자 형태가 다를 수 있으므로, 어느 단계에서 어떤 변환이 일어났는지를 분리해 봐야 한다. 제목에 없는 문자까지 같은 방식으로 처리된다고 가정해서는 안 된다.

먼저 검색어의 반사 지점과 문자열 경계를 소스에서 확인한다. 그다음 문자별 테스트로 응답의 인코딩, JavaScript 파서의 반응, 실행 여부를 차례로 기록한다. 단지 오류가 나거나 문자열이 잘리는 것과 `alert()` 호출을 구별하고, 관찰 전에는 특정 우회법을 확정하지 않는다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/cross-site-scripting/contexts/lab-javascript-string-angle-brackets-double-quotes-encoded-single-quotes-escaped)

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

## 관련 개념
<!-- 필요한 개념 노트 링크를 목록으로 추가 -->
