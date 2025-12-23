"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Plus, Eye, TrashIcon, MusicIcon } from "lucide-react";
import { DataTable } from "@/components/common/DataTable";
import http from "@/utils/http";
import { Prisma } from "@/lib/database/prisma/generated/prisma";
import Link from "next/link";
import { DeleteSongDialog } from "./DeleteSongDialog";
import { AddSongTrackDialog } from "./AddSongTrackDialog";

type SongT = Prisma.SongGetPayload<{
  include: { metadata: true; paragraphs: { include: { lines: true } } };
}>;

export const AdminSongsPage = () => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isAddTrackOpen, setIsAddTrackOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedSong, setSelectedSong] = useState<SongT | null>(null);
  const [isChorus, setIsChorus] = useState(false);

  // Fetch songs
  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ["admin-songs", isChorus],
    queryFn: () => http.get<SongT[]>(`/songs?isChorus=${isChorus}`),
  });

  const songs = data?.data || [];

  // Table columns
  const columns: ColumnDef<SongT>[] = [
    {
      accessorKey: "metadata.number",
      header: "No.",
    },
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => (
        <Link
          href={`/songs/${row.original.id}`}
          className="max-w-[300px] truncate font-medium"
        >
          {row.original.title}
        </Link>
      ),
    },
    {
      accessorKey: "metadata.language",
      header: "Language",
      cell: ({ row }) => (
        <Badge variant="outline">
          {row.original.metadata.language.toUpperCase()}
        </Badge>
      ),
    },
    {
      accessorKey: "metadata.author",
      header: "Author",
      cell: ({ row }) => (
        <div className="text-sm text-muted-foreground">
          {row.original.metadata.author || "—"}
        </div>
      ),
    },
    {
      accessorKey: "paragraphs",
      header: "Verses",
      cell: ({ row }) => (
        <div className="text-sm">{row.original.paragraphs.length}</div>
      ),
    },
    {
      header: "Chorus",
      cell: ({ row }) => (
        <div>
          {row.original.metadata.isChorus ? (
            <Badge>Yes</Badge>
          ) : (
            <Badge variant="secondary">No</Badge>
          )}
        </div>
      ),
    },
    {
      accessorKey: "metadata.tags",
      header: "Tags",
      cell: ({ row }) => (
        <div className="flex gap-1 flex-wrap max-w-[200px]">
          {row.original.metadata.tags?.slice(0, 2).map((tag, idx) => (
            <Badge
              key={idx + row.original.metadata.id + tag}
              variant="secondary"
              className="text-xs"
            >
              {tag}
            </Badge>
          ))}
          {(row.original.metadata.tags?.length ?? 0) > 2 && (
            <Badge variant="secondary" className="text-xs">
              +{(row.original.metadata.tags?.length ?? 0) - 2}
            </Badge>
          )}
        </div>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const song = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => {
                  setSelectedSong(song);
                  setIsViewDialogOpen(true);
                }}
              >
                <Eye className="mr-2 h-4 w-4" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setSelectedSong(song);
                  setIsAddTrackOpen(true);
                }}
              >
                <MusicIcon className="mr-2 h-4 w-4" />
                Add Track
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  setSelectedSong(song);
                  setIsDeleteDialogOpen(true);
                }}
              >
                <TrashIcon className="mr-2 h-4 w-4" />
                Delete Song
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  if (isLoading) {
    return (
      <div className="container mx-auto py-10">
        <div className="flex items-center justify-center h-64">
          <div className="text-muted-foreground">Loading songs...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-10">
        <div className="flex items-center justify-center h-64">
          <div className="text-destructive">
            Error loading songs: {error.message}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Songs Management
          </h1>
          <p className="text-muted-foreground">
            Manage your song library ({songs.length} total)
          </p>
        </div>

        <div className="flex flex-row space-x-2">
          <Button
            onClick={() => setIsChorus(!isChorus)}
            variant={isChorus ? "default" : "outline"}
            disabled={isFetching}
          >
            {isFetching ? "Loading..." : isChorus ? "All Songs" : "Chorus"}
          </Button>

          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Song
          </Button>
        </div>
      </div>

      <DataTable columns={columns} data={songs} />

      <DeleteSongDialog
        isOpen={isDeleteDialogOpen}
        onValueChange={setIsDeleteDialogOpen}
        id={selectedSong?.id ?? ""}
      />

      <AddSongTrackDialog
        isOpen={isAddTrackOpen}
        onValueChange={setIsAddTrackOpen}
        songId={selectedSong?.id ?? ""}
      />

      {/* View Dialog */}
      <ViewSongDialog
        open={isViewDialogOpen}
        onOpenChange={setIsViewDialogOpen}
        song={selectedSong}
      />

      {/* Delete Confirmation Dialog */}
    </div>
  );
};

// View Song Dialog Component
interface ViewSongDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  song: SongT | null;
}

const ViewSongDialog = ({ open, onOpenChange, song }: ViewSongDialogProps) => {
  if (!song) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{song.title}</DialogTitle>
          <DialogDescription>Song #{song.metadata.number}</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">Language:</span>{" "}
              {song.metadata.language.toUpperCase()}
            </div>
            <div>
              <span className="font-medium">Author:</span>{" "}
              {song.metadata.author || "—"}
            </div>
            <div>
              <span className="font-medium">Composer:</span>{" "}
              {song.metadata.composer || "—"}
            </div>
            <div>
              <span className="font-medium">Verses:</span>{" "}
              {song.paragraphs.length}
            </div>
          </div>

          {song.metadata.tags && song.metadata.tags.length > 0 && (
            <div>
              <span className="font-medium text-sm">Tags:</span>
              <div className="flex gap-2 mt-2 flex-wrap">
                {song.metadata.tags.map((tag, idx) => (
                  <Badge key={idx + song.metadata.id + tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <div>
            <h3 className="font-medium text-sm mb-2">Lyrics:</h3>
            <div className="space-y-4 bg-muted p-4 rounded-lg">
              {song.paragraphs.map((paragraph, idx) => (
                <div key={paragraph.id || idx}>
                  {paragraph.type && (
                    <Badge variant="outline" className="mb-2">
                      {paragraph.type}
                    </Badge>
                  )}
                  {paragraph.lines.map((line, lineIdx) => (
                    <p key={lineIdx + line.id} className="text-sm">
                      {line.text}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
