---
title: "Reflected XSS into HTML context with most tags and attributes blocked"
tags:
  - portswigger
  - cross-site-scripting
lab_url: "https://portswigger.net/web-security/cross-site-scripting/contexts/lab-html-context-with-most-tags-and-attributes-blocked"
difficulty: Practitioner
note_kind: problem
---

# Reflected XSS into HTML context with most tags and attributes blocked

## 문제 조건과 설명

**주어진 조건**

검색 기능의 입력이 HTML 문맥에 반사되며, WAF가 흔한 XSS 태그와 속성을 차단한다. 문제 설명은 사용자의 추가 조작 없이 동작하는 입력을 요구한다. 브라우저에서 직접 `print()`를 호출해 보는 행동은 실습의 성공 조건에 포함되지 않는다.

**완료 조건**

WAF를 통과한 입력이 페이지에 반사되고, 페이지를 여는 과정에서 자동으로 `print()`가 호출되어야 한다. 요청이 200으로 끝나거나 검색어가 화면에 보이는 것과 실제 실행은 별개로 확인해야 한다.

**문제 설명과 판단 기준**

여기에는 두 관문이 있다. 먼저 서버 측 WAF가 입력을 받아들이는지, 다음으로 브라우저가 받아들인 마크업을 실행 가능한 형태로 해석하는지다. 특정 태그가 차단된 사실만으로 다른 태그나 속성까지 모두 차단된다고 결론내릴 수 없고, 반대로 입력이 허용되었다고 해서 자동 실행이 보장되지도 않는다.

탐색에서는 작은 입력부터 검색 요청의 응답 상태와 반사 위치를 기록하고, 차단과 인코딩과 단순 반사를 서로 구별한다. 허용되는 구조가 확인되면 클릭·키 입력 없이 페이지 로드만으로 동작하는지 시험한다. 허용 목록이나 실제 성공 조합은 문제 설명에 제시되지 않았으므로 결과를 미리 단정하지 않는다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/cross-site-scripting/contexts/lab-html-context-with-most-tags-and-attributes-blocked)

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
