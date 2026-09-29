---
title: "File path traversal, traversal sequences blocked with absolute path bypass"
tags:
  - portswigger
  - path-traversal
lab_url: "https://portswigger.net/web-security/file-path-traversal/lab-absolute-path-bypass"
difficulty: Practitioner
note_kind: problem
---

# File path traversal, traversal sequences blocked with absolute path bypass

## 문제 조건

상품 이미지 표시 기능은 경로 탐색 문자열을 차단하지만 전달된 파일 이름을 기본 작업 디렉터리에 대한 상대 경로로 취급한다.

## 완료 조건

`/etc/passwd` 파일 내용을 읽는다.

## 문제 설명

입력 검증과 실제 경로 해석 사이의 차이를 살펴보는 문제다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/file-path-traversal/lab-absolute-path-bypass)
