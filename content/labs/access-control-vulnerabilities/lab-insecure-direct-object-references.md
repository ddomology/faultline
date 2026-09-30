---
title: "Insecure direct object references"
tags:
  - portswigger
  - access-control-vulnerabilities
lab_url: "https://portswigger.net/web-security/access-control/lab-insecure-direct-object-references"
difficulty: Apprentice
note_kind: problem
---

# Insecure direct object references

## 문제 조건과 설명

**주어진 조건**

사용자 채팅 기록이 서버 파일 시스템에 저장되며 정적 URL을 통해 제공된다. 파일이 채팅 기록이라는 사실과 정적 주소 형식은 주어졌지만, 파일명 규칙이나 다른 사용자의 파일을 어떻게 찾는지는 직접 확인해야 한다.

**완료 조건**

`carlos`의 비밀번호를 찾아 그의 계정으로 로그인한다. 다른 사람의 채팅 기록을 열었다는 것만으로는 목표 계정의 비밀번호를 얻은 것이 아니다.

**문제 설명과 판단 기준**

애플리케이션에서 채팅 기록을 다운로드하거나 보는 흐름을 찾아 요청 URL과 응답을 살핀다. 정상 기록의 주소가 사용자별 접근 검사 없이 파일을 직접 가리키는지 확인하고, 주소 구조나 노출된 링크에서 다른 기록을 식별할 단서를 찾는다. 정적 파일이라는 이유만으로 공개가 허용되는 것은 아니며, 서버가 요청자와 파일 소유자를 연결해 검사하는지가 판단 지점이다.

접근 가능한 기록 중 `carlos`의 비밀번호가 실제로 포함된 응답을 확인한 뒤 해당 계정으로 로그인한다. 파일을 찾은 근거와 로그인 결과를 나눠서 기록한다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/access-control/lab-insecure-direct-object-references)

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
