---
title: "DOM XSS via an alternative prototype pollution vector"
tags:
  - portswigger
  - prototype-pollution
lab_url: "https://portswigger.net/web-security/prototype-pollution/client-side/lab-prototype-pollution-dom-xss-via-an-alternative-prototype-pollution-vector"
difficulty: Practitioner
note_kind: problem
---

# DOM XSS via an alternative prototype pollution vector

## 문제 조건과 설명

**주어진 조건**

클라이언트 측 프로토타입 오염으로 DOM XSS가 가능하다. 제목은 일반적으로 먼저 떠올리는 입력 방식 외의 오염 경로도 살펴보라는 단서다. 정확한 입력 구조와 스크립트의 병합 방식은 직접 확인해야 한다.

**완료 조건**

전역 `Object.prototype`에 임의 속성을 추가할 수 있는 소스와 JavaScript 실행 가젯을 결합해 `alert()`를 실행한다. 통상적인 경로에서 반응이 없다는 사실만으로 오염 가능성을 배제할 수 없다.

**문제 설명과 판단 기준**

사용자가 제어하는 데이터가 페이지 코드에서 어떤 객체 구조로 바뀌는지 추적한다. 특정 키 표기만 시험하기보다 파서·병합 함수가 다른 표현을 같은 프로토타입 경로로 해석하는지 비교하면 대체 벡터를 찾을 수 있다. 속성 추가의 증거가 확보된 뒤에야 그 속성을 읽는 DOM 가젯을 찾는 순서가 명확하다.

입력 표현, 변환된 객체, 상속 속성, DOM 실행 결과를 이어서 검증한다. 실제로 통과한 경로만 아래에 기록한다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/prototype-pollution/client-side/lab-prototype-pollution-dom-xss-via-an-alternative-prototype-pollution-vector)

## 탐색 및 풀이 기록

아직 작성하지 않았다. 직접 확인한 요청·응답, 시도한 이유와 결과를 이 파일에 이어서 기록한다.
