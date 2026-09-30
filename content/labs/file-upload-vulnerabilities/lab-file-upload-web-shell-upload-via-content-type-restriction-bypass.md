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

이미지 업로드 기능은 예상하지 못한 파일 형식을 거르려 하지만, 형식 판정에 사용자가 바꿀 수 있는 요청 값을 믿는다. 계정은 `wiener:peter`다. 제목은 `Content-Type` 제한을 가리키지만 서버가 어느 필드의 값을 검사하는지는 업로드 요청에서 확인해야 한다.

**완료 조건**

PHP 웹 셸을 업로드하고 `/home/carlos/secret`을 읽어 실습 배너로 제출한다. 이미지로 보이는 응답을 얻는 것과 저장된 파일이 PHP로 실행되는 것은 별개다.

**문제 설명과 판단 기준**

정상 이미지와 거부되는 파일의 업로드 요청을 비교해 파일 이름, 본문, MIME 정보 가운데 무엇이 판정에 쓰이는지 살핀다. 파일 내용은 그대로 두고 요청의 형식 표시만 바꿨을 때 허용 여부가 달라진다면 클라이언트 제어 값에 의존한다는 근거가 된다. 이후 저장된 파일의 경로와 서버 측 실행 여부를 확인해야 한다.

업로드 판정, 파일 요청, 목표 파일 읽기, 제출을 각각 검증한다. 어떤 요청 필드를 바꿨고 서버 응답이 어떻게 달라졌는지 기록한다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/file-upload/lab-file-upload-web-shell-upload-via-content-type-restriction-bypass)

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
