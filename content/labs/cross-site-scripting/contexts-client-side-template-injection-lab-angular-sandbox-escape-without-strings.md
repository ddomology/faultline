---
title: "Reflected XSS with AngularJS sandbox escape without strings"
tags:
  - portswigger
  - cross-site-scripting
lab_url: "https://portswigger.net/web-security/cross-site-scripting/contexts/client-side-template-injection/lab-angular-sandbox-escape-without-strings"
difficulty: Expert
note_kind: problem
---

# Reflected XSS with AngularJS sandbox escape without strings

## 문제 조건과 설명

**주어진 조건**

페이지가 AngularJS를 특이하게 사용해 `$eval` 함수를 사용할 수 없고 AngularJS 표현식에서 문자열도 사용할 수 없다. 문제 제목과 설명은 반사형 XSS 및 AngularJS 샌드박스 탈출을 목표로 제시하지만, 입력이 구체적으로 어느 템플릿에 놓이는지는 보여 주지 않는다.

**완료 조건**

문자열이나 `$eval`에 의존하지 않고 AngularJS 샌드박스를 벗어나 `alert()`를 실행한다. 표현식이 화면에 나타나거나 단순 계산이 평가되는 것만으로는 탈출과 실행을 입증하지 못한다.

**문제 설명과 판단 기준**

클라이언트 측 템플릿 주입에서는 서버 응답의 입력이 브라우저에서 AngularJS 표현식으로 다시 해석되는지가 먼저 관건이다. 그다음에는 어떤 객체와 연산이 허용되는지, 문자열을 쓸 수 없는 제한이 실제로 어디까지 적용되는지를 살펴야 한다. 샌드박스 탈출 방법을 알고 있다고 가정해 입력을 고르면 문제의 제약을 확인할 수 없다.

입력의 반사 지점과 AngularJS가 관리하는 DOM 범위를 확인하고, 단순한 평가 여부부터 검사한다. 표현식 결과와 콘솔 오류를 기록하면서 `$eval` 및 문자열 없이 접근 가능한 기능을 좁혀 간다. 현재 AngularJS 버전, 사용 가능한 객체, 성공한 표현식은 직접 확인되지 않았다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/cross-site-scripting/contexts/client-side-template-injection/lab-angular-sandbox-escape-without-strings)

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
