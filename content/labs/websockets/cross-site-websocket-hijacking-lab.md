---
title: "Cross-site WebSocket hijacking"
tags:
  - portswigger
  - websockets
lab_url: "https://portswigger.net/web-security/websockets/cross-site-websocket-hijacking/lab"
difficulty: Practitioner
note_kind: problem
---

# Cross-site WebSocket hijacking

## 문제 조건과 설명

**주어진 조건**

온라인 쇼핑몰은 WebSocket 기반 실시간 채팅을 제공한다. 문제는 제공된 exploit server에 HTML/JavaScript를 게시해 피해자 브라우저에서 사이트 간 WebSocket 연결을 만들도록 요구한다. 실습 방화벽이 임의 외부 시스템과의 통신을 막으므로, 제공된 exploit server 또는 기본 공개 Burp Collaborator 서버를 사용해야 한다.

**완료 조건**

피해자의 채팅 기록을 전달받고 그 안의 정보를 이용해 피해자 계정에 접근한다. WebSocket 연결 성립, 기록 수신, 계정 접근은 각각 확인할 단계다.

**문제 설명과 판단 기준**

먼저 자신의 채팅 연결 요청에서 쿠키, `Origin`, 서버 응답, 기록을 가져오는 메시지 흐름을 확인한다. 다른 출처의 페이지가 연결을 시작했을 때 브라우저가 인증 정보를 동반하는지와 서버가 출처를 검사하는지가 핵심이다. 연결만 열린 상태와 실제 대화 기록이 전달된 상태를 구분해야 한다.

수신한 기록에서 계정 접근에 필요한 정보가 무엇인지 확인하고, 최종 로그인으로 검증한다. 페이로드를 게시한 위치, 연결·수신 결과, 계정 접근 결과를 아래 기록에 나눠 남긴다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/websockets/cross-site-websocket-hijacking/lab)

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
