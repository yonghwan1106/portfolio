import React from 'react';
import Link from 'next/link';
import { Project } from '@/lib/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const statusColors = {
    READY: 'bg-green-500',
    BUILDING: 'bg-yellow-500',
    ERROR: 'bg-red-500',
    CANCELED: 'bg-gray-500',
  };

  const categoryColors: Record<string, string> = {
    '시민참여/정부혁신': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    'ESG/환경': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    'AI/데이터분석': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
    '교육/복지': 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300',
    '기타': 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300',
  };

  return (
    <Card className="flex flex-col h-full hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 space-y-1">
            <CardTitle className="text-xl line-clamp-1">
              {project.displayName}
            </CardTitle>
            <div className="flex items-center gap-2">
              <Badge
                className={categoryColors[project.category]}
                variant="secondary"
              >
                {project.category}
              </Badge>
              {project.featured && (
                <Badge variant="default">Featured</Badge>
              )}
            </div>
          </div>
          {project.latestDeployment && (
            <div
              className={`w-2 h-2 rounded-full ${
                statusColors[project.latestDeployment.readyState]
              }`}
              title={project.latestDeployment.readyState}
            />
          )}
        </div>
        <CardDescription className="line-clamp-2 min-h-[40px]">
          {project.description || '프로젝트 설명이 없습니다.'}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1">
        <div className="space-y-3">
          {/* 태그 */}
          {project.tags && project.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {project.tags.slice(0, 4).map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {/* 프레임워크 정보 */}
          {project.framework && (
            <div className="text-sm text-muted-foreground">
              <span className="font-medium">Framework:</span> {project.framework}
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex gap-2">
        {project.productionUrl && (
          <Button asChild size="sm" className="flex-1">
            <a
              href={project.productionUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="w-4 h-4 mr-1" />
              Live
            </a>
          </Button>
        )}
        {project.githubUrl && (
          <Button asChild size="sm" variant="outline">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="w-4 h-4" />
            </a>
          </Button>
        )}
        <Button asChild size="sm" variant="secondary" className="flex-1">
          <Link href={`/projects/${project.name}`}>상세</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
