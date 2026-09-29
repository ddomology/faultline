---
title: "Blind XXE with out-of-band interaction"
tags:
  - portswigger
  - xml-external-entity-xxe-injection
lab_url: "https://portswigger.net/web-security/xxe/blind/lab-xxe-with-out-of-band-interaction"
difficulty: Practitioner
note_kind: problem
---

# Blind XXE with out-of-band interaction

## 문제 조건과 설명

**주어진 조건**

`Check stock` 기능이 XML을 파싱하지만 결과는 표시하지 않는다. 실습 방화벽 때문에 기본 공개 Burp Collaborator 서버를 사용해야 한다.

**완료 조건**

외부 엔티티로 XML 파서가 Burp Collaborator에 DNS 조회와 HTTP 요청을 보내게 한다.

**문제 설명**

응답 내용 대신 외부 통신으로 XXE 실행을 확인하는 문제다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/xxe/blind/lab-xxe-with-out-of-band-interaction)

## 탐색 및 풀이 기록

아직 작성하지 않았다. 직접 확인한 요청·응답, 시도한 이유와 결과를 이 파일에 이어서 기록한다.
