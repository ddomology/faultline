---
title: "Web shell upload via obfuscated file extension"
tags:
  - portswigger
  - file-upload-vulnerabilities
lab_url: "https://portswigger.net/web-security/file-upload/lab-file-upload-web-shell-upload-via-obfuscated-file-extension"
difficulty: Practitioner
note_kind: problem
---

# Web shell upload via obfuscated file extension

## 문제 조건과 설명

**주어진 조건**

이미지 업로드 기능에서 특정 확장자를 금지하지만, 일반적인 난독화 방법으로 우회할 수 있다. 개인 계정은 wiener:peter로 로그인한다.

**완료 조건**

기본 PHP 웹 셸을 업로드해 /home/carlos/secret 내용을 얻고 실습 배너로 제출한다.

**문제 설명**

파일명과 확장자의 해석 차이가 실행 허용으로 이어지는지 살피는 문제다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/file-upload/lab-file-upload-web-shell-upload-via-obfuscated-file-extension)

## 탐색 및 풀이 기록

아직 작성하지 않았다. 직접 확인한 요청·응답, 시도한 이유와 결과를 이 파일에 이어서 기록한다.
