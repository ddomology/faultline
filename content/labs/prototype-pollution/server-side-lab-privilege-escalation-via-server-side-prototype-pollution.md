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

## 문제 조건과 설명

**주어진 조건**

Node.js·Express 서버가 사용자가 제어하는 입력을 서버 객체에 안전하지 않게 병합한다. 프로토타입을 거쳐 상속된 속성이 HTTP 응답에 드러나므로 오염 자체를 관찰할 수 있다. 계정은 `wiener:peter`다. 실습 서버가 멈추면 배너에서 재시작할 수 있지만, 속성 시험은 부작용을 고려해 진행해야 한다.

**완료 조건**

전역 `Object.prototype` 오염 소스와 권한 상승 가젯을 찾아 관리자 패널에 접근하고 `carlos`를 삭제한다. 응답에 시험 속성이 보이는 단계와 권한이 실제로 높아지는 단계는 다르다.

**문제 설명과 판단 기준**

정상 계정 요청에서 서버가 사용자 입력을 객체로 병합하는 지점을 찾고, 무해한 고유 속성이 다른 응답에도 상속되어 나타나는지 비교한다. 오염이 확인되면 사용자 권한을 결정하는 객체가 존재하지 않는 속성을 프로토타입에서 읽는지 살핀다. 응답에 속성이 반영돼도 관리 기능의 접근 제어가 바뀌지 않는다면 가젯은 아직 확인되지 않은 것이다.

권한 변화와 `carlos` 삭제를 별도로 검증한다. 오염 시험 값, 응답 반영, 관리자 접근 결과를 기록한다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/prototype-pollution/server-side/lab-privilege-escalation-via-server-side-prototype-pollution)

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
