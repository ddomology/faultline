---
title: "HTTP/2 request smuggling via CRLF injection"
tags:
  - portswigger
  - http-request-smuggling
lab_url: "https://portswigger.net/web-security/request-smuggling/advanced/lab-request-smuggling-h2-request-smuggling-via-crlf-injection"
difficulty: Practitioner
note_kind: problem
---

# HTTP/2 request smuggling via CRLF injection

## 문제 조건과 설명

**주어진 조건**

프런트엔드는 HTTP/2 요청을 HTTP/1로 다운그레이드하면서 들어온 헤더를 충분히 정리하지 않는다. 모의 피해자는 15초마다 홈 페이지를 방문한다. 공식 설명은 HTTP/2 전용 요청 밀어넣기 기술과 Burp의 HTTP/2 시험 기능을 언급한다.

**완료 조건**

프로토콜 변환의 약점을 이용해 다른 사용자의 계정에 접근한다. 헤더가 변형되거나 피해자 요청과 응답이 엇갈린 것처럼 보이는 단계와 실제 계정 접근을 구분해야 한다.

**문제 설명과 판단 기준**

HTTP/2의 헤더 표현은 HTTP/1의 줄 단위 헤더와 다르다. 변환 과정에서 CRLF가 적절히 처리되지 않으면 백엔드가 받는 HTTP/1 메시지의 헤더나 요청 경계가 달라질 수 있다. 어느 헤더와 어떤 위치에서 문제가 생기는지는 공식 설명만으로 알 수 없다.

정상 HTTP/2 요청과 백엔드 반응을 기준으로 기록한다. Burp의 HTTP/2 입력 기능에서 헤더 문자를 단계적으로 바꾸며 다운그레이드 결과와 후속 요청의 응답을 비교한다. 피해자의 15초 방문 주기를 고려해 계정 접근에 필요한 값이 실제로 얻어졌는지 확인한다. 아직 성공한 입력이나 계정 접근은 관찰되지 않았다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/request-smuggling/advanced/lab-request-smuggling-h2-request-smuggling-via-crlf-injection)

## 탐색 및 풀이 기록

아직 작성하지 않았다. 직접 확인한 요청·응답, 시도한 이유와 결과를 이 파일에 이어서 기록한다.
