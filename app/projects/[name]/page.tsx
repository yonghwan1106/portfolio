import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getProjectByName, getAllProjects } from '@/lib/projects';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, ExternalLink, Github, Calendar, CheckCircle2 } from 'lucide-react';

interface ProjectDetailPageProps {
  params: Promise<{ name: string }>;
}

export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map((project) => ({
    name: project.name,
  }));
}

export async function generateMetadata({ params }: ProjectDetailPageProps) {
  const { name } = await params;
  const project = await getProjectByName(name);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: `${project.displayName} | YongPark Portfolio`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { name } = await params;
  const project = await getProjectByName(name);

  if (!project) {
    notFound();
  }

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const statusColors = {
    READY: 'bg-green-500',
    BUILDING: 'bg-yellow-500',
    ERROR: 'bg-red-500',
    CANCELED: 'bg-gray-500',
  };

  const statusText = {
    READY: '정상 운영중',
    BUILDING: '배포 진행중',
    ERROR: '배포 오류',
    CANCELED: '배포 취소됨',
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* 뒤로가기 */}
        <Link href="/">
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Projects
          </Button>
        </Link>

        {/* 헤더 */}
        <div className="space-y-6 mb-12">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2 flex-1">
              <h1 className="text-4xl md:text-5xl font-bold">{project.displayName}</h1>
              <p className="text-xl text-muted-foreground">{project.description}</p>
            </div>
            {project.latestDeployment && (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted">
                <div
                  className={`w-2 h-2 rounded-full ${
                    statusColors[project.latestDeployment.readyState]
                  }`}
                />
                <span className="text-sm">
                  {statusText[project.latestDeployment.readyState]}
                </span>
              </div>
            )}
          </div>

          {/* 메타 정보 */}
          <div className="flex flex-wrap gap-3">
            <Badge variant="secondary" className="px-3 py-1">
              {project.category}
            </Badge>
            {project.featured && (
              <Badge variant="default" className="px-3 py-1">
                Featured
              </Badge>
            )}
            {project.framework && (
              <Badge variant="outline" className="px-3 py-1">
                {project.framework}
              </Badge>
            )}
          </div>

          {/* CTA 버튼 */}
          <div className="flex gap-3 pt-4">
            {project.productionUrl && (
              <Button asChild size="lg">
                <a href={project.productionUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Live Demo
                </a>
              </Button>
            )}
            {project.githubUrl && (
              <Button asChild size="lg" variant="outline">
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4 mr-2" />
                  GitHub
                </a>
              </Button>
            )}
          </div>
        </div>

        {/* 콘텐츠 그리드 */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* 메인 콘텐츠 */}
          <div className="md:col-span-2 space-y-8">
            {/* 하이라이트 */}
            {project.highlights && project.highlights.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>주요 기능</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {project.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* 기술 스택 */}
            {project.tags && project.tags.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>기술 스택</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* 사이드바 */}
          <div className="space-y-6">
            {/* 프로젝트 정보 */}
            <Card>
              <CardHeader>
                <CardTitle>프로젝트 정보</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">생성일</div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">{formatDate(project.createdAt)}</span>
                  </div>
                </div>

                {project.framework && (
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">프레임워크</div>
                    <div className="text-sm font-medium">{project.framework}</div>
                  </div>
                )}

                {project.nodeVersion && (
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Node 버전</div>
                    <div className="text-sm font-medium">{project.nodeVersion}</div>
                  </div>
                )}

                {project.latestDeployment && (
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">최근 배포</div>
                    <div className="text-sm">{formatDate(project.latestDeployment.createdAt)}</div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* 도메인 */}
            {project.domains && project.domains.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>도메인</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {project.domains.slice(0, 3).map((domain) => (
                      <a
                        key={domain}
                        href={`https://${domain}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-sm hover:text-primary transition-colors truncate"
                      >
                        {domain}
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
