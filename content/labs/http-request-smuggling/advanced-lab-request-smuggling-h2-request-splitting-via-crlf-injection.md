---
title: "HTTP/2 request splitting via CRLF injection"
tags:
  - portswigger
  - http-request-smuggling
lab_url: "https://portswigger.net/web-security/request-smuggling/advanced/lab-request-smuggling-h2-request-splitting-via-crlf-injection"
difficulty: Practitioner
note_kind: problem
---

# HTTP/2 request splitting via CRLF injection

## 문제 조건과 설명

**주어진 조건**

프런트엔드는 HTTP/2 요청을 HTTP/1로 다운그레이드하면서 수신 헤더를 충분히 정리하지 않는다. 관리자는 약 10초마다 로그인하고, 백엔드 연결은 요청 10개마다 재설정된다. 제목은 CRLF를 통한 요청 분할을 단서로 준다.

**완료 조건**

응답 큐 포이즈닝으로 `/admin`에 관리자 권한으로 들어가 `carlos`를 삭제한다. 한 번의 응답 혼선이나 관리자 화면 노출과 실제 삭제 완료는 구별해야 한다.

**문제 설명과 판단 기준**

HTTP/2 헤더가 HTTP/1의 줄 단위 메시지로 바뀌는 과정에서 구분자가 제대로 정리되지 않으면 백엔드는 예상보다 많은 요청을 볼 수 있다. 그러면 뒤따르는 요청과 응답의 대응도 어긋날 수 있다. 관리자 로그인 주기와 연결 재설정 주기는 이 혼선을 관찰할 때 시간과 시도 횟수를 판단하는 기준이다.

정상 HTTP/2 요청과 응답 순서를 먼저 기록한다. 헤더 변형이 백엔드의 요청 경계를 바꾸는지 작은 입력으로 검증한 뒤, 관리자 로그인 시점 전후의 응답 배정을 비교한다. 관리자 접근과 `carlos` 삭제를 각각 확인한다. 아직 성공한 분할 요청이나 응답 혼선은 기록되지 않았다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/request-smuggling/advanced/lab-request-smuggling-h2-request-splitting-via-crlf-injection)

## 탐색 및 풀이 기록

아직 작성하지 않았다. 직접 확인한 요청·응답, 시도한 이유와 결과를 이 파일에 이어서 기록한다.
