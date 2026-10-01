---
title: "File path traversal, validation of file extension with null byte bypass"
tags:
  - portswigger
  - path-traversal
lab_url: "https://portswigger.net/web-security/file-path-traversal/lab-validate-file-extension-null-byte-bypass"
difficulty: Practitioner
note_kind: problem
---

# File path traversal, validation of file extension with null byte bypass

## 문제 조건과 설명

**주어진 조건**

상품 이미지 요청의 파일 이름은 예상한 이미지 확장자로 끝나야 한다. 제목은 널 바이트를 이용한 우회를 탐색 단서로 준다. 확장자 검사를 통과한 문자열과 실제 파일 접근 단계에서 해석되는 경로가 다를 수 있는지를 살펴보는 문제다.

**완료 조건**

`/etc/passwd`의 내용을 읽는다. 확장자 검사를 피했거나 오류 응답이 달라졌다는 사실만으로는 목표 파일을 읽었다고 할 수 없다.

**문제 설명과 판단 기준**

정상 이미지 요청에서 요구되는 확장자와 응답 형태를 확인한다. 확장자가 없는 경로와 확장자를 덧붙인 경로를 비교하면 검사가 어느 입력을 대상으로 하는지 가늠할 수 있다. 이후 문자열 검증을 통과한 입력이 하위 파일 처리 단계에서 어디까지 경로로 인식되는지 관찰해야 한다. 널 바이트 처리 가능 여부는 사용된 계층과 구현에 따라 달라지므로 제목만으로 성공을 단정하지 않는다.

전송된 값, 서버의 허용·거부 반응, 반환 본문을 각각 기록한다. 최종 판단은 검사 통과가 아니라 목표 파일의 실제 내용이 응답에 나타나는지에 둔다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/file-path-traversal/lab-validate-file-extension-null-byte-bypass)

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

## 관련 개념
<!-- 필요한 개념 노트 링크를 목록으로 추가 -->
