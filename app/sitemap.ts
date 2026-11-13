import type { MetadataRoute } from 'next';
import { PROPERTIES } from '@/data/properties';

export const dynamic = 'force-static';

const BASE_URL = 'https://hiroproperty.com';

const staticRoutes = ['', '/properties', '/jual', '/tentang', '/privasi', '/articles'];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1 : 0.7,
  }));

  const propertyEntries: MetadataRoute.Sitemap = PROPERTIES.map((property) => ({
    url: `${BASE_URL}/properties/${property.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [...staticEntries, ...propertyEntries];
}
