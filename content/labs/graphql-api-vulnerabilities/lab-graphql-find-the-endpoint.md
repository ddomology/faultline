---
title: "Finding a hidden GraphQL endpoint"
tags:
  - portswigger
  - graphql-api-vulnerabilities
lab_url: "https://portswigger.net/web-security/graphql/lab-graphql-find-the-endpoint"
difficulty: Practitioner
note_kind: problem
---

# Finding a hidden GraphQL endpoint

## 문제 조건과 설명

**주어진 조건**

사용자 관리 기능 뒤에 숨겨진 GraphQL 엔드포인트가 있다. 사이트의 링크를 클릭하는 것만으로는 위치를 찾을 수 없고, 엔드포인트에는 introspection을 막는 조치도 일부 적용돼 있다.

**완료 조건**

숨겨진 엔드포인트를 찾아 사용자 관리 기능을 통해 `carlos`를 삭제한다. 경로를 발견하거나 스키마 일부를 알아내는 단계만으로는 완료되지 않는다.

**문제 설명과 판단 기준**

페이지가 직접 링크하지 않는 요청 흔적과 클라이언트 코드의 API 참조를 살펴 엔드포인트 후보를 만든다. 후보 경로마다 일반 오류 페이지인지 GraphQL이 해석한 응답인지 구별하면 실제 엔드포인트를 확인할 수 있다. introspection이 제한되더라도 허용되는 요청과 검증 오류의 차이를 통해 사용 가능한 연산을 좁혀야 한다.

엔드포인트 발견, 관리 연산 확인, 삭제 결과를 별개로 검증해 아래에 기록한다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/graphql/lab-graphql-find-the-endpoint)

## 탐색 및 풀이 기록

아직 작성하지 않았다. 직접 확인한 요청·응답, 시도한 이유와 결과를 이 파일에 이어서 기록한다.
