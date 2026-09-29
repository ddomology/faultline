---
title: "Exploiting blind XXE to exfiltrate data using a malicious external DTD"
tags:
  - portswigger
  - xml-external-entity-xxe-injection
lab_url: "https://portswigger.net/web-security/xxe/blind/lab-xxe-with-out-of-band-exfiltration"
difficulty: Practitioner
note_kind: problem
---

# Exploiting blind XXE to exfiltrate data using a malicious external DTD

## 문제 조건과 설명

**주어진 조건**

`Check stock` 기능이 XML 입력을 파싱하지만 결과는 표시하지 않는다. 외부 상호작용에는 제공된 exploit server와 기본 공개 Burp Collaborator 서버 중 하나 또는 둘 다를 사용할 수 있다.

**완료 조건**

`/etc/hostname` 파일 내용을 외부로 유출한다.

**문제 설명**

응답에 값이 보이지 않는 블라인드 XXE에서 외부 통신으로 파일 내용을 확인하는 목표다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/xxe/blind/lab-xxe-with-out-of-band-exfiltration)

## 탐색 및 풀이 기록

아직 작성하지 않았다. 직접 확인한 요청·응답, 시도한 이유와 결과를 이 파일에 이어서 기록한다.
