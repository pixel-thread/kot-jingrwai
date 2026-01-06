"use client";
import React, { useState, useEffect } from "react";
import { Music } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { SongSearchInput } from "./SongSearchInput";
import Link from "next/link";

type Props = {
  children: React.ReactNode;
};

export default function SongsLayout({ children }: Props) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Close popover when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest("[data-search-container]")) {
        setIsSearchOpen(false);
      }
    };

    if (isSearchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearchOpen]);

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden">
      {/* Header - Fixed height */}
      <div className="bg-background flex-shrink-0 border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex w-full flex-col items-center gap-6 md:flex-row md:justify-between">
            {/* Logo/Title Section */}
            <Link href="/songs" className="flex w-full items-center gap-3 md:w-auto">
              <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-lg">
                <Music className="text-primary h-6 w-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Song Library</h1>
              </div>
            </Link>
            <SongSearchInput />
            {/* Search Section */}
            <div>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>

      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-hidden">
        <div className="container mx-auto h-full">
          <ScrollArea className="h-full">
            <div className="px-4 py-6">{children}</div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
