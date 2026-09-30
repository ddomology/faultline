---
title: "Blind SQL injection with time delays and information retrieval"
tags:
  - portswigger
  - sql-injection
lab_url: "https://portswigger.net/web-security/sql-injection/blind/lab-time-delays-info-retrieval"
difficulty: Practitioner
note_kind: problem
---

# Blind SQL injection with time delays and information retrieval

## 문제 조건과 설명

추적 쿠키 값이 SQL 조회에 들어간다. 쿼리 결과는 응답에 보이지 않고, 반환 행이나 오류 유무가 달라져도 페이지는 구별되지 않는다. 그러나 조회가 **동기식**이므로 SQL 처리 시간을 응답 시간으로 관찰할 여지가 있다. 이 조건은 14번과 같지만, 이번에는 시간을 지연시키는 데서 멈추지 않는다.

**알려진 구조와 찾아야 할 값**

공식 설명은 별도의 `users` 테이블과 `username`, `password` 열을 알려 준다. 목표 사용자는 `administrator`지만, 그 비밀번호의 내용과 길이는 주어지지 않는다. **완료 조건은 시간 차이를 이용해 비밀번호를 알아내고, 실제로 관리자 계정으로 로그인하는 것**이다. 지연 요청 하나가 성공해도 자격 증명을 얻지 못했다면 아직 완료가 아니다.

**시간을 정보로 바꾸는 판단**

페이지 내용이 같은 두 요청이라도, 확인하려는 조건이 참일 때만 SQL 조회가 지연된다면 응답 시간의 차이를 한 가지 답으로 읽을 수 있다. 이런 방식으로 비밀번호에 관한 조건을 조금씩 검증할 수 있다. 다만 느린 요청이 곧 참이라는 단정은 위험하다. 정상 쿠키 요청의 기준 시간을 여러 번 측정하고, 서로 반대인 조건을 같은 환경에서 비교해 일시적인 서버 지연과 구분해야 한다.

비밀번호 값을 한 번에 보여 주는 출력 위치가 없으므로, **길이와 문자에 관한 확인 과정을 누적**해야 한다. 추론한 문자열은 마지막에 로그인으로 검증한다. 문제 설명은 사용할 지연 함수나 데이터베이스 문법을 알려 주지 않으므로, 아래 기록에는 실제로 확인한 구문과 각 조건의 응답 시간을 따로 적는다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/sql-injection/blind/lab-time-delays-info-retrieval)

## 탐색 및 풀이 기록

<!-- 아직 이 실습의 시간 측정이나 비밀번호 확인 결과를 직접 기록하지 않았다. 기준 응답과 조건별 반복 측정을 확보한 뒤 같은 파일에 이어서 적는다. -->

### 초기 관찰
<!-- 직접 확인한 내용과 아직 확인하지 못한 점 -->

### 실행 과정
<!-- 무엇을 왜 했는지 → 실제 결과 → 해석 -->
<!-- 필요할 때 코드·요청·응답·스크린샷 첨부 -->

## 최종 결과
<!-- 완료 여부와 확인 근거 -->

## 배운 점
<!-- 새로 알게 된 내용, 잘못 생각했던 부분 -->
