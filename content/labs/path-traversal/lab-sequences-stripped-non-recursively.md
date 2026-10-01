---
title: "File path traversal, traversal sequences stripped non-recursively"
tags:
  - portswigger
  - path-traversal
lab_url: "https://portswigger.net/web-security/file-path-traversal/lab-sequences-stripped-non-recursively"
difficulty: Practitioner
note_kind: problem
---

# File path traversal, traversal sequences stripped non-recursively

## 문제 조건과 설명

**주어진 조건**

상품 이미지 파일 이름에서 경로 탐색 문자열을 제거한 뒤 파일을 읽는다. 제목의 ‘비재귀적 제거’는 제거 작업을 반복해서 수행하지 않는다는 탐색 단서다. 단순한 탐색 문자열을 넣었을 때는 제거되거나 정상 이미지 경로로 돌아갈 수 있다.

**완료 조건**

`/etc/passwd`의 내용을 읽는다. 필터를 통과하는 입력을 찾는 것과 최종 경로가 목표 파일을 가리킨다는 것은 별도로 확인해야 한다.

**문제 설명과 판단 기준**

정상 이미지 요청을 기준으로 파일 이름의 어느 부분이 서버 경로에 영향을 주는지 파악한다. 이후 평범한 상위 디렉터리 이동 입력과 변형 입력의 응답을 비교하면 제거 규칙을 추정할 수 있다. 한 번 제거한 결과에 새 탐색 문자열이 남을 수 있다는 점이 비재귀적 처리의 핵심이지만, 실제 치환 방식과 순서는 관찰 전에는 확정할 수 없다.

응답 상태만으로 필터 결과를 판정하지 말고 정상 이미지, 없는 파일, 목표 파일에 대한 반응을 구별한다. 어떤 입력이 어떤 경로로 해석된다고 판단했는지 근거와 함께 아래에 기록한다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/file-path-traversal/lab-sequences-stripped-non-recursively)

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
