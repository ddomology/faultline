---
title: "Web cache poisoning via HTTP/2 request tunnelling"
tags:
  - portswigger
  - http-request-smuggling
lab_url: "https://portswigger.net/web-security/request-smuggling/advanced/request-tunnelling/lab-request-smuggling-h2-web-cache-poisoning-via-request-tunnelling"
difficulty: Expert
note_kind: problem
---

# Web cache poisoning via HTTP/2 request tunnelling

## 문제 조건과 설명

**주어진 조건**

프런트엔드는 HTTP/2 요청을 다운그레이드하며 수신 헤더를 일관되게 정리하지 않는다. 백엔드 연결은 재사용하지 않으므로 고전적인 후속 요청 밀어넣기는 적용되지 않지만 요청 터널링에는 취약하다. 모의 피해자는 15초마다 홈 페이지를 방문한다.

**완료 조건**

홈 페이지의 캐시를 오염시켜 피해자의 방문에서 `alert(1)`이 실행되게 한다. 터널 내부의 응답을 얻거나 내 요청에서 경고창이 뜨는 것과 피해자에게 배포되는 캐시 오염은 구별해야 한다.

**문제 설명과 판단 기준**

한 번의 HTTP/2 요청이 다운그레이드될 때 백엔드가 여러 메시지로 이해하면, 프런트엔드와 캐시가 응답을 다른 자원에 연결할 수 있다. 이 문제의 핵심은 연결을 다음 사용자와 공유하는 것이 아니라 터널의 응답이 홈 페이지 캐시 항목에 어떤 영향을 주는지다.

정상 홈 페이지 응답과 캐시 동작을 기준으로 잡는다. 헤더 변형으로 터널이 형성되는지 확인하고, 캐시 재조회에서 응답 변화가 유지되는지 검사한다. 15초 간격의 피해자 방문에서 `alert(1)` 실행을 최종 확인한다. 아직 오염된 캐시나 피해자 실행 기록은 없다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/request-smuggling/advanced/request-tunnelling/lab-request-smuggling-h2-web-cache-poisoning-via-request-tunnelling)

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
