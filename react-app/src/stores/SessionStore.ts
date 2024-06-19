import { create } from 'zustand';
import { User } from '../types/User';

export const useSessionStore = create<{ me: User | null; setMe: (newMe: User) => void }>((set) => ({
  me: null,
  setMe: (newMe: User) => set({ me: newMe }),
}));
