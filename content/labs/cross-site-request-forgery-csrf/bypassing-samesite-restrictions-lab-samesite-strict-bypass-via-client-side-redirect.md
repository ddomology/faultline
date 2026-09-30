---
title: "SameSite Strict bypass via client-side redirect"
tags:
  - portswigger
  - cross-site-request-forgery-csrf
lab_url: "https://portswigger.net/web-security/csrf/bypassing-samesite-restrictions/lab-samesite-strict-bypass-via-client-side-redirect"
difficulty: Practitioner
note_kind: problem
---

# SameSite Strict bypass via client-side redirect

## 문제 조건과 설명

**주어진 조건**

이메일 변경 기능에 CSRF 취약점이 있고, 제목은 `SameSite=Strict` 제한과 클라이언트 측 리디렉션을 단서로 준다. 자기 계정은 `wiener:peter`이며 공격 페이지는 제공된 exploit server에 올려야 한다.

**완료 조건**

피해자가 exploit server의 페이지를 방문한 뒤 이메일 주소가 변경되도록 한다. 단순히 리디렉션이 일어나거나 변경 URL로 이동한 것만으로는 계정 변경을 증명하지 못한다.

**문제 설명과 판단 기준**

`SameSite=Strict`는 다른 사이트에서 시작한 요청에 인증 쿠키가 붙는 것을 제한할 수 있다. 제목의 브라우저 측 리디렉션은 사이트 내부 스크립트가 이어서 만들어 내는 탐색 흐름에 주목하라는 단서다. 다만 어느 페이지가 어떤 값을 받아 어디로 이동하는지는 직접 확인해야 한다.

먼저 정상 이메일 변경 요청과 세션 쿠키의 속성을 살핀다. 사이트 안에서 사용자 입력으로 발생하는 리디렉션이 있는지 확인하고, 각 이동 단계의 시작 사이트·도착 URL·전송된 쿠키를 브라우저에서 기록한다. 검증된 흐름을 exploit server의 HTML과 연결한 뒤 변경 결과를 확인한다. 아직 사용할 리디렉션이나 성공 결과는 관찰되지 않았다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/csrf/bypassing-samesite-restrictions/lab-samesite-strict-bypass-via-client-side-redirect)

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
