'use server';
import 'server-only';

import og from 'open-graph-scraper';

export async function getOgImageUrl(url: string): Promise<string> {
  try {
    const { result } = await og({ url });
    if (!result || !result.ogImage || !result.ogImage.some((im) => im.url)) {
      return '/images/social-bg-dark-lines.jpg';
    }
    console.log('url', result.ogImage[0].type);
    return result.ogImage[0].url;
  } catch (error) {
    console.error(`Error fetching og image for ${url}:`, error);
    return '/images/social-bg-dark-lines.jpg';
  }
}
