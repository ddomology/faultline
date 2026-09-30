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

## 문제 조건과 설명

**주어진 조건**

이미지 업로드 기능이 파일을 검증하지 않은 채 서버 파일 시스템에 저장한다. 실습 계정은 `wiener:peter`다. 업로드된 파일의 URL과 저장 위치는 정상 이미지 업로드를 통해 확인해야 한다.

**완료 조건**

기본 PHP 웹 셸을 업로드해 `/home/carlos/secret`의 내용을 읽고 실습 배너의 버튼으로 제출한다. 업로드 성공 메시지와 서버에서 PHP가 실제 실행된 결과는 다르다.

**문제 설명과 판단 기준**

먼저 정상 이미지 업로드 요청과 반환된 파일 URL을 관찰한다. 같은 업로드 경로에서 PHP 파일을 받아들이는지, 저장된 파일을 웹으로 요청했을 때 정적 텍스트로 반환하는지 실행하는지 확인해야 한다. 서버가 확장자를 받아들여도 실행 가능한 디렉터리가 아니면 목표 파일을 읽을 수 없다.

실행 결과에서 목표 경로의 파일 내용이 반환되는지 확인하고 그 값을 제출한다. 파일 이름, 저장 URL, 실행 응답, 제출 결과를 아래에 구분해 기록한다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/file-upload/lab-file-upload-remote-code-execution-via-web-shell-upload)

## 탐색 및 풀이 기록

### 초기 관찰
<!-- 직접 확인한 내용과 아직 확인하지 못한 점 -->

### 실행 과정
<!-- 무엇을 왜 했는지 → 실제 결과 → 해석 -->
<!-- 필요할 때 코드·요청·응답·스크린샷 첨부 -->

## 최종 결과
<!-- 완료 여부와 확인 근거 -->

## 배운 점
<!-- 새로 알게 된 내용, 잘못 생각했던 부분 -->
