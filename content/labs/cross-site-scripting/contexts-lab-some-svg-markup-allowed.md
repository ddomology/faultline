---
title: "Reflected XSS with some SVG markup allowed"
tags:
  - portswigger
  - cross-site-scripting
lab_url: "https://portswigger.net/web-security/cross-site-scripting/contexts/lab-some-svg-markup-allowed"
difficulty: Practitioner
note_kind: problem
---

# Reflected XSS with some SVG markup allowed

## 문제 조건과 설명

**주어진 조건**

반사형 XSS가 있으며 사이트는 흔히 쓰는 태그를 차단하지만 일부 SVG 태그와 이벤트는 차단하지 못한다. 문제 설명은 어느 SVG 요소나 이벤트가 허용되는지까지 공개하지 않는다.

**완료 조건**

허용된 입력을 통해 피해자 페이지에서 `alert()`를 실행한다. SVG 문자열이 검색 결과에 출력되거나 DOM에 요소가 만들어지는 단계와 JavaScript 실행 단계는 따로 확인해야 한다.

**문제 설명과 판단 기준**

이 문제의 단서는 필터가 HTML과 SVG 구문을 동일하게 다루지 않는다는 점이다. 브라우저는 SVG를 HTML 문서 안에서 별도의 요소·이벤트 체계로 해석할 수 있으므로, 단순한 태그 차단 여부만 보고 실행 가능성을 판단하면 놓치는 부분이 생긴다.

검색값이 삽입되는 자리를 먼저 확인하고, 입력 유형을 한 번에 하나씩 바꾸며 요청 차단, 문자 인코딩, DOM 생성 여부를 기록한다. 허용되는 SVG 구조가 확인되면 이벤트가 어떤 조건에서 발생하는지 실제 브라우저에서 검증한다. 아직 허용 요소나 성공한 입력은 확인되지 않았다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/cross-site-scripting/contexts/lab-some-svg-markup-allowed)

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
