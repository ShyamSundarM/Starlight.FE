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

import { MoreHorizontal } from "lucide-react";
import SiteConfigForm from "@/components/custom/SiteConfigForm";
import { DeleteSiteConfig, type SiteConfigItem } from "@/api/site";
import { useAppDataStore } from "@/context/store/appDataStore";
import { Spinner } from "@/components/ui/spinner";

export default function SiteConfig() {
  const [openDialog, setOpenDialog] = useState(false);
  const [editItem, setEditItem] = useState<SiteConfigItem | null>(null);
  const [deleteItem, setDeleteItem] = useState<SiteConfigItem | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);

  async function handleDelete() {
    if (!deleteItem) return;
    setDeleteLoading(true);
    await DeleteSiteConfig(deleteItem.id);
    setDeleteLoading(false);
    setDeleteItem(null);
    setTriggerSiteConfigRefresh(true);
  }

  const {
    siteConfigItems,
    fetchSiteConfig,
    triggerSiteConfigRefresh,
    setTriggerSiteConfigRefresh,
  } = useAppDataStore();

  useEffect(() => {
    async function runLogic() {
      if (triggerSiteConfigRefresh) {
        setLoading(true);
        await fetchSiteConfig();
        setTriggerSiteConfigRefresh(false);
        setLoading(false);
      }
    }
    runLogic();
  }, [triggerSiteConfigRefresh]);

  return (
    <div>
      {loading && <Spinner />}

      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Site Configuration</h2>

        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditItem(null)}>Add New</Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editItem ? "Edit Site Config" : "Add Site Config"}
              </DialogTitle>
            </DialogHeader>

            <SiteConfigForm
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
            <TableHead>Key</TableHead>
            <TableHead>Value</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {siteConfigItems &&
            siteConfigItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.key}</TableCell>
                <TableCell>{item.value}</TableCell>
                <TableCell>
                  {new Date(item.createdAt).toLocaleDateString()}
                </TableCell>

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
            <AlertDialogTitle>Delete "{deleteItem?.key}"?</AlertDialogTitle>
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
