---
title: "Blind OS command injection with time delays"
tags:
  - portswigger
  - os-command-injection
lab_url: "https://portswigger.net/web-security/os-command-injection/lab-blind-time-delays"
difficulty: Practitioner
note_kind: problem
---

# Blind OS command injection with time delays

## 문제 조건과 설명

**주어진 조건**

피드백 기능은 사용자가 적은 정보를 셸 명령에 포함하지만 명령 출력은 HTTP 응답에 나타나지 않는다. 따라서 화면에 결과 문자열이 없더라도 명령 실행 여부를 다른 방식으로 판단해야 한다.

**완료 조건**

주입된 명령으로 응답에 약 10초의 지연을 만든다. 한 번 느린 요청만으로 실행을 확정하지 않고 정상 요청과 반복 비교해 네트워크 지연을 구별해야 한다.

**문제 설명과 판단 기준**

출력을 볼 수 없는 블라인드 명령 주입에서는 시간 차이가 관찰 가능한 신호가 된다. 다만 피드백 제출 자체의 처리 시간이나 연결 상태도 응답 시간을 바꿀 수 있다. 같은 조건에서 정상 입력과 시험 입력을 번갈아 측정하는 이유가 여기에 있다.

정상 피드백 요청의 필드와 여러 차례의 응답 시간을 기록한다. 입력을 한 필드씩 바꾸어 지연 여부를 비교하고, 약 10초의 차이가 재현되는지 확인한다. 응답 본문에 값이 없다는 사실을 실패로 단정하지 않는다. 아직 재현된 시간 차이나 성공 입력은 없다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/os-command-injection/lab-blind-time-delays)

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
