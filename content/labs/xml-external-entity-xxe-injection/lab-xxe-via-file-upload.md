---
title: "Exploiting XXE via image file upload"
tags:
  - portswigger
  - xml-external-entity-xxe-injection
lab_url: "https://portswigger.net/web-security/xxe/lab-xxe-via-file-upload"
difficulty: Practitioner
note_kind: problem
---

# Exploiting XXE via image file upload

## 문제 조건과 설명

**주어진 조건**

댓글에 아바타 이미지를 첨부할 수 있고 서버는 업로드된 이미지를 Apache Batik으로 처리한다. XXE의 입력 지점은 재고 확인 요청이 아니라 이미지 파일과 그 처리 과정이다.

**완료 조건**

처리 후 서버의 `/etc/hostname` 내용이 보이는 이미지를 업로드한다. 그 이미지에서 얻은 서버 호스트 이름을 `Submit solution` 버튼으로 제출해야 실습이 완료된다. 업로드 성공만으로는 파일 내용 확인이나 정답 제출을 증명하지 못한다.

**문제 설명과 판단 기준**

이미지 파일이라도 처리 라이브러리가 내부에서 XML 문서를 파싱한다면 외부 자원 참조가 영향을 줄 수 있다. 하지만 어떤 파일 형식이 허용되고 서버가 원본을 그대로 제공하는지 또는 변환하는지는 직접 살펴야 한다. 중요한 관찰 지점은 업로드 응답보다 처리된 아바타의 표시 결과다.

정상 아바타 업로드의 요청 형식과 허용 파일 형식을 확인한다. XML 처리 경로가 있는 이미지가 어떻게 렌더링되는지 비교하고, 처리 후 이미지에 `/etc/hostname` 내용이 표시되는지를 검사한다. 얻은 값을 별도로 제출해 판정을 확인한다. 아직 허용 형식이나 호스트 이름은 확인되지 않았다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/xxe/lab-xxe-via-file-upload)

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

## 관련 개념
<!-- 필요한 개념 노트 링크를 목록으로 추가 -->
