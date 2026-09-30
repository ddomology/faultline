---
title: "Reflected XSS protected by CSP, with CSP bypass"
tags:
  - portswigger
  - cross-site-scripting
lab_url: "https://portswigger.net/web-security/cross-site-scripting/content-security-policy/lab-csp-bypass"
difficulty: Expert
note_kind: problem
---

# Reflected XSS protected by CSP, with CSP bypass

## 문제 조건과 설명

**주어진 조건**

페이지에 반사형 XSS가 있지만 CSP가 스크립트 실행을 제한한다. 공식 설명에 따르면 의도된 해결 방식은 Chrome에서만 가능하다. 반사 자체와 CSP를 통과한 실행은 별개의 조건이다.

**완료 조건**

CSP를 우회해 Chrome에서 `alert()`를 호출한다. 입력이 HTML에 나타나거나 Chrome 외 브라우저에서 다른 결과가 나오는 것은 공식 성공 조건을 판단하는 근거로 부족하다.

**문제 설명과 판단 기준**

CSP는 허용하는 스크립트 출처와 실행 방식을 브라우저에 지시한다. 그래서 단순한 태그 차단 문제처럼 반사 입력만 보면 안 된다. 어떤 정책이 실제 응답에 적용되는지, 삽입 위치가 HTML 텍스트인지 속성인지, Chrome에서 어떤 위반이 기록되는지를 함께 확인해야 한다.

먼저 CSP 응답 헤더와 반사 지점의 HTML 문맥을 기록한다. 작은 입력으로 파싱 여부를 확인한 다음 Chrome 콘솔의 정책 위반 메시지와 JavaScript 오류를 분리해 본다. 정책 내용과 허용된 실행 경로를 확인하기 전에는 특정 우회법을 성공한 풀이로 적지 않는다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/cross-site-scripting/content-security-policy/lab-csp-bypass)

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
