---
title: "DOM-based open redirection"
tags:
  - portswigger
  - dom-based-vulnerabilities
lab_url: "https://portswigger.net/web-security/dom-based/open-redirection/lab-dom-open-redirection"
difficulty: Practitioner
note_kind: problem
---

# DOM-based open redirection

## 문제 조건과 설명

**주어진 조건**

사이트에 DOM 기반 열린 리디렉션 취약점이 있다. 이동 대상의 결정은 브라우저 측 코드에서 이루어진다. 어떤 입력이 대상 URL을 제어하는지는 공식 설명에 제시되지 않았다.

**완료 조건**

피해자 브라우저를 제공된 exploit server로 리디렉션한다. HTML에 외부 주소가 나타나는 것과 브라우저가 실제로 그 주소로 이동하는 것은 구분해야 한다.

**문제 설명과 판단 기준**

열린 리디렉션은 원래 사이트의 기능을 통해 의도하지 않은 외부 주소로 사용자를 보내는 문제다. DOM 기반이라면 URL의 쿼리·해시·링크 등 클라이언트 측 입력을 스크립트가 읽고 이동을 실행하는지 살펴봐야 한다. 정확한 소스와 이동 API는 코드를 읽거나 브라우저 동작을 관찰해 확인한다.

먼저 페이지의 위치 변경 코드와 입력을 읽는 지점을 찾는다. 안전한 내부 주소로 동작을 확인한 다음 외부 목적지를 지정했을 때 이동이 허용되는지 검증한다. 최종 주소가 exploit server인지까지 확인한다. 아직 사용한 매개변수나 성공한 리디렉션은 기록되지 않았다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/dom-based/open-redirection/lab-dom-open-redirection)

## 탐색 및 풀이 기록

아직 작성하지 않았다. 직접 확인한 요청·응답, 시도한 이유와 결과를 이 파일에 이어서 기록한다.
