import { type Metadata } from 'next';
import { ProjectCard } from '../_components/project-card';

export const metadata: Metadata = {
  title: 'Projects',
  description: `List of projects.`,
};

const loading = () => {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-col">
        <h2 className="text-xl font-bold font-title">Account</h2>
        <p className="text-muted-foreground">
          Manage you account details here.
        </p>
      </div>
      <div className="relative">
        <ul className="grid select-none grid-cols-1 gap-4 opacity-40 md:grid-cols-3">
          <ProjectCard.Skeleton />
          <ProjectCard.Skeleton />
          <ProjectCard.Skeleton />
        </ul>
      </div>
    </section>
  );
};

export default loading;
