---
title: "CSRF where Referer validation depends on header being present"
tags:
  - portswigger
  - cross-site-request-forgery-csrf
lab_url: "https://portswigger.net/web-security/csrf/bypassing-referer-based-defenses/lab-referer-validation-depends-on-header-being-present"
difficulty: Practitioner
note_kind: problem
---

# CSRF where Referer validation depends on header being present

## 문제 조건과 설명

**주어진 조건**

이메일 변경 기능은 교차 도메인 요청을 막으려 하지만 안전하지 않은 대체 처리가 있다. 제목은 `Referer` 헤더가 있을 때와 없을 때 검증이 달라진다고 알려 준다. 정상 기능은 `wiener:peter`로 확인하며 공격 HTML은 exploit server에 올린다.

**완료 조건**

exploit server의 페이지를 본 사람의 이메일 주소를 변경한다. 재전송 도구에서 헤더를 지운 요청이 통과하는 것과, 실제 피해자 브라우저가 같은 형태의 요청을 보내는 것은 별도로 확인해야 한다.

**문제 설명과 판단 기준**

`Referer`는 브라우저가 요청의 출처 페이지를 알릴 때 사용하는 헤더다. 이 헤더가 없으면 거절하지 않는 방식은 출처 검증의 빈틈이 될 수 있다. 다만 브라우저의 리퍼러 정책과 페이지 탐색 방식에 따라 헤더 유무가 달라질 수 있으므로 서버 반응과 브라우저 동작을 나누어 시험해야 한다.

정상 이메일 변경 요청에서 `Referer`와 필요한 폼 필드를 기록한다. 헤더를 정상값·교차 사이트값·없는 상태로 바꿔 서버 결과를 비교하고, exploit server의 HTML로 실제 헤더를 어떻게 제어할 수 있는지 검증한다. 이메일 변경 확인 전에는 성공으로 적지 않는다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/csrf/bypassing-referer-based-defenses/lab-referer-validation-depends-on-header-being-present)

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
