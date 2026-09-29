---
title: "Exploiting XInclude to retrieve files"
tags:
  - portswigger
  - xml-external-entity-xxe-injection
lab_url: "https://portswigger.net/web-security/xxe/lab-xinclude-attack"
difficulty: Practitioner
note_kind: problem
---

# Exploiting XInclude to retrieve files

## 문제 조건과 설명

**주어진 조건**

`Check stock` 입력이 서버 측 XML 문서의 일부로 삽입된 후 파싱된다. XML 문서 전체를 제어하지 못해 DTD를 정의할 수 없다.

**완료 조건**

XInclude 구문으로 `/etc/passwd` 파일 내용을 가져온다.

**문제 설명**

부분적인 XML 입력만 제어할 수 있다는 제약 아래 파일 조회를 목표로 한다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/xxe/lab-xinclude-attack)

## 탐색 및 풀이 기록

아직 작성하지 않았다. 직접 확인한 요청·응답, 시도한 이유와 결과를 이 파일에 이어서 기록한다.
