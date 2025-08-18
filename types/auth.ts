export interface User {
  id: string;
  phoneNumber: string;
  name?: string;
  email?: string;
  profilePictureUrl?: string;
  authProvider?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  isNewUser: boolean;
  user: User;
}

export interface SendOtpRequest {
  phoneNumber: string;
}

export interface VerifyOtpRequest {
  phoneNumber: string;
  otp: string;
}

export interface UpdateProfileRequest {
  name: string;
  email?: string;
  profilePictureUrl?: string;
  phoneNumber?: string;
}

export interface UserResponse {
  message: string;
  user: User;
}
