import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import http from "@/utils/http";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type Props = {
  isOpen: boolean;
  onValueChange: (value: boolean) => void;
  id: string;
};

export const DeleteSongDialog = ({ id, isOpen, onValueChange }: Props) => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (id: string) => http.delete(`/admin/songs/${id}`),
    onSuccess: (data) => {
      if (data.success) {
        queryClient.invalidateQueries({ queryKey: ["admin-songs"] });
        toast.success(data.message);
        onValueChange(false);
        return;
      }
      toast.error(data.message);
      return;
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={onValueChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Deletion</DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onValueChange(false)}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={() => deleteMutation.mutate(id)}
            disabled={deleteMutation.isPending}
          >
            {deleteMutation.isPending ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
