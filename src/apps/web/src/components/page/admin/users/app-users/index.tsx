"use client";
import { DataTable } from "@/components/common/DataTable";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DownloadUsers } from "@/lib/database/prisma/generated/prisma";
import http from "@/utils/http";
import { useQuery } from "@tanstack/react-query";
import { Suspense } from "react";
import { RefreshCw } from "lucide-react";
import { ADMIN_USERS_ENDPOINT } from "@repo/constants";
import { ColumnDef } from "@tanstack/react-table";

const columns: ColumnDef<DownloadUsers>[] = [
  {
    header: "#",
    cell: (props) => props.row.index + 1,
  },
  {
    accessorKey: "userId",
    header: "ID",
  },
  {
    accessorKey: "appVersion",
    header: "Version",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
  {
    accessorKey: "lastLoginAt",
    header: "Last Online At",
  },
];

export const AppUsers = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["app-users"],
    queryFn: () =>
      http.get<DownloadUsers[]>(ADMIN_USERS_ENDPOINT.GET_DOWNLOADED_USERS),
    select: (data) => data.data,
  });

  return (
    <div className="h-full flex flex-col space-y-6 p-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">App Users</h1>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => refetch()}
            disabled={isLoading}
          >
            <RefreshCw
              className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`}
            />
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold">{data?.length || 0}</div>
            <p className="text-xs text-muted-foreground mt-1">Total Updates</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold">{data?.length || 0}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Total Android Versions
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground mt-1">iOS Versions</p>
          </CardContent>
        </Card>
      </div>

      {/* Data Table */}
      <Card>
        <CardContent className="p-6">
          <Suspense>
            <DataTable data={data || []} columns={columns} />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
};
