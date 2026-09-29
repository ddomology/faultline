---
title: "Exploiting blind XXE to retrieve data via error messages"
tags:
  - portswigger
  - xml-external-entity-xxe-injection
lab_url: "https://portswigger.net/web-security/xxe/blind/lab-xxe-with-data-retrieval-via-error-messages"
difficulty: Practitioner
note_kind: problem
---

# Exploiting blind XXE to retrieve data via error messages

## 문제 조건과 설명

**주어진 조건**

`Check stock` 기능이 XML을 파싱하지만 정상 응답에는 처리 결과가 보이지 않는다. 다른 도메인의 exploit server에 외부 DTD를 올릴 수 있다. 이 문제는 오류 메시지를 데이터 관찰 지점으로 사용한다.

**완료 조건**

외부 DTD를 이용해 `/etc/passwd` 내용이 포함된 오류 메시지를 발생시킨다. 오류가 발생하기만 하거나 DTD를 가져왔다는 사실은 목표 파일 내용의 표시와 다르다.

**문제 설명과 판단 기준**

블라인드 XXE라도 파서가 세부 오류를 응답에 돌려주면 그 오류가 정보 전달 경로가 될 수 있다. 먼저 외부 DTD가 실제로 불려오는지 확인하고, 파서 오류가 어디에 어떤 형태로 표시되는지 살펴야 한다. 외부 파일의 값이 오류 문구에 포함되는지는 따로 검증한다.

정상 재고 확인 요청과 실패 요청의 응답 차이를 기록한다. exploit server에 작은 DTD를 올려 요청 여부를 확인한 뒤, 파서가 참조하는 값과 오류 메시지의 관계를 단계적으로 시험한다. 최종 응답에서 `/etc/passwd` 내용이 보이는지 확인한다. 아직 성공한 DTD나 파일 내용은 기록되지 않았다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/xxe/blind/lab-xxe-with-data-retrieval-via-error-messages)

## 탐색 및 풀이 기록

아직 작성하지 않았다. 직접 확인한 요청·응답, 시도한 이유와 결과를 이 파일에 이어서 기록한다.
