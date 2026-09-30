---
title: "File path traversal, traversal sequences stripped with superfluous URL-decode"
tags:
  - portswigger
  - path-traversal
lab_url: "https://portswigger.net/web-security/file-path-traversal/lab-superfluous-url-decode"
difficulty: Practitioner
note_kind: problem
---

# File path traversal, traversal sequences stripped with superfluous URL-decode

## 문제 조건과 설명

**주어진 조건**

상품 이미지 입력에 경로 탐색 문자열이 있으면 차단하지만, 그 검사를 마친 뒤 다시 URL 디코딩을 수행한다. 즉 검사에 쓰인 문자열과 파일을 열 때 쓰는 문자열이 달라질 수 있다. 제목은 이 처리 순서가 우회 가능성의 핵심임을 알려 준다.

**완료 조건**

`/etc/passwd` 파일 내용을 응답에서 읽는다. 인코딩한 입력이 거부되지 않는다는 사실만으로는 실제 파일 경로가 목표에 닿았다고 볼 수 없다.

**문제 설명과 판단 기준**

먼저 정상 상품 이미지 요청과 단순 탐색 입력의 결과를 비교해 차단 지점을 확인한다. 그다음 클라이언트, 웹 서버, 애플리케이션이 각각 어느 단계에서 URL 디코딩을 수행하는지 응답 차이로 추론한다. 검사를 통과한 표현이 나중에 탐색 문자열로 바뀌는 경우라면 검증 시점과 파일 접근 시점 사이에 의미 차이가 생긴다.

브라우저나 도구가 요청을 보내기 전에 인코딩을 바꿀 수도 있으므로, 실제 전송된 요청 경로를 함께 확인해야 한다. 마지막에는 반환된 본문이 목표 파일의 텍스트인지 검증해 성공 여부를 판단한다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/file-path-traversal/lab-superfluous-url-decode)

## 탐색 및 풀이 기록

아직 작성하지 않았다. 직접 확인한 요청·응답, 시도한 이유와 결과를 이 파일에 이어서 기록한다.
