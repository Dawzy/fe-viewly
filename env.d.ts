namespace NodeJS {
  interface ProcessEnv {
    AWS_API_GATEWAY_LISTS_URL: string;
    AWS_API_GATEWAY_WEBHOOKS_URL: string;
    AWS_API_HOST_URL: string;
    TMDB_ACCESS_TOKEN: string;
    CLERK_SECRET_KEY: string;
    CLERK_WEBHOOK_SECRET: string;
    SENTRY_AUTH_TOKEN: string;
    NEXT_PUBLIC_API: string;
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: string;
    NEXT_PUBLIC_CLERK_SIGN_IN_URL: string;
    NEXT_PUBLIC_CLERK_SIGN_UP_URL: string;
    NEXT_PUBLIC_TMDB_IMAGES_HOST: string;
    NEXT_PUBLIC_PORTFOLIO_URL: string;
  }
}