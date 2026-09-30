---
title: "File path traversal, simple case"
tags:
  - portswigger
  - path-traversal
lab_url: "https://portswigger.net/web-security/file-path-traversal/lab-simple"
difficulty: Apprentice
note_kind: problem
---

# File path traversal, simple case

## 문제 조건과 설명

**주어진 조건**

상품 이미지를 표시하는 기능에 파일 경로 탐색 취약점이 있다. 이미지는 서버가 클라이언트에서 받은 파일 이름을 이용해 읽어 제공하는 것으로 볼 수 있지만, 실제 요청 매개변수와 서버의 기준 디렉터리는 정상 이미지 요청을 관찰해 확인해야 한다.

**완료 조건**

서버의 `/etc/passwd` 파일 내용을 읽는다. 이미지가 깨지거나 서버가 오류를 반환하는 것은 경로가 바뀌었다는 단서일 수 있어도 파일 내용을 읽은 증거는 아니다.

**문제 설명과 판단 기준**

상품 페이지에서 이미지 요청 하나를 골라 URL, 파일 이름 매개변수, 정상 응답의 상태와 본문을 확인한다. 그 값을 바꿨을 때 서버가 입력을 파일 경로의 일부로 사용하는지 살펴본다. 상대 경로의 상위 디렉터리 이동이 허용되는지 확인하면 이미지 저장 위치에서 목표 파일로 벗어날 수 있는지를 판단할 수 있다.

탐색 중에는 요청의 변화와 응답의 변화를 함께 기록해야 한다. 최종적으로는 단순한 HTTP 200이 아니라 `/etc/passwd`에 해당하는 텍스트가 실제 응답 본문에 나타나는지를 근거로 삼는다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/file-path-traversal/lab-simple)

## 탐색 및 풀이 기록

아직 작성하지 않았다. 직접 확인한 요청·응답, 시도한 이유와 결과를 이 파일에 이어서 기록한다.
