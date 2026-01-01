/**
 * Environment variable validation and type-safe access
 * Validates required environment variables at build time
 */

const requiredEnvVars = {
  // Public (client-side accessible)
  NEXT_PUBLIC_API_ENDPOINT: process.env.NEXT_PUBLIC_API_ENDPOINT,
  NEXT_PUBLIC_GOOGLE_CAPTCHA_SITE_KEY:
    process.env.NEXT_PUBLIC_GOOGLE_CAPTCHA_SITE_KEY,
} as const;

const optionalEnvVars = {
  // Server-only (fallback)
  NEXT_API_ENDPOINT: process.env.NEXT_API_ENDPOINT,
} as const;

/**
 * Validates that all required environment variables are set
 * Call this in your app initialization or API routes
 */
export function validateEnv(): void {
  const missing: string[] = [];

  // Check required public env vars
  Object.entries(requiredEnvVars).forEach(([key, value]) => {
    if (!value) {
      missing.push(key);
    }
  });

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(", ")}`
    );
  }
}

/**
 * Type-safe environment variable access
 */
export const env = {
  // Public (client-side accessible)
  public: {
    apiEndpoint:
      requiredEnvVars.NEXT_PUBLIC_API_ENDPOINT ||
      optionalEnvVars.NEXT_API_ENDPOINT ||
      "",
    googleCaptchaSiteKey: requiredEnvVars.NEXT_PUBLIC_GOOGLE_CAPTCHA_SITE_KEY || "",
  },
  // Server-only
  server: {
    apiEndpoint: optionalEnvVars.NEXT_API_ENDPOINT || "",
  },
  // Runtime checks
  isDevelopment: process.env.NODE_ENV === "development",
  isProduction: process.env.NODE_ENV === "production",
  isTest: process.env.NODE_ENV === "test",
} as const;

// Validate on module load in production
if (process.env.NODE_ENV === "production") {
  validateEnv();
}

