---
title: "CSRF with broken Referer validation"
tags:
  - portswigger
  - cross-site-request-forgery-csrf
lab_url: "https://portswigger.net/web-security/csrf/bypassing-referer-based-defenses/lab-referer-validation-broken"
difficulty: Practitioner
note_kind: problem
---

# CSRF with broken Referer validation

## 문제 조건과 설명

**주어진 조건**

이메일 변경 기능은 교차 도메인 요청을 `Referer`로 탐지·차단하려 하지만 검사 방식이 우회 가능하다. 자기 계정 `wiener:peter`와 공격 페이지를 올릴 exploit server가 제공된다. 공식 설명은 정확한 검사식이나 허용 URL 형식을 밝히지 않는다.

**완료 조건**

exploit server의 HTML을 방문한 사람의 이메일 주소를 CSRF로 변경한다. 헤더에 특정 문자열이 들어간다는 사실만으로는 충분하지 않고 브라우저가 만든 요청이 서버에 수용되어야 한다.

**문제 설명과 판단 기준**

`Referer` 검사가 잘못 구현되면 허용할 출처와 실제 공격 페이지의 출처를 정확히 구별하지 못할 수 있다. 그러나 어떤 비교를 하는지 모르는 상태에서 우회 문자열을 정해 두면 관찰보다 답을 앞세우게 된다. 정상·비정상 출처 요청의 반응을 먼저 비교해야 한다.

자기 계정의 정상 이메일 변경 요청을 캡처하고 `Referer`를 바꿔 가며 응답과 계정 상태를 기록한다. 수용되는 패턴을 찾았다면 exploit server에서 브라우저가 그 헤더를 실제로 만들 수 있는지 확인한다. 마지막으로 피해자 이메일 변경을 검증한다. 현재 허용 패턴이나 성공 결과는 관찰되지 않았다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/csrf/bypassing-referer-based-defenses/lab-referer-validation-broken)

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
