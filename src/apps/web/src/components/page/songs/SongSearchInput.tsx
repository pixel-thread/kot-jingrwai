"use client";

"use client";
import React, { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Search, Music, X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { type SongT } from "@repo/types";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import http from "@/utils/http";

export const SongSearchInput = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const { data: songs, isFetching } = useQuery({
    queryKey: ["songs", searchQuery],
    queryFn: () => http.get<SongT[]>(`/songs/search?query=${searchQuery}`),
    select: (data) => data.data,
    enabled: !!searchQuery.trim(),
  });

  const searchResults = songs || [];

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const sanitizeValue = value.replace(/[^a-zA-Z0-9\s]/g, "");
    setIsSearchOpen(sanitizeValue.trim().length > 0);
    setSearchQuery(sanitizeValue);
  };

  const onSongSelect = (song: SongT) => {
    router.push(`/songs/${song.id}`);
  };

  // Handle song selection
  const handleSelectSong = (song: SongT) => {
    setSearchQuery("");
    setIsSearchOpen(false);
    onSongSelect(song);
  };

  // Clear search
  const handleClearSearch = () => {
    setSearchQuery("");
    setIsSearchOpen(false);
    inputRef.current?.focus();
  };
  return (
    <div className="w-full flex-1 md:max-w-lg" data-search-container>
      <Popover open={isSearchOpen} onOpenChange={setIsSearchOpen}>
        <PopoverTrigger asChild>
          <div className="relative group">
            <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 opacity-0 blur backdrop-blur transition-all duration-300 group-focus-within:opacity-20 dark:group-focus-within:opacity-30"></div>
            <Search className="text-gray-400 absolute left-4 top-1/2 z-10 h-4 w-4 -translate-y-1/2 transition-colors group-focus-within:text-indigo-500 dark:group-focus-within:text-indigo-400" />
            <Input
              ref={inputRef}
              placeholder="Search by title, author, composer, number, or tags..."
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={() => {
                if (searchQuery.trim().length > 0) {
                  setIsSearchOpen(true);
                }
              }}
              className="liquid-glass liquid-interact relative h-11 w-full rounded-full pl-11 pr-11 outline-none transition-all placeholder:text-gray-500 focus:ring-2 focus:ring-indigo-500/50 dark:placeholder:text-gray-400"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 h-7 w-7 -translate-y-1/2 rounded-full text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={handleClearSearch}>
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </PopoverTrigger>

        <PopoverContent
          className="liquid-glass backdrop-blur-2xl bg-white/40 dark:bg-[#0a0a0a]/40 border border-white/20 dark:border-white/10 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] w-[var(--radix-popover-trigger-width)] overflow-hidden rounded-3xl p-0"
          align="start"
          sideOffset={12}
          onOpenAutoFocus={(e) => e.preventDefault()}>
          <div className="relative py-2">
            {/* Subtle glow inside popover */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-500/5 to-violet-500/5"></div>

            {/* Search Results Header */}
            <div className="border-b border-gray-100/50 px-4 py-2 dark:border-white/5">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                {searchResults.length > 0
                  ? `Found ${searchResults.length} result${searchResults.length === 1 ? "" : "s"}`
                  : "No results found"}
              </p>
            </div>

            {/* Search Results List */}
            {searchResults.length > 0 ? (
              <ScrollArea>
                <div className="max-h-[400px] px-2 py-2">
                  {searchResults.map((song) => (
                    <button
                      key={song.id || song.metadata.number}
                      onClick={() => handleSelectSong(song)}
                      className="group flex w-full items-start gap-4 rounded-xl px-3 py-3 text-left transition-all hover:bg-white/60 dark:hover:bg-gray-800/60">
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-50 to-violet-50 text-indigo-500 transition-colors group-hover:from-indigo-100 group-hover:to-violet-100 dark:from-indigo-500/10 dark:to-violet-500/10 dark:text-indigo-400 dark:group-hover:from-indigo-500/20 dark:group-hover:to-violet-500/20">
                        <Music className="h-5 w-5" />
                      </div>
                      <div className="min-w-0 flex-1 py-0.5">
                        <div className="mb-1 flex items-center gap-2">
                          <p className="truncate text-sm font-bold text-gray-900 dark:text-gray-100">{song.title}</p>
                          <Badge variant="outline" className="flex-shrink-0 border-indigo-200 bg-transparent text-[10px] font-bold tracking-wider text-indigo-600 dark:border-indigo-800 dark:text-indigo-400">
                            #{song.metadata.number}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-xs font-medium text-gray-500 dark:text-gray-400">
                          {song.metadata.author && (
                            <span className="truncate">{song.metadata.author}</span>
                          )}
                          {song.metadata.language && (
                            <>
                              <span className="opacity-50">•</span>
                              <Badge variant="secondary" className="bg-gray-100/50 text-[10px] uppercase text-gray-600 dark:bg-gray-800/50 dark:text-gray-300">
                                {song.metadata.language}
                              </Badge>
                            </>
                          )}
                        </div>
                        {song.metadata.tags && song.metadata.tags.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-1.5">
                            {song.metadata.tags.slice(0, 3).map((tag, idx) => (
                              <Badge
                                key={idx}
                                variant="outline"
                                className="border-gray-200/50 bg-white/30 px-2 py-0.5 text-[10px] text-gray-600 dark:border-white/5 dark:bg-gray-800/30 dark:text-gray-400">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </ScrollArea>
            ) : isFetching ? (
              <div className="px-4 py-10 text-center">
                <Search className="mx-auto mb-3 h-8 w-8 animate-pulse text-indigo-400/50" />
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Searching library...</p>
              </div>
            ) : (
              <div className="px-4 py-10 text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100/50 dark:bg-gray-800/50">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">No songs found match your query.</p>
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
