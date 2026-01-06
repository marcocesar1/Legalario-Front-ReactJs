import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "../../user/user.model";

interface AuthState {
  user?: User;
  setUser: (user: User) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: undefined,
      setUser: (user) => set({ user }),
      logout: () => set({ user: undefined }),
    }),
    {
      name: "auth-user",
    }
  )
);

export default useAuthStore;
