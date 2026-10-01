---
title: "OS command injection, simple case"
tags:
  - portswigger
  - os-command-injection
lab_url: "https://portswigger.net/web-security/os-command-injection/lab-simple"
difficulty: Apprentice
note_kind: problem
---

# OS command injection, simple case

## 문제 조건과 설명

**주어진 조건**

상품 재고 확인 기능은 사용자가 보낸 상품 ID와 매장 ID를 셸 명령에 넣어 실행하고, 그 명령의 원시 출력을 HTTP 응답에 돌려준다. 두 입력값 중 어느 부분이 명령 문자열에 어떻게 이어지는지는 실습 요청을 봐야 한다.

**완료 조건**

서버에서 `whoami`가 실행되어 현재 OS 사용자 이름이 응답에 나타나야 한다. 내 컴퓨터에서 명령을 실행한 결과나 단순 재고 오류는 목표의 증거가 아니다.

**문제 설명과 판단 기준**

재고 조회 값이 명령 인수로만 취급되는지, 셸 문법으로 해석되는지가 관건이다. 이 실습은 명령 출력이 바로 응답에 보이므로 입력 변경과 출력 변화를 비교하기 좋다. 먼저 정상 결과의 형식을 알아야 나중에 추가로 나타난 값이 주입 결과인지 판단할 수 있다.

정상 상품·매장 조합의 요청과 응답을 기록한다. 입력값을 하나씩 바꾸어 검증·인코딩·오류 반응을 구분하고, 서버 응답에 `whoami`의 사용자 이름이 나타나는지 확인한다. 아직 어떤 필드가 실행 문맥에 도달하는지나 사용자 이름은 관찰되지 않았다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/os-command-injection/lab-simple)

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
