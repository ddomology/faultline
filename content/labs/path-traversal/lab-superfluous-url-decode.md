---
title: "File path traversal, traversal sequences stripped with superfluous URL-decode"
tags:
  - portswigger
  - path-traversal
lab_url: "https://portswigger.net/web-security/file-path-traversal/lab-superfluous-url-decode"
difficulty: Practitioner
note_kind: problem
---

# File path traversal, traversal sequences stripped with superfluous URL-decode

## 문제 조건

상품 이미지 입력에 경로 탐색 문자열이 있으면 차단하지만, 그 뒤에 URL 디코딩을 수행한다.

## 완료 조건

`/etc/passwd` 파일 내용을 읽는다.

## 문제 설명

검사와 디코딩 순서가 다르면 최종 경로가 검사 당시와 달라질 수 있는지 확인한다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/file-path-traversal/lab-superfluous-url-decode)
