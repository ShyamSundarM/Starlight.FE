import type { SiteConfigItem } from "@/utils/types";
import axios from "axios";
import { toast } from "sonner";

export type { SiteConfigItem };

export async function GetSiteConfig(): Promise<SiteConfigItem[]> {
  try {
    var resp = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/site/config`
    );
    if (resp.status === 200) {
      return resp.data;
    } else {
      toast.error("Failed to fetch site configuration.");
      return [];
    }
  } catch (error) {
    toast.error("Failed to fetch site configuration.");
    return [];
  }
}

export async function CreateSiteConfig(data: SiteConfigItem) {
  try {
    const token = localStorage.getItem("token");
    const resp = await axios.post<SiteConfigItem>(
      `${import.meta.env.VITE_API_BASE_URL}/site/config`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (resp.status === 201) {
      toast.success("Site config created successfully.");
      return resp.data;
    } else {
      toast.error("Failed to create site config.");
      return null;
    }
  } catch (error) {
    toast.error("Failed to create site config.");
    return null;
  }
}

export async function UpdateSiteConfig(id: number, data: SiteConfigItem) {
  try {
    const token = localStorage.getItem("token");
    const resp = await axios.put<SiteConfigItem>(
      `${import.meta.env.VITE_API_BASE_URL}/site/config`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (resp.status === 204) {
      toast.success("Site config updated successfully.");
      return resp.data;
    } else {
      toast.error("Failed to update site config.");
      return null;
    }
  } catch (error) {
    toast.error("Failed to update site config.");
    return null;
  }
}

export async function DeleteSiteConfig(id: number) {
  try {
    const token = localStorage.getItem("token");
    const resp = await axios.delete(
      `${import.meta.env.VITE_API_BASE_URL}/site/config/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (resp.status === 204 || resp.status === 200) {
      toast.success("Site config deleted successfully.");
      return true;
    } else {
      toast.error("Failed to delete site config.");
      return false;
    }
  } catch (error) {
    toast.error("Failed to delete site config.");
    return false;
  }
}
