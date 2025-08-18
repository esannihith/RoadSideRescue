export const APP_CONFIG = {
  NAME: 'RoadSide Rescue',
  SHORT_NAME: 'RoadAssist',
  VERSION: '1.0.0',
  SUPPORT_EMAIL: 'support@roadsiderescue.com',
  SUPPORT_PHONE: '+91-1234567890',
} as const;

export const API_CONFIG = {
  BASE_URL: 'http://192.168.1.2:3000/api',
  TIMEOUT: 10000,
} as const;

export const VALIDATION_RULES = {
  PHONE: {
    MIN_LENGTH: 10,
    MAX_LENGTH: 10,
    PATTERN: /^\+91[6-9]\d{9}$/,
  },
  NAME: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 50,
  },
  EMAIL: {
    PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  OTP: {
    LENGTH: 6,
  },
} as const;

export const ROUTES = {
  AUTH: {
    INDEX: '/(auth)',
    ONBOARDING: '/(auth)/onboarding',
    LOGIN: '/(auth)/auth',
    OTP_VERIFICATION: '/(auth)/otp-verification',
    COMPLETE_PROFILE: '/(auth)/complete-profile',
  },
  MAIN: {
    INDEX: '/(main)',
    PROFILE: '/(main)/profile',
  },
} as const;
