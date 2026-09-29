---
title: "Remote code execution via web shell upload"
tags:
  - portswigger
  - file-upload-vulnerabilities
lab_url: "https://portswigger.net/web-security/file-upload/lab-file-upload-remote-code-execution-via-web-shell-upload"
difficulty: Apprentice
note_kind: problem
---

# Remote code execution via web shell upload

## 문제 조건

이미지 업로드 기능이 업로드 파일을 검증하지 않고 서버 파일 시스템에 저장한다. 개인 계정은 wiener:peter로 로그인한다.

## 완료 조건

기본 PHP 웹 셸을 업로드해 /home/carlos/secret 내용을 얻고 실습 배너로 제출한다.

## 문제 설명

업로드 파일이 서버에서 코드로 실행될 수 있는지 확인하는 문제다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/file-upload/lab-file-upload-remote-code-execution-via-web-shell-upload)
