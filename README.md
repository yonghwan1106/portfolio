# YongPark's Portfolio

50+ Vercel 프로젝트를 한눈에 볼 수 있는 개인 포트폴리오 사이트입니다.

## 주요 기능

- **자동 프로젝트 수집**: Vercel API를 통해 프로젝트 정보를 자동으로 가져옵니다
- **그리드 갤러리**: 반응형 그리드 레이아웃으로 프로젝트를 표시합니다
- **필터링 & 검색**: 카테고리별 필터링 및 키워드 검색 기능
- **프로젝트 상세 페이지**: 각 프로젝트의 상세 정보를 확인할 수 있습니다
- **다크모드 지원**: 시스템 테마를 따르는 다크모드

## 기술 스택

- **프레임워크**: Next.js 14+ (App Router)
- **스타일링**: Tailwind CSS + shadcn/ui
- **언어**: TypeScript
- **API**: Vercel REST API
- **배포**: Vercel

## 시작하기

### 1. 프로젝트 클론

```bash
git clone <repository-url>
cd portfolio
```

### 2. 의존성 설치

```bash
npm install
```

### 3. 환경변수 설정

`.env.local` 파일을 생성하고 Vercel API 토큰을 설정합니다:

```env
VERCEL_TOKEN=your_vercel_token_here
VERCEL_TEAM_ID=team_p2KV5idvV2dx3IWyN4i659UX
```

**Vercel API 토큰 생성 방법:**
1. [Vercel 대시보드](https://vercel.com/account/tokens)에 접속
2. "Create Token" 버튼 클릭
3. 토큰 이름 입력 및 스코프 설정
4. 생성된 토큰을 복사하여 `.env.local`에 붙여넣기

### 4. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인합니다.

## 프로젝트 구조

```
portfolio/
├── app/
│   ├── page.tsx                 # 홈 페이지
│   └── projects/
│       └── [name]/page.tsx      # 프로젝트 상세 페이지
├── components/
│   ├── Hero.tsx                 # Hero 섹션
│   ├── ProjectCard.tsx          # 프로젝트 카드
│   ├── ProjectGrid.tsx          # 프로젝트 그리드 + 필터
│   └── ui/                      # shadcn/ui 컴포넌트
├── lib/
│   ├── types.ts                 # 타입 정의
│   ├── vercel-api.ts           # Vercel API 클라이언트
│   └── projects.ts             # 프로젝트 데이터 로직
└── data/
    └── projects-metadata.json   # 프로젝트 추가 정보
```

## 프로젝트 메타데이터 추가하기

`data/projects-metadata.json` 파일을 수정하여 프로젝트별 추가 정보를 입력할 수 있습니다:

```json
{
  "name": "project-name",
  "displayName": "프로젝트 한글 이름",
  "description": "프로젝트 설명",
  "category": "시민참여/정부혁신",
  "tags": ["태그1", "태그2"],
  "featured": true,
  "githubUrl": "https://github.com/username/repo",
  "highlights": [
    "주요 기능 1",
    "주요 기능 2"
  ]
}
```

## 배포하기

### Vercel에 배포

```bash
npm install -g vercel
vercel
```

또는 GitHub 연동을 통해 자동 배포:
1. GitHub에 리포지토리 푸시
2. Vercel 대시보드에서 Import Project
3. 환경변수 설정 (VERCEL_TOKEN)
4. 배포

## 커스터마이징

### Hero 섹션 수정

`components/Hero.tsx`에서 이름, 소개, 기술 스택 등을 수정할 수 있습니다.

### 카테고리 추가

`lib/types.ts`의 `ProjectCategory` 타입에 새로운 카테고리를 추가하세요.

### 스타일 변경

Tailwind CSS와 shadcn/ui를 사용하므로 `app/globals.css`에서 CSS 변수를 수정하여 테마를 변경할 수 있습니다.

## 라이선스

MIT License

## 문의

- GitHub: [yourusername](https://github.com/yourusername)
- Email: your.email@example.com
