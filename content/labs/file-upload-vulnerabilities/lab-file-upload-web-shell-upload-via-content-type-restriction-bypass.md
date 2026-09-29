---
title: "Web shell upload via Content-Type restriction bypass"
tags:
  - portswigger
  - file-upload-vulnerabilities
lab_url: "https://portswigger.net/web-security/file-upload/lab-file-upload-web-shell-upload-via-content-type-restriction-bypass"
difficulty: Apprentice
note_kind: problem
---

# Web shell upload via Content-Type restriction bypass

## 문제 조건과 설명

**주어진 조건**

이미지 업로드 기능이 파일 종류를 제한하려 하지만, 사용자가 제어할 수 있는 입력을 검증 근거로 삼는다. 개인 계정은 wiener:peter로 로그인한다.

**완료 조건**

기본 PHP 웹 셸을 업로드해 /home/carlos/secret 내용을 얻고 실습 배너로 제출한다.

**문제 설명**

파일 형식 판정이 요청 헤더 같은 사용자 입력에 의존하는지 살피는 문제다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/file-upload/lab-file-upload-web-shell-upload-via-content-type-restriction-bypass)

## 탐색 및 풀이 기록

아직 작성하지 않았다. 직접 확인한 요청·응답, 시도한 이유와 결과를 이 파일에 이어서 기록한다.
