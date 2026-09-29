---
title: "Exploiting XXE via image file upload"
tags:
  - portswigger
  - xml-external-entity-xxe-injection
lab_url: "https://portswigger.net/web-security/xxe/lab-xxe-via-file-upload"
difficulty: Practitioner
note_kind: problem
---

# Exploiting XXE via image file upload

## 문제 조건

댓글에 아바타 이미지를 첨부할 수 있고 서버는 Apache Batik으로 이미지를 처리한다.

## 완료 조건

처리 뒤 `/etc/hostname` 내용이 표시되는 이미지를 올리고 `Submit solution` 버튼으로 서버 호스트 이름을 제출한다.

## 문제 설명

파일 업로드와 이미지 처리 과정이 XXE 입력 지점이다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/xxe/lab-xxe-via-file-upload)
