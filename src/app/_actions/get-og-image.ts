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
  // const parser = new DOMParser();
  // try {
  //   const response = await fetch(url, { mode: 'cors' });
  //   const html = await response.text();
  //   const doc = parser.parseFromString(html, 'text/html');
  //   const image =
  //     doc
  //       ?.querySelector('meta[property="og:image"]')
  //       ?.getAttribute('content') ?? '';
  //   return image;
  // } catch (error) {
  //   console.error(`Error fetching og image for ${url}:`, error);
  //   return null;
  // }
}
