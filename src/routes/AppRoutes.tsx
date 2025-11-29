import PrivateRoute from "@/guards/PrivateRoute";
import AdminHome from "@/pages/AdminHome";
import AdminLayout from "@/pages/AdminLayout";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import SiteConfig from "@/pages/SiteConfig";
import SocialLinks from "@/pages/SocialLinks";
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
            <AdminLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<AdminHome />} />
        <Route path="home" element={<AdminHome />} />

        {/* Future pages */}
        <Route path="config" element={<SiteConfig />} />
        <Route path="social-links" element={<SocialLinks />} />
      </Route>
    </Routes>
  );
}
