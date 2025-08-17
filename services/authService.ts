import { api } from './api';

export interface SendOtpRequest {
  phoneNumber: string;
}

export interface VerifyOtpRequest {
  phoneNumber: string;
  otp: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  isNewUser: boolean;
  user: {
    id: string;
    phoneNumber: string;
    name?: string;
  };
}

export const authService = {
  sendOtp: async (data: SendOtpRequest) => {
    const response = await api.post('/auth/phone/send-otp', data);
    return response.data;
  },

  verifyOtp: async (data: VerifyOtpRequest): Promise<AuthResponse> => {
    const response = await api.post('/auth/phone/verify', data);
    return response.data;
  },
};
