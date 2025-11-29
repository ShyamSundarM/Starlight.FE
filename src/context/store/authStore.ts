import { VerifyUser } from "@/api/auth";
import { create } from "zustand";

// ---- Types ----
type User = { id: string; name: string; email: string } | null;
type TokenDetails = { token: string; expiresIn: number };

let logoutTimer: ReturnType<typeof setTimeout> | null = null;

// ---- Helper: Decode JWT ----
function decodeJwt<T = any>(token: string): T | null {
  try {
    const payload = token.split(".")[1];
    return JSON.parse(atob(payload));
  } catch {
    return null;
  }
}

type AuthState = {
  TokenDetails: TokenDetails | null;
  user: User;
  loading: boolean;
  buttonLoading: boolean;
  isAuthenticated: boolean;

  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  init: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  isAuthenticated: false,
  TokenDetails: null,
  buttonLoading: false,

  // ---- LOGIN ----
  login: async (email, password) => {
    set({ buttonLoading: true });
    const resp = await VerifyUser(email, password);

    if (resp) {
      // Save token + expiry
      localStorage.setItem("token", resp.token);
      localStorage.setItem("expiresIn", resp.expiresIn.toString());
      localStorage.setItem("loginTime", Date.now().toString());

      // Decode token → extract user info
      const claims = decodeJwt(resp.token);
      const user: User = claims
        ? {
            id: claims.id ?? "",
            name: claims.name ?? "",
            email: claims.email ?? "",
          }
        : null;

      // ---- Auto logout timer ----
      if (logoutTimer) clearTimeout(logoutTimer);
      logoutTimer = setTimeout(() => {
        useAuthStore.getState().logout();
      }, resp.expiresIn * 1000);

      set({
        TokenDetails: resp,
        user,
        isAuthenticated: true,
        loading: false,
      });
    }
    set({ buttonLoading: false });
  },

  // ---- LOGOUT ----
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expiresIn");
    localStorage.removeItem("loginTime");

    if (logoutTimer) clearTimeout(logoutTimer);

    set({
      user: null,
      TokenDetails: null,
      isAuthenticated: false,
      loading: false,
    });
  },

  // ---- INIT (on page load) ----
  init: () => {
    const token = localStorage.getItem("token");
    const expiresIn = localStorage.getItem("expiresIn");
    const loginTime = localStorage.getItem("loginTime");

    if (!token || !expiresIn || !loginTime) {
      set({ loading: false });
      return;
    }

    const expireMs = Number(expiresIn) * 1000;
    const elapsed = Date.now() - Number(loginTime);

    // Token expired?
    if (elapsed >= expireMs) {
      useAuthStore.getState().logout();
      return;
    }

    // Decode user claims from token
    const claims = decodeJwt(token);
    const user: User = claims
      ? {
          id: claims.id ?? "",
          name: claims.name ?? "",
          email: claims.email ?? "",
        }
      : null;

    // Remaining time for auto logout
    const remaining = expireMs - elapsed;

    logoutTimer = setTimeout(() => {
      useAuthStore.getState().logout();
    }, remaining);

    set({
      TokenDetails: { token, expiresIn: Number(expiresIn) },
      user,
      isAuthenticated: true,
      loading: false,
    });
  },
}));
