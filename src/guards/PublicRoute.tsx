import { Navigate } from "react-router-dom";
import type { JSX } from "react";
import { useAuthStore } from "@/context/store/authStore";

export default function PublicRoute({ children }: { children: JSX.Element }) {
  const { user } = useAuthStore();
  return user ? <Navigate to="/" /> : children;
}
