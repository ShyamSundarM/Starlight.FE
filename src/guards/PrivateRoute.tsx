import { Navigate } from "react-router-dom";
import type { JSX } from "react";
import { useAuthStore } from "@/context/store/authStore";

export default function PrivateRoute({ children }: { children: JSX.Element }) {
  const { isAuthenticated, loading } = useAuthStore();

  if (loading) return null;

  return isAuthenticated ? children : <Navigate to="/login" replace />;
}
