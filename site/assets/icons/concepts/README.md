# 개념 노트 아이콘

웹 보안 개념을 태그와 함께 표시할 때 사용하는 SVG 33종입니다. 기존 `../topics/`의 주제 아이콘과 함께 사용합니다. 개념 글이나 연결 링크는 포함하지 않습니다.

모든 아이콘은 `24 × 24` 좌표계, `1.7` 선 굵기, 둥근 선 끝과 모서리를 사용합니다. 본체 색은 `currentColor`, 작은 강조 요소는 `var(--topic-icon-accent, currentColor)`를 따릅니다. 배경과 채움색이 없어 밝은 화면과 어두운 화면에서 같은 SVG를 사용할 수 있습니다.

아이콘 옆에 개념 이름을 함께 표시합니다. 이름이 이미 있는 태그 안에서는 아이콘을 `aria-hidden="true"`로 숨겨 중복 낭독을 피하고, 아이콘만 단독으로 사용할 때는 접근 가능한 이름을 유지합니다. SVG를 이미지 파일로 불러오면 외부 요소의 CSS 변수가 전달되지 않으므로 색을 제어하는 태그는 인라인 렌더러를 사용합니다.

| ID | 개념 | 도형 |
| --- | --- | --- |
| `http` | HTTP | 요청과 응답 화살표 |
| `http-headers` | HTTP 헤더 | 헤더 영역을 구분한 문서 |
| `url` | URL | 연결 고리 |
| `dns` | DNS | 지구와 주소 연결 |
| `tls` | TLS | 확인 표시가 있는 자물쇠 |
| `browser` | 브라우저 | 브라우저 창 |
| `dom` | DOM | 부모·자식 노드 |
| `javascript` | JavaScript | 중괄호와 실행 표시 |
| `cookies` | 쿠키 | 쿠키 조각 |
| `sessions` | 세션 | 겹친 식별 카드 |
| `same-origin-policy` | 동일 출처 정책 | 집을 감싼 방패 |
| `caching` | 캐시 | 저장 상자와 순환 화살표 |
| `proxy` | 프록시 | 두 장치 사이의 중계점 |
| `rest-api` | REST API | 연결 단자와 왕복 화살표 |
| `json` | JSON | 중괄호와 키·값 구분자 |
| `xml` | XML | 태그 괄호 |
| `sql` | SQL | 조회 문서와 돋보기 |
| `database` | 데이터베이스 | 층을 나눈 원통 |
| `encoding` | 인코딩 | 문자와 비트의 변환 |
| `regex` | 정규 표현식 | 구분자와 와일드카드 |
| `cryptography` | 암호화 | 열쇠 |
| `hashing` | 해시 | 해시 기호 |
| `digital-signatures` | 전자 서명 | 서명 문서와 펜 |
| `certificates` | 인증서 | 문서와 인장 |
| `input-validation` | 입력 검증 | 입력란과 확인 표시 |
| `output-encoding` | 출력 인코딩 | 문서 밖으로 나가는 화살표 |
| `prepared-statements` | 준비된 문장 | 매개변수 자리와 연결 화살표 |
| `content-security-policy` | 콘텐츠 보안 정책 | 브라우저와 방패 |
| `csrf-tokens` | CSRF 토큰 | 식별 표시가 있는 티켓 |
| `secure-cookies` | 안전한 쿠키 설정 | 쿠키와 자물쇠 |
| `logging` | 로깅 | 기록 문서와 시계 |
| `threat-modeling` | 위협 모델링 | 연결된 위험 요소 |
| `defense-in-depth` | 심층 방어 | 겹친 방패 |

새 아이콘도 파일 이름을 안정적인 영문 ID로 두고, `<title>`을 포함합니다. 스크립트, 스타일 태그, 외부 참조, 내부 ID는 사용하지 않습니다. 강조색은 작은 의미 요소에만 적용하고 아이콘 전체를 칠하지 않습니다.
