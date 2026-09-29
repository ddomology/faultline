---
title: "Bypassing flawed input filters for server-side prototype pollution"
tags:
  - portswigger
  - prototype-pollution
lab_url: "https://portswigger.net/web-security/prototype-pollution/server-side/lab-bypassing-flawed-input-filters-for-server-side-prototype-pollution"
difficulty: Practitioner
note_kind: problem
---

# Bypassing flawed input filters for server-side prototype pollution

## 문제 조건과 설명

**주어진 조건**

Node.js와 Express 앱이 사용자 입력을 서버 객체에 안전하지 않게 병합하며 입력 필터에도 결함이 있다. 개인 계정은 wiener:peter로 로그인한다.

**완료 조건**

전역 Object.prototype 오염 소스와 권한 상승 가젯을 찾아 관리자 패널에서 carlos를 삭제한다.

**문제 설명**

필터를 거친 입력이 서버 객체의 프로토타입에 도달하는지 살피는 문제다. 실습 서버가 멈추면 배너에서 재시작할 수 있다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/prototype-pollution/server-side/lab-bypassing-flawed-input-filters-for-server-side-prototype-pollution)

## 탐색 및 풀이 기록

아직 작성하지 않았다. 직접 확인한 요청·응답, 시도한 이유와 결과를 이 파일에 이어서 기록한다.
