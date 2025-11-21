export type SiteConfigItem = {
  id: number;
  key: string;
  value: string;
  createdAt: string;
  updatedAt: string;
};

export type SiteConfigMap = Record<string, SiteConfigItem>;
