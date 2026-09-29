---
title: "Detecting server-side prototype pollution without polluted property reflection"
tags:
  - portswigger
  - prototype-pollution
lab_url: "https://portswigger.net/web-security/prototype-pollution/server-side/lab-detecting-server-side-prototype-pollution-without-polluted-property-reflection"
difficulty: Practitioner
note_kind: problem
---

# Detecting server-side prototype pollution without polluted property reflection

## 문제 조건과 설명

**주어진 조건**

Node.js와 Express 앱이 사용자 입력을 서버 객체에 안전하지 않게 병합한다. 개인 계정은 wiener:peter로 로그인한다.

**완료 조건**

Object.prototype 오염으로 서버 동작에 눈에 띄지만 파괴적이지 않은 변화를 일으켜 취약점을 확인한다.

**문제 설명**

속성이 응답에 직접 반영되지 않아도 안전한 관찰 신호로 오염을 확인하는 문제다. 실제 권한 상승까지 진행할 필요는 없으며 실습 서버가 멈추면 배너에서 재시작할 수 있다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/prototype-pollution/server-side/lab-detecting-server-side-prototype-pollution-without-polluted-property-reflection)

## 탐색 및 풀이 기록

아직 작성하지 않았다. 직접 확인한 요청·응답, 시도한 이유와 결과를 이 파일에 이어서 기록한다.
