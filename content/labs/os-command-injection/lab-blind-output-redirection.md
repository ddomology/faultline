---
title: "Blind OS command injection with output redirection"
tags:
  - portswigger
  - os-command-injection
lab_url: "https://portswigger.net/web-security/os-command-injection/lab-blind-output-redirection"
difficulty: Practitioner
note_kind: problem
---

# Blind OS command injection with output redirection

## 문제 조건과 설명

**주어진 조건**

피드백 기능의 셸 명령 출력은 응답에 보이지 않는다. 그러나 서버의 `/var/www/images/`는 쓰기 가능하고, 상품 이미지 URL을 통해 그 폴더의 파일을 읽을 수 있다. 파일 쓰기와 HTTP 조회가 연결되는 관찰 경로가 제공된 셈이다.

**완료 조건**

`whoami`를 실행하고 그 출력이 저장된 파일을 상품 이미지 경로로 조회해 사용자 이름을 확인한다. 파일 요청이 200을 반환하는 것과 그 안에 실제 명령 출력이 들어 있는 것은 다르다.

**문제 설명과 판단 기준**

이 문제는 응답 시간을 이용하는 앞선 블라인드 유형과 달리 명령 출력을 서버 파일로 돌려서 읽는다. 파일 경로가 쓰기 가능한지, 웹에서 어떤 URL로 노출되는지, 요청마다 기존 파일이 덮어써지는지를 확인해야 관찰 결과를 올바르게 해석할 수 있다.

정상 피드백 요청과 상품 이미지 URL의 대응을 살핀다. 명령 실행 결과가 지정한 파일에 기록되는지 시험하고, 별도 GET 요청으로 내용이 `whoami` 출력인지 검증한다. 현재 출력 파일이나 사용자 이름은 확인되지 않았다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/os-command-injection/lab-blind-output-redirection)

## 탐색 및 풀이 기록

아직 작성하지 않았다. 직접 확인한 요청·응답, 시도한 이유와 결과를 이 파일에 이어서 기록한다.
