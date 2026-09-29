---
title: "Privilege escalation via server-side prototype pollution"
tags:
  - portswigger
  - prototype-pollution
lab_url: "https://portswigger.net/web-security/prototype-pollution/server-side/lab-privilege-escalation-via-server-side-prototype-pollution"
difficulty: Practitioner
note_kind: problem
---

# Privilege escalation via server-side prototype pollution

## 문제 조건

Node.js와 Express 앱이 사용자 입력을 서버 객체에 안전하지 않게 병합한다. 오염된 속성은 HTTP 응답에 나타나며 개인 계정은 wiener:peter로 로그인한다.

## 완료 조건

전역 Object.prototype 오염 소스와 권한 상승 가젯을 찾아 관리자 패널에서 carlos를 삭제한다.

## 문제 설명

서버 측 프로토타입 오염이 권한 판정에 영향을 주는지 확인하는 문제다. 실습 서버가 멈추면 배너에서 재시작할 수 있다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/prototype-pollution/server-side/lab-privilege-escalation-via-server-side-prototype-pollution)
