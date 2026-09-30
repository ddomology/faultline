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

업로드 파일은 강하게 검증되지만 처리 과정의 경쟁 상태 때문에 검증을 완전히 우회할 수 있다. 계정은 `wiener:peter`다. 파일이 처음 저장된 순간부터 검사·삭제 또는 이동이 끝날 때까지의 처리 순서는 관찰해야 한다.

**완료 조건**

PHP 웹 셸을 업로드해 `/home/carlos/secret`을 읽고 그 값을 실습 배너로 제출한다. 파일이 잠깐 보이거나 업로드 응답이 실패해도 실행 결과를 별도로 확인해야 한다.

**문제 설명과 판단 기준**

정상 업로드와 거부되는 업로드의 요청·응답, 저장 파일 URL을 비교해 검증이 업로드 전인지 후인지 추정한다. 검증 전에 파일이 일시적으로 웹에서 접근 가능하다면 그 짧은 구간에 요청이 도달할 수 있는지가 핵심이다. 반복 요청의 성공·실패만 세지 말고 어느 시점에 파일이 존재했고 실행됐는지 구분해야 한다.

목표 파일 내용이 실제 실행 응답으로 반환됐는지 확인하고 제출한다. 업로드와 조회의 순서, 응답 시각, 최종 결과를 아래에 기록한다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/file-upload/lab-file-upload-web-shell-upload-via-race-condition)

## 탐색 및 풀이 기록

아직 작성하지 않았다. 직접 확인한 요청·응답, 시도한 이유와 결과를 이 파일에 이어서 기록한다.
