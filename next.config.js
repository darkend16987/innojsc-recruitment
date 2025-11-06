/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removed 'output: export' to enable SSR/ISR capabilities
  // This allows client-side Firebase data fetching with better SEO
  // Deploy to Vercel, Firebase Hosting (with Cloud Functions), or other platforms

  images: {
    unoptimized: true,
  },

  // Keep trailing slash for better URL structure
  trailingSlash: true,
};

module.exports = nextConfig;