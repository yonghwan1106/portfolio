import Hero from '@/components/Hero';
import ProjectGrid from '@/components/ProjectGrid';
import { getAllProjects } from '@/lib/projects';

export default async function Home() {
  const projects = await getAllProjects();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* Projects Section */}
      <section id="projects" className="w-full py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Projects</h2>
            <p className="text-lg text-muted-foreground">
              50+ 개의 프로젝트를 통해 시민을 위한 기술을 만들어가고 있습니다.
            </p>
          </div>

          <ProjectGrid projects={projects} />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 mt-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-muted-foreground">
              © 2024 YongPark. All rights reserved.
            </div>
            <div className="flex gap-6 text-sm">
              <a
                href="https://github.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
              >
                GitHub
              </a>
              <a
                href="mailto:your.email@example.com"
                className="hover:text-foreground transition-colors"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
