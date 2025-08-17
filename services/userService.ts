import { api } from './api';

export interface UpdateProfileRequest {
  name: string;
  email?: string;
  profilePictureUrl?: string;
  phoneNumber?: string;
}

export interface UserProfile {
  id: string;
  name?: string;
  email?: string;
  phoneNumber: string;
  profilePictureUrl?: string;
  authProvider?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserResponse {
  message: string;
  user: UserProfile;
}

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
