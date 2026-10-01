---
title: "Reflected XSS protected by very strict CSP, with dangling markup attack"
tags:
  - portswigger
  - cross-site-scripting
lab_url: "https://portswigger.net/web-security/cross-site-scripting/content-security-policy/lab-very-strict-csp-with-dangling-markup-attack"
difficulty: Practitioner
note_kind: problem
---

# Reflected XSS protected by very strict CSP, with dangling markup attack

## 문제 조건과 설명

**주어진 조건**

엄격한 CSP가 외부 도메인에서 하위 리소스를 불러오는 것을 막는다. 공식 설명은 폼 하이재킹으로 CSP를 우회하라고 명시한다. 모의 사용자가 누를 수 있도록 입력에는 `Click` 문구가 보여야 하며, 외부 상호작용에는 제공된 exploit server를 사용해야 한다. 정상 기능을 살펴볼 자기 계정은 `wiener:peter`다.

**완료 조건**

모의 피해자의 CSRF 토큰을 외부로 보내고, 그 토큰으로 피해자의 이메일을 `hacker@evil-user.net`으로 변경한다. 클릭 유도, 토큰 수신, 이메일 변경은 각각 확인이 필요한 단계다.

**문제 설명과 판단 기준**

정책이 외부 하위 리소스 로드를 막더라도 모든 사용자 동작이나 폼 동작까지 같은 방식으로 막는다고 단정할 수 없다. 제목의 dangling markup은 마크업 경계가 정상적으로 닫히지 않을 때 뒤따르는 문서가 어떻게 해석되는지 살펴보라는 단서다. 구체적인 반사 위치와 CSP 지시문은 실습에서 확인해야 한다.

자기 계정으로 이메일 변경 폼과 CSRF 토큰 위치를 확인한 뒤, 반사 지점의 앞뒤 HTML과 CSP를 조사한다. 브라우저가 만든 최종 DOM, `Click` 표시, 클릭 후 exploit server로 도착한 데이터, 이메일 변경 결과를 순서대로 검증한다. 아직 토큰 수신이나 성공한 입력은 관찰되지 않았다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/cross-site-scripting/content-security-policy/lab-very-strict-csp-with-dangling-markup-attack)

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
