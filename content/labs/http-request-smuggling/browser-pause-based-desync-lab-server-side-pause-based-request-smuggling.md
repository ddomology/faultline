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

## 문제 조건과 설명

**주어진 조건**

프런트엔드는 요청을 백엔드로 스트리밍하고, 백엔드는 일부 엔드포인트에서 타임아웃이 나도 연결을 닫지 않는다. 공식 설명은 시간 간격을 제어하는 이 실습에 Burp의 Turbo Intruder 확장이 필요하다고 명시한다.

**완료 조건**

일시 정지 기반 CL.0 동기화 오류를 찾고 백엔드에 `/admin` 요청을 밀어 넣어 `carlos`를 삭제한다. 타임아웃을 관찰하거나 관리자 화면을 보는 단계와 삭제 완료를 구별해야 한다.

**문제 설명과 판단 기준**

요청 본문을 한 번에 보내는 실험과 달리, 이 문제에서는 바이트를 보내는 시점이 두 서버의 요청 경계 판단에 영향을 준다. 프런트엔드가 계속 전달하는 동안 백엔드가 일부 경로에서 타임아웃 후 연결을 유지한다는 조건이 핵심이다. 어느 경로와 지연에서 차이가 생기는지는 직접 측정해야 한다.

정상 요청과 타임아웃 반응을 기준으로 기록한다. Turbo Intruder로 전송 사이의 일시 정지를 조절하며 후속 요청의 응답을 비교하고, 경계 차이가 확인된 경우에만 관리자 접근과 삭제를 시험한다. 아직 취약 엔드포인트나 성공한 지연 값은 관찰되지 않았다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/request-smuggling/browser/pause-based-desync/lab-server-side-pause-based-request-smuggling)

## 탐색 및 풀이 기록

아직 작성하지 않았다. 직접 확인한 요청·응답, 시도한 이유와 결과를 이 파일에 이어서 기록한다.
