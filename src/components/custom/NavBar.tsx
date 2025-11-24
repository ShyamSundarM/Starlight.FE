import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/context/store/authStore";
import { useAppDataStore } from "@/context/store/appDataStore";
import styles from "./NavBar.module.css";
import FlipImage from "./FlipImage";

export default function Navbar() {
  const { isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();
  const { siteConfig } = useAppDataStore();

  return (
    <header className="flex items-center justify-between px-6 py-3 border-b">
      <div
        className={`flex items-center gap-2 ${styles.logoSection}`}
        onClick={() => navigate("/")}
      >
        <FlipImage siteConfig={siteConfig} />
        <h1 className="text-xl font-semibold">
          {siteConfig["SiteTitle"].value}
        </h1>
      </div>

      <div className="flex-1 text-center">
        <p className="text-sm text-gray-600">
          {siteConfig["Influencer_Name"]?.value}
        </p>
      </div>

      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            {isAuthenticated ? (
              <Button variant="outline" onClick={logout}>
                Sign out
              </Button>
            ) : (
              <Button onClick={() => navigate("/login")}>Sign in</Button>
            )}
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
}
