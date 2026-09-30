---
title: "Web shell upload via path traversal"
tags:
  - portswigger
  - file-upload-vulnerabilities
lab_url: "https://portswigger.net/web-security/file-upload/lab-file-upload-web-shell-upload-via-path-traversal"
difficulty: Practitioner
note_kind: problem
---

# Web shell upload via path traversal

## 문제 조건과 설명

**주어진 조건**

이미지 업로드 기능은 사용자 파일을 저장하지만 그 파일의 실행은 서버 설정으로 차단한다. 공식 설명은 다른 취약점을 결합하면 이 제한을 우회할 수 있다고 하며, 제목은 경로 탐색을 단서로 준다. 계정은 `wiener:peter`다.

**완료 조건**

PHP 웹 셸을 업로드해 `/home/carlos/secret`을 읽고 그 값을 실습 배너로 제출한다. 파일이 서버에 저장됐다는 사실만으로 실행 차단을 우회했다고 볼 수 없다.

**문제 설명과 판단 기준**

먼저 정상 업로드 파일이 어디에 저장되고 어떤 URL에서 제공되는지 확인한다. 그 경로에서는 PHP가 실행되지 않는다는 기준 응답을 잡은 뒤, 업로드 파일 이름이나 저장 경로를 바꿀 수 있는지 살핀다. 입력에 경로 성분이 포함될 때 서버가 이를 정규화해 실행 허용 영역에 파일을 놓는지가 판단 지점이다.

최종 저장 경로와 웹 요청 시의 실행 여부를 따로 확인한다. 목표 파일을 읽은 응답과 제출 결과까지 아래에 기록한다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/file-upload/lab-file-upload-web-shell-upload-via-path-traversal)

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
