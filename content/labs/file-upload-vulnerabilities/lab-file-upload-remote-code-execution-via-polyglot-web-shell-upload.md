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

## 문제 조건과 설명

**주어진 조건**

업로드 기능이 파일 내용을 검사해 실제 이미지인지 확인하지만 서버 측 코드를 함께 담은 파일도 업로드·실행할 수 있다. 계정은 `wiener:peter`다. 이미지 판정에 성공하는 조건과 웹 서버가 파일을 PHP로 실행하는 조건을 모두 충족해야 한다.

**완료 조건**

기본 PHP 웹 셸을 업로드해 `/home/carlos/secret`의 내용을 읽고 실습 배너로 제출한다. 유효한 이미지로 인정받은 것만으로는 코드가 실행됐다고 볼 수 없다.

**문제 설명과 판단 기준**

정상 이미지와 일반 PHP 파일의 업로드 반응을 비교해 내용 검사와 파일 이름 검사의 경계를 파악한다. 그다음 이미지로 인식되는 데이터와 PHP로 실행될 부분이 한 파일에 공존할 수 있는지 검증해야 한다. 파일이 저장돼도 서버가 이미지로만 제공한다면 실행 경로를 다시 살펴야 한다.

이미지 판정 통과, 업로드 파일의 URL, PHP 실행 응답, 목표 파일 내용과 제출 결과를 각각 기록한다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/file-upload/lab-file-upload-remote-code-execution-via-polyglot-web-shell-upload)

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
