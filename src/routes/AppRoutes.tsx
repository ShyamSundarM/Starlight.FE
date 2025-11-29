import PrivateRoute from "@/guards/PrivateRoute";
import AdminHome from "@/pages/AdminHome";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import { Routes, Route } from "react-router-dom";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home />} />
      <Route
        path="/admin"
        element={
          <PrivateRoute>
            <AdminHome />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}
