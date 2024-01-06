import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { siteConfig } from '@/config/site';
import { env } from '@/env.mjs';
import { getCurrentUser } from '@/lib/auth-opts';
import axios from 'axios';
import { type Metadata } from 'next';
import { redirect } from 'next/navigation';

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

  function getTextColor(bounceRate: number) {
    if (bounceRate <= 30) {
      return 'green';
    } else if (bounceRate <= 60) {
      return 'yellow';
    } else {
      return 'red';
    }
  }

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
        <ul className="grid select-none grid-cols-1 gap-4 lg:grid-cols-4">
          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle>Unique Visitors</CardTitle>
              <CardDescription className="text-xs line-clamp-1">
                The total number of people who visited your site.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold">
                  {insights.insight.uniqueVisitors.current}
                </span>
              </div>
            </CardContent>
          </Card>
          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle>Page Views</CardTitle>
              <CardDescription className="text-xs line-clamp-1">
                The total number of pages viewed. Repeated views of a single
                page are counted.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold">
                  {insights.insight.totalPageViews.current}
                </span>
              </div>
            </CardContent>
          </Card>
          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle>Avg. Time</CardTitle>
              <CardDescription className="text-xs line-clamp-1">
                The average amount of time visitors spend on your website.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold">
                  {insights.insight.averageTime.current}
                </span>
              </div>
            </CardContent>
          </Card>
          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle>Bounce Rate</CardTitle>
              <CardDescription className="text-xs line-clamp-1">
                The percentage of visitors who quickly exit your website without
                exploring further.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span
                  className={`text-3xl text-${getTextColor(
                    insights.insight.bounceRate.current
                  )}-400 font-bold`}
                >
                  {insights.insight.bounceRate.current}{' '}
                  <span className="text-sm">%</span>
                </span>
              </div>
            </CardContent>
          </Card>
        </ul>
      </div>
    </div>
  );
};

export default page;
