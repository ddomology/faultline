---
title: "Client-side prototype pollution via flawed sanitization"
tags:
  - portswigger
  - prototype-pollution
lab_url: "https://portswigger.net/web-security/prototype-pollution/client-side/lab-prototype-pollution-client-side-prototype-pollution-via-flawed-sanitization"
difficulty: Practitioner
note_kind: problem
---

# Client-side prototype pollution via flawed sanitization

## 문제 조건과 설명

**주어진 조건**

개발자가 프로토타입 오염을 막으려는 입력 정제 조치를 넣었지만 쉽게 우회할 수 있다. 사이트는 클라이언트 측 오염으로 DOM XSS에 취약하다. 어떤 문자열을 어느 단계에서 정제하는지는 주어지지 않았다.

**완료 조건**

전역 `Object.prototype`에 속성을 추가하는 소스와 JavaScript 실행 가젯을 찾아 결합하고 `alert()`를 호출한다. 정제 규칙의 허점만 발견해도 속성 오염과 실행이 확인되지 않으면 완료가 아니다.

**문제 설명과 판단 기준**

정상 입력과 차단되는 입력을 비교해 정제 전후의 형태를 관찰한다. 문자열 필터가 막는 표현과 파서·객체 병합이 최종적으로 해석하는 표현이 다르면 오염 경로가 남을 수 있다. 필터의 반응과 새로운 객체에서 상속되는 속성의 변화를 별개로 확인해야 우회가 실제로 작동했는지 판단할 수 있다.

오염이 확인되면 해당 속성을 읽는 DOM 가젯을 찾아 `alert()` 실행까지 검증한다. 정제 단계의 관찰과 실행 결과를 아래에 기록한다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/prototype-pollution/client-side/lab-prototype-pollution-client-side-prototype-pollution-via-flawed-sanitization)

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
