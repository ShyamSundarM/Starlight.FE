import { GetSiteConfig } from "@/api/site";
import { GetSocialLinks, type SocialLink } from "@/api/socialLinks";
import type { SiteConfigItem, SiteConfigMap } from "@/utils/types";
import { create } from "zustand";

interface Category {
  id: number;
  name: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
}

interface AppDataState {
  loading: boolean;
  error: string | null;

  siteConfigItems: SiteConfigItem[] | null;
  siteConfigMap: SiteConfigMap | null;
  categories: Category[] | null;
  products: Product[] | null;
  socialLinks: SocialLink[] | null;
  triggerSocialLinksRefresh: boolean;
  triggerSiteConfigRefresh: boolean;

  setTriggerSocialLinksRefresh: (value: boolean) => void;
  setTriggerSiteConfigRefresh: (value: boolean) => void;

  fetchSocialLinks: () => Promise<void>;
  fetchSiteConfig: () => Promise<void>;
  //fetchCategories: () => Promise<void>;
  //fetchProducts: () => Promise<void>;
  initAppData: () => Promise<void>;
}

export const useAppDataStore = create<AppDataState>((set, get) => ({
  loading: false,
  error: null,
  socialLinks: null,
  triggerSocialLinksRefresh: false,
  triggerSiteConfigRefresh: false,
  setTriggerSocialLinksRefresh: (value: boolean) =>
    set({ triggerSocialLinksRefresh: value }),
  setTriggerSiteConfigRefresh: (value: boolean) =>
    set({ triggerSiteConfigRefresh: value }),

  siteConfigItems: null,
  siteConfigMap: null,
  categories: null,
  products: null,

  fetchSiteConfig: async () => {
    const res = await GetSiteConfig();

    set({ siteConfigItems: res });

    // Convert array to map using 'key' property
    const siteConfigMap = res.reduce<SiteConfigMap>((map, item) => {
      map[item.key] = item;
      return map;
    }, {});

    set({ siteConfigMap });
  },

  fetchSocialLinks: async () => {
    const res = await GetSocialLinks();
    set({ socialLinks: res });
  },

  //   fetchCategories: async () => {
  //     try {
  //       const res = await fetch(
  //         `${import.meta.env.VITE_API_BASE_URL}/categories`
  //       );
  //       const data: Category[] = await res.json();
  //       set({ categories: data });
  //     } catch (err: any) {
  //       set({ error: err.message });
  //     }
  //   },

  //   fetchProducts: async () => {
  //     try {
  //       const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/products`);
  //       const data: Product[] = await res.json();
  //       set({ products: data });
  //     } catch (err: any) {
  //       set({ error: err.message });
  //     }
  //   },

  initAppData: async () => {
    set({ loading: true, error: null });
    try {
      await Promise.all([
        get().fetchSiteConfig(),
        get().fetchSocialLinks(),
        //get().fetchCategories(),
        //get().fetchProducts(),
      ]);
    } catch (err: any) {
      set({ error: err.message });
    } finally {
      set({ loading: false });
    }
  },
}));
