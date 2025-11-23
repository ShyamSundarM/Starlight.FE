import { useEffect } from "react";
import "./App.css";
import { useAuthStore } from "./context/store/authStore";
import Navbar from "./components/custom/NavBar";
import { Toaster } from "sonner";
import { useAppDataStore } from "./context/store/appDataStore";
import Footer from "./components/custom/Footer";
import AppRoutes from "./routes/AppRoutes";

function App() {
  const { checkSession, loading } = useAuthStore();
  const { initAppData, loading: appDataLoading } = useAppDataStore();

  useEffect(() => {
    initAppData();
  }, [initAppData]);

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  if (loading || appDataLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Toaster />
      <Navbar />
      <div style={{ flex: 1, display: "flex" }}>
        <AppRoutes />
      </div>
      <Footer />
    </>
  );
}

export default App;
