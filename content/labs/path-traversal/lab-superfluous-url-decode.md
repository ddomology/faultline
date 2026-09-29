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

## 문제 조건과 설명

**주어진 조건**

상품 이미지 입력에 경로 탐색 문자열이 있으면 차단하지만, 그 뒤에 URL 디코딩을 수행한다.

**완료 조건**

`/etc/passwd` 파일 내용을 읽는다.

**문제 설명**

검사와 디코딩 순서가 다르면 최종 경로가 검사 당시와 달라질 수 있는지 확인한다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/file-path-traversal/lab-superfluous-url-decode)

## 탐색 및 풀이 기록

아직 작성하지 않았다. 직접 확인한 요청·응답, 시도한 이유와 결과를 이 파일에 이어서 기록한다.
