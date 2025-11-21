import { create } from "zustand";

type User = { id: string; name: string; email: string } | null;

type AuthState = {
  user: User;
  loading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  checkSession: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  isAuthenticated: false,

  login: async (email, password) => {
    // Example API call
    const res = { id: "1", name: "Admin", email };
    localStorage.setItem("user", JSON.stringify(res));
    set({ user: res, isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem("user");
    set({ user: null, isAuthenticated: false });
  },

  checkSession: () => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      set({ user, isAuthenticated: true });
    }
    set({ loading: false });
  },
}));
