---
title: "Bypassing AI scanner defenses to exfiltrate sensitive information"
tags:
  - portswigger
  - web-llm-attacks
lab_url: "https://portswigger.net/web-security/llm-attacks/ai-powered-scanner-vulnerabilities/lab-bypassing-ai-scanner-defenses-to-exfiltrate-sensitive-information"
difficulty: Practitioner
note_kind: problem
---

# Bypassing AI scanner defenses to exfiltrate sensitive information

## 문제 조건과 설명

**주어진 조건**

AI 스캐너는 감사 중 API 키를 포함한 사용자 데이터에 접근하고 `carlos`의 로그인 정보도 갖고 있다. 간접 프롬프트 주입을 막는 자체 방어가 일부 적용돼 있다. 자신의 계정은 `wiener:peter`이며 블로그 게시물의 `Scan site`로 스캔을 시작한다. 실시간 LLM 응답은 일정하지 않을 수 있다.

**완료 조건**

스캐너의 방어를 우회해 `carlos`의 API 키를 외부로 유출하고 그 값을 제출한다. 방어 메시지를 받지 않았다는 사실과 비밀 값의 유출은 구분해야 한다.

**문제 설명과 판단 기준**

먼저 스캐너가 읽는 게시물 내용과 거부되는 지시의 특징을 관찰한다. 방어가 특정 표현을 차단하는지, 외부 콘텐츠 자체를 작업 지시로 취급하지 않는지 응답과 후속 행동으로 구분한다. 문구를 바꾼 시험마다 실제 데이터 접근 및 외부 전달이 있었는지 확인해야 우회를 주장할 수 있다.

스캔 입력·방어 반응, API 키 수신 결과와 제출 상태를 아래에 기록한다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/llm-attacks/ai-powered-scanner-vulnerabilities/lab-bypassing-ai-scanner-defenses-to-exfiltrate-sensitive-information)

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
