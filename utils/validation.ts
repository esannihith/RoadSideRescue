import { VALIDATION_RULES } from '@/constants';

/**
 * Formats a phone number to include +91 prefix for Indian numbers
 * @param number - The input phone number
 * @returns Formatted phone number with +91 prefix
 */
export const formatPhoneNumber = (number: string): string => {
  // Remove any non-digit characters
  const cleaned = number.replace(/\D/g, '');
  
  // Add +91 prefix if not present and number is 10 digits
  if (cleaned.length === VALIDATION_RULES.PHONE.MIN_LENGTH) {
    return `+91${cleaned}`;
  } else if (cleaned.startsWith('91') && cleaned.length === 12) {
    return `+${cleaned}`;
  } else if (cleaned.startsWith('91') && cleaned.length === 11) {
    return `+${cleaned}`;
  }
  
  return number;
};

/**
 * Validates if a phone number is a valid Indian mobile number
 * @param phoneNumber - The phone number to validate
 * @returns True if valid, false otherwise
 */
export const validateIndianPhoneNumber = (phoneNumber: string): boolean => {
  return VALIDATION_RULES.PHONE.PATTERN.test(phoneNumber);
};

/**
 * Validates if an email address is valid
 * @param email - The email address to validate
 * @returns True if valid, false otherwise
 */
export const validateEmail = (email: string): boolean => {
  return VALIDATION_RULES.EMAIL.PATTERN.test(email);
};

/**
 * Validates if a name is valid (at least 2 characters)
 * @param name - The name to validate
 * @returns True if valid, false otherwise
 */
export const validateName = (name: string): boolean => {
  return name.trim().length >= VALIDATION_RULES.NAME.MIN_LENGTH;
};

/**
 * Validates if an OTP is valid (6 digits)
 * @param otp - The OTP to validate
 * @returns True if valid, false otherwise
 */
export const validateOTP = (otp: string): boolean => {
  return otp.length === VALIDATION_RULES.OTP.LENGTH && /^\d+$/.test(otp);
};
