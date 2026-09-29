---
title: "Exploiting XXE to retrieve data by repurposing a local DTD"
tags:
  - portswigger
  - xml-external-entity-xxe-injection
lab_url: "https://portswigger.net/web-security/xxe/blind/lab-xxe-trigger-error-message-by-repurposing-local-dtd"
difficulty: Expert
note_kind: problem
---

# Exploiting XXE to retrieve data by repurposing a local DTD

## 문제 조건과 설명

**주어진 조건**

`Check stock` 기능이 XML을 파싱하지만 결과는 표시하지 않는다. 서버에 이미 있는 DTD 파일을 참조하고 그 안의 엔티티를 재정의해야 한다.

**완료 조건**

`/etc/passwd` 파일 내용이 들어 있는 오류 메시지를 발생시킨다.

**문제 설명**

로컬 DTD와 오류 출력을 이용하는 블라인드 XXE 조건이다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/xxe/blind/lab-xxe-trigger-error-message-by-repurposing-local-dtd)

## 탐색 및 풀이 기록

아직 작성하지 않았다. 직접 확인한 요청·응답, 시도한 이유와 결과를 이 파일에 이어서 기록한다.
