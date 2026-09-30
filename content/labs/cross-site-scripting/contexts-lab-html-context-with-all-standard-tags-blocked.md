---
title: "Reflected XSS into HTML context with all tags blocked except custom ones"
tags:
  - portswigger
  - cross-site-scripting
lab_url: "https://portswigger.net/web-security/cross-site-scripting/contexts/lab-html-context-with-all-standard-tags-blocked"
difficulty: Practitioner
note_kind: problem
---

# Reflected XSS into HTML context with all tags blocked except custom ones

## 문제 조건과 설명

**주어진 조건**

입력은 HTML 문맥에 반사되지만 사이트는 표준 HTML 태그를 막고 사용자 정의 태그는 허용한다. 이 조건은 태그 이름에 대한 제한을 말하며, 허용된 마크업의 속성이나 이벤트 처리 방식까지 알려 주지는 않는다.

**완료 조건**

사용자 정의 태그를 주입해 `document.cookie` 값이 `alert()`에 자동으로 표시되게 한다. 빈 경고창이나 임의의 문구를 띄우는 것과 구별해야 하며, 별도의 클릭을 요구하는 입력은 조건에 맞지 않는다.

**문제 설명과 판단 기준**

표준 태그가 막혔다는 사실은 브라우저의 HTML 파싱 전체가 멈췄다는 뜻이 아니다. 사용자 정의 태그가 실제 DOM 요소로 만들어지는지, 그 요소에 넣은 속성이 유지되는지, 페이지 로드 흐름에서 실행 계기를 얻을 수 있는지를 순서대로 확인해야 한다.

먼저 검색 응답과 개발자 도구의 최종 DOM에서 태그와 속성의 변형을 비교한다. 그다음 사용자 동작 없이 이벤트가 발생하는지, 발생했다면 `document.cookie`를 전달하는지 검증한다. 어떤 사용자 정의 태그와 이벤트가 통과하는지는 아직 관찰 전이므로 특정 조합을 풀이 결과로 적지 않는다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/cross-site-scripting/contexts/lab-html-context-with-all-standard-tags-blocked)

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
