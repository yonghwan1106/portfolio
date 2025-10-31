import React from 'react';
import { Badge } from '@/components/ui/badge';

export default function Hero() {
  const techStack = [
    'Next.js',
    'React',
    'TypeScript',
    'Tailwind CSS',
    'Node.js',
    'Python',
    'AI/ML',
    'Data Analysis',
  ];

  return (
    <section className="w-full py-20 md:py-32 border-b">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col items-center text-center space-y-8">
          {/* 메인 헤딩 */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              YongPark
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground">
              Developer & Civic Tech Enthusiast
            </p>
          </div>

          {/* 소개 */}
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            시민을 위한 기술, 더 나은 사회를 만드는 프로젝트를 개발합니다.
            <br />
            정부 혁신, 환경, 복지 분야의 다양한 솔루션을 구축하고 있습니다.
          </p>

          {/* 기술 스택 */}
          <div className="flex flex-wrap justify-center gap-2 max-w-2xl">
            {techStack.map((tech) => (
              <Badge key={tech} variant="secondary" className="px-3 py-1">
                {tech}
              </Badge>
            ))}
          </div>

          {/* 통계 */}
          <div className="grid grid-cols-3 gap-8 pt-8">
            <div className="flex flex-col items-center">
              <div className="text-4xl font-bold">50+</div>
              <div className="text-sm text-muted-foreground">Projects</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-4xl font-bold">10+</div>
              <div className="text-sm text-muted-foreground">Categories</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-4xl font-bold">2024</div>
              <div className="text-sm text-muted-foreground">Active</div>
            </div>
          </div>

          {/* CTA 버튼 */}
          <div className="flex gap-4 pt-4">
            <a
              href="#projects"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-6 py-2"
            >
              프로젝트 보기
            </a>
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-6 py-2"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
