'use server';

import { env } from '@/env.mjs';
import { getCurrentUser } from '@/lib/auth-opts';
import axios from 'axios';

export async function fetchAnalytics() {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error('User not found');
  }

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
  const ret = insights.data.pages.filter((p) => p.page === `/${user.username}`);
  return ret;
}
