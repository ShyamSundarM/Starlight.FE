import { GetSiteConfig } from "@/api/site";
import type { SiteConfigItem } from "@/utils/types";
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

  siteConfig: SiteConfigItem[] | null;
  categories: Category[] | null;
  products: Product[] | null;

  fetchSiteConfig: () => Promise<void>;
  //fetchCategories: () => Promise<void>;
  //fetchProducts: () => Promise<void>;
  initAppData: () => Promise<void>;
}

export const useAppDataStore = create<AppDataState>((set, get) => ({
  loading: false,
  error: null,

  siteConfig: null,
  categories: null,
  products: null,

  fetchSiteConfig: async () => {
    const res = await GetSiteConfig();
    set({ siteConfig: res });
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
