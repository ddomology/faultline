---
title: "Scanning non-standard data structures"
tags:
  - portswigger
  - essential-skills
lab_url: "https://portswigger.net/web-security/essential-skills/using-burp-scanner-during-manual-testing/lab-scanning-non-standard-data-structures"
difficulty: Practitioner
note_kind: problem
---

# Scanning non-standard data structures

## 문제 조건과 설명

**주어진 조건**

취약점은 일반적인 매개변수 형태가 아닌 비표준 데이터 구조 안에 있어 수동으로 찾기 어렵다. 실습 계정은 `wiener:peter`다. 공식 설명은 Burp Scanner의 `Scan selected insertion point` 기능으로 위치를 찾아낸 뒤 직접 악용하라고 요구한다.

**완료 조건**

선택한 삽입 지점의 취약점을 확인해 수동으로 이용하고 `carlos`를 삭제한다. 스캐너의 발견 메시지만으로는 관리자 기능 실행과 삭제가 이루어진 것이 아니다.

**문제 설명과 판단 기준**

먼저 로그인 후 요청 본문과 헤더에서 중첩되거나 구조화된 데이터를 찾는다. 일반 파라미터 전체를 무작정 검사하기보다 의심되는 데이터 조각을 삽입 지점으로 지정해 스캔한다. 결과가 나오면 해당 조각이 서버의 어느 기능에 연결되고 어떤 입력 변화가 응답 차이를 만드는지 수동 요청으로 확인한다.

발견한 취약점이 관리자 기능까지 이어지는 경로를 검증하고, `carlos` 삭제 결과를 확인한다. 삽입 지점을 선택한 이유, 스캔 결과, 수동 검증을 아래에 분리해 기록한다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/essential-skills/using-burp-scanner-during-manual-testing/lab-scanning-non-standard-data-structures)

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
