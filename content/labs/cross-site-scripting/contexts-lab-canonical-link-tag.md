---
title: "Reflected XSS in canonical link tag"
tags:
  - portswigger
  - cross-site-scripting
lab_url: "https://portswigger.net/web-security/cross-site-scripting/contexts/lab-canonical-link-tag"
difficulty: Practitioner
note_kind: problem
---

# Reflected XSS in canonical link tag

## 문제 조건과 설명

**주어진 조건**

홈페이지의 사용자 입력이 `canonical` 링크 태그에 반사된다. 꺾쇠괄호는 이스케이프되므로 새 태그를 만드는 방식보다 기존 `<link>` 요소의 속성 문맥을 살펴야 한다. 실습의 모의 사용자는 Chrome을 쓰고 `ALT+SHIFT+X`, `CTRL+ALT+X`, `Alt+X` 가운데 하나를 누른다. 공식 설명에 따르면 의도된 해결은 Chrome에서만 가능하다.

**완료 조건**

홈페이지에 속성을 주입해, 지정된 키 입력이 일어났을 때 `alert()`가 호출되도록 한다. 이 문제에서는 사용자의 키 동작이 명시적인 실행 조건이다.

**문제 설명과 판단 기준**

반사 위치가 텍스트 노드인지 속성값인지에 따라 가능한 해석이 달라진다. 여기서는 꺾쇠괄호가 막혀 있다는 단서보다 기존 링크 태그 안에서 따옴표와 공백 등 입력이 어떻게 처리되는지 확인하는 일이 중요하다. 브라우저별 단축키 동작도 성공 여부에 영향을 준다.

먼저 홈페이지 응답의 `canonical` 태그에서 입력의 앞뒤 문맥과 인코딩을 확인한다. 이어 Chrome의 최종 DOM에서 새 속성이 실제로 형성되는지 보고, 문제에 명시된 키 조합으로만 동작을 검증한다. 아직 어떤 속성이나 입력이 허용되는지는 직접 확인되지 않았다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/cross-site-scripting/contexts/lab-canonical-link-tag)

## 탐색 및 풀이 기록

아직 작성하지 않았다. 직접 확인한 요청·응답, 시도한 이유와 결과를 이 파일에 이어서 기록한다.
