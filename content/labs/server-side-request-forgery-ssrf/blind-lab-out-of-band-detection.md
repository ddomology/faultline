---
title: "Blind SSRF with out-of-band detection"
tags:
  - portswigger
  - server-side-request-forgery-ssrf
lab_url: "https://portswigger.net/web-security/ssrf/blind/lab-out-of-band-detection"
difficulty: Practitioner
note_kind: problem
---

# Blind SSRF with out-of-band detection

## 문제 조건과 설명

**주어진 조건**

상품 페이지가 열릴 때 분석 소프트웨어가 `Referer` 헤더에 적힌 URL을 가져온다. 실습 방화벽으로 외부 통신은 기본 공개 Burp Collaborator 서버를 사용해야 한다.

**완료 조건**

이 동작으로 공개 Burp Collaborator 서버에 HTTP 요청을 발생시킨다.

**문제 설명**

응답에 내부 요청 결과가 보이지 않는 블라인드 SSRF의 탐지 문제다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/ssrf/blind/lab-out-of-band-detection)

## 탐색 및 풀이 기록

아직 작성하지 않았다. 직접 확인한 요청·응답, 시도한 이유와 결과를 이 파일에 이어서 기록한다.
