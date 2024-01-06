'use client';

import { env } from '@/env.mjs';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Analytics() {
  const [visitorCount, setVisitorCount] = useState(0);

  useEffect(() => {
    async function getWebInsights() {
      const { data: insights } = await axios.get(
        `https://api.loglib.io/v1/insight?apiKey=${env.LOGLIB_API_KEY}`,
        {
          withCredentials: false,
        }
      );
      console.log('>>>>>>>>>insights', insights);
      setVisitorCount(insights.insight.totalPageViews.current);
      return insights;
    }
    getWebInsights();
  }, []);

  return (
    <div className="text-sm">
      Your website has been visited {visitorCount} times.
    </div>
  );
}
