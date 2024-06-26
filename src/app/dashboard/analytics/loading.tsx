import { siteConfig } from '@/config/site';
import { getCurrentUser } from '@/lib/auth-opts';
import { type Metadata } from 'next';
import { redirect } from 'next/navigation';
import { ProjectCard } from '../_components/project-card';

export const metadata: Metadata = {
  title: 'Analytics',
  description: `View activity on your site.`,
};

const page = async () => {
  const user = await getCurrentUser();
  if (!user) return redirect('/');

  return (
    <section className="flex flex-col gap-4">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <h2 className="text-xl font-bold font-title">
            {siteConfig.name} Analytics
          </h2>
          <p className="text-muted-foreground">
            Insights for the visits to your site.
          </p>
        </div>
      </div>

      <div className="relative">
        <ul className="grid select-none grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <ProjectCard.Skeleton isAnalyticsCard />
          <ProjectCard.Skeleton isAnalyticsCard />
          <ProjectCard.Skeleton isAnalyticsCard />
          <ProjectCard.Skeleton isAnalyticsCard />
        </ul>
      </div>
    </section>
  );
};

export default page;
