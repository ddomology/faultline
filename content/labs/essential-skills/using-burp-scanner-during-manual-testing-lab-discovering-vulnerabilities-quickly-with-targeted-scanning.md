---
title: "Discovering vulnerabilities quickly with targeted scanning"
tags:
  - portswigger
  - essential-skills
lab_url: "https://portswigger.net/web-security/essential-skills/using-burp-scanner-during-manual-testing/lab-discovering-vulnerabilities-quickly-with-targeted-scanning"
difficulty: Practitioner
note_kind: problem
---

# Discovering vulnerabilities quickly with targeted scanning

## 문제 조건과 설명

**주어진 조건**

서버의 임의 파일을 읽을 수 있는 취약점이 있지만 해결 제한 시간은 10분이다. 공식 설명은 사이트 전체 스캔보다 취약할 법한 요청을 먼저 골라 Burp Scanner로 표적 검사할 것을 권한다. 스캐너가 공격 경로를 제시해도 마지막 파일 읽기는 직접 수행해야 한다.

**완료 조건**

10분 안에 `/etc/passwd`의 내용을 가져온다. 취약 가능성 경고나 다른 파일의 오류 응답만으로는 완료되지 않는다.

**문제 설명과 판단 기준**

짧은 시간 안에 페이지와 요청을 살펴 파일 이름·경로처럼 서버 파일 접근에 영향을 줄 만한 엔드포인트를 선택한다. 그 요청만 검사하면 스캔 범위를 줄이고 결과를 해석할 시간을 확보할 수 있다. 스캐너 결과에서 실제로 제어 가능한 삽입 지점과 응답의 차이를 확인해 오탐 여부를 판단해야 한다.

확인된 경로를 수동으로 목표 파일에 적용하고 응답 본문이 `/etc/passwd`인지 검증한다. 선택한 요청, 스캔 근거, 수동 확인 결과와 소요 시간을 아래에 기록한다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/essential-skills/using-burp-scanner-during-manual-testing/lab-discovering-vulnerabilities-quickly-with-targeted-scanning)

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
