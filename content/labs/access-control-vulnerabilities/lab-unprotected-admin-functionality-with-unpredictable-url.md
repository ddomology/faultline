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

## 문제 조건

관리자 패널에 접근 제한이 없고 URL은 예측하기 어렵지만 애플리케이션 어딘가에 그 위치가 노출된다.

## 완료 조건

관리자 패널을 찾아 `carlos` 사용자를 삭제한다.

## 문제 설명

관리자 경로를 숨기는 것만으로 접근 제어가 되는지 살펴본다.

출처: [PortSwigger 실습 설명](https://portswigger.net/web-security/access-control/lab-unprotected-admin-functionality-with-unpredictable-url)
