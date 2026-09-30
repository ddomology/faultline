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

이미지 업로드 기능이 특정 확장자를 금지하지만 파일 확장자의 고전적인 난독화 방식으로 우회할 수 있다. 자신의 계정은 `wiener:peter`다. 서버가 업로드 검증 때 본 파일 이름과 저장·실행 단계에서 해석한 이름이 같은지는 관찰해야 한다.

**완료 조건**

PHP 웹 셸을 업로드해 `/home/carlos/secret`의 내용을 읽고 실습 배너로 제출한다. 파일 이름이 허용됐다는 사실과 PHP 실행 성공은 구별한다.

**문제 설명과 판단 기준**

먼저 단순한 PHP 확장자의 거부 응답과 정상 이미지 업로드의 저장 이름을 확인한다. 파일 이름의 대소문자, 인코딩, 구분자처럼 해석이 달라질 수 있는 부분을 바꿨을 때 검증 단계와 저장 단계가 각각 어떤 확장자를 보는지 비교한다. 정확한 난독화 문자열은 응답을 보기 전에는 정하지 않는다.

최종 파일 URL에서 실행 결과를 확인하고 목표 파일을 읽은 값을 제출한다. 보낸 이름, 저장된 이름, 서버 실행 결과를 아래에 나눠 기록한다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/file-upload/lab-file-upload-web-shell-upload-via-obfuscated-file-extension)

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
