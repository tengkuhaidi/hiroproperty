import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

const BASE_URL = 'https://hiroproperty.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/dashboard', '/marcomm', '/masterstock', '/api/'],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
