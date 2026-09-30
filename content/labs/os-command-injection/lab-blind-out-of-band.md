---
title: "Blind OS command injection with out-of-band interaction"
tags:
  - portswigger
  - os-command-injection
lab_url: "https://portswigger.net/web-security/os-command-injection/lab-blind-out-of-band"
difficulty: Practitioner
note_kind: problem
---

# Blind OS command injection with out-of-band interaction

## 문제 조건과 설명

**주어진 조건**

피드백 기능의 셸 명령은 비동기로 실행되어 HTTP 응답 시간과 본문에 영향을 주지 않는다. 접근 가능한 파일로 출력을 돌릴 수도 없지만 외부 도메인과의 상호작용은 가능하다. 실습 방화벽 때문에 Burp Collaborator 기본 공개 서버를 사용해야 한다.

**완료 조건**

주입된 명령으로 Burp Collaborator에 DNS 조회를 발생시킨다. 피드백 제출이 성공하거나 Collaborator 주소가 요청에 포함된 것만으로는 실제 DNS 조회를 증명하지 못한다.

**문제 설명과 판단 기준**

명령이 비동기라면 응답 속도에 기대어 실행을 판단할 수 없다. 대신 실습 서버가 외부 이름을 조회했다는 기록이 독립적인 관찰 지점이다. 이번 목표는 파일 내용이나 사용자 이름 유출이 아니라 DNS 상호작용 자체다.

정상 피드백 요청을 캡처하고 Collaborator에 고유 주소를 준비한다. 입력 필드를 바꾼 뒤 요청 시점과 DNS 수신 기록을 대응시키고, 같은 주소를 재사용해 생기는 혼동을 피한다. 아직 외부 조회가 관찰되었다고 기록하지 않는다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/os-command-injection/lab-blind-out-of-band)

## 탐색 및 풀이 기록

아직 작성하지 않았다. 직접 확인한 요청·응답, 시도한 이유와 결과를 이 파일에 이어서 기록한다.
