import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  CreateSocialLink,
  UpdateSocialLink,
  type SocialLink,
} from "@/api/socialLinks";
import { Spinner } from "../ui/spinner";
import { useAppDataStore } from "@/context/store/appDataStore";

type Props = {
  initial: SocialLink;
  onClose: () => void;
};

export default function SocialLinkForm({ initial, onClose }: Props) {
  const [platform, setPlatform] = useState(initial?.name ?? "");
  const [url, setUrl] = useState(initial?.url ?? "");
  const [logo, setLogo] = useState(initial?.logo ?? "");
  const [loading, setLoading] = useState(false);
  const { setTriggerSocialLinksRefresh } = useAppDataStore();

  const handleSave = async () => {
    const data = {
      id: initial?.id ?? 0,
      name: platform,
      url,
      logo,
    };
    setLoading(true);
    if (initial?.id) {
      // Update existing social link
      await UpdateSocialLink(initial.id, data);
    } else {
      // Create new social link
      await CreateSocialLink(data);
    }

    setLoading(false);
    setTriggerSocialLinksRefresh(true);
    onClose(); // close dialog after save
  };

  return (
    <div className="space-y-4 mt-2">
      {/* Platform */}
      <div>
        <Label>Platform</Label>
        <Input
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
          placeholder="Instagram / YouTube / Twitter"
          disabled={loading}
        />
      </div>

      {/* URL */}
      <div>
        <Label>URL</Label>
        <Input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://social.com/user"
          disabled={loading}
        />
      </div>

      {/* Logo */}
      <div>
        <Label>Logo</Label>
        <Input
          value={logo}
          onChange={(e) => setLogo(e.target.value)}
          placeholder="logo-name-or-icon-string"
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
