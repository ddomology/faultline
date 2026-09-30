---
title: "Blind OS command injection with out-of-band data exfiltration"
tags:
  - portswigger
  - os-command-injection
lab_url: "https://portswigger.net/web-security/os-command-injection/lab-blind-out-of-band-data-exfiltration"
difficulty: Practitioner
note_kind: problem
---

# Blind OS command injection with out-of-band data exfiltration

## 문제 조건과 설명

**주어진 조건**

피드백 기능의 명령은 비동기로 실행되어 응답에 영향이 없고, 접근 가능한 파일로 출력도 보낼 수 없다. 외부 상호작용에는 Burp Collaborator 기본 공개 서버를 사용해야 한다. 이번 문제는 단순 DNS 조회보다 명령 결과 전달까지 요구한다.

**완료 조건**

서버에서 `whoami`를 실행하고 그 출력값을 DNS 질의로 Burp Collaborator에 전달한 다음 현재 사용자 이름을 실습에 입력한다. 외부 요청이 도착했다는 사실과 사용자 이름을 정확히 얻은 사실을 구별해야 한다.

**문제 설명과 판단 기준**

비동기 블라인드 명령 주입에서는 응답 본문으로 값을 읽지 못하므로 외부 질의 자체가 데이터 운반 경로가 된다. 서버가 어떤 이름을 조회했는지 기록에서 확인해야 하며, 고정된 테스트 문자열과 실제 `whoami` 결과를 혼동하지 않아야 한다.

먼저 고유 주소로 DNS 상호작용을 재현해 명령 실행 경로를 확인한다. 이어 `whoami` 결과가 질의에 반영되는지 수신 로그를 분석하고, 얻은 사용자 이름을 제출해 판정을 확인한다. 아직 사용자 이름이나 완료 결과는 기록되지 않았다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/os-command-injection/lab-blind-out-of-band-data-exfiltration)

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
