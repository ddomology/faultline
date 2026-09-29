---
title: "File path traversal, validation of start of path"
tags:
  - portswigger
  - path-traversal
lab_url: "https://portswigger.net/web-security/file-path-traversal/lab-validate-start-of-path"
difficulty: Practitioner
note_kind: problem
---

# File path traversal, validation of start of path

## 문제 조건과 설명

**주어진 조건**

상품 이미지 요청의 매개변수에 전체 파일 경로가 담기며, 애플리케이션은 경로가 예상한 폴더 이름으로 시작하는지만 확인한다.

**완료 조건**

`/etc/passwd` 파일 내용을 읽는다.

**문제 설명**

경로 접두어 검사만으로 읽을 파일을 제한할 수 있는지를 다루는 실습이다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/file-path-traversal/lab-validate-start-of-path)

## 탐색 및 풀이 기록

아직 작성하지 않았다. 직접 확인한 요청·응답, 시도한 이유와 결과를 이 파일에 이어서 기록한다.
