import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '@/types';

interface UserState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isNewUser: boolean;
  
  // Actions
  setUser: (user: User) => void;
  setToken: (token: string) => void;
  setAuthData: (data: { user: User; token: string; isNewUser: boolean }) => void;
  updateUser: (userData: Partial<User>) => void;
  logout: () => void;
  clearNewUserFlag: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isNewUser: false,

      setUser: (user) => set({ user }),
      
      setToken: (token) => set({ token, isAuthenticated: !!token }),
      
      setAuthData: ({ user, token, isNewUser }) => 
        set({ 
          user, 
          token, 
          isAuthenticated: true, 
          isNewUser 
        }),
      
      updateUser: (userData) => 
        set(state => ({ 
          user: state.user ? { ...state.user, ...userData } : null 
        })),
      
      logout: () => 
        set({ 
          user: null, 
          token: null, 
          isAuthenticated: false, 
          isNewUser: false 
        }),
      
      clearNewUserFlag: () => set({ isNewUser: false }),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
