---
title: "Exploiting AI agents to exfiltrate sensitive information"
tags:
  - portswigger
  - web-llm-attacks
lab_url: "https://portswigger.net/web-security/llm-attacks/ai-powered-scanner-vulnerabilities/lab-sensitive-information-exfiltration"
difficulty: Apprentice
note_kind: problem
---

# Exploiting AI agents to exfiltrate sensitive information

## 문제 조건과 설명

**주어진 조건**

AI 스캐너는 사이트 감사 중 사용자 데이터와 API 키에 접근할 수 있고, `carlos`의 로그인 정보도 제공받았다. 자신의 계정은 `wiener:peter`다. 블로그 게시물을 고른 뒤 `Scan site`로 스캔을 시작하며, 실시간 LLM의 응답은 변동될 수 있다.

**완료 조건**

간접 프롬프트 주입으로 `carlos`의 API 키를 외부로 유출하고 그 값을 실습에 제출한다. 키가 존재한다고 추정하거나 스캐너가 접근 가능하다고 설명하는 것만으로는 완료되지 않는다.

**문제 설명과 판단 기준**

스캐너가 읽는 사용자 생성 콘텐츠와 인증된 데이터에 접근하는 단계를 먼저 구분한다. 콘텐츠 속 지시가 스캐너의 원래 감사 작업을 벗어나 비밀 값을 읽고 외부로 전달하게 하는지 확인한다. 외부 관찰 지점에서 받은 값이 실제 API 키인지 검증하고, 제출 결과까지 확인해야 탐색이 끝난다.

게시물, 스캔 반응, 유출 수신 결과와 제출 상태를 아래에 기록한다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/llm-attacks/ai-powered-scanner-vulnerabilities/lab-sensitive-information-exfiltration)

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
