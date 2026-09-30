---
title: "User ID controlled by request parameter with data leakage in redirect"
tags:
  - portswigger
  - access-control-vulnerabilities
lab_url: "https://portswigger.net/web-security/access-control/lab-user-id-controlled-by-request-parameter-with-data-leakage-in-redirect"
difficulty: Apprentice
note_kind: problem
---

# User ID controlled by request parameter with data leakage in redirect

## 문제 조건과 설명

**주어진 조건**

접근 제어 취약점으로 인해 리디렉션 응답의 본문에 민감한 정보가 남는다. 실습용 계정 `wiener:peter`가 제공된다. 브라우저가 최종 이동 페이지를 보여 준다고 해서 중간 응답의 본문이 비어 있는 것은 아니다.

**완료 조건**

`carlos`의 API 키를 얻어 제출한다. 리디렉션이 일어난다는 사실이나 최종 페이지의 접근 거부 메시지는 목표 정보가 노출됐는지 판단하는 충분한 근거가 아니다.

**문제 설명과 판단 기준**

자신의 계정 페이지 요청에서 사용자 대상 값과 응답 형태를 파악한 뒤, 다른 사용자 대상으로 요청했을 때의 최초 HTTP 응답을 확인한다. 자동 리디렉션을 따라간 결과만 보면 `Location`으로 이동하기 전 상태 코드·헤더·본문을 놓칠 수 있다. 서버가 화면 이동을 지시하기 전에 이미 민감한 본문을 생성했는지가 핵심이다.

최초 응답에서 계정 소유자와 API 키를 함께 확인하고, 발견한 값의 제출 결과를 기록한다. 화면에 최종적으로 표시된 내용과 원래 응답에서 받은 내용을 구분해 적는다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/access-control/lab-user-id-controlled-by-request-parameter-with-data-leakage-in-redirect)

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
