import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  CreateSiteConfig,
  UpdateSiteConfig,
  type SiteConfigItem,
} from "@/api/site";
import { Spinner } from "../ui/spinner";
import { useAppDataStore } from "@/context/store/appDataStore";

type Props = {
  initial: SiteConfigItem | null;
  onClose: () => void;
};

export default function SiteConfigForm({ initial, onClose }: Props) {
  const [key, setKey] = useState(initial?.key ?? "");
  const [value, setValue] = useState(initial?.value ?? "");
  const [loading, setLoading] = useState(false);
  const { setTriggerSiteConfigRefresh } = useAppDataStore();

  const handleSave = async () => {
    const data: SiteConfigItem = {
      id: initial?.id ?? 0,
      key,
      value,
      createdAt: initial?.createdAt ?? new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setLoading(true);
    if (initial?.id) {
      // Update existing site config
      await UpdateSiteConfig(initial.id, data);
    } else {
      // Create new site config
      await CreateSiteConfig(data);
    }

    setLoading(false);
    setTriggerSiteConfigRefresh(true);
    onClose(); // close dialog after save
  };

  return (
    <div className="space-y-4 mt-2">
      {/* Key */}
      <div>
        <Label>Key</Label>
        <Input
          value={key}
          onChange={(e) => setKey(e.target.value)}
          placeholder="config_key"
          disabled={loading}
        />
      </div>

      {/* Value */}
      <div>
        <Label>Value</Label>
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="config_value"
          disabled={loading}
        />
      </div>

      {/* Save */}
      <Button className="w-full mt-4" onClick={handleSave}>
        {initial ? "Update" : "Add"} {loading ? <Spinner /> : null}
      </Button>
    </div>
  );
}
