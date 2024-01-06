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
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <h2 className="text-xl font-bold">{siteConfig.name} Analytics</h2>
          <p className="text-muted-foreground">
            Insights for the visits to your site.
          </p>
        </div>
      </div>

      <div className="relative">
        <ul className="grid select-none grid-cols-1 gap-4 opacity-40 md:grid-cols-3">
          <ProjectCard.Skeleton isAnalyticsCard />
          <ProjectCard.Skeleton isAnalyticsCard />
          <ProjectCard.Skeleton isAnalyticsCard />
        </ul>
      </div>
    </div>
  );
};

export default page;
