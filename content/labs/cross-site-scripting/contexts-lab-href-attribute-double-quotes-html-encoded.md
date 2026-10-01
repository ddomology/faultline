---
title: "Stored XSS into anchor href attribute with double quotes HTML-encoded"
tags:
  - portswigger
  - cross-site-scripting
lab_url: "https://portswigger.net/web-security/cross-site-scripting/contexts/lab-href-attribute-double-quotes-html-encoded"
difficulty: Apprentice
note_kind: problem
---

# Stored XSS into anchor href attribute with double quotes HTML-encoded

## 문제 조건과 설명

댓글 기능에 **저장형 XSS 취약점**이 있다. 제목은 입력이 앵커 링크의 `href` 속성에 놓이고 큰따옴표가 HTML 인코딩된다는 제약을 알려 준다. 20번의 저장형 댓글 문제와 같은 입력 계열이지만, 여기서 공식 완료 조건은 페이지를 열자마자 실행되는 것이 아니다.

**저장·표시·클릭을 나누어 보기**

댓글을 제출한 뒤 글 페이지를 다시 열어, 댓글 작성자 이름이 링크로 표시되는지 확인해야 한다. 그때 어떤 값이 링크의 `href`가 되었는지, 브라우저가 이를 어떤 이동 주소로 해석하는지가 중요하다. **완료 조건은 댓글 작성자 이름을 클릭할 때 `alert` 함수가 호출되는 것**이다. 댓글이 저장되었다는 사실이나 클릭 가능한 링크가 생겼다는 사실만으로는 목표를 달성하지 못한다.

큰따옴표가 인코딩되면 단순히 속성의 따옴표를 닫아 새 속성을 만드는 접근은 예상대로 되지 않을 수 있다. 반면 링크 목적지로 쓰이는 값이 어떻게 해석되는지는 별도로 확인해야 한다. 문제 설명은 댓글 양식의 어느 필드가 작성자 이름 링크와 연결되는지, 실제 `href` 값이 무엇인지, 다른 문자의 처리 방식은 알려 주지 않는다.

먼저 일반 댓글을 제출해 **입력 필드 → 저장된 댓글 → 작성자 링크**의 연결을 확인하고, 렌더링된 HTML의 `href`와 클릭 후 동작을 비교하는 순서가 타당하다. 아래에는 직접 확인한 필드, 저장된 값, 링크 주소와 클릭 결과를 분리해 기록한다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/cross-site-scripting/contexts/lab-href-attribute-double-quotes-html-encoded)

## 탐색 및 풀이 기록

<!-- 아직 이 실습의 댓글 제출이나 작성자 링크 클릭을 직접 기록하지 않았다. 저장 여부와 클릭 시 `alert` 실행 여부를 구분해 같은 파일에 이어서 적는다. -->

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
