import { getProjects } from './vercel-api';
import { Project, ProjectMetadata } from './types';
import projectsMetadata from '@/data/projects-metadata.json';

export async function getAllProjects(): Promise<Project[]> {
  const vercelProjects = await getProjects();
  const metadata = projectsMetadata as ProjectMetadata[];

  // Vercel 프로젝트와 메타데이터 병합
  const projects: Project[] = vercelProjects.map((vp) => {
    const meta = metadata.find((m) => m.name === vp.name);

    // production URL 찾기
    const productionUrl = vp.domains?.find(
      (d) => !d.includes('git-') && d.endsWith('.vercel.app')
    );

    return {
      ...vp,
      displayName: meta?.displayName || vp.name,
      description: meta?.description || '',
      category: meta?.category || '기타',
      tags: meta?.tags || [],
      featured: meta?.featured || false,
      githubUrl: meta?.githubUrl,
      screenshots: meta?.screenshots,
      highlights: meta?.highlights,
      productionUrl: productionUrl ? `https://${productionUrl}` : undefined,
    };
  });

  // 최신순 정렬
  return projects.sort((a, b) => b.createdAt - a.createdAt);
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const projects = await getAllProjects();
  return projects.filter((p) => p.featured);
}

export async function getProjectByName(name: string): Promise<Project | null> {
  const projects = await getAllProjects();
  return projects.find((p) => p.name === name) || null;
}

export function getCategories() {
  return ['시민참여/정부혁신', 'ESG/환경', 'AI/데이터분석', '교육/복지', '기타'];
}
