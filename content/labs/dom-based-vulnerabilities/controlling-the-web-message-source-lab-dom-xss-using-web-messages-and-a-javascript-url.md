---
title: "DOM XSS using web messages and a JavaScript URL"
tags:
  - portswigger
  - dom-based-vulnerabilities
lab_url: "https://portswigger.net/web-security/dom-based/controlling-the-web-message-source/lab-dom-xss-using-web-messages-and-a-javascript-url"
difficulty: Practitioner
note_kind: problem
---

# DOM XSS using web messages and a JavaScript URL

## 문제 조건과 설명

**주어진 조건**

웹 메시지로 동작하는 DOM 기반 리디렉션 취약점이 있다. 제목은 JavaScript URL이 이 흐름과 연결된다는 단서를 준다. 공격자가 exploit server에 HTML 페이지를 작성해 대상 사이트에 영향을 주어야 한다.

**완료 조건**

exploit server 페이지의 동작을 통해 대상 브라우저에서 `print()`가 호출되어야 한다. 메시지를 수신했다거나 URL이 바뀌었다는 사실만으로는 코드 실행을 증명하지 못한다.

**문제 설명과 판단 기준**

리디렉션 기능은 메시지의 값을 이동 대상으로 사용할 수 있다. 브라우저가 그 값을 일반 URL로 다루는지, JavaScript URL로 해석할 여지가 있는지는 실제 수신 코드와 탐색 결과를 봐야 한다. 메시지의 출처 검사, 값의 검증, 실제 이동을 각각 분리해 확인해야 우회 지점을 찾을 수 있다.

대상 페이지의 `message` 처리와 위치 변경 코드를 확인한다. exploit server에서 작은 URL 값을 보내 수신·이동 여부를 검사하고, URL 형식별 결과와 콘솔 오류를 기록한다. 최종 판정은 `print()`의 실제 호출이다. 아직 허용 형식이나 성공 입력은 관찰되지 않았다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/dom-based/controlling-the-web-message-source/lab-dom-xss-using-web-messages-and-a-javascript-url)

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

## 관련 개념
<!-- 필요한 개념 노트 링크를 목록으로 추가 -->
