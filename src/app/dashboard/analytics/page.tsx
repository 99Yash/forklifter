import { fetchAnalytics } from '@/app/_actions/analytics';
import { getCurrentUser } from '@/lib/auth-opts';
import { type Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import Balancer from 'react-wrap-balancer';
import { ProjectCard } from '../_components/project-card';
import InsightCard from './card';

export const metadata: Metadata = {
  title: 'Analytics',
  description: `View activity on your site.`,
};

const page = async () => {
  const user = await getCurrentUser();
  if (!user) return redirect('/');

  const insights = await fetchAnalytics();

  return (
    <section className="flex flex-col gap-4">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <h2 className="text-xl font-bold font-title">Analytics</h2>
          <p className="text-muted-foreground">
            Insights for the visits to your site.
            <span className="text-xs">
              {' '}
              Powered by{' '}
              <Link
                className="text-orange-300 font-semibold"
                href={'https://www.loglib.io'}
              >
                Loglib
              </Link>
            </span>
          </p>
        </div>
      </div>

      <div className="relative">
        <ul className="grid select-none grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <InsightCard
            title="Total Page Views"
            description="The total number of pages viewed. Repeated views of a single page are counted."
            value={insights[0].visits}
          />
          <ProjectCard.Skeleton isAnalyticsCard />
          <ProjectCard.Skeleton isAnalyticsCard />
          <ProjectCard.Skeleton isAnalyticsCard />
        </ul>
        <div className="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 text-center space-y-2 font-title">
          <h2 className="text-2xl font-bold text-orange-300">
            <Balancer>Proper Analytics is coming soon</Balancer>
          </h2>
          <p className="text-sm font-semibold text-orange-200 animate-pulse">
            <Balancer>
              Loglib API doesn{`'`}t support proper route based analytics. Stay
              tuned
            </Balancer>
          </p>
        </div>
      </div>
    </section>
  );
};

export default page;
