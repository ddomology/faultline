---
title: "Unprotected admin functionality"
tags:
  - portswigger
  - access-control-vulnerabilities
lab_url: "https://portswigger.net/web-security/access-control/lab-unprotected-admin-functionality"
difficulty: Apprentice
note_kind: problem
---

# Unprotected admin functionality

## 문제 조건과 설명

**주어진 조건**

관리자 패널에 접근 제한이 없다. 문제 설명은 패널의 정확한 위치나 화면 구성을 알려 주지 않으므로, 먼저 애플리케이션에서 관리자 기능으로 이어지는 경로를 찾아야 한다. 로그인하지 않은 사용자가 관리자 URL을 아는 것과 실제 기능을 실행할 수 있는지는 별도로 확인할 사항이다.

**완료 조건**

관리자 기능을 사용해 `carlos` 사용자를 삭제한다. 패널 화면이 보인다는 사실만으로는 삭제가 이루어졌다고 판단할 수 없다.

**문제 설명과 판단 기준**

일반 화면의 링크와 공개된 경로 정보를 살펴 관리자 진입점을 찾는다. 해당 URL에 직접 요청했을 때 인증 요구나 권한 거부 없이 관리 기능이 표시되는지 확인하면 ‘보호되지 않음’이라는 조건을 실제 응답과 연결할 수 있다. 단순히 메뉴가 숨겨진 상태와 서버가 접근을 차단하는 상태는 다르다.

패널에 도달한 뒤에는 사용자 목록과 삭제 동작의 대상이 `carlos`인지 확인한다. 최종 응답이나 목록 변화로 삭제 결과를 검증하고, 경로를 발견한 근거와 실행 결과를 아래 풀이 기록에 남긴다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/access-control/lab-unprotected-admin-functionality)

## 탐색 및 풀이 기록

아직 작성하지 않았다. 직접 확인한 요청·응답, 시도한 이유와 결과를 이 파일에 이어서 기록한다.
