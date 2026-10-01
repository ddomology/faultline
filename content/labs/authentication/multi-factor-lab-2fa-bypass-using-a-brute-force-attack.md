---
title: "2FA bypass using a brute-force attack"
tags:
  - portswigger
  - authentication
lab_url: "https://portswigger.net/web-security/authentication/multi-factor/lab-2fa-bypass-using-a-brute-force-attack"
difficulty: Expert
note_kind: problem
---

# 2FA bypass using a brute-force attack

## 문제 조건과 설명

**주어진 조건**

Carlos의 1차 자격 증명 `carlos:montoya`는 알려져 있지만 2FA 코드는 알 수 없다. 코드 검증은 무차별 대입에 취약하며, 공식 설명은 시도 중 코드가 재설정될 수 있다고 경고한다. 재설정된 새 코드가 이미 시도한 숫자일 수 있어 한 번의 전체 시도가 실패할 수 있다.

**완료 조건**

유효한 2FA 코드를 찾아 Carlos의 계정 페이지에 접근한다. 1차 로그인 성공이나 코드 검증 요청이 계속 처리되는 것만으로는 완료되지 않는다.

**문제 설명과 판단 기준**

비밀번호 로그인 뒤 코드 제출 요청의 형식과 실패 응답을 먼저 살핀다. 여러 번의 실패 뒤 세션, 코드, 검증 화면이 어떻게 바뀌는지 관찰해야 반복 시도 가능성과 코드 재발급 시점을 판단할 수 있다. 응답 속도나 상태 코드만이 아니라 인증된 세션으로 이동했는지도 구별해야 한다.

시도 중 코드가 교체되면 앞서 검사한 범위를 다시 확인할 필요가 있을 수 있다. 성공으로 보이는 응답 뒤 Carlos의 계정 페이지를 열어 검증하고, 코드의 유효 기간과 세션 변화에 관해 관찰한 사실을 기록한다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/authentication/multi-factor/lab-2fa-bypass-using-a-brute-force-attack)

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

## 관련 개념
<!-- 필요한 개념 노트 링크를 목록으로 추가 -->
