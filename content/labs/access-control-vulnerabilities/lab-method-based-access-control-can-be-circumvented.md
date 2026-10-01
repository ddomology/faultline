---
title: "Method-based access control can be circumvented"
tags:
  - portswigger
  - access-control-vulnerabilities
lab_url: "https://portswigger.net/web-security/access-control/lab-method-based-access-control-can-be-circumvented"
difficulty: Practitioner
note_kind: problem
---

# Method-based access control can be circumvented

## 문제 조건과 설명

**주어진 조건**

서버가 HTTP 요청 메서드에 따라 접근을 부분적으로 제어한다. 관리자 계정 `administrator:admin`으로 정상적인 관리 화면과 요청 흐름을 살펴볼 수 있고, 일반 계정 `wiener:peter`가 실습 대상이다. 어느 메서드가 보호되고 어느 메서드가 처리되는지는 관찰해야 한다.

**완료 조건**

`wiener`로 로그인한 상태에서 자신의 역할을 관리자로 승격한다. 관리 화면을 보는 것과 실제 계정 권한이 바뀌는 것은 다른 결과다.

**문제 설명과 판단 기준**

관리자 계정에서 역할 변경 요청의 URL, 메서드, 대상 사용자, 본문을 확인해 정상 동작을 기준으로 삼는다. 그런 다음 일반 계정으로 같은 기능을 요청해 거부 지점을 파악하고, 메서드만 달라졌을 때 서버가 동일한 작업을 수행하는지 비교한다. 경로별 검사만 있고 메서드별 검사에 빈틈이 있다면 같은 기능에 대한 권한 판단이 달라질 수 있다.

응답 코드 하나만으로 승격을 판단하지 말고 `wiener`의 계정 정보나 관리자 기능 접근 결과를 다시 확인한다. 각 요청의 메서드와 변경된 부분, 서버의 처리 결과를 아래에 기록한다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/access-control/lab-method-based-access-control-can-be-circumvented)

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
