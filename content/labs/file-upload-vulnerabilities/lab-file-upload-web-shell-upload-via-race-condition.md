---
title: "Web shell upload via race condition"
tags:
  - portswigger
  - file-upload-vulnerabilities
lab_url: "https://portswigger.net/web-security/file-upload/lab-file-upload-web-shell-upload-via-race-condition"
difficulty: Expert
note_kind: problem
---

# Web shell upload via race condition

## 문제 조건과 설명

**주어진 조건**

이미지 업로드 기능이 파일을 철저히 검증하지만, 처리 과정의 경쟁 상태로 검증을 우회할 수 있다. 개인 계정은 wiener:peter로 로그인한다.

**완료 조건**

기본 PHP 웹 셸을 업로드해 /home/carlos/secret 내용을 얻고 실습 배너로 제출한다.

**문제 설명**

검증 전후의 짧은 시간 차이에 업로드 파일이 접근 가능한지 살피는 문제다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/file-upload/lab-file-upload-web-shell-upload-via-race-condition)

## 탐색 및 풀이 기록

아직 작성하지 않았다. 직접 확인한 요청·응답, 시도한 이유와 결과를 이 파일에 이어서 기록한다.
