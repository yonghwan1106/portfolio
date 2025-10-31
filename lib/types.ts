// Vercel API 타입 정의
export interface VercelProject {
  id: string;
  name: string;
  framework: string | null;
  accountId: string;
  createdAt: number;
  updatedAt: number;
  nodeVersion: string;
  live: boolean;
  latestDeployment?: {
    id: string;
    url: string;
    createdAt: number;
    readyState: 'READY' | 'BUILDING' | 'ERROR' | 'CANCELED';
    target: 'production' | 'preview';
  };
  domains?: string[];
}

export interface VercelTeam {
  id: string;
  name: string;
  slug: string;
}

// 확장된 프로젝트 정보 (수동 입력)
export interface ProjectMetadata {
  name: string; // Vercel 프로젝트 이름 (매칭 키)
  displayName: string; // 한글 표시 이름
  description: string;
  category: ProjectCategory;
  tags: string[];
  featured: boolean;
  githubUrl?: string;
  screenshots?: string[];
  highlights?: string[];
}

export type ProjectCategory =
  | '시민참여/정부혁신'
  | 'ESG/환경'
  | 'AI/데이터분석'
  | '교육/복지'
  | '기타';

// 통합 프로젝트 타입
export interface Project extends VercelProject {
  displayName: string;
  description: string;
  category: ProjectCategory;
  tags: string[];
  featured: boolean;
  githubUrl?: string;
  screenshots?: string[];
  highlights?: string[];
  productionUrl?: string;
}
