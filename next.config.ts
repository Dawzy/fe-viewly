import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN" // Changed from DENY to allow Clerk iframes
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff"
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://*.clerk.accounts.dev https://*.clerk.com https://challenges.cloudflare.com https://*.davidfawzy.net https://accounts.google.com",
              "style-src 'self' 'unsafe-inline' https://*.clerk.accounts.dev https://*.clerk.com https://accounts.google.com",
              "img-src 'self' https://image.tmdb.org https://*.clerk.accounts.dev https://*.clerk.com https://accounts.google.com https://*.googleusercontent.com data:",
              "connect-src 'self' https://api.themoviedb.org https://*.clerk.accounts.dev https://*.clerk.com https://*.clerk-assets.com https://challenges.cloudflare.com https://*.davidfawzy.net https://accounts.google.com https://oauth2.googleapis.com",
              "frame-src 'self' https://*.clerk.accounts.dev https://*.clerk.com https://challenges.cloudflare.com https://accounts.google.com",
              "font-src 'self' https://*.clerk.com https://fonts.gstatic.com",
              "worker-src 'self' blob:"
            ].join('; ')
          }
        ]
      }
    ]
  },
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        port: "",
        pathname: "/t/p/**",
        search: ""
      }
    ],
  }
};

export default nextConfig;
