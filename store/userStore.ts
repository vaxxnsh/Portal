import { create } from 'zustand';

interface UserState {
  fullName: string;
  username: string;
  email: string;
  isAdmin: boolean;
  setUser: (user: { fullName: string; username: string; email: string; isAdmin: boolean }) => void;
}

export const useUserStore = create<UserState>((set) => ({
  fullName: '',
  username: '',
  email: '',
  isAdmin: false,
  setUser: (user) => set(user),
}));