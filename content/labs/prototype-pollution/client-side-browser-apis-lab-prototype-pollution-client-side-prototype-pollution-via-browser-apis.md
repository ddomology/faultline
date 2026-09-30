---
title: "Client-side prototype pollution via browser APIs"
tags:
  - portswigger
  - prototype-pollution
lab_url: "https://portswigger.net/web-security/prototype-pollution/client-side/browser-apis/lab-prototype-pollution-client-side-prototype-pollution-via-browser-apis"
difficulty: Practitioner
note_kind: problem
---

# Client-side prototype pollution via browser APIs

## 문제 조건과 설명

**주어진 조건**

클라이언트 측 프로토타입 오염으로 DOM XSS가 가능하다. 개발자가 잠재적인 가젯을 발견해 막으려 했지만 그 조치는 우회 가능하다. 제목은 브라우저 API가 관여하는 경로를 단서로 준다. 브라우저에서 직접 탐색하거나 DOM Invader를 사용할 수 있다.

**완료 조건**

전역 `Object.prototype`에 임의 속성을 추가할 수 있는 소스와 JavaScript 실행에 연결되는 가젯을 찾아 결합하고 `alert()`를 호출한다. 속성 추가만 확인하거나 기존 가젯의 차단을 확인하는 데 그치면 완료되지 않는다.

**문제 설명과 판단 기준**

먼저 URL·브라우저 상태 등 사용자가 바꿀 수 있는 값이 페이지 스크립트의 객체 병합에 들어가는지 관찰한다. 새 객체에서 의도하지 않은 상속 속성이 보이면 오염의 근거가 된다. 이어 그 속성을 읽는 DOM 처리 코드를 찾아, 패치가 막은 입력과 실제 브라우저 API의 해석 사이에 차이가 있는지 확인해야 한다.

오염 소스와 가젯을 각각 확인한 다음 같은 페이지 흐름에서 `alert()`가 실행되는지 검증한다. 패치 우회 근거와 실행 결과를 아래에 기록한다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/prototype-pollution/client-side/browser-apis/lab-prototype-pollution-client-side-prototype-pollution-via-browser-apis)

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
