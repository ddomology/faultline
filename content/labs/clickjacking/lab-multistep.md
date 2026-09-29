---
title: "Multistep clickjacking"
tags:
  - portswigger
  - clickjacking
lab_url: "https://portswigger.net/web-security/clickjacking/lab-multistep"
difficulty: Practitioner
note_kind: problem
---

# Multistep clickjacking

## 문제 조건과 설명

**주어진 조건**

계정 삭제 기능에는 CSRF 토큰과 확인 대화상자가 있다. 모의 사용자는 Chrome에서 `Click me first`와 `Click me next`라는 두 미끼 요소를 차례로 누른다. 자기 계정 `wiener:peter`로 삭제 흐름을 살펴볼 수 있다.

**완료 조건**

첫 클릭으로 계정 삭제 버튼을, 다음 클릭으로 확인 단계를 처리하게 해 계정을 실제로 삭제한다. 첫 버튼만 눌리거나 확인 대화상자만 열리는 상태는 완료가 아니다.

**문제 설명과 판단 기준**

CSRF 토큰이 있어도 사용자가 자신의 로그인된 페이지에서 실제 삭제 버튼을 누르면 정상 요청이 만들어질 수 있다. 다만 이 문제는 한 번의 좌표 맞춤으로 끝나지 않는다. 첫 클릭 이후 화면이나 대화상자 위치가 바뀌므로 두 번째 미끼 요소가 그 단계의 확인 동작과 맞아야 한다.

자기 계정에서 삭제 버튼과 확인 대화상자의 순서, 크기, 위치를 Chrome으로 확인한다. 두 미끼 요소를 별도로 배치하고 각 클릭 후 화면 상태를 기록한다. 마지막에는 실제 계정 삭제 여부를 확인한다. 현재 두 단계의 좌표나 성공 결과는 관찰되지 않았다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/clickjacking/lab-multistep)

## 탐색 및 풀이 기록

아직 작성하지 않았다. 직접 확인한 요청·응답, 시도한 이유와 결과를 이 파일에 이어서 기록한다.
