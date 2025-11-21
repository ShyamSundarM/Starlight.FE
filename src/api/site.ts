import type { SiteConfigItem } from "@/utils/types";
import axios from "axios";
import { toast } from "sonner";

export async function GetSiteConfig(): Promise<SiteConfigItem[]> {
  try {
    var resp = await axios.get<SiteConfigItem[]>(
      `${import.meta.env.VITE_API_BASE_URL}/site/config`
    );
    if (resp.status === 200) {
      return resp.data;
    } else {
      toast.error("Failed to fetch site configuration.");
      return [];
    }
  } catch (error) {}
}
