---
title: "File path traversal, simple case"
tags:
  - portswigger
  - path-traversal
lab_url: "https://portswigger.net/web-security/file-path-traversal/lab-simple"
difficulty: Apprentice
note_kind: problem
---

# File path traversal, simple case

## 문제 조건

상품 이미지 표시 기능에 파일 경로 탐색 취약점이 있다.

## 완료 조건

`/etc/passwd` 파일 내용을 읽는다.

## 문제 설명

이미지 파일 이름을 받는 입력이 허용된 폴더 밖의 파일을 가리킬 수 있는지 확인하는 기초 문제다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/file-path-traversal/lab-simple)
