---
title: "Reflected XSS into HTML context with nothing encoded"
tags:
  - portswigger
  - cross-site-scripting
lab_url: "https://portswigger.net/web-security/cross-site-scripting/reflected/lab-html-context-nothing-encoded"
difficulty: Apprentice
note_kind: problem
---

# Reflected XSS into HTML context with nothing encoded

## 문제 조건과 설명

공식 설명은 **검색 기능에 반사형 XSS 취약점**이 있다고 알려 준다. 제목은 입력이 HTML 문맥으로 돌아오며 인코딩되지 않는다는 단서를 더한다. 사용자가 검색 요청에 보낸 값이 그 요청의 응답 페이지에 다시 나타나는 흐름이다. 댓글처럼 서버에 저장되었다가 나중에 보이는 문제라는 조건은 주어지지 않는다.

**반사와 실행을 구별하기**

검색어가 화면에 글자로 표시되기만 하는 것은 XSS 실행의 증거가 아니다. 어디에 반사되는지, 응답 HTML에서 브라우저가 그 값을 **텍스트**로 읽는지 **마크업**으로 해석할 수 있는지 확인해야 한다. 제목이 인코딩이 없다고 알려 주더라도, 실제 페이지의 삽입 위치와 주변 HTML은 요청·응답에서 살펴봐야 한다.

안전한 일반 검색어와 구별되는 표시용 문자열로 반사 위치를 먼저 찾으면, 검색 입력이 어느 HTML 요소 안에 놓이는지 파악하기 쉽다. 이후 그 문맥에서 스크립트가 실행되는지 확인한다. 응답 소스에 문자가 보이는 것과 브라우저가 실행하는 것은 별도의 관찰이다.

**완료 조건은 검색 기능의 XSS를 이용해 `alert` 함수를 호출하는 것**이다. 성공 판정은 입력 문자열의 단순 출력이 아니라 실제 함수 호출과 실습 완료 상태에 근거해야 한다. 공식 설명은 검색 파라미터 이름이나 구체적인 HTML 구조를 알려 주지 않으므로, 아래에는 직접 확인한 입력 지점과 반사 위치, 실행 결과를 구분해 기록한다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/cross-site-scripting/reflected/lab-html-context-nothing-encoded)

## 탐색 및 풀이 기록

<!-- 아직 이 실습의 검색 요청·응답이나 `alert` 실행을 직접 기록하지 않았다. 반사 위치와 브라우저에서의 실행 여부를 확인한 뒤 같은 파일에 이어서 적는다. -->

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
