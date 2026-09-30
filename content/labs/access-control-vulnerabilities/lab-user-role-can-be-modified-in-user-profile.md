---
title: "User role can be modified in user profile"
tags:
  - portswigger
  - access-control-vulnerabilities
lab_url: "https://portswigger.net/web-security/access-control/lab-user-role-can-be-modified-in-user-profile"
difficulty: Apprentice
note_kind: problem
---

# User role can be modified in user profile

## 문제 조건과 설명

**주어진 조건**

`/admin`은 로그인했고 `roleid`가 `2`인 사용자만 접근할 수 있다. 실습용 일반 계정은 `wiener:peter`다. 제목은 사용자 프로필 수정 과정에서 역할 값을 바꿀 수 있음을 암시하지만, 실제로 어떤 요청 필드가 저장되는지는 관찰해야 한다.

**완료 조건**

관리자 패널에 접근해 `carlos` 사용자를 삭제한다. 프로필 수정 요청에 값을 넣어 보낸 것과 서버가 권한을 변경한 것은 다른 결과다.

**문제 설명과 판단 기준**

로그인 후 프로필 화면과 업데이트 요청의 본문, 응답을 확인한다. 일반 사용자가 바꿀 수 있어야 하는 필드와 서버가 자체적으로 관리해야 할 `roleid`를 구분하고, 요청에 포함된 값이 응답이나 이후 계정 정보에 반영되는지 살핀다. 화면에서 역할 필드를 숨겼더라도 서버가 추가 입력을 신뢰하면 권한 판정에 영향을 줄 수 있다.

역할 변경 가능성을 확인한 다음 `/admin` 접근 결과를 다시 비교해야 원인과 효과가 연결된다. 마지막에는 `carlos` 삭제가 실제로 처리되었는지 검증하고, 각 단계의 요청·응답을 기록한다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/access-control/lab-user-role-can-be-modified-in-user-profile)

## 탐색 및 풀이 기록

아직 작성하지 않았다. 직접 확인한 요청·응답, 시도한 이유와 결과를 이 파일에 이어서 기록한다.
