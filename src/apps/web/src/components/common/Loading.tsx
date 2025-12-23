import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const LoadingDots = () => {
  return (
    <div className="flex items-center justify-center h-screen space-x-3">
      {[0, 1, 2].map((index) => (
        <Skeleton
          key={index}
          className="w-8 h-8 bg-indigo-500 rounded-full animate-loadingDot"
          style={{ animationDelay: `${index * 200}ms` }}
        />
      ))}
    </div>
  );
};
