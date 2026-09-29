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

## 문제 조건

Node.js와 Express 앱이 사용자 입력을 서버 객체에 안전하지 않게 병합한다. 서버 설정 때문에 Object.prototype을 오염시켜 시스템 명령을 실행할 수 있다. 개인 계정은 wiener:peter로 로그인하며 이미 관리자 기능을 사용할 권한이 있다.

## 완료 조건

오염 소스와 명령 실행 가젯을 찾아 /home/carlos/morale.txt를 삭제하는 명령을 원격 실행한다.

## 문제 설명

서버 측 프로토타입 속성이 명령 실행 과정에 영향을 주는지 확인하는 문제다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/prototype-pollution/server-side/lab-remote-code-execution-via-server-side-prototype-pollution)
