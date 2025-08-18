import { api } from './api';
import { UpdateProfileRequest, User, UserResponse } from '@/types';

export const userService = {
  getProfile: async (): Promise<UserResponse> => {
    const response = await api.get('/users/me');
    return response.data;
  },

  updateProfile: async (data: UpdateProfileRequest): Promise<UserResponse> => {
    const response = await api.patch('/users/me', data);
    return response.data;
  },
};
