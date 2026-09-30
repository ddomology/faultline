---
title: "File path traversal, traversal sequences blocked with absolute path bypass"
tags:
  - portswigger
  - path-traversal
lab_url: "https://portswigger.net/web-security/file-path-traversal/lab-absolute-path-bypass"
difficulty: Practitioner
note_kind: problem
---

# File path traversal, traversal sequences blocked with absolute path bypass

## 문제 조건과 설명

**주어진 조건**

상품 이미지 기능이 경로 탐색 문자열을 차단한다. 문제 설명에 따르면 전달된 파일 이름은 기본 작업 디렉터리에 대한 상대 경로로 처리된다. 제목은 절대 경로를 이용한 우회를 가리키지만, 서버가 어떤 단계에서 상대·절대 경로를 구별하는지는 요청과 응답으로 확인해야 한다.

**완료 조건**

`/etc/passwd`의 내용을 읽는다. 탐색 문자열이 거부되는 사실만 확인하거나 이미지가 아닌 다른 파일을 읽는 데 그쳐서는 목표를 달성하지 못한다.

**문제 설명과 판단 기준**

먼저 정상 이미지의 파일 이름 형태와 응답을 기준으로 잡는다. 상위 디렉터리 이동 문자열을 보냈을 때의 반응을 확인하면 차단이 존재한다는 설명을 실제 동작과 연결할 수 있다. 다음에는 경로가 기준 디렉터리와 결합되는 방식, 절대 경로가 별도로 해석되는지를 비교해 봐야 한다.

차단 규칙이 있다는 이유로 파일 열기 단계까지 동일한 규칙이 적용된다고 단정할 수 없다. 요청이 허용되는지와 어떤 파일이 열렸는지를 분리해 관찰하고, 목표 파일의 본문이 반환되는 경우에만 성공으로 기록한다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/file-path-traversal/lab-absolute-path-bypass)

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
