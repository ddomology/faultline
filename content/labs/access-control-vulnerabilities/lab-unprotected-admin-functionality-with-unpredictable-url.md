---
title: "Unprotected admin functionality with unpredictable URL"
tags:
  - portswigger
  - access-control-vulnerabilities
lab_url: "https://portswigger.net/web-security/access-control/lab-unprotected-admin-functionality-with-unpredictable-url"
difficulty: Apprentice
note_kind: problem
---

# Unprotected admin functionality with unpredictable URL

## 문제 조건과 설명

**주어진 조건**

관리자 패널에 접근 제한은 없지만 URL을 쉽게 추측할 수 없다. 다만 그 위치가 애플리케이션 어딘가에 노출되어 있다고 명시되어 있다. 따라서 무작위 경로를 대량으로 시도하기보다, 브라우저가 받은 페이지와 연결된 리소스에 드러난 경로 단서를 찾는 것이 먼저다.

**완료 조건**

노출된 주소를 찾아 관리자 패널에 접근하고 `carlos` 사용자를 삭제한다. 주소를 발견하는 단계와 권한 검사 없이 관리 기능을 사용할 수 있음을 확인하는 단계는 구별한다.

**문제 설명과 판단 기준**

정상 페이지의 HTML, 스크립트, 링크, 네트워크 요청 중 관리자 경로를 언급하는 정보가 있는지 확인한다. 발견한 문자열이 실제 관리자 페이지 주소인지 직접 요청해 검증해야 한다. 경로가 길거나 무작위처럼 보여도 애플리케이션이 외부에 알려 준다면 비밀 주소만으로 기능을 보호할 수 없다.

패널을 열었다면 화면에 표시된 사용자와 삭제 요청의 대상을 확인한다. 최종 삭제 결과를 별도로 검증하고, 어느 응답에서 URL을 발견했는지부터 아래에 기록한다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/access-control/lab-unprotected-admin-functionality-with-unpredictable-url)

## 탐색 및 풀이 기록

아직 작성하지 않았다. 직접 확인한 요청·응답, 시도한 이유와 결과를 이 파일에 이어서 기록한다.
