import { useEffect } from "react";
import "./App.css";
import { useAuthStore } from "./context/store/authStore";
import Navbar from "./components/custom/NavBar";
import { Toaster } from "sonner";
import { useAppDataStore } from "./context/store/appDataStore";
import Footer from "./components/custom/Footer";
import AppRoutes from "./routes/AppRoutes";
import AppBootLoader from "./components/custom/AppBootLoader";

function App() {
  const { init, loading } = useAuthStore();
  const { initAppData, loading: appDataLoading } = useAppDataStore();

  useEffect(() => {
    initAppData();
  }, [initAppData]);

  useEffect(() => {
    init();
  }, [init]);

  return (
    <>
      <AppBootLoader
        isLoading={loading || appDataLoading}
        finalWords={["For", "You", "Products"]}
      />
      {!(loading || appDataLoading) && (
        <>
          <Toaster />
          <Navbar />
          <div style={{ flex: 1, display: "flex" }}>
            <AppRoutes />
          </div>
          <Footer />
        </>
      )}
    </>
  );
}

export default App;
