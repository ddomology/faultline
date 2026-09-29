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

AI 스캐너가 API key 등 민감한 데이터와 carlos의 로그인 정보에 접근할 수 있으나 간접 프롬프트 삽입에 대한 자체 방어가 있다. 개인 계정은 wiener:peter로 로그인하고 게시물에서 Scan site를 눌러 검사를 시작한다.

**완료 조건**

방어를 우회해 carlos의 API key를 유출하고 제출한다.

**문제 설명**

스캐너의 방어가 외부 콘텐츠의 지시를 실제 작업과 구별하는지 살피는 문제다. 실시간 LLM의 응답은 달라질 수 있다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/llm-attacks/ai-powered-scanner-vulnerabilities/lab-bypassing-ai-scanner-defenses-to-exfiltrate-sensitive-information)

## 탐색 및 풀이 기록

아직 작성하지 않았다. 직접 확인한 요청·응답, 시도한 이유와 결과를 이 파일에 이어서 기록한다.
