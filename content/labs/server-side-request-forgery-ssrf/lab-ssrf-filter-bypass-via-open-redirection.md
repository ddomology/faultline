---
title: "SSRF with filter bypass via open redirection vulnerability"
tags:
  - portswigger
  - server-side-request-forgery-ssrf
lab_url: "https://portswigger.net/web-security/ssrf/lab-ssrf-filter-bypass-via-open-redirection"
difficulty: Practitioner
note_kind: problem
---

# SSRF with filter bypass via open redirection vulnerability

## 문제 조건과 설명

**주어진 조건**

재고 확인 기능은 로컬 애플리케이션 주소만 요청하도록 제한되어 있다. 목표 관리 화면은 `http://192.168.0.12:8080/admin`으로 주어지고, 공식 설명은 애플리케이션의 열린 리디렉션 취약점을 먼저 찾으라고 한다.

**완료 조건**

재고 확인 기능을 통해 목표 관리 화면에 도달하고 `carlos` 사용자를 삭제한다. 허용된 주소로 요청을 시작하거나 리디렉션 응답을 찾는 것만으로는 내부 관리 화면 접근을 증명하지 못한다.

**문제 설명과 판단 기준**

입력 URL의 최초 목적지는 허용 목록을 통과하더라도, 서버가 이후 리디렉션을 따라간다면 최종 목적지가 달라질 수 있다. 따라서 로컬 애플리케이션에서 이동 대상을 제어할 수 있는 기능과 재고 확인 서버의 리디렉션 추적 여부를 각각 확인해야 한다. 어느 경로가 열린 리디렉션인지 공식 설명에는 없다.

먼저 정상 재고 확인 요청과 허용되는 URL 범위를 기록한다. 애플리케이션에서 이동 대상을 바꿀 수 있는 링크나 요청을 찾고, 재고 확인 기능이 그 응답을 따라가는지 시험한다. 목표 관리 화면과 삭제 결과를 차례로 확인한다. 아직 리디렉션 경로나 성공 요청은 확인되지 않았다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/ssrf/lab-ssrf-filter-bypass-via-open-redirection)

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
