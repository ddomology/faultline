---
title: "DOM XSS using web messages"
tags:
  - portswigger
  - dom-based-vulnerabilities
lab_url: "https://portswigger.net/web-security/dom-based/controlling-the-web-message-source/lab-dom-xss-using-web-messages"
difficulty: Practitioner
note_kind: problem
---

# DOM XSS using web messages

## 문제 조건과 설명

**주어진 조건**

대상 사이트에 웹 메시지 처리 취약점이 있다. 공격자는 exploit server에서 대상 사이트로 메시지를 보내야 한다. 메시지의 구체적인 형식과 대상 페이지가 데이터를 사용하는 방식은 공식 설명에 나오지 않는다.

**완료 조건**

exploit server 페이지에서 보낸 메시지가 대상 페이지의 취약한 처리 경로를 지나 `print()`를 호출해야 한다. 메시지가 전송되거나 수신 로그가 남는 것만으로는 함수 실행을 확인할 수 없다.

**문제 설명과 판단 기준**

브라우저의 `postMessage`는 서로 다른 창이나 프레임 사이에서 데이터를 전달한다. 위험은 메시지를 받은 쪽이 출처와 내용을 어떻게 검증하고, 받은 값을 DOM의 어느 지점에 쓰는지에 달려 있다. 그러므로 메시지 데이터와 수신 페이지의 실행 결과를 연결해서 관찰해야 한다.

먼저 대상 페이지에서 `message` 이벤트 처리 코드를 찾아 허용 출처 검사와 데이터 사용 지점을 확인한다. exploit server에서 대상 창을 열거나 프레임에 넣어 작은 시험 메시지를 보내고, 수신 여부·DOM 변화·콘솔 오류를 순서대로 기록한다. 아직 실행 가능한 메시지 형식은 확인되지 않았다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/dom-based/controlling-the-web-message-source/lab-dom-xss-using-web-messages)

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
