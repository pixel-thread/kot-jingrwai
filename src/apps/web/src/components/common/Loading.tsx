import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const LoadingDots = () => {
  return (
    <div className="flex h-screen items-center justify-center space-x-3">
      {[0, 1, 2].map((index) => (
        <Skeleton
          key={index}
          className="animate-loadingDot h-8 w-8 rounded-full bg-indigo-500"
          style={{ animationDelay: `${index * 200}ms` }}
        />
      ))}
    </div>
  );
};
