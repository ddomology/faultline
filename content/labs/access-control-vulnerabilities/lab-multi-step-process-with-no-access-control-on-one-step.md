---
title: "Multi-step process with no access control on one step"
tags:
  - portswigger
  - access-control-vulnerabilities
lab_url: "https://portswigger.net/web-security/access-control/lab-multi-step-process-with-no-access-control-on-one-step"
difficulty: Practitioner
note_kind: problem
---

# Multi-step process with no access control on one step

## 문제 조건과 설명

**주어진 조건**

관리자 패널의 사용자 역할 변경은 여러 단계로 진행되고, 그중 한 단계의 접근 제어에 결함이 있다. `administrator:admin`으로 정상 절차를 살펴볼 수 있으며, 공격 대상 계정은 `wiener:peter`다. 어느 단계가 권한을 확인하고 어느 단계가 실제 변경을 확정하는지는 아직 주어지지 않았다.

**완료 조건**

`wiener`로 로그인해 자신의 역할을 관리자로 올린다. 중간 확인 화면을 띄우는 것만으로는 역할이 바뀌었다고 볼 수 없다.

**문제 설명과 판단 기준**

관리자 계정에서 전체 절차를 순서대로 관찰하며 각 요청의 메서드·경로·사용자 값과 응답을 기록한다. 특히 마지막에 서버 상태를 바꾸는 요청이 어느 것인지 분리해야 한다. 이후 일반 계정에서 각 단계의 접근 결과를 비교하면, 앞 단계의 권한 확인이 뒤 단계에도 강제되는지 판단할 수 있다.

단계를 건너뛸 수 있더라도 서버가 역할 변경을 실제로 받아들였는지는 따로 검증한다. `wiener` 계정의 역할이나 관리자 기능 접근 여부를 확인하고, 어떤 단계의 검사가 빠졌는지 근거와 함께 기록한다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/access-control/lab-multi-step-process-with-no-access-control-on-one-step)

## 탐색 및 풀이 기록

아직 작성하지 않았다. 직접 확인한 요청·응답, 시도한 이유와 결과를 이 파일에 이어서 기록한다.
