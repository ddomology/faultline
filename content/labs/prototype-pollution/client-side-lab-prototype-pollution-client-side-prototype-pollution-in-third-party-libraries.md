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

아직 작성하지 않았다. 직접 확인한 요청·응답, 시도한 이유와 결과를 이 파일에 이어서 기록한다.
