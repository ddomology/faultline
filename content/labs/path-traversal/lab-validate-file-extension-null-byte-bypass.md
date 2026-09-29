---
title: "File path traversal, validation of file extension with null byte bypass"
tags:
  - portswigger
  - path-traversal
lab_url: "https://portswigger.net/web-security/file-path-traversal/lab-validate-file-extension-null-byte-bypass"
difficulty: Practitioner
note_kind: problem
---

# File path traversal, validation of file extension with null byte bypass

## 문제 조건

상품 이미지 입력의 파일 이름이 예상한 확장자로 끝나는지 검증한다.

## 완료 조건

`/etc/passwd` 파일 내용을 읽는다.

## 문제 설명

파일 확장자 검사가 실제 열리는 파일 경로와 일치하는지 확인하는 문제다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/file-path-traversal/lab-validate-file-extension-null-byte-bypass)
