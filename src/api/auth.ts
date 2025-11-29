import axios from "axios";
import { toast } from "sonner";

export async function VerifyUser(
  email: string,
  password: string
): Promise<{ token: string; expiresIn: number } | null> {
  try {
    var resp = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/auth/VerifyUser`,
      {
        email,
        password,
      }
    );
    if (resp.status === 200) {
      return resp.data;
    } else if (resp.status === 401) {
      toast.error("Invalid username/ password");
      return null;
    } else {
      toast.error("Something went wrong. Please try again later.");
      return null;
    }
  } catch (error) {
    toast.error("Something went wrong. Please try again later.");
    return null;
  }
}
