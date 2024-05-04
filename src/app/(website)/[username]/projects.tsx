import ProjectCard from '../utils/project-card';
import SectionTitle from '../utils/section-title';
import SectionWrapper from '../utils/section-wrapper';

type Props = {
  projects: {
    name: string;
    githubUrl: string;
    description: string;
    webUrl: string;
    techStack: string[];
  }[];
};

export default function Projects({ projects }: Props) {
  return (
    <SectionWrapper>
      <div id="projects" className="mt-16">
        <SectionTitle title="Projects" showNumber />
      </div>
      <div className="mb-40">
        {projects.map((project, i) => (
          <ProjectCard
            key={project.name}
            idx={i}
            isLast={i === projects.length - 1}
            project={project}
          />
        ))}
      </div>
    </SectionWrapper>
  );
}
