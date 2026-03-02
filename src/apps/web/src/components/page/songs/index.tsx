"use client";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Music, User, Music4 } from "lucide-react";
import { keepPreviousData, useQuery, useQueryClient } from "@tanstack/react-query";
import http from "@/utils/http";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Prisma } from "@/lib/database/prisma/generated/prisma";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import Link from "next/link";

type Song = Prisma.SongGetPayload<{
  include: {
    metadata: true;
  };
}>;

// Skeleton loader for Song List Item
const SongCardSkeleton = () => (
  <Card className="relative flex w-full flex-row items-center gap-4 rounded-3xl border-0 bg-transparent p-3 sm:p-5">
    {/* Base Glass Layer */}
    <div className="absolute inset-0 z-0 bg-white/50 opacity-60 backdrop-blur-2xl dark:bg-[#111]/70" />

    {/* Smooth Liquid Glass Border Overlay */}
    <div className="pointer-events-none absolute inset-0 z-10 rounded-3xl border border-white/40 dark:border-white/10" />

    {/* Number Tile Skeleton */}
    <Skeleton className="relative z-20 h-14 w-14 shrink-0 rounded-2xl bg-indigo-500/10 sm:h-16 sm:w-16 dark:bg-indigo-500/20" />

    {/* Main Content Pane Skeleton */}
    <div className="relative z-20 flex min-w-0 flex-1 flex-col gap-3">
      <Skeleton className="h-6 w-3/4 max-w-[200px] rounded-lg bg-gray-200/50 sm:h-7 dark:bg-gray-800/50" />
      <Skeleton className="h-4 w-1/2 max-w-[150px] rounded-md bg-gray-200/50 md:max-w-[200px] dark:bg-gray-800/50" />

      <div className="mt-1 hidden gap-1.5 sm:flex">
        <Skeleton className="h-4 w-10 rounded-full bg-black/5 dark:bg-white/5" />
        <Skeleton className="h-4 w-14 rounded-full bg-black/5 dark:bg-white/5" />
        <Skeleton className="h-4 w-12 rounded-full bg-black/5 dark:bg-white/5" />
      </div>
    </div>

    {/* Right Tags/Metadata Pane Skeleton */}
    <div className="relative z-20 hidden shrink-0 flex-col items-end justify-center gap-2 pl-4 md:flex">
      <Skeleton className="h-6 w-16 rounded-md bg-black/5 dark:bg-white/10" />
      <div className="mt-1 flex gap-2">
        <Skeleton className="h-3 w-10 rounded-sm bg-gray-200/50 dark:bg-gray-800/50" />
        <Skeleton className="h-3 w-12 rounded-sm bg-gray-200/50 dark:bg-gray-800/50" />
      </div>
    </div>
  </Card>
);

export const SongCardWrapper = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof motion.div>
>(({ children, ...props }, ref) => (
  <motion.div ref={ref} {...props}>
    {children}
  </motion.div>
));
SongCardWrapper.displayName = "SongCardWrapper";

const SongCard = ({ song, onClick }: { song: Song; onClick?: () => void }) => {
  return (
    <Card
      className="liquid-glass liquid-interact liquid-ripple group relative flex w-full cursor-pointer flex-row items-center gap-4 overflow-hidden rounded-[1.5rem] border border-white/40 p-3 backdrop-blur-3xl transition-all hover:-translate-y-0.5 hover:scale-[1.01] hover:border-indigo-300/50 hover:shadow-[0_8px_32px_0_rgba(79,70,229,0.15)] active:scale-[0.98] active:brightness-90 sm:p-5 dark:border-white/10 dark:hover:border-indigo-500/30"
      onClick={onClick}>
      {/* Animated Gradient Glow on Hover */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-500/0 via-transparent to-violet-500/0 opacity-0 transition-opacity duration-500 group-hover:from-indigo-500/5 group-hover:to-violet-500/5 group-hover:opacity-100 dark:group-hover:from-indigo-500/10 dark:group-hover:to-violet-500/10" />

      {/* Number Tile */}
      <div className="relative z-20 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-indigo-500/10 bg-indigo-500/10 shadow-[0_2px_10px_0_rgba(79,70,229,0.05)] transition-transform duration-500 group-hover:scale-110 sm:h-16 sm:w-16 dark:border-indigo-500/20 dark:bg-indigo-500/20">
        <span className="text-xl font-black tracking-tighter text-indigo-600/90 drop-shadow-sm transition-all duration-300 group-hover:text-indigo-600 sm:text-2xl dark:text-indigo-400/90 dark:group-hover:text-indigo-300">
          {song.metadata.number}
        </span>
      </div>

      {/* Main Content Pane */}
      <div className="relative z-20 flex min-w-0 flex-1 flex-col">
        <div className="flex items-center gap-2">
          <CardTitle className="truncate bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-lg font-extrabold tracking-tight text-transparent transition-all group-hover:from-indigo-600 group-hover:to-violet-600 sm:text-xl dark:from-white dark:to-gray-300 dark:group-hover:from-indigo-400 dark:group-hover:to-violet-400">
            {song.title}
          </CardTitle>
          {song.metadata.oldNumber && (
            <span className="hidden text-[10px] font-semibold tracking-tight text-gray-400 sm:inline-block sm:text-xs dark:text-gray-500">
              (Old #{song.metadata.oldNumber})
            </span>
          )}
        </div>

        {(song.metadata.author || song.metadata.composer) && (
          <div className="mt-1 flex items-center gap-2 text-[11px] font-medium text-gray-500 sm:text-xs dark:text-gray-400">
            {song.metadata.author && (
              <span className="max-w-[120px] truncate sm:max-w-xs">{song.metadata.author}</span>
            )}
            {song.metadata.author && song.metadata.composer && (
              <span className="h-1 w-1 rounded-full bg-gray-300 dark:bg-gray-600" />
            )}
            {song.metadata.composer && (
              <span className="max-w-[120px] truncate sm:max-w-xs">{song.metadata.composer}</span>
            )}
          </div>
        )}

        {song.metadata.tags && song.metadata.tags.length > 0 && (
          <div className="mt-2 hidden flex-wrap gap-1.5 sm:flex">
            {song.metadata.tags.slice(0, 3).map((tag, idx) => (
              <span
                key={idx}
                className="rounded-full bg-black/5 px-2.5 py-0.5 text-[10px] font-semibold text-gray-600 transition-colors group-hover:bg-indigo-50 group-hover:text-indigo-700 sm:text-[11px] dark:bg-white/5 dark:text-gray-300 dark:group-hover:bg-indigo-500/10 dark:group-hover:text-indigo-300">
                {tag}
              </span>
            ))}
            {song.metadata.tags.length > 3 && (
              <span className="rounded-full bg-black/5 px-2.5 py-0.5 text-[10px] font-semibold text-gray-500 sm:text-[11px] dark:bg-white/5 dark:text-gray-400">
                +{song.metadata.tags.length - 3}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Right Tags/Metadata Pane */}
      <div className="relative z-20 hidden shrink-0 flex-col items-end justify-center gap-2 pl-4 md:flex">
        <Badge
          variant="secondary"
          className="border-0 bg-black/5 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-gray-600 transition-colors group-hover:bg-indigo-100/50 group-hover:text-indigo-700 dark:bg-white/10 dark:text-gray-300 dark:group-hover:bg-indigo-500/20 dark:group-hover:text-indigo-300">
          {song.metadata.language}
        </Badge>
        {(song.metadata.tune || song.metadata.meter) && (
          <div className="flex items-center gap-2 text-[10px] font-medium text-gray-400 dark:text-gray-500">
            {song.metadata.tune && (
              <span className="max-w-[80px] truncate">{song.metadata.tune}</span>
            )}
            {song.metadata.meter && (
              <span className="max-w-[60px] truncate">{song.metadata.meter}</span>
            )}
          </div>
        )}
      </div>
    </Card>
  );
};

// Main Songs List Component
const SongsList = () => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [khorusPage, setKhorusPage] = useState(1);
  const [songs, setSongs] = useState<Song[]>([]);
  const [khorus, setKhorus] = useState<Song[]>([]);

  const { data, isFetching } = useQuery({
    queryKey: ["songs", page],
    queryFn: () => http.get<Song[]>(`/songs?page=${page}`),
    placeholderData: keepPreviousData,
  });

  const { data: khors, isFetching: isFetchingKhorus } = useQuery({
    queryKey: ["khorus", khorusPage],
    queryFn: () => http.get<Song[]>(`/songs?page=${khorusPage}&isChorus=true`),
    placeholderData: keepPreviousData,
    select: (data) => data,
  });

  const songsMeta = data?.meta;
  const khorusMeta = khors?.meta;

  // Track latest fetch states safely inside refs to prevent observer recreation loops
  const fetchingSongsRef = useRef(isFetching);
  const hasNextSongsRef = useRef(songsMeta?.hasNextPage);
  useEffect(() => {
    fetchingSongsRef.current = isFetching;
  }, [isFetching]);
  useEffect(() => {
    hasNextSongsRef.current = songsMeta?.hasNextPage;
  }, [songsMeta?.hasNextPage]);

  const fetchingKhorusRef = useRef(isFetchingKhorus);
  const hasNextKhorusRef = useRef(khorusMeta?.hasNextPage);
  useEffect(() => {
    fetchingKhorusRef.current = isFetchingKhorus;
  }, [isFetchingKhorus]);
  useEffect(() => {
    hasNextKhorusRef.current = khorusMeta?.hasNextPage;
  }, [khorusMeta?.hasNextPage]);

  const observerRefSongs = useRef<IntersectionObserver | null>(null);
  const observerRefKhorus = useRef<IntersectionObserver | null>(null);

  const bottomRefSongs = useCallback((node: HTMLDivElement | null) => {
    if (observerRefSongs.current) observerRefSongs.current.disconnect();
    if (!node) return;

    observerRefSongs.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !fetchingSongsRef.current && hasNextSongsRef.current) {
        setPage((p) => p + 1);
      }
    });
    observerRefSongs.current.observe(node);
  }, []);

  const bottomRefKhorus = useCallback((node: HTMLDivElement | null) => {
    if (observerRefKhorus.current) observerRefKhorus.current.disconnect();
    if (!node) return;

    observerRefKhorus.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !fetchingKhorusRef.current && hasNextKhorusRef.current) {
        setKhorusPage((p) => p + 1);
      }
    });
    observerRefKhorus.current.observe(node);
  }, []);

  useEffect(() => {
    if (data?.data) {
      const prevData = songs;
      const newData = data?.data;
      setSongs((prevData || []).concat(newData));
    }
  }, [data]);

  useEffect(() => {
    if (khors?.data) {
      const prevData = khorus;
      const newData = khors?.data;
      setKhorus((prevData || []).concat(newData));
    }
  }, [khors]);

  // Loading skeleton state array
  const skeletons = Array.from({ length: 9 }).map((_, i) => (
    <SongCardSkeleton key={`skeleton-${i}`} />
  ));

  return (
    <div className="min-h-full pb-16">
      <Tabs defaultValue="songs" className="w-full">
        <div className="sticky top-0 z-30 mb-8 pb-4 pt-4">
          <TabsList className="liquid-glass mx-auto grid w-full max-w-sm p-0 grid-cols-2 items-center rounded-full shadow-[0_8px_32px_0_rgba(79,70,229,0.1)]">
            <TabsTrigger value="songs" className="liquid-ripple rounded-full transition-all active:scale-[0.98] active:brightness-90">
              Songs
            </TabsTrigger>
            <TabsTrigger value="chorus" className="liquid-ripple rounded-full transition-all active:scale-[0.98] active:brightness-90">
              Khorus
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="songs" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
          {isFetching && songs.length === 0 ? (
            <div className="mx-auto flex w-full max-w-5xl flex-col gap-4">{skeletons}</div>
          ) : songs?.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="mb-6 rounded-full bg-indigo-50 p-6 dark:bg-indigo-900/20">
                <Music className="h-12 w-12 text-indigo-400 opacity-80" />
              </div>
              <h3 className="mb-2 text-2xl font-bold tracking-tight">No songs found</h3>
              <p className="max-w-sm text-gray-500 dark:text-gray-400">
                Try adjusting your search or filter criteria to discover more hymnals
              </p>
            </div>
          ) : (
            <>
              <motion.div className="mx-auto flex w-full max-w-5xl flex-col gap-4">
                {songs?.map((song, index) => (
                  <motion.div
                    key={song.id}
                    initial={{ opacity: 0, scale: 0.98, y: 20 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true, margin: "100px" }}
                    transition={{
                      duration: 0.4,
                      ease: [0.25, 0.46, 0.45, 0.94],
                      delay: (index % 15) * 0.04
                    }}>
                    <Link href={`/songs/${song.id}`} prefetch>
                      <SongCard song={song} />
                    </Link>
                  </motion.div>
                ))}
                {isFetching && songs.length > 0 && skeletons.slice(0, 3)}
              </motion.div>

              {/* Infinite Scroll Sentinel */}
              <div ref={bottomRefSongs} className="flex min-h-[100px] w-full items-center justify-center py-4">
                {isFetching && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center gap-3 rounded-full bg-white/50 px-6 py-3 font-semibold text-indigo-600 shadow-[0_8px_32px_0_rgba(79,70,229,0.1)] backdrop-blur-xl dark:bg-black/40 dark:text-indigo-400">
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent dark:border-indigo-400 dark:border-t-transparent" />
                    Loading...
                  </motion.div>
                )}
              </div>
            </>
          )}
        </TabsContent>

        <TabsContent
          value="chorus"
          className="mt-0 focus-visible:outline-none focus-visible:ring-0">
          {isFetchingKhorus && khorus.length === 0 ? (
            <div className="mx-auto flex w-full max-w-5xl flex-col gap-4">{skeletons}</div>
          ) : khorus?.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="mb-6 rounded-full bg-indigo-50 p-6 dark:bg-indigo-900/20">
                <Music className="h-12 w-12 text-indigo-400 opacity-80" />
              </div>
              <h3 className="mb-2 text-2xl font-bold tracking-tight">No khorus found</h3>
              <p className="max-w-sm text-gray-500 dark:text-gray-400">
                There are currently no chorus variations matching your criteria
              </p>
            </div>
          ) : (
            <>
              <motion.div className="mx-auto flex w-full max-w-5xl flex-col gap-4">
                {khorus?.map((song, index) => (
                  <motion.div
                    key={song.id + song.title}
                    initial={{ opacity: 0, scale: 0.98, y: 20 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true, margin: "100px" }}
                    transition={{
                      duration: 0.4,
                      ease: [0.25, 0.46, 0.45, 0.94],
                      delay: (index % 15) * 0.04
                    }}>
                    <Link href={`/songs/${song.id}`} prefetch>
                      <SongCard song={song} />
                    </Link>
                  </motion.div>
                ))}
                {isFetchingKhorus && khorus.length > 0 && skeletons.slice(0, 3)}
              </motion.div>

              {/* Infinite Scroll Sentinel */}
              <div ref={bottomRefKhorus} className="flex min-h-[100px] w-full items-center justify-center py-4">
                {isFetchingKhorus && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center gap-3 rounded-full bg-white/50 px-6 py-3 font-semibold text-indigo-600 shadow-[0_8px_32px_0_rgba(79,70,229,0.1)] backdrop-blur-xl dark:bg-black/40 dark:text-indigo-400">
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent dark:border-indigo-400 dark:border-t-transparent" />
                    Loading...
                  </motion.div>
                )}
              </div>
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SongsList;
