---
title: "DOM XSS via client-side prototype pollution"
tags:
  - portswigger
  - prototype-pollution
lab_url: "https://portswigger.net/web-security/prototype-pollution/client-side/lab-prototype-pollution-dom-xss-via-client-side-prototype-pollution"
difficulty: Practitioner
note_kind: problem
---

# DOM XSS via client-side prototype pollution

## 문제 조건과 설명

**주어진 조건**

사이트에는 클라이언트 측 프로토타입 오염을 통해 DOM XSS로 이어지는 경로가 있다. 오염 소스와 가젯의 위치는 주어지지 않는다. 브라우저에서 직접 살펴보거나 DOM Invader로 흐름을 추적할 수 있다.

**완료 조건**

전역 `Object.prototype`에 속성을 추가하는 소스와 임의 JavaScript 실행 가젯을 결합해 `alert()`를 실행한다. 화면에 입력이 반사되는 현상만으로는 프로토타입 오염이나 XSS가 입증되지 않는다.

**문제 설명과 판단 기준**

먼저 페이지가 사용자 입력을 객체로 변환하거나 병합하는 지점을 찾고, 새 객체에서 예상하지 않은 속성이 상속되는지 확인한다. 그다음 페이지 스크립트가 객체에 자기 속성이 없을 때 어떤 기본값을 읽어 DOM을 만드는지 살핀다. 오염된 속성이 실제 DOM 실행 문맥에 도달해야 가젯이라고 판단할 수 있다.

소스의 재현성, 가젯 속성의 사용 지점, 최종 `alert()` 실행을 분리해 확인한다. 탐색한 요청과 브라우저 관찰을 아래에 기록한다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/prototype-pollution/client-side/lab-prototype-pollution-dom-xss-via-client-side-prototype-pollution)

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
