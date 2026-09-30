---
title: "File path traversal, validation of start of path"
tags:
  - portswigger
  - path-traversal
lab_url: "https://portswigger.net/web-security/file-path-traversal/lab-validate-start-of-path"
difficulty: Practitioner
note_kind: problem
---

# File path traversal, validation of start of path

## 문제 조건과 설명

**주어진 조건**

상품 이미지 요청은 파일 이름만이 아니라 전체 파일 경로를 매개변수로 전달한다. 서버는 그 경로가 예상한 이미지 디렉터리로 시작하는지 검사한다. 정상 요청에서 보이는 경로 접두사가 무엇인지는 직접 확인해야 한다.

**완료 조건**

검사를 거쳐 `/etc/passwd`의 내용을 읽는다. 허용된 접두사로 시작하는 입력을 만들었다는 사실만으로는 완료가 아니며, 최종적으로 열리는 파일이 중요하다.

**문제 설명과 판단 기준**

정상 이미지 요청의 전체 경로를 확인해 서버가 허용하는 시작 부분을 파악한다. 이어 입력 문자열의 시작 부분에 대한 검사와, 파일 시스템이 경로를 정규화한 뒤 해석하는 위치가 같은지 비교해야 한다. 상위 디렉터리 이동이 접두사 뒤에 놓였을 때 실제 파일 경로가 이미지 디렉터리 밖으로 바뀌는지가 판단 지점이다.

문자열 비교 방식, 경로 정규화 시점, 구분자 처리는 설명만으로 특정할 수 없다. 허용·거부 응답과 파일 본문을 구분해 기록하고, 목표 파일 내용이 반환될 때 성공으로 판단한다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/file-path-traversal/lab-validate-start-of-path)

## 탐색 및 풀이 기록

아직 작성하지 않았다. 직접 확인한 요청·응답, 시도한 이유와 결과를 이 파일에 이어서 기록한다.
