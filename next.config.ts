import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    // API endpoint for both client and server-side requests
    NEXT_PUBLIC_API_ENDPOINT: process.env.NEXT_PUBLIC_API_ENDPOINT,
    // Server-only API endpoint (fallback)
    NEXT_API_ENDPOINT: process.env.NEXT_API_ENDPOINT,
    // Google reCAPTCHA Site Key
    NEXT_PUBLIC_GOOGLE_CAPTCHA_SITE_KEY: process.env.GOOGLE_CAPTCHA_SITE_KEY,
  },
};

export default nextConfig;
