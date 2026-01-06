import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import http from "@/utils/http";
import { toast } from "sonner";

type Props = {
  isOpen: boolean;
  onValueChange: (value: boolean) => void;
  songId: string;
};

export const AddSongTrackDialog = ({ isOpen, onValueChange, songId }: Props) => {
  const [track, setTrack] = useState<File | null | undefined>(null);

  const mutation = useMutation({
    mutationFn: () =>
      http.post(
        "/admin/tracks/upload",
        { file: track, songId: songId },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      ),
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.message);
        onValueChange(false);
        return;
      }
      toast.error(data.message);
      return;
    },
  });

  const handleSubmit = () => {
    mutation.mutate();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onValueChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Track</DialogTitle>
        </DialogHeader>

        <Input
          placeholder="Track name"
          onChange={(e) => setTrack(e.target.files?.[0])}
          type="file"
          accept="audio/*"
        />

        <DialogFooter>
          <Button onClick={handleSubmit} disabled={mutation.isPending}>
            {mutation.isPending ? "Adding..." : "Add Track"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
