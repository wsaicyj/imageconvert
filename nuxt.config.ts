// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },

  // Add the site configuration as suggested by the error message
  site: {
    url: 'https://www.imageconvert.me', // Your site's base URL
  },

  // Define runtimeConfig to make siteUrl available (this might become redundant for sitemap, but good practice for other uses)
  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://www.imageconvert.me'
    }
  },

  // Add app configuration to set global HTML attributes
  app: {
    head: {
      htmlAttrs: {
        lang: 'en' // Set the language of your website to English
      }
    }
  },

  modules: [
    // Pass the sitemap module configuration as the second element of the array
    ['@nuxtjs/sitemap', {
      routes: [
        '/',
        '/webp-to-png',
        '/webp-to-jpg',
        '/privacy-policy',
        '/contact-us',
        '/avif-to-png', 
        '/avif-to-jpg',
        // If you have other pages, add their paths here
      ],
      // You can also configure other options, for example:
      // trailingSlash: true, // Set to true if your URLs have trailing slashes
      // defaults: {
      //   changefreq: 'daily', // Page update frequency
      //   priority: 1.0, // Page priority
      //   lastmod: new Date().toISOString(), // Last modified time
      // },
    }],
    // Add the robots module here
    ['@nuxtjs/robots', {
      UserAgent: '*',
      Disallow: '', // Allow all pages by default
      Sitemap: 'https://www.imageconvert.me/sitemap.xml' // Point to your sitemap
    }],
  ],
})
