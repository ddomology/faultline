---
title: "URL-based access control can be circumvented"
tags:
  - portswigger
  - access-control-vulnerabilities
lab_url: "https://portswigger.net/web-security/access-control/lab-url-based-access-control-can-be-circumvented"
difficulty: Practitioner
note_kind: problem
---

# URL-based access control can be circumvented

## 문제 조건과 설명

**주어진 조건**

인증을 요구하지 않는 관리자 패널은 `/admin`에 있지만, 앞단 시스템이 외부의 해당 경로 접근을 차단한다. 백엔드 프레임워크는 `X-Original-URL` 헤더를 지원한다. 서로 다른 계층이 요청 경로를 다르게 해석할 가능성이 주어진 핵심 단서다.

**완료 조건**

관리자 패널에 접근해 `carlos` 사용자를 삭제한다. 앞단의 차단을 피한 응답을 하나 얻는 것과 실제 관리 기능을 실행하는 것은 구별해야 한다.

**문제 설명과 판단 기준**

먼저 `/admin` 직접 요청이 어디에서 거부되는지 상태와 응답을 확인한다. 그다음 외부에 보이는 요청 경로와 백엔드가 라우팅에 사용할 수 있는 헤더 값이 달라질 때 반응이 어떻게 바뀌는지 비교한다. 이 헤더가 실제로 경로 재해석에 쓰이는지 확인하지 않은 채 우회를 성공했다고 판단해서는 안 된다.

관리자 화면이 반환되면 사용자 삭제 동작에서도 같은 경로 해석이 적용되는지 살펴야 한다. `carlos`가 대상인지와 삭제 결과를 검증하고, 앞단 경로·헤더·백엔드 응답을 함께 기록한다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/access-control/lab-url-based-access-control-can-be-circumvented)

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
