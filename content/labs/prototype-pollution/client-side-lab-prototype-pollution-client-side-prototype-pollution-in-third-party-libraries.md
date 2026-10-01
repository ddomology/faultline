---
title: "Client-side prototype pollution in third-party libraries"
tags:
  - portswigger
  - prototype-pollution
lab_url: "https://portswigger.net/web-security/prototype-pollution/client-side/lab-prototype-pollution-client-side-prototype-pollution-in-third-party-libraries"
difficulty: Practitioner
note_kind: problem
---

# Client-side prototype pollution in third-party libraries

## 문제 조건과 설명

**주어진 조건**

축약된 서드파티 라이브러리 코드에 DOM XSS 가젯이 있어 수동 분석으로 놓치기 쉽다. 공식 문제는 DOM Invader로 오염 소스와 가젯을 찾을 것을 권장한다. 피해자에게 입력을 전달할 수 있는 exploit server가 제공된다.

**완료 조건**

DOM Invader로 오염 소스와 가젯을 확인하고, exploit server에서 피해자에게 전달한 입력으로 그 브라우저에서 `alert(document.cookie)`를 실행한다. 자신의 브라우저에서만 팝업이 뜨는 것은 목표와 다르다.

**문제 설명과 판단 기준**

먼저 도구가 제시한 소스가 실제로 `Object.prototype`에 속성을 추가하는지 재현한다. 이어 축약된 라이브러리의 어느 속성 읽기가 DOM의 실행 가능한 위치로 이어지는지 확인한다. 자동 보고가 있어도 소스와 가젯이 동일한 페이지 로드에서 연결되는지 검증해야 한다.

피해자가 여는 URL의 입력이 같은 흐름을 재현하는지 확인하고 최종 실행 결과를 기록한다. 발견 근거와 전달 단계의 응답을 구분해 남긴다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/prototype-pollution/client-side/lab-prototype-pollution-client-side-prototype-pollution-in-third-party-libraries)

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
