"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Music, User, Hash } from "lucide-react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import http from "@/utils/http";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Prisma } from "@/lib/database/prisma/generated/prisma";

type Song = Prisma.SongGetPayload<{
  include: {
    metadata: true;
  };
}>;

// Individual Song Card Component
const SongCard = ({ song, onClick }: { song: Song; onClick?: () => void }) => {
  const totalLines = 0;

  return (
    <Card
      className="border-l-primary/30 cursor-pointer border-l-4 transition-shadow hover:shadow-lg"
      onClick={onClick}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Music className="text-muted-foreground h-4 w-4" />
              {song.title}
            </CardTitle>
            <CardDescription className="mt-1">
              Song #{song.metadata.number}
              {song.metadata.oldNumber && ` (Old #${song.metadata.oldNumber})`}
            </CardDescription>
          </div>
          <Badge variant="outline" className="uppercase">
            {song.metadata.language}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Author & Composer */}
        {(song.metadata.author || song.metadata.composer) && (
          <div className="text-muted-foreground flex flex-col gap-1 text-sm">
            {song.metadata.author && (
              <div className="flex items-center gap-2">
                <User className="h-3 w-3" />
                <span>Author: {song.metadata.author}</span>
              </div>
            )}
            {song.metadata.composer && (
              <div className="flex items-center gap-2">
                <Music className="h-3 w-3" />
                <span>Composer: {song.metadata.composer}</span>
              </div>
            )}
          </div>
        )}

        {/* Tags */}
        {song.metadata.tags && song.metadata.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {song.metadata.tags.map((tag, idx) => (
              <Badge key={idx} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Optional metadata */}
        {(song.metadata.tune || song.metadata.meter || song.metadata.reference) && (
          <div className="text-muted-foreground space-y-1 border-t pt-2 text-xs">
            {song.metadata.tune && <div>Tune: {song.metadata.tune}</div>}
            {song.metadata.meter && <div>Meter: {song.metadata.meter}</div>}
            {song.metadata.reference && <div>Ref: {song.metadata.reference}</div>}
          </div>
        )}
      </CardContent>
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
    queryFn: () => http.get<Song[]>(`/songs?page=${page}?isChorus=false`),
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

  const onLoadMoreSongs = () => {
    if (songsMeta?.hasNextPage) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const onLoadMoreKhorus = () => {
    if (khorusMeta?.hasNextPage) {
      setKhorusPage((prevPage) => prevPage + 1);
    }
  };

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

  return (
    <div className="min-h-screen">
      <Tabs defaultValue="songs">
        <TabsList className="relative top-0 z-10 grid w-full grid-cols-2">
          <TabsTrigger value="songs">Songs</TabsTrigger>
          <TabsTrigger value="chorus">Khorus</TabsTrigger>
        </TabsList>
        <TabsContent className="mt-8" value="songs">
          {songs?.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <Music className="text-muted-foreground/50 mb-4 h-16 w-16" />
              <h3 className="mb-2 text-lg font-semibold">No songs found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {songs?.map((song) => (
                <SongCard
                  key={song.id}
                  song={song}
                  onClick={() => router.push(`/songs/${song.id}`)}
                />
              ))}
            </div>
          )}
          <div className="mt-8 flex justify-center">
            <Button
              variant={"secondary"}
              disabled={isFetching || !songsMeta?.hasNextPage}
              onClick={onLoadMoreSongs}>
              {isFetching ? "Loading..." : "Load More"}
            </Button>
          </div>
        </TabsContent>
        <TabsContent className="mt-8" value="chorus">
          {khorus?.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <Music className="text-muted-foreground/50 mb-4 h-16 w-16" />
              <h3 className="mb-2 text-lg font-semibold">No songs found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {khorus?.map((song) => (
                <SongCard
                  key={song.id + song.title}
                  song={song}
                  onClick={() => router.push(`/songs/${song.id}`)}
                />
              ))}
            </div>
          )}
          <div className="mt-8 flex justify-center">
            <Button
              variant={"secondary"}
              disabled={isFetchingKhorus || !khorusMeta?.hasNextPage}
              onClick={onLoadMoreKhorus}>
              {isFetching ? "Loading..." : "Load More"}
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SongsList;
