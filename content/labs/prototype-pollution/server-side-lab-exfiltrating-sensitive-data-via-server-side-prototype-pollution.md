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

Node.js와 Express 앱의 서버 측 Object.prototype 오염으로 시스템 명령 실행이 가능하다. 개인 계정은 wiener:peter로 로그인하며 이미 관리자 기능을 사용할 권한이 있다.

**완료 조건**

/home/carlos의 내용과 그 안의 비밀 파일을 공개 Burp Collaborator 서버로 유출하고 비밀 값을 실습 배너로 제출한다.

**문제 설명**

오염 소스와 명령 실행 가젯을 찾아 파일 내용을 외부로 전달할 수 있는지 살피는 문제다. 실습 서버가 멈추면 배너에서 재시작할 수 있다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/prototype-pollution/server-side/lab-exfiltrating-sensitive-data-via-server-side-prototype-pollution)

## 탐색 및 풀이 기록

아직 작성하지 않았다. 직접 확인한 요청·응답, 시도한 이유와 결과를 이 파일에 이어서 기록한다.
