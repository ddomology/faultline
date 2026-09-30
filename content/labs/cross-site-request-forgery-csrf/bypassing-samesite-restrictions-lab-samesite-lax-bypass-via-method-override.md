---
title: "SameSite Lax bypass via method override"
tags:
  - portswigger
  - cross-site-request-forgery-csrf
lab_url: "https://portswigger.net/web-security/csrf/bypassing-samesite-restrictions/lab-samesite-lax-bypass-via-method-override"
difficulty: Practitioner
note_kind: problem
---

# SameSite Lax bypass via method override

## 문제 조건과 설명

**주어진 조건**

이메일 변경 기능에 CSRF 취약점이 있다. 제목은 `SameSite=Lax` 제한과 요청 메서드 재지정을 단서로 준다. 공격에는 제공된 exploit server를 사용하고, 정상 기능은 `wiener:peter`로 확인할 수 있다. 모의 피해자가 Chrome을 사용하므로 공식 설명은 Chrome이나 Burp 내장 Chromium으로 시험하라고 권한다.

**완료 조건**

exploit server에서 시작한 공격으로 피해자의 이메일 주소를 변경한다. 브라우저가 요청을 보냈다는 사실과 세션 쿠키가 함께 전송되어 변경이 승인되었다는 사실을 구별해야 한다.

**문제 설명과 판단 기준**

`SameSite`는 교차 사이트 상황에서 쿠키가 붙는 조건을 제한한다. 메서드 재지정이 지원된다면 브라우저가 보낸 메서드와 서버가 처리한 메서드가 달라질 수 있다. 하지만 실제 재지정 매개변수나 쿠키 속성은 실습에서 확인해야 하며, 다른 브라우저의 동작으로 Chrome 결과를 추정하면 안 된다.

자기 계정의 정상 변경 요청과 세션 쿠키 속성을 기록한다. Chrome에서 exploit server로부터 시작하는 요청의 메서드·쿠키·서버 응답을 확인하고, 메서드 재지정 기능의 유무와 처리 결과를 따로 시험한다. 마지막에는 피해자 이메일의 변경을 검증한다. 아직 성공 요청은 확인되지 않았다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/csrf/bypassing-samesite-restrictions/lab-samesite-lax-bypass-via-method-override)

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
