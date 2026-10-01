---
title: "Clobbering DOM attributes to bypass HTML filters"
tags:
  - portswigger
  - dom-based-vulnerabilities
lab_url: "https://portswigger.net/web-security/dom-based/dom-clobbering/lab-dom-clobbering-attributes-to-bypass-html-filters"
difficulty: Expert
note_kind: problem
---

# Clobbering DOM attributes to bypass HTML filters

## 문제 조건과 설명

**주어진 조건**

페이지가 HTMLJanitor 라이브러리로 HTML을 걸러 내지만 DOM clobbering에 취약하다. 공식 설명은 피해자 브라우저에서 자동 실행을 만들기 위해 exploit server가 필요할 수 있다고 안내한다. 의도된 방식은 Firefox에서 동작하지 않으므로 Chrome 사용이 권장된다.

**완료 조건**

필터를 통과한 HTML로 DOM의 이름·속성 해석에 영향을 주고, 그 결과 `print()`가 실행되어야 한다. HTML이 저장되거나 필터에서 살아남는 것만으로는 실행을 입증하지 못한다.

**문제 설명과 판단 기준**

이 문제에는 필터 통과와 실행이라는 별도 단계가 있다. 정화 라이브러리가 어떤 요소·속성을 남기는지 확인하고, 남은 DOM이 페이지 스크립트나 라이브러리의 변수 조회에 어떤 영향을 주는지 살펴야 한다. 제목은 속성 충돌을 단서로 주지만 구체적인 이름과 해석 경로는 실습에서 찾아야 한다.

먼저 입력 전후의 HTML과 Chrome 최종 DOM을 비교해 살아남은 구조를 기록한다. HTMLJanitor가 값을 읽는 부분과 페이지의 후속 사용 지점을 확인하고, 작은 이름 충돌부터 실행 여부를 시험한다. 자동 실행 조건이 필요하다면 exploit server 방문 흐름까지 검증한다. 아직 성공한 속성이나 입력은 확인되지 않았다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/dom-based/dom-clobbering/lab-dom-clobbering-attributes-to-bypass-html-filters)

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
