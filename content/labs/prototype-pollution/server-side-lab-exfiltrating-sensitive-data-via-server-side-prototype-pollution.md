---
title: "Exfiltrating sensitive data via server-side prototype pollution"
tags:
  - portswigger
  - prototype-pollution
lab_url: "https://portswigger.net/web-security/prototype-pollution/server-side/lab-exfiltrating-sensitive-data-via-server-side-prototype-pollution"
difficulty: Expert
note_kind: problem
---

# Exfiltrating sensitive data via server-side prototype pollution

## 문제 조건과 설명

**주어진 조건**

Node.js·Express 서버의 객체 병합 결함으로 `Object.prototype`을 오염시켜 시스템 명령을 실행할 수 있다. 계정 `wiener:peter`는 이미 관리자 기능에 접근할 수 있다. 이번 목표는 파일 삭제가 아니라 Carlos의 홈 디렉터리에서 비밀 파일을 찾아 공개 Burp Collaborator 서버로 전달하는 것이다.

**완료 조건**

`/home/carlos`의 내용을 공개 Burp Collaborator 서버로 보내 비밀 파일을 식별하고, 그 파일 내용도 전달받아 실습 배너로 제출한다. 명령 실행 확인이나 디렉터리 목록 확인만으로는 완료되지 않는다.

**문제 설명과 판단 기준**

먼저 무해한 속성으로 오염 소스를 확인하고 명령 실행 가젯이 언제 호출되는지 파악한다. 그다음 디렉터리 목록을 외부 관찰 지점에 전달할 수 있는지 확인해야 파일 이름을 알 수 있다. 목록과 비밀 파일의 실제 내용은 다른 정보이므로, 둘의 수신 결과를 분리해 검증한다.

서버 기능 손상 가능성이 있다는 공식 경고를 고려해 단계마다 응답을 확인한다. 제공된 공개 서버에서 받은 내용과 제출 결과를 아래에 기록한다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/prototype-pollution/server-side/lab-exfiltrating-sensitive-data-via-server-side-prototype-pollution)

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
