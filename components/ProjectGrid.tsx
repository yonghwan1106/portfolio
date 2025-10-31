'use client';

import React, { useState, useMemo } from 'react';
import { Project, ProjectCategory } from '@/lib/types';
import ProjectCard from './ProjectCard';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search } from 'lucide-react';

interface ProjectGridProps {
  projects: Project[];
}

export default function ProjectGrid({ projects }: ProjectGridProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory | 'all'>('all');

  const categories: (ProjectCategory | 'all')[] = [
    'all',
    '시민참여/정부혁신',
    'ESG/환경',
    'AI/데이터분석',
    '교육/복지',
    '기타',
  ];

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      // 카테고리 필터
      if (selectedCategory !== 'all' && project.category !== selectedCategory) {
        return false;
      }

      // 검색 필터
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          project.displayName.toLowerCase().includes(query) ||
          project.description.toLowerCase().includes(query) ||
          project.tags.some((tag) => tag.toLowerCase().includes(query))
        );
      }

      return true;
    });
  }, [projects, searchQuery, selectedCategory]);

  return (
    <div className="space-y-8">
      {/* 필터 섹션 */}
      <div className="space-y-4">
        {/* 검색 */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            type="text"
            placeholder="프로젝트 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* 카테고리 필터 */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Badge
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              className="cursor-pointer hover:bg-accent transition-colors"
              onClick={() => setSelectedCategory(category)}
            >
              {category === 'all' ? '전체' : category}
            </Badge>
          ))}
        </div>

        {/* 결과 카운트 */}
        <div className="text-sm text-muted-foreground">
          {filteredProjects.length}개의 프로젝트
          {selectedCategory !== 'all' && ` (${selectedCategory})`}
        </div>
      </div>

      {/* 프로젝트 그리드 */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-muted-foreground">
          <p className="text-lg">검색 결과가 없습니다.</p>
          <p className="text-sm mt-2">다른 검색어나 카테고리를 시도해보세요.</p>
        </div>
      )}
    </div>
  );
}
