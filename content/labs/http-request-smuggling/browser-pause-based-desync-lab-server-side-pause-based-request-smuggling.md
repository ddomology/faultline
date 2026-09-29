---
title: "Server-side pause-based request smuggling"
tags:
  - portswigger
  - http-request-smuggling
lab_url: "https://portswigger.net/web-security/request-smuggling/browser/pause-based-desync/lab-server-side-pause-based-request-smuggling"
difficulty: Expert
note_kind: problem
---

# Server-side pause-based request smuggling

## 문제 조건

프런트엔드는 요청을 백엔드에 스트리밍하지만 백엔드는 일부 엔드포인트에서 타임아웃 후 연결을 닫지 않는다. 이 과제에는 `Turbo Intruder` 확장이 필요하다.

## 완료 조건

일시 정지 기반 CL.0 동기화 오류를 확인하고 `/admin`에 접근해 `carlos`를 삭제한다.

## 문제 설명

시간에 따른 두 서버의 연결 처리 차이가 요청 경계를 바꾸는 문제다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/request-smuggling/browser/pause-based-desync/lab-server-side-pause-based-request-smuggling)
