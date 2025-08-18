import { api } from './api';
import { SendOtpRequest, VerifyOtpRequest, AuthResponse } from '@/types';

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
