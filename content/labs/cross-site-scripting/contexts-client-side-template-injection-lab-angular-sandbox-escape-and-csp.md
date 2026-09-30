---
title: "Reflected XSS with AngularJS sandbox escape and CSP"
tags:
  - portswigger
  - cross-site-scripting
lab_url: "https://portswigger.net/web-security/cross-site-scripting/contexts/client-side-template-injection/lab-angular-sandbox-escape-and-csp"
difficulty: Expert
note_kind: problem
---

# Reflected XSS with AngularJS sandbox escape and CSP

## 문제 조건과 설명

**주어진 조건**

페이지에 AngularJS와 CSP가 함께 적용된다. 따라서 입력이 템플릿에서 평가되는지와, 브라우저 정책이 스크립트 실행을 허용하는지는 별도로 따져야 한다. 공식 설명은 CSP 지시문이나 AngularJS 버전, 입력 위치를 구체적으로 제시하지 않는다.

**완료 조건**

CSP 제약을 통과하고 AngularJS 샌드박스를 벗어나 `document.cookie`를 `alert()`에 표시한다. 임의의 경고창을 띄우거나 쿠키 문자열이 화면에 출력되는 것만으로는 명시된 목표를 충족하지 않는다.

**문제 설명과 판단 기준**

AngularJS 템플릿의 평가, 샌드박스 제한, CSP 차단은 서로 다른 층에서 발생한다. 어느 단계에서 실패했는지를 구분하지 않으면 표현식 자체의 오류를 CSP 문제로 오인하거나 그 반대로 판단할 수 있다. 특히 정책에 의해 거부된 실행은 브라우저 콘솔에 남을 수 있다.

먼저 응답의 CSP 헤더 또는 문서 정책과 AngularJS가 처리하는 DOM 범위를 확인한다. 작은 표현식으로 템플릿 평가 여부를 살핀 뒤 콘솔의 정책 위반 및 JavaScript 오류를 분리해 기록한다. 최종 검증은 실제 `document.cookie` 값이 경고창에 나타나는지로 한다. 아직 정책 내용이나 성공 표현식은 확인되지 않았다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/cross-site-scripting/contexts/client-side-template-injection/lab-angular-sandbox-escape-and-csp)

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
