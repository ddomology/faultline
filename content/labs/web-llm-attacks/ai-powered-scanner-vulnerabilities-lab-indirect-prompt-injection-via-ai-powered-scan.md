---
title: "Exploiting AI agents to perform destructive actions"
tags:
  - portswigger
  - web-llm-attacks
lab_url: "https://portswigger.net/web-security/llm-attacks/ai-powered-scanner-vulnerabilities/lab-indirect-prompt-injection-via-ai-powered-scan"
difficulty: Apprentice
note_kind: problem
---

# Exploiting AI agents to perform destructive actions

## 문제 조건

사용자가 작성한 콘텐츠를 조사하는 AI 스캐너가 carlos의 로그인 정보를 갖고 있다. 개인 계정은 wiener:peter로 로그인하며 게시물에서 Scan site를 눌러 검사를 시작한다.

## 완료 조건

간접 프롬프트 삽입으로 스캐너를 조작해 carlos를 삭제한다.

## 문제 설명

스캐너가 읽은 게시물의 지시를 자신의 작업으로 받아들이는지 확인하는 문제다. 실시간 LLM의 응답은 달라질 수 있다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/llm-attacks/ai-powered-scanner-vulnerabilities/lab-indirect-prompt-injection-via-ai-powered-scan)
