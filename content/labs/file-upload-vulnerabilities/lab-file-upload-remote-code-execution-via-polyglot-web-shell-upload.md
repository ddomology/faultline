---
title: "Remote code execution via polyglot web shell upload"
tags:
  - portswigger
  - file-upload-vulnerabilities
lab_url: "https://portswigger.net/web-security/file-upload/lab-file-upload-remote-code-execution-via-polyglot-web-shell-upload"
difficulty: Practitioner
note_kind: problem
---

# Remote code execution via polyglot web shell upload

## 문제 조건

업로드 파일의 내용을 검사해 실제 이미지인지 확인하지만, 서버 측 코드도 업로드하고 실행할 수 있다. 개인 계정은 wiener:peter로 로그인한다.

## 완료 조건

기본 PHP 웹 셸을 업로드해 /home/carlos/secret 내용을 얻고 실습 배너로 제출한다.

## 문제 설명

이미지와 실행 가능한 코드가 한 파일에 함께 있을 때 검증의 한계를 살피는 문제다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/file-upload/lab-file-upload-remote-code-execution-via-polyglot-web-shell-upload)
