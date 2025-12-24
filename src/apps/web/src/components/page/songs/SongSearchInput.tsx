"use client";

"use client";
import React, { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Search, Music, X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
    <div className="flex-1 w-full md:max-w-lg" data-search-container>
      <Popover open={isSearchOpen} onOpenChange={setIsSearchOpen}>
        <PopoverTrigger asChild>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
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
              className="pl-10 pr-10 h-11"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                onClick={handleClearSearch}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </PopoverTrigger>

        <PopoverContent
          className="p-0 w-[var(--radix-popover-trigger-width)]"
          align="start"
          sideOffset={8}
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <div className="py-2">
            {/* Search Results Header */}
            <div className="px-3 py-2 border-b">
              <p className="text-xs font-medium text-muted-foreground">
                {searchResults.length > 0
                  ? `Found ${searchResults.length} result${searchResults.length === 1 ? "" : "s"}`
                  : "No results found"}
              </p>
            </div>

            {/* Search Results List */}
            {searchResults.length > 0 ? (
              <ScrollArea className="max-h-[400px]">
                <div className="py-2">
                  {searchResults.map((song) => (
                    <button
                      key={song.id || song.metadata.number}
                      onClick={() => handleSelectSong(song)}
                      className="w-full px-3 py-2.5 hover:bg-accent transition-colors text-left flex items-start gap-3 group"
                    >
                      <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                        <Music className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-medium text-sm truncate">
                            {song.title}
                          </p>
                          <Badge
                            variant="outline"
                            className="text-xs uppercase flex-shrink-0"
                          >
                            #{song.metadata.number}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          {song.metadata.author && (
                            <span className="truncate">
                              {song.metadata.author}
                            </span>
                          )}
                          {song.metadata.language && (
                            <>
                              <span>•</span>
                              <Badge
                                variant="secondary"
                                className="text-xs uppercase"
                              >
                                {song.metadata.language}
                              </Badge>
                            </>
                          )}
                        </div>
                        {song.metadata.tags &&
                          song.metadata.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-1.5">
                              {song.metadata.tags
                                .slice(0, 3)
                                .map((tag, idx) => (
                                  <Badge
                                    key={idx}
                                    variant="outline"
                                    className="text-[10px] px-1.5 py-0"
                                  >
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
                <Search className="h-8 w-8 text-muted-foreground/50 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Searching...</p>
              </div>
            ) : (
              <div className="px-3 py-8 text-center">
                <Search className="h-8 w-8 text-muted-foreground/50 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">No songs found</p>
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
