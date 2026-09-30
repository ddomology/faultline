---
title: "JWT authentication bypass via kid header path traversal"
tags:
  - portswigger
  - jwt
lab_url: "https://portswigger.net/web-security/jwt/lab-jwt-authentication-bypass-via-kid-header-path-traversal"
difficulty: Practitioner
note_kind: problem
---

# JWT authentication bypass via kid header path traversal

## 문제 조건과 설명

**주어진 조건**

서버가 JWT 헤더의 `kid` 값을 이용해 파일 시스템에서 검증 키를 찾는다. 실습 계정은 `wiener:peter`다. 제목은 키 식별자에 경로 탐색 입력이 들어갈 수 있음을 암시하지만, 실제 파일 접근 경로와 읽을 수 있는 파일은 확인해야 한다.

**완료 조건**

위조 JWT로 `/admin`에 접근하고 `carlos`를 삭제한다. 다른 파일을 키로 지정하게 만들었더라도 그 파일의 내용을 알고 서명을 맞추지 못하면 토큰 검증은 통과하지 않는다.

**문제 설명과 판단 기준**

정상 JWT의 `kid`와 알고리즘을 살피고 값을 바꿨을 때의 오류·검증 반응을 비교한다. 서버가 `kid`를 안전한 키 이름으로 제한하는지, 파일 경로 성분으로 해석하는지 구분해야 한다. 경로를 바꿔 읽힌 데이터가 어떤 서명 키로 쓰일 수 있는지도 별도 판단 대상이다.

형식 오류, 키 파일 조회 실패, 서명 실패, 관리자 접근 성공을 구별해 기록한다. 최종 삭제 결과로 목표 달성을 확인한다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/jwt/lab-jwt-authentication-bypass-via-kid-header-path-traversal)

## 탐색 및 풀이 기록

아직 작성하지 않았다. 직접 확인한 요청·응답, 시도한 이유와 결과를 이 파일에 이어서 기록한다.
