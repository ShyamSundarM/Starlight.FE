import axios from "axios";
import { toast } from "sonner";

export type SocialLink = {
  id: number;
  name: string;
  url: string;
  logo: string;
};

export async function GetSocialLinks(): Promise<SocialLink[] | null> {
  try {
    var resp = await axios.get<SocialLink[]>(
      `${import.meta.env.VITE_API_BASE_URL}/sociallinks`
    );
    if (resp.status === 200) {
      return resp.data;
    } else {
      toast.error("Failed to fetch social links.");
      return null;
    }
  } catch (error) {
    toast.error("Failed to fetch social links.");
  }
}

export async function CreateSocialLink(data: SocialLink) {
  try {
    const token = localStorage.getItem("token");
    const resp = await axios.post<SocialLink>(
      `${import.meta.env.VITE_API_BASE_URL}/sociallinks`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (resp.status === 201) {
      toast.success("Social link created successfully.");
      return resp.data;
    } else {
      toast.error("Failed to create social link.");
      return null;
    }
  } catch (error) {
    toast.error("Failed to create social link.");
    return null;
  }
}

export async function UpdateSocialLink(id: number, data: SocialLink) {
  try {
    const token = localStorage.getItem("token");
    const resp = await axios.put<SocialLink>(
      `${import.meta.env.VITE_API_BASE_URL}/sociallinks`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (resp.status === 204) {
      toast.success("Social link updated successfully.");
      return resp.data;
    } else {
      toast.error("Failed to update social link.");
      return null;
    }
  } catch (error) {
    toast.error("Failed to update social link.");
    return null;
  }
}

export async function DeleteSocialLink(id: number) {
  try {
    const token = localStorage.getItem("token");
    const resp = await axios.delete(
      `${import.meta.env.VITE_API_BASE_URL}/sociallinks/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (resp.status === 204 || resp.status === 200) {
      toast.success("Social link deleted successfully.");
      return true;
    } else {
      toast.error("Failed to delete social link.");
      return false;
    }
  } catch (error) {
    toast.error("Failed to delete social link.");
    return false;
  }
}
