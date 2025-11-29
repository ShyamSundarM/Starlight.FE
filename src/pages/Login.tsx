import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import styles from "./Login.module.css";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Spinner } from "@/components/ui/spinner";
import { useAuthStore } from "@/context/store/authStore";

export default function Login() {
  const [email, setEmail] = useState("chinmayi@foryouproducts.com");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const authState = useAuthStore();

  async function loginClickHandler() {
    await authState.login(email, password);
    const resp = useAuthStore.getState().isAuthenticated;
    if (resp) {
      navigate("/admin");
    }
  }
  return (
    <div className={styles.loginCard}>
      <Card className={`${styles.card} w-full max-w-sm`}>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={authState.buttonLoading}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={authState.buttonLoading}
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button
            type="submit"
            className="w-full"
            onClick={loginClickHandler}
            disabled={authState.buttonLoading}
          >
            Login
            {authState.buttonLoading && <Spinner />}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
