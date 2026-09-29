---
title: "Response queue poisoning via H2.TE request smuggling"
tags:
  - portswigger
  - http-request-smuggling
lab_url: "https://portswigger.net/web-security/request-smuggling/advanced/response-queue-poisoning/lab-request-smuggling-h2-response-queue-poisoning-via-te-request-smuggling"
difficulty: Practitioner
note_kind: problem
---

# Response queue poisoning via H2.TE request smuggling

## 문제 조건과 설명

**주어진 조건**

프런트엔드는 길이가 모호한 HTTP/2 요청도 HTTP/1로 다운그레이드한다. 관리자는 약 15초마다 로그인하고 백엔드 연결은 요청 10개마다 재설정된다. 제목은 H2.TE 방식과 응답 큐 포이즈닝을 단서로 준다.

**완료 조건**

응답 순서가 어긋나는 상황을 이용해 `/admin`에 들어가 `carlos`를 삭제한다. 응답이 한 번 뒤바뀌거나 관리자 응답을 보기만 하는 것과 실제 삭제 완료를 구별한다.

**문제 설명과 판단 기준**

HTTP/2 프런트엔드와 HTTP/1 백엔드가 요청 경계를 다르게 해석하면, 백엔드의 응답이 원래 요청이 아닌 다른 요청에 배정될 수 있다. 이 문제는 단순히 숨은 요청을 실행하는 단계보다 응답이 누구에게 전달되는지가 중요하다. 관리자의 정기 로그인과 10회마다 연결 재설정은 시도 순서를 해석할 때 필요한 조건이다.

먼저 정상 요청의 응답 순서를 기록하고 다운그레이드 후 길이 해석 차이가 생기는지 확인한다. 관리자 로그인 주기와 백엔드 연결 재설정을 고려해 응답 배정 변화를 관찰한 뒤, 관리자 접근과 삭제 결과를 각각 검증한다. 아직 재현된 응답 혼선은 없다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/request-smuggling/advanced/response-queue-poisoning/lab-request-smuggling-h2-response-queue-poisoning-via-te-request-smuggling)

## 탐색 및 풀이 기록

아직 작성하지 않았다. 직접 확인한 요청·응답, 시도한 이유와 결과를 이 파일에 이어서 기록한다.
