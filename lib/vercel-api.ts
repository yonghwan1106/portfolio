import { VercelProject, VercelTeam } from './types';

const VERCEL_TOKEN = process.env.VERCEL_API_TOKEN;
const VERCEL_TEAM_ID = process.env.VERCEL_API_TEAM_ID || 'team_p2KV5idvV2dx3IWyN4i659UX';

if (!VERCEL_TOKEN) {
  console.warn('VERCEL_API_TOKEN is not set. API calls will fail.');
}

const VERCEL_API_BASE = 'https://api.vercel.com';

async function vercelFetch(endpoint: string) {
  const url = `${VERCEL_API_BASE}${endpoint}`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${VERCEL_TOKEN}`,
    },
    next: { revalidate: 3600 }, // 1시간마다 재검증
  });

  if (!response.ok) {
    throw new Error(`Vercel API error: ${response.statusText}`);
  }

  return response.json();
}

export async function getTeams(): Promise<VercelTeam[]> {
  try {
    const data = await vercelFetch('/v2/teams');
    return data.teams || [];
  } catch (error) {
    console.error('Failed to fetch teams:', error);
    return [];
  }
}

export async function getProjects(): Promise<VercelProject[]> {
  try {
    const data = await vercelFetch(`/v9/projects?teamId=${VERCEL_TEAM_ID}&limit=100`);
    return data.projects || [];
  } catch (error) {
    console.error('Failed to fetch projects:', error);
    return [];
  }
}

export async function getProject(projectId: string): Promise<VercelProject | null> {
  try {
    return await vercelFetch(`/v9/projects/${projectId}?teamId=${VERCEL_TEAM_ID}`);
  } catch (error) {
    console.error(`Failed to fetch project ${projectId}:`, error);
    return null;
  }
}
