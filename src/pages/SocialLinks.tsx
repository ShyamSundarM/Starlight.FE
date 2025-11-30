import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { MoreHorizontal, Underline } from "lucide-react";
import SocialLinkForm from "@/components/custom/SocialLinksForm";
import { DeleteSocialLink, type SocialLink } from "@/api/socialLinks";
import { useAppDataStore } from "@/context/store/appDataStore";
import { Spinner } from "@/components/ui/spinner";

export default function SocialLinks() {
  const [openDialog, setOpenDialog] = useState(false);
  const [editItem, setEditItem] = useState<SocialLink | null>(null);
  const [deleteItem, setDeleteItem] = useState<SocialLink | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);

  async function handleDelete() {
    if (!deleteItem) return;
    setDeleteLoading(true);
    await DeleteSocialLink(deleteItem.id);
    setDeleteLoading(false);
    setDeleteItem(null);
    setTriggerSocialLinksRefresh(true);
  }

  const {
    socialLinks,
    fetchSocialLinks,
    triggerSocialLinksRefresh,
    setTriggerSocialLinksRefresh,
  } = useAppDataStore();

  useEffect(() => {
    async function runLogic() {
      if (triggerSocialLinksRefresh) {
        setLoading(true);
        await fetchSocialLinks();
        setTriggerSocialLinksRefresh(false);
        setLoading(false);
      }
    }
    runLogic();
  }, [triggerSocialLinksRefresh]);

  return (
    <div>
      {loading && <Spinner />}
      <div style={{ marginBottom: 20 }}>
        Use logos from{" "}
        <a
          style={{
            color: "blue",
            textDecoration: "underline",
          }}
          href="https://icon-sets.iconify.design/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Iconify React
        </a>
      </div>
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Social Links</h2>

        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditItem(null)}>Add New</Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editItem ? "Edit Social Link" : "Add Social Link"}
              </DialogTitle>
            </DialogHeader>

            <SocialLinkForm
              key={editItem?.id ?? "new"}
              initial={editItem}
              onClose={() => setOpenDialog(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Platform</TableHead>
            <TableHead>URL</TableHead>
            <TableHead>Logo</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {socialLinks &&
            socialLinks.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.url}</TableCell>
                <TableCell>{item.logo}</TableCell>

                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => {
                          setEditItem(item);
                          setOpenDialog(true);
                        }}
                      >
                        Edit
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => setDeleteItem(item)}
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteItem} onOpenChange={() => setDeleteItem(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete "{deleteItem?.name}"?</AlertDialogTitle>
          </AlertDialogHeader>

          <div className="flex justify-end gap-3 mt-4">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>
              Delete {deleteLoading && <Spinner />}
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
