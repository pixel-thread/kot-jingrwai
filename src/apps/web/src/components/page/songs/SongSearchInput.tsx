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
    setIsSearchOpen(value.trim().length > 0);
    setSearchQuery(value);
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
          <div className="relative">
            <Search className="text-muted-foreground absolute left-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2" />
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
              className="h-11 pl-10 pr-10"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2"
                onClick={handleClearSearch}>
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </PopoverTrigger>

        <PopoverContent
          className="w-[var(--radix-popover-trigger-width)] p-0"
          align="start"
          sideOffset={8}
          onOpenAutoFocus={(e) => e.preventDefault()}>
          <div className="py-2">
            {/* Search Results Header */}
            <div className="border-b px-3 py-2">
              <p className="text-muted-foreground text-xs font-medium">
                {searchResults.length > 0
                  ? `Found ${searchResults.length} result${searchResults.length === 1 ? "" : "s"}`
                  : "No results found"}
              </p>
            </div>

            {/* Search Results List */}
            {searchResults.length > 0 ? (
              <ScrollArea>
                <div className="max-h-[400px] py-2">
                  {searchResults.map((song) => (
                    <button
                      key={song.id || song.metadata.number}
                      onClick={() => handleSelectSong(song)}
                      className="hover:bg-accent group flex w-full items-start gap-3 px-3 py-2.5 text-left transition-colors">
                      <div className="bg-primary/10 group-hover:bg-primary/20 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md transition-colors">
                        <Music className="text-primary h-5 w-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="mb-1 flex items-center gap-2">
                          <p className="truncate text-sm font-medium">{song.title}</p>
                          <Badge variant="outline" className="flex-shrink-0 text-xs uppercase">
                            #{song.metadata.number}
                          </Badge>
                        </div>
                        <div className="text-muted-foreground flex items-center gap-2 text-xs">
                          {song.metadata.author && (
                            <span className="truncate">{song.metadata.author}</span>
                          )}
                          {song.metadata.language && (
                            <>
                              <span>•</span>
                              <Badge variant="secondary" className="text-xs uppercase">
                                {song.metadata.language}
                              </Badge>
                            </>
                          )}
                        </div>
                        {song.metadata.tags && song.metadata.tags.length > 0 && (
                          <div className="mt-1.5 flex flex-wrap gap-1">
                            {song.metadata.tags.slice(0, 3).map((tag, idx) => (
                              <Badge
                                key={idx}
                                variant="outline"
                                className="px-1.5 py-0 text-[10px]">
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
              <div className="px-3 py-8 text-center">
                <Search className="text-muted-foreground/50 mx-auto mb-2 h-8 w-8" />
                <p className="text-muted-foreground text-sm">Searching...</p>
              </div>
            ) : (
              <div className="px-3 py-8 text-center">
                <Search className="text-muted-foreground/50 mx-auto mb-2 h-8 w-8" />
                <p className="text-muted-foreground text-sm">No songs found</p>
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
