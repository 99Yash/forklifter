import { load } from 'cheerio';

export async function getOgImageUrl(url: string): Promise<string | null> {
  try {
    const response = await fetch(url);
    const html = await response.text();
    const $ = load(html);
    const ogImageUrl = $('meta[property="og:image"]').attr('content');
    return ogImageUrl ?? null;
  } catch (error) {
    console.error(`Error fetching og image for ${url}:`, error);
    return null;
  }
}
