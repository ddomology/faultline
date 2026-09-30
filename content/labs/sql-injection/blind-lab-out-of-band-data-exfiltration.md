---
title: "Blind SQL injection with out-of-band data exfiltration"
tags:
  - portswigger
  - sql-injection
lab_url: "https://portswigger.net/web-security/sql-injection/blind/lab-out-of-band-data-exfiltration"
difficulty: Practitioner
note_kind: problem
---

# Blind SQL injection with out-of-band data exfiltration

## 문제 조건과 설명

추적 쿠키의 값이 비동기 SQL 조회에 들어간다. 조회 결과는 애플리케이션 응답에 표시되지 않으며, 비동기 처리 때문에 페이지의 응답을 비교하는 방법만으로는 SQL 결과를 읽을 수 없다. 공식 설명은 주입된 조회로 외부 도메인과 상호작용할 수 있다고 알려 준다.

**16번과 이번 문제의 차이**

앞선 out-of-band 실습은 **DNS 조회가 발생했는지**를 확인하는 것이 완료 조건이었다. 이번에는 그 통신 경로를 이용해 **데이터베이스 안의 값 자체를 알아내야 한다.** SQL 실행의 흔적만 남기는 것과 관리자 비밀번호를 외부 이벤트에서 식별 가능한 형태로 전달하는 것은 서로 다른 단계다.

공식 설명은 `users` 테이블과 `username`, `password` 열이 존재한다고 알려 준다. `administrator`의 실제 비밀번호는 주어지지 않는다. **완료 조건은 그 값을 외부 상호작용으로 확인한 뒤 관리자 계정으로 로그인하는 것**이다. DNS 이벤트 하나를 확인했더라도 그 이벤트에 비밀번호가 포함되지 않았다면 목표를 달성한 것이 아니다.

**탐색에서 확인할 순서와 제약**

먼저 보낸 쿠키 요청과 짝을 지을 수 있는 외부 이벤트가 실제로 도착하는지 확인해야 한다. 그다음 계정 조회에서 얻으려는 값을 외부 요청의 식별 가능한 부분에 담을 수 있는지 살펴보고, 수신 기록에서 읽은 값을 로그인으로 검증해야 한다. 데이터가 DNS 이름에 들어간다면 허용되는 문자와 길이 때문에 표현 방법도 확인해야 한다. 어떤 SQL 구문과 인코딩이 통하는지는 문제 설명만으로 확정할 수 없다.

공식 주의 문구에 따라 Academy 방화벽은 임의의 외부 시스템으로 가는 상호작용을 차단하므로, **Burp Collaborator의 기본 공개 서버를 사용해야 한다.** 외부 이벤트가 없을 때는 이 환경 제약을 먼저 고려해야 한다. 아래에는 직접 확인한 이벤트와 계정 값만 기록한다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/sql-injection/blind/lab-out-of-band-data-exfiltration)

## 탐색 및 풀이 기록

<!-- 아직 이 실습의 외부 이벤트나 관리자 비밀번호를 직접 기록하지 않았다. 통신 확인과 데이터 확인을 분리해 같은 파일에 이어서 적는다. -->

### 초기 관찰
<!-- 직접 확인한 내용과 아직 확인하지 못한 점 -->

### 실행 과정
<!-- 무엇을 왜 했는지 → 실제 결과 → 해석 -->
<!-- 필요할 때 코드·요청·응답·스크린샷 첨부 -->

## 최종 결과
<!-- 완료 여부와 확인 근거 -->

## 배운 점
<!-- 새로 알게 된 내용, 잘못 생각했던 부분 -->
