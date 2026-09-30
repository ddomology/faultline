---
title: "Web shell upload via extension blacklist bypass"
tags:
  - portswigger
  - file-upload-vulnerabilities
lab_url: "https://portswigger.net/web-security/file-upload/lab-file-upload-web-shell-upload-via-extension-blacklist-bypass"
difficulty: Practitioner
note_kind: problem
---

# Web shell upload via extension blacklist bypass

## 문제 조건과 설명

**주어진 조건**

업로드 기능이 특정 파일 확장자를 블랙리스트로 차단하지만 그 구성에 근본적인 결함이 있다. 계정은 `wiener:peter`다. 금지 목록과 서버가 PHP로 실행하는 파일 종류가 정확히 같은지는 아직 확인되지 않았다.

**완료 조건**

PHP 웹 셸을 업로드하고 `/home/carlos/secret`의 내용을 읽어 실습 배너로 제출한다. 확장자 검사를 통과해도 서버가 그 파일을 PHP로 실행하지 않으면 목표에 도달하지 못한다.

**문제 설명과 판단 기준**

정상 이미지 업로드를 기준으로 파일 이름과 업로드 응답을 확인한다. 금지된 확장자의 거부와 다른 확장자의 허용을 비교하면서 서버의 실행 설정과 목록 사이에 틈이 있는지 살핀다. 단순히 파일 이름을 바꾸어 저장한 결과와, 웹 서버가 그 이름을 PHP 실행 대상으로 해석한 결과를 구분해야 한다.

허용된 파일의 실제 저장 이름과 요청 URL을 확인한 뒤 실행 결과에서 목표 파일 내용이 나오는지 검증한다. 검사·실행·제출의 근거를 기록한다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/file-upload/lab-file-upload-web-shell-upload-via-extension-blacklist-bypass)

## 탐색 및 풀이 기록

아직 작성하지 않았다. 직접 확인한 요청·응답, 시도한 이유와 결과를 이 파일에 이어서 기록한다.
