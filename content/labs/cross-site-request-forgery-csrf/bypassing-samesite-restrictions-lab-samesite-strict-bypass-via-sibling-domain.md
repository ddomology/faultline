---
title: "SameSite Strict bypass via sibling domain"
tags:
  - portswigger
  - cross-site-request-forgery-csrf
lab_url: "https://portswigger.net/web-security/csrf/bypassing-samesite-restrictions/lab-samesite-strict-bypass-via-sibling-domain"
difficulty: Practitioner
note_kind: problem
---

# SameSite Strict bypass via sibling domain

## 문제 조건과 설명

**주어진 조건**

이 문제의 대상은 이메일 변경이 아니라 실시간 채팅의 cross-site WebSocket hijacking(CSWSH)이다. 채팅 기록에는 로그인 자격 증명이 평문으로 들어 있다. 공격 페이지는 제공된 exploit server에 올리고, 빼낸 채팅 내용은 기본 Burp Collaborator 서버에서 받아야 한다. 공식 설명은 WebSocket 취약점 주제의 선행 학습도 권한다.

**완료 조건**

모의 피해자의 채팅 기록을 외부로 전송해 로그인 정보를 확인한 다음 피해자 계정에 로그인한다. WebSocket 연결 성공, 기록 수신, 실제 로그인은 서로 다른 검증 단계다.

**문제 설명과 판단 기준**

제목의 `SameSite=Strict`와 sibling domain은 쿠키의 사이트 경계와 WebSocket 연결의 출처 검증을 함께 살피라는 단서다. 같은 사이트로 취급되는 도메인과 같은 origin은 동일한 개념이 아니다. 따라서 브라우저가 세션 쿠키를 보내는지와 서버가 WebSocket 요청의 출처를 검사하는지 별도로 확인해야 한다.

자기 브라우저의 채팅 WebSocket 핸드셰이크와 메시지 구조를 관찰한다. exploit server에서 연결할 때 쿠키·`Origin`·서버 응답을 기록하고, 수신한 채팅이 Collaborator로 전달되는지 검증한다. 확보된 정보로 로그인까지 확인해야 완료다. 현재 성공 연결이나 피해자 기록은 없다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/csrf/bypassing-samesite-restrictions/lab-samesite-strict-bypass-via-sibling-domain)

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
