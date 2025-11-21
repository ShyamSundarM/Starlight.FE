import type { SiteConfigItem, SiteConfigMap } from "@/utils/types";
import axios from "axios";
import { toast } from "sonner";

export async function GetSiteConfig(): Promise<SiteConfigMap> {
  try {
    var resp = await fetch(`${import.meta.env.VITE_API_BASE_URL}/site/config`);
    if (resp.status === 200) {
      return (await resp.json()) as SiteConfigMap;
    } else {
      toast.error("Failed to fetch site configuration.");
      return {};
    }
  } catch (error) {
    toast.error("Failed to fetch site configuration.");
  }
}
