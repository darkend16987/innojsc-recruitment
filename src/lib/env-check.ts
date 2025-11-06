// src/lib/env-check.ts
/**
 * Environment Variables Validation
 * Checks if all required Firebase config is present
 */

const requiredEnvVars = [
  'NEXT_PUBLIC_FIREBASE_API_KEY',
  'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
  'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
  'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET',
  'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
  'NEXT_PUBLIC_FIREBASE_APP_ID',
] as const;

export function checkEnvironmentVariables(): { isValid: boolean; missing: string[] } {
  if (typeof window === 'undefined') {
    // Server-side: just return valid, actual check happens client-side
    return { isValid: true, missing: [] };
  }

  const missing: string[] = [];

  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      missing.push(envVar);
    }
  }

  return {
    isValid: missing.length === 0,
    missing,
  };
}

export function getEnvironmentStatus(): string {
  const { isValid, missing } = checkEnvironmentVariables();

  if (isValid) {
    return '✅ All Firebase environment variables are configured';
  }

  return `❌ Missing Firebase environment variables:\n${missing.map(v => `  - ${v}`).join('\n')}`;
}
