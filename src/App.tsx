import { useEffect } from "react";
import "./App.css";
import { useAuthStore } from "./context/store/authStore";
import Navbar from "./components/custom/NavBar";
import { Toaster } from "sonner";
import { useAppDataStore } from "./context/store/appDataStore";

function App() {
  const { checkSession, loading } = useAuthStore();
  const {
    initAppData,
    loading: appDataLoading,
    error,
    siteConfig,
  } = useAppDataStore();

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
    </>
  );
}

export default App;
