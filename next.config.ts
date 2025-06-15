import {withSentryConfig} from "@sentry/nextjs";
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
              `script-src 'self' 'unsafe-eval' 'unsafe-inline' https://*.clerk.accounts.dev https://*.clerk.com https://challenges.cloudflare.com https://*.${process.env.NEXT_PUBLIC_HOST_DOMAIN} https://accounts.google.com https://sentry.io https://cdn.sentry-cdn.com`,
              "style-src 'self' 'unsafe-inline' https://*.clerk.accounts.dev https://*.clerk.com https://accounts.google.com",
              "img-src 'self' https://image.tmdb.org https://*.clerk.accounts.dev https://*.clerk.com https://accounts.google.com https://*.googleusercontent.com data:",
              `connect-src 'self' https://api.themoviedb.org https://*.clerk.accounts.dev https://*.clerk.com https://*.clerk-assets.com https://challenges.cloudflare.com https://*.${process.env.NEXT_PUBLIC_HOST_DOMAIN} https://accounts.google.com https://oauth2.googleapis.com https://sentry.io https://*.ingest.sentry.io https://*.ingest.us.sentry.io`,
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
        hostname: "**.vercel.app",
      },
      {
        protocol: "https",
        hostname: `**.${process.env.NEXT_PUBLIC_HOST_DOMAIN}`,
      },
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

export default withSentryConfig(nextConfig, {
// For all available options, see:
// https://www.npmjs.com/package/@sentry/webpack-plugin#options

org: "dawzy",
project: "viewly",

// Only print logs for uploading source maps in CI
silent: !process.env.CI,

// For all available options, see:
// https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

// Upload a larger set of source maps for prettier stack traces (increases build time)
widenClientFileUpload: true,

// Uncomment to route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
// This can increase your server load as well as your hosting bill.
// Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
// side errors will fail.
// tunnelRoute: "/monitoring",

// Automatically tree-shake Sentry logger statements to reduce bundle size
disableLogger: true,

// Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
// See the following for more information:
// https://docs.sentry.io/product/crons/
// https://vercel.com/docs/cron-jobs
automaticVercelMonitors: true,
});