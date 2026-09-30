---
title: "Client-side desync"
tags:
  - portswigger
  - http-request-smuggling
lab_url: "https://portswigger.net/web-security/request-smuggling/browser/client-side-desync/lab-client-side-desync"
difficulty: Expert
note_kind: problem
---

# Client-side desync

## 문제 조건과 설명

**주어진 조건**

일부 엔드포인트에서 서버가 `Content-Length`를 무시해 클라이언트 측 요청 동기화 오류가 생긴다. 공식 설명은 Burp에서 벡터를 찾은 다음 실제 브라우저에서 재현하고, 애플리케이션 안에 텍스트를 저장하는 기능과 결합하라고 명시한다.

**완료 조건**

피해자 브라우저가 교차 도메인 요청을 연속으로 보내는 과정에서 세션 쿠키가 노출되게 하고, 그 쿠키로 피해자 계정에 접근한다. Burp에서 경계 차이를 확인한 것과 브라우저에서 피해자 쿠키를 얻은 것은 별도의 단계다.

**문제 설명과 판단 기준**

클라이언트 측 desync는 서버가 본문 길이를 무시하는 경로를 브라우저가 재사용할 때 다음 요청의 해석에 영향을 줄 수 있다. 그러나 프록시 도구의 수동 요청이 동작해도 브라우저가 같은 연결·순서로 요청을 보내지 않으면 목표에 도달하지 못한다. 저장 기능은 노출된 요청 내용을 나중에 확인할 관찰 지점이 된다.

후보 엔드포인트의 길이 처리 반응을 Burp에서 확인하고 브라우저에서 같은 현상이 재현되는지 검증한다. 텍스트 저장 기능을 찾아 저장된 데이터와 브라우저 요청을 대응시킨 뒤, 피해자 쿠키 확보와 계정 접근을 차례로 확인한다. 아직 취약 경로나 저장 기능의 위치는 확인되지 않았다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/request-smuggling/browser/client-side-desync/lab-client-side-desync)

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
