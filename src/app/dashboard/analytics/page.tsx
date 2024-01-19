import { env } from '@/env.mjs';
import { getCurrentUser } from '@/lib/auth-opts';
import axios from 'axios';
import { type Metadata } from 'next';
import { redirect } from 'next/navigation';
import InsightCard from './card';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Analytics',
  description: `View activity on your site.`,
};

const page = async () => {
  const user = await getCurrentUser();
  if (!user) return redirect('/');

  const { data: insights } = await axios.get<{
    insight: {
      uniqueVisitors: {
        current: number;
        change: number; //this is a change from comparable time range in the past.
      };
      totalPageViews: {
        current: number;
        change: number;
      };
      averageTime: {
        current: string;
        change: number;
      };
      bounceRate: {
        current: number;
        change: number;
      };
      newVisitors: {
        current: number;
        change: number;
      };
      returningVisitor: {
        current: number;
        change: number;
      };
    };
    data: {
      pages: {
        page: string;
        visits: number;
      }[];
      devices: {
        device: string;
        visits: number;
      }[];
      referrer: {
        referrer: string;
        visits: number;
        referrerDomain: string;
      }[];
      locations: {
        city: {
          location: string;
          visits: number;
          country: string;
        }[];
        country: {
          location: string;
          visits: number;
        }[];
      };
      os: {
        os: string;
        visits: number;
      }[];
      browser: {
        browser: string;
        visits: number;
      }[];
      utmSources: {
        utmSource: string;
        visits: number;
      }[];
      utmCampaigns: {
        utmCampaign: string;
        visits: number;
      }[];
      onlineVisitors: number;
    };
    graph: {
      uniqueVisitorsByDate: {
        date: string;
        visits: number;
      }[];
      uniqueSessionByDate: {
        date: string;
        visits: number;
      }[];
    };
  }>(`https://api.loglib.io/v1/insight?apiKey=${env.LOGLIB_API_KEY}`, {
    withCredentials: false,
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <h2 className="text-xl font-bold">Analytics</h2>
          <p className="text-muted-foreground">
            Insights for the visits to your site.
            <span className="text-xs">
              {' '}
              Powered by{' '}
              <Link className="text-orange-300" href={'https://www.loglib.io'}>
                Loglib
              </Link>
            </span>
          </p>
        </div>
      </div>

      <div className="relative">
        <ul className="grid select-none grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <InsightCard
            title="Unique Visitors"
            description="The total number of people who visited your site"
            value={insights.insight.uniqueVisitors.current}
          />

          <InsightCard
            title="Total Page Views"
            description="The total number of pages viewed. Repeated views of a single page are counted."
            value={insights.insight.totalPageViews.current}
          />

          <InsightCard
            title="Avg. Time"
            description="The average amount of time visitors spend on your website."
            value={insights.insight.averageTime.current}
          />

          <InsightCard
            title="Bounce Rate"
            description="The percentage of visitors who quickly exit your website without exploring further."
            value={`${insights.insight.bounceRate.current}%`}
          />
        </ul>
      </div>
    </div>
  );
};

export default page;
