import { getCurrentUser } from '@/lib/auth-opts';
import { type Metadata } from 'next';
import { ProjectCard } from '../_components/project-card';

export const metadata: Metadata = {
  title: 'Experiences',
  description: `Add experiences here.`,
};

const page = async () => {
  const user = await getCurrentUser();
  if (!user) return null;
  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-col">
        <h2 className="text-xl font-bold font-title">Experiences</h2>
        <p className="text-muted-foreground">
          Highlight previous work experiences here.
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

export default page;
