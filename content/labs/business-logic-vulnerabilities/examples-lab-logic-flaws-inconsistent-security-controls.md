---
title: "Inconsistent security controls"
tags:
  - portswigger
  - business-logic-vulnerabilities
lab_url: "https://portswigger.net/web-security/logic-flaws/examples/lab-logic-flaws-inconsistent-security-controls"
difficulty: Apprentice
note_kind: problem
---

# Inconsistent security controls

## 문제 조건과 설명

**주어진 조건**

회사 직원에게만 허용되어야 하는 관리 기능을 일반 사용자도 이용할 수 있게 만드는 권한 판단의 결함이 있다. 문제 설명은 직원 여부를 어떤 계정 값으로 판단하는지 밝히지 않는다. 따라서 가입·로그인·계정 변경 단계에서 권한 판단에 쓰일 만한 정보가 어떻게 정해지는지 먼저 살펴야 한다.

**완료 조건**

관리자 패널에 접근해 `carlos` 사용자를 삭제한다. 직원처럼 보이는 계정을 만들거나 관리자 화면의 일부를 보는 것과 실제 삭제 성공은 구별한다.

**문제 설명과 판단 기준**

일반 계정에서 관리자 기능의 접근 결과를 기준으로 확인한다. 그다음 회사 직원으로 분류될 수 있는 계정 속성이 어디서 입력·검증·저장되는지 조사한다. 한 단계에서는 일반 사용자로 취급하면서 다른 단계에서는 직원으로 인정하는지 비교하면 일관되지 않은 보안 검사의 지점을 찾을 수 있다.

권한 관련 값이 바뀌었다는 추측만으로 끝내지 말고 관리자 패널 접근과 `carlos` 삭제 결과를 확인한다. 어떤 계정 상태가 어느 요청에서 다르게 판단됐는지 아래에 기록한다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/logic-flaws/examples/lab-logic-flaws-inconsistent-security-controls)

## 탐색 및 풀이 기록

아직 작성하지 않았다. 직접 확인한 요청·응답, 시도한 이유와 결과를 이 파일에 이어서 기록한다.
