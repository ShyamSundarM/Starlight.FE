import { useEffect } from "react";
import "./App.css";
import { useAuthStore } from "./context/store/authStore";

function App() {
  const { checkSession, loading } = useAuthStore();
  useEffect(() => {
    checkSession();
  }, [checkSession]);

  return <></>;
}

export default App;
