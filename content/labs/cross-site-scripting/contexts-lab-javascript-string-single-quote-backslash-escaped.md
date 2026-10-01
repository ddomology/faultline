---
title: "Reflected XSS into a JavaScript string with single quote and backslash escaped"
tags:
  - portswigger
  - cross-site-scripting
lab_url: "https://portswigger.net/web-security/cross-site-scripting/contexts/lab-javascript-string-single-quote-backslash-escaped"
difficulty: Practitioner
note_kind: problem
---

# Reflected XSS into a JavaScript string with single quote and backslash escaped

## 문제 조건과 설명

**주어진 조건**

검색어 추적 기능이 사용자 입력을 JavaScript 문자열 안에 반사한다. 작은따옴표와 백슬래시는 이스케이프된다. 같은 검색어라도 HTML 텍스트에 놓이는 경우와 스크립트 코드의 문자열에 놓이는 경우에는 브라우저가 해석하는 방식이 다르다.

**완료 조건**

문자열 문맥을 벗어나 `alert()`를 실행한다. 응답 소스에 입력 문자열이 포함된 사실만으로는 코드 실행이나 실습 완료를 증명하지 못한다.

**문제 설명과 판단 기준**

문제 제목의 두 이스케이프 문자는 가장 단순한 문자열 종료 시도를 막는다는 단서다. 하지만 실제 코드에서 문자열을 둘러싼 구문, 입력을 조립하는 방식, 브라우저가 받은 최종 스크립트는 아직 알려지지 않았다. 성공 가능성은 이 주변 문맥을 읽고 판단해야 한다.

검색 요청의 원문 응답에서 입력이 포함된 `<script>`와 앞뒤 코드를 확보한다. 여러 특수문자를 소량씩 넣어 서버가 돌려준 바이트와 브라우저의 파싱 결과를 비교하고, 문법 오류와 실제 실행을 구별한다. 검증되지 않은 탈출 구문이나 성공한 페이로드는 기록하지 않는다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/cross-site-scripting/contexts/lab-javascript-string-single-quote-backslash-escaped)

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
