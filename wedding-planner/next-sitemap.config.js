/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://eliteweddingplanner.in',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ['/api/*', '/admin/*'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: '*',
        disallow: ['/api/', '/admin/'],
      },
    ],
    additionalSitemaps: [
      'https://eliteweddingplanner.in/sitemap.xml',
    ],
  },
  transform: async (config, path) => {
    // Custom priority and changefreq for different pages
    const customConfig = {
      '/': { priority: 1.0, changefreq: 'daily' },
      '/destinations': { priority: 0.9, changefreq: 'weekly' },
      '/destinations/goa': { priority: 0.9, changefreq: 'weekly' },
      '/destinations/udaipur': { priority: 0.9, changefreq: 'weekly' },
      '/destinations/jaipur': { priority: 0.9, changefreq: 'weekly' },
      '/destinations/dubai': { priority: 0.9, changefreq: 'weekly' },
      '/services': { priority: 0.9, changefreq: 'weekly' },
      '/portfolio': { priority: 0.8, changefreq: 'weekly' },
      '/about': { priority: 0.7, changefreq: 'monthly' },
      '/contact': { priority: 0.8, changefreq: 'monthly' },
    };

    const custom = customConfig[path] || { priority: 0.7, changefreq: 'monthly' };

    return {
      loc: path,
      lastmod: new Date().toISOString(),
      priority: custom.priority,
      changefreq: custom.changefreq,
    };
  },
};
