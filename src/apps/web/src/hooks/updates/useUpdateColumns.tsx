"use client";
import { Button } from "@/components/ui/button";
import { AppVersion } from "@/lib/database/prisma/generated/prisma";
import http from "@/utils/http";
import { useMutation } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { DownloadIcon, TrashIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ADMIN_UPDATE_ENDPOINT } from "@repo/constants";
import { toast } from "sonner";

const defaultColumns: ColumnDef<AppVersion>[] = [
  {
    accessorKey: "version",
    header: "Version",
    cell: ({ row }) => (
      <Badge variant="secondary" className="font-semibold">
        v{row.getValue("version")}
      </Badge>
    ),
  },
  {
    accessorKey: "minSupportedVersion",
    header: "Min Version",
    cell: ({ row }) => (
      <Badge variant="secondary" className="font-semibold">
        v{row.getValue("minSupportedVersion")}
      </Badge>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant="secondary" className="font-semibold">
        {row.getValue("status")}
      </Badge>
    ),
  },
  {
    accessorKey: "platform",
    header: "Platform",
    cell: ({ row }) => {
      const platform = row.original.platforms;
      return (
        <div className="space-x-2 flex">
          {platform.map((platform, i) => (
            <Badge
              key={platform + i}
              variant={platform === "ANDROID" ? "default" : "outline"}
            >
              {platform}
            </Badge>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "tags",
    header: "Update Type",
    cell: ({ row }) => {
      const tags = row.original.tags;
      return (
        <div className="space-x-2 flex">
          {tags.map((tag, i) => (
            <Badge
              key={tag + i}
              variant={
                tag === "BUGFIX"
                  ? "destructive"
                  : tag === "STABLE"
                    ? "default"
                    : "outline"
              }
            >
              {tag}
            </Badge>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "type",
    header: "Update Type",
    cell: ({ row }) => (
      <Badge
        variant={row.getValue("type") === "PTA" ? "destructive" : "secondary"}
      >
        {row.getValue("type")}
      </Badge>
    ),
  },
  {
    accessorKey: "releaseDate",
    header: "Release Date",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {format(new Date(row.original.createdAt), "MMM dd, yyyy")}
      </span>
    ),
  },
  {
    header: "Download",
    cell: ({ row }) => (
      <>
        {row.original.downloadUrl ? (
          <Button disabled={!row.original.downloadUrl} asChild size={"icon-sm"}>
            <a
              href={row.original.downloadUrl || ""}
              target="_blank"
              rel="noopener noreferrer"
            >
              <DownloadIcon />
            </a>
          </Button>
        ) : (
          <span className="text-sm text-muted-foreground">N/A</span>
        )}
      </>
    ),
  },
];

export function useUpdateColumns() {
  const { mutate: deleteUpdate, isPending } = useMutation({
    mutationFn: (id: string) =>
      http.delete(ADMIN_UPDATE_ENDPOINT.DELETE_UPDATE.replace(":id", id)),
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.message);
      }
    },
  });

  const columns: ColumnDef<AppVersion>[] = [
    ...defaultColumns,
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <Button
          variant={"destructive"}
          size={"icon-sm"}
          disabled={isPending}
          onClick={() => deleteUpdate(row.original.id)}
        >
          <TrashIcon size={20} className="cursor-pointer" />
        </Button>
      ),
    },
  ];

  return { columns };
}
