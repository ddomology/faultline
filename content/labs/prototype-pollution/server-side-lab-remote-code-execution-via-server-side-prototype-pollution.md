---
title: "Remote code execution via server-side prototype pollution"
tags:
  - portswigger
  - prototype-pollution
lab_url: "https://portswigger.net/web-security/prototype-pollution/server-side/lab-remote-code-execution-via-server-side-prototype-pollution"
difficulty: Practitioner
note_kind: problem
---

# Remote code execution via server-side prototype pollution

## 문제 조건과 설명

**주어진 조건**

Node.js·Express 서버가 사용자 입력을 객체에 안전하지 않게 병합한다. 서버 설정상 `Object.prototype`을 오염시켜 시스템 명령이 실행되는 경로가 있다. 제공된 계정 `wiener:peter`는 이미 관리자 기능에 접근할 수 있으므로 이번 목표는 권한 상승이 아니라 명령 실행이다.

**완료 조건**

오염 소스와 명령 실행 가젯을 찾아 `/home/carlos/morale.txt`를 삭제하는 명령을 원격에서 실행한다. 관리자 화면 접근이나 시험 속성의 응답 반영은 완료 기준이 아니다.

**문제 설명과 판단 기준**

사용자 입력이 어떤 서버 객체에 병합되는지 무해한 값으로 확인한 뒤, 서버 기능이 상속 속성을 명령 실행 설정으로 읽는지 조사한다. 명령을 실행하는 기능의 호출 시점과 오염된 속성이 읽히는 시점이 맞아야 실제 동작이 생긴다. 응답의 단순 변화와 서버에서 명령이 수행된 증거를 구별한다.

실행 근거가 마련되면 지정 파일에 대한 결과를 검증한다. 오염 입력, 가젯을 자극한 요청, 삭제 완료 상태를 아래에 기록한다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/prototype-pollution/server-side/lab-remote-code-execution-via-server-side-prototype-pollution)

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
