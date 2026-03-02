import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const LoadingDots = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center space-x-4 bg-background dark:bg-[#0a0a0a]">
      {[0, 1, 2].map((index) => (
        <div
          key={index}
          className="relative h-6 w-6"
          style={{ animationDelay: `${index * 200}ms` }}
        >
          <div className="absolute inset-0 animate-ping rounded-full bg-indigo-400 opacity-20 dark:bg-indigo-500/30" style={{ animationDelay: `${index * 200}ms` }} />
          <Skeleton
            className="animate-loadingDot h-full w-full rounded-full bg-gradient-to-tr from-indigo-500 to-violet-500 shadow-[0_0_15px_rgba(99,102,241,0.5)]"
            style={{ animationDelay: `${index * 200}ms` }}
          />
        </div>
      ))}
    </div>
  );
};
