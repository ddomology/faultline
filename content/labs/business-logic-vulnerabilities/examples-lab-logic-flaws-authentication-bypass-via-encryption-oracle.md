---
title: "Authentication bypass via encryption oracle"
tags:
  - portswigger
  - business-logic-vulnerabilities
lab_url: "https://portswigger.net/web-security/logic-flaws/examples/lab-logic-flaws-authentication-bypass-via-encryption-oracle"
difficulty: Practitioner
note_kind: problem
---

# Authentication bypass via encryption oracle

## 문제 조건과 설명

**주어진 조건**

애플리케이션의 논리 오류로 사용자가 암호화 오라클처럼 쓸 수 있는 기능이 노출된다. 자신의 계정은 `wiener:peter`다. 어떤 입력이 암호문으로 바뀌고 그 암호문을 어느 인증 단계에서 신뢰하는지는 아직 알려져 있지 않다.

**완료 조건**

관리자 패널에 접근해 `carlos` 사용자를 삭제한다. 암호문을 생성하거나 관리자처럼 보이는 문자열을 만드는 것만으로는 완료되지 않는다.

**문제 설명과 판단 기준**

먼저 정상 로그인·계정 관리 과정에서 발급되는 쿠키나 토큰의 구조를 확인하고, 입력값에 따라 암호화된 출력이 달라지는 기능을 찾는다. 그 기능이 사용자가 선택한 내용을 보호된 형태로 만들어 주는지, 만들어진 값이 다른 인증 맥락에서도 받아들여지는지 분리해 살펴야 한다. 단순한 인코딩과 서버 비밀을 이용한 암호화도 구분한다.

생성한 값이 관리자 인증에 실제 영향을 주는지 패널 접근으로 확인하고 삭제 결과를 검증한다. 오라클 입력·출력과 인증에 사용한 값을 아래에 연결해 기록한다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/logic-flaws/examples/lab-logic-flaws-authentication-bypass-via-encryption-oracle)

## 탐색 및 풀이 기록

아직 작성하지 않았다. 직접 확인한 요청·응답, 시도한 이유와 결과를 이 파일에 이어서 기록한다.
