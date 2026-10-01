---
title: "0.CL request smuggling"
tags:
  - portswigger
  - http-request-smuggling
lab_url: "https://portswigger.net/web-security/request-smuggling/advanced/lab-request-smuggling-0cl-request-smuggling"
difficulty: Expert
note_kind: problem
---

# 0.CL request smuggling

## 문제 조건과 설명

**주어진 조건**

사이트에는 0.CL 요청 밀어넣기 취약점이 있고 `carlos`가 5초마다 홈 페이지를 방문한다. 공식 설명은 배경 자료로 PortSwigger Research의 `HTTP/1.1 Must Die` 백서를 제시하지만, 이 노트는 문제에서 직접 주어진 조건과 실습 관찰을 기준으로 쓴다.

**완료 조건**

Carlos의 브라우저에서 `alert()`가 실행되어야 한다. 내 요청에서 오류가 나거나 내 브라우저에서만 경고창이 뜨는 결과와 구별해야 한다.

**문제 설명과 판단 기준**

0.CL이라는 이름은 요청 길이 경계가 일치하지 않는 유형을 가리킨다. 구체적으로 어떤 요청이 한쪽 서버에서 본문 길이 0처럼 처리되는지는 실습의 반응으로 확인해야 한다. 목표가 피해자의 주기적인 홈 페이지 방문에 연결되므로, 경계 차이와 피해자 응답에 미친 영향을 단계별로 판단한다.

먼저 정상 홈 페이지 응답과 반복 방문 주기를 기준으로 잡는다. 요청 길이 해석 차이가 생기는지 작은 시험 요청으로 확인하고, 그 결과가 Carlos의 다음 방문에 영향을 주는지 관찰한다. 최종 판정은 피해자 브라우저의 `alert()` 실행이다. 아직 성공한 길이 조합이나 피해자 실행 기록은 없다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/request-smuggling/advanced/lab-request-smuggling-0cl-request-smuggling)

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
