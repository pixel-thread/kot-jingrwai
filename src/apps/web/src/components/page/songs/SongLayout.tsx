"use client";
import React, { useState, useEffect } from "react";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { SongSearchInput } from "./SongSearchInput";
import Link from "next/link";
import Image from "next/image";

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
    <div className="relative h-screen w-full overflow-x-clip bg-gray-50/50 pt-4 dark:bg-[#0a0a0a]/50">
      {/* Multi-layered Liquid Glass Background Gradients */}
      <div className="h-240 w-240 pointer-events-none absolute -left-40 -top-40 -z-10 rounded-full bg-indigo-500/20 blur-[120px] dark:bg-indigo-600/10" />
      <div className="h-200 w-200 pointer-events-none absolute -right-40 top-[20%] -z-10 rounded-full bg-violet-500/20 blur-[120px] dark:bg-violet-600/10" />
      <div className="h-280 w-280 pointer-events-none absolute bottom-[-20%] left-1/2 -z-10 -translate-x-1/2 rounded-full bg-blue-500/20 blur-[150px] dark:bg-blue-600/10" />
      {/* Header - Floating Pill with Liquid Glass */}
      <div className="sticky left-0 right-0 top-4 z-50 mx-auto w-[95%] max-w-7xl shrink-0 transition-all duration-300">
        <div className="liquid-glass bg-linear-to-r flex flex-col items-center gap-4 rounded-3xl border border-indigo-200/40 from-indigo-100/50 via-white/40 to-blue-50/50 p-3 shadow-[0_8px_32px_0_rgba(79,70,229,0.1)] backdrop-blur-3xl sm:flex-row sm:justify-between sm:rounded-full sm:px-6 sm:py-3 dark:border-indigo-500/20 dark:from-indigo-950/60 dark:via-gray-900/60 dark:to-blue-950/40">
          {/* Logo/Title Section */}
          <div className="flex w-full items-center justify-start sm:w-1/3">
            <Link
              href="/songs"
              className="liquid-interact group flex w-full items-center gap-3 transition-opacity hover:opacity-90 sm:w-auto">
              <div className="relative h-10 w-auto sm:h-12">
                <Image
                  src="/assets/logo.png"
                  alt="Song Library Logo"
                  width={500}
                  height={150}
                  quality={100}
                  className="h-full w-auto object-contain drop-shadow-md"
                  priority
                />
              </div>
            </Link>
          </div>

          {/* Center: Search Input */}
          <div className="flex w-full flex-1 items-center justify-center sm:max-w-md">
            <SongSearchInput />
          </div>

          {/* Right: Theme Toggle Section */}
          <div className="hidden sm:flex sm:w-1/3 sm:justify-end">
            <ThemeToggle />
          </div>
        </div>
      </div>
      {/* Subtle background glow effect for layout */}
      <div className="pointer-events-none absolute right-0 top-0 -z-10 h-[40rem] w-[40rem] -translate-y-1/2 translate-x-1/3 rounded-full bg-indigo-500/5 blur-[120px] dark:bg-indigo-500/10" />
      <div className="pointer-events-none absolute bottom-0 left-0 -z-10 h-[40rem] w-[40rem] -translate-x-1/3 translate-y-1/3 rounded-full bg-violet-500/5 blur-[120px] dark:bg-violet-500/10" />
      <div className="container relative z-0 mx-auto px-4 py-8 lg:px-8 lg:py-10">{children}</div>
    </div>
  );
}
