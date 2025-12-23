"use client";
import { DataTable } from "@/components/common/DataTable";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AppVersion } from "@/lib/database/prisma/generated/prisma";
import http from "@/utils/http";
import { useQuery } from "@tanstack/react-query";
import { Suspense, useState } from "react";
import { Plus, RefreshCw } from "lucide-react";
import { AddUpdateDialog } from "./AddUpdateDialog";
import { ADMIN_UPDATE_ENDPOINT } from "@/lib/constants/endpoints/admin/updates";
import { useUpdateColumns } from "@/hooks/updates/useUpdateColumns";

export const Updates = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { columns } = useUpdateColumns();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["updates"],
    queryFn: () => http.get<AppVersion[]>(ADMIN_UPDATE_ENDPOINT.GET_UPDATES),
    select: (data) => data.data,
  });

  return (
    <div className="h-full flex flex-col space-y-6 p-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">App Updates</h1>
          <p className="text-sm text-muted-foreground">
            Manage version updates and deployments
          </p>
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
          <Button onClick={() => setIsDialogOpen(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            Add Update
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
            <div className="text-2xl font-bold">
              {/* {data?.filter((v) => v.platforms. === "android").length || 0} */}
              0
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Android Versions
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold">
              {/* {data?.filter((v) => v.platforms === "IOS").length || 0} */}0
            </div>
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

      {/* Add Update Dialog */}
      <AddUpdateDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSuccess={() => {
          refetch();
          setIsDialogOpen(false);
        }}
      />
    </div>
  );
};
