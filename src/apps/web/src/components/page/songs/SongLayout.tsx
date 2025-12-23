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
    <div className="h-screen w-full flex flex-col overflow-hidden">
      {/* Header - Fixed height */}
      <div className="flex-shrink-0 bg-background border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row w-full md:justify-between items-center gap-6">
            {/* Logo/Title Section */}
            <Link
              href="/songs"
              className="flex items-center gap-3 w-full md:w-auto"
            >
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Music className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight">
                  Song Library
                </h1>
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
        <div className="container h-full mx-auto">
          <ScrollArea className="h-full">
            <div className="py-6 px-4">{children}</div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
