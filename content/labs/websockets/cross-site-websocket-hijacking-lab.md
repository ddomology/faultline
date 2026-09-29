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

## 문제 조건

온라인 쇼핑몰의 실시간 채팅이 WebSocket으로 구현되어 있다. 임의의 외부 시스템은 차단되므로 제공된 exploit server나 기본 공개 Burp Collaborator 서버를 사용해야 한다.

## 완료 조건

exploit server에 HTML/JavaScript를 게시해 피해자의 채팅 기록을 외부로 보낸 뒤 그 정보로 계정에 접근한다.

## 문제 설명

사이트 간 WebSocket 연결에서 인증 정보와 대화 기록이 어떻게 보호되는지 확인하는 문제다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/websockets/cross-site-websocket-hijacking/lab)
