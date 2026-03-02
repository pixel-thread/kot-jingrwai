"use client";
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Music, User, BookOpen, Hash, Globe, Calendar } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import http from "@/utils/http";
import { Prisma } from "@/lib/database/prisma/generated/prisma";
import { MusicPlayer } from "@/components/common/MusicPlayer";

import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

type SongT = Prisma.SongGetPayload<{
  include: {
    track: { include: { metadata: true } };
    metadata: true;
    paragraphs: {
      include: {
        lines: true;
      };
    };
  };
}>;

type SongParagraph = Prisma.ParagraphGetPayload<{
  include: { lines: true };
}>;

// Paragraph Component
const ParagraphDisplay = ({ paragraph }: { paragraph: SongParagraph }) => {
  const getTypeStyles = (type?: string) => {
    switch (type) {
      case "chorus":
        return "bg-indigo-50/50 dark:bg-indigo-500/5 border-l-4 border-indigo-500 pl-6 italic";
      case "verse":
        return "border-l-2 border-gray-200 dark:border-white/10 pl-6";
      case "bridge":
        return "bg-violet-50/50 dark:bg-violet-500/5 border-l-4 border-violet-500 pl-6";
      case "intro":
      case "outro":
        return "text-gray-500 dark:text-gray-400 border-l-2 border-dashed border-gray-300 dark:border-gray-700 pl-6";
      default:
        return "pl-6";
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className={`cursor-pointer liquid-interact rounded-xl py-5 px-4 transition-all duration-300 hover:bg-black/5 dark:hover:bg-white/5 ${getTypeStyles(paragraph?.type || "")}`}>
          <div className="mb-3 flex items-center gap-3">
            {paragraph.type && (
              <Badge variant="outline" className="border-indigo-200 bg-white/50 text-xs font-semibold uppercase text-indigo-700 backdrop-blur-md dark:border-indigo-800 dark:bg-black/20 dark:text-indigo-300">
                {paragraph.type}
              </Badge>
            )}
            <span className="text-xs font-medium text-gray-400 dark:text-gray-500">Paragraph {paragraph.order}</span>
          </div>

          <div className="space-y-3">
            {paragraph.lines.map((line, idx) => (
              <p key={idx} className="font-serif text-lg leading-relaxed text-gray-800 dark:text-gray-200">
                {line.text}
              </p>
            ))}
          </div>
        </div>
      </DialogTrigger>

      <DialogContent className="liquid-glass border border-white/60 bg-white/90 p-8 backdrop-blur-[40px] dark:border-white/20 dark:bg-[#202020]/80 sm:max-w-xl sm:rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.15)] overflow-hidden">
        {/* Soft bright white glow acting as neutral light source */}
        <div className="absolute left-1/2 top-1/2 -z-10 h-[150%] w-[150%] -translate-x-1/2 -translate-y-1/2 bg-white/40 dark:bg-[#303030]/50 blur-[60px] rounded-full" />
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            {paragraph.type && (
              <Badge variant="outline" className="border-indigo-200 bg-white/50 text-sm font-semibold uppercase text-indigo-700 backdrop-blur-md dark:border-indigo-800 dark:bg-black/20 dark:text-indigo-300">
                {paragraph.type}
              </Badge>
            )}
            <span className="text-sm font-medium text-gray-400 dark:text-gray-500">Paragraph {paragraph.order}</span>
          </DialogTitle>
        </DialogHeader>
        <div className="mt-6 space-y-5 py-4">
          {paragraph.lines.map((line, idx) => (
            <p key={idx} className="font-serif text-2xl leading-relaxed text-gray-800 dark:text-gray-200 text-center">
              {line.text}
            </p>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Metadata Info Card
const MetadataCard = ({
  title,
  value,
  icon: Icon,
}: {
  title: string;
  value: string | number | null | undefined;
  icon: React.ElementType;
}) => {
  if (!value) return null;

  return (
    <div className="flex items-start gap-4 rounded-xl border border-gray-200/50 bg-white/40 p-4 shadow-sm backdrop-blur-md transition-all hover:bg-white/60 dark:border-white/5 dark:bg-gray-900/40 dark:hover:bg-gray-800/60">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-500 dark:bg-indigo-500/10 dark:text-indigo-400">
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0 flex-1 py-1">
        <p className="mb-1 text-xs font-medium text-gray-500 dark:text-gray-400">{title}</p>
        <p className="truncate text-sm font-semibold text-gray-900 dark:text-gray-100">{value}</p>
      </div>
    </div>
  );
};

// Main Song Detail Component
const SongDetail = ({ id }: { id: string }) => {
  const [activeTab, setActiveTab] = useState("lyrics");

  const { data: song, isLoading } = useQuery({
    queryKey: ["song", id],
    queryFn: () => http.get<SongT>(`/songs/${id}`),
    select: (data) => data.data,
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <Card className="liquid-glass overflow-hidden rounded-3xl">
              <CardHeader className="pb-8 pt-8">
                <Skeleton className="h-10 w-3/4 mb-4" />
                <div className="flex gap-2">
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-6 w-24" />
                </div>
              </CardHeader>
            </Card>
            <div className="flex gap-4">
              <Skeleton className="h-10 w-24" />
              <Skeleton className="h-10 w-24" />
            </div>
            <Card className="liquid-glass rounded-3xl">
              <CardContent className="space-y-8 pt-8 px-6">
                <Skeleton className="h-24 w-full rounded-xl" />
                <Skeleton className="h-32 w-full rounded-xl" />
                <Skeleton className="h-24 w-full rounded-xl" />
              </CardContent>
            </Card>
          </div>
          <div className="space-y-6">
            <Card className="liquid-glass rounded-3xl">
              <CardHeader><Skeleton className="h-6 w-1/3" /></CardHeader>
              <CardContent className="space-y-4">
                <Skeleton className="h-16 w-full rounded-xl" />
                <Skeleton className="h-16 w-full rounded-xl" />
              </CardContent>
            </Card>
            <Card className="liquid-glass rounded-3xl">
              <CardHeader><Skeleton className="h-6 w-1/3" /></CardHeader>
              <CardContent className="space-y-4">
                <Skeleton className="h-16 w-full rounded-xl" />
                <Skeleton className="h-16 w-full rounded-xl" />
                <Skeleton className="h-16 w-full rounded-xl" />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (!song) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
        <div className="mb-6 rounded-full bg-red-50 p-6 dark:bg-red-900/20">
          <BookOpen className="h-12 w-12 text-red-400 opacity-80" />
        </div>
        <h3 className="mb-2 text-2xl font-bold tracking-tight">Song not found</h3>
        <p className="max-w-sm text-gray-500 dark:text-gray-400">The hymn you're looking for doesn't exist or has been removed.</p>
      </div>
    );
  }

  const totalLines = song.paragraphs.reduce((acc, p) => acc + p.lines.length, 0);
  const sortedParagraphs = [...song.paragraphs].sort((a, b) => a.order - b.order);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
      }}
      className="min-h-screen">
      {/* Content */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Main Content - Lyrics */}
        <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="space-y-8 lg:col-span-2">
          {/* Song Info Card */}
          <Card className="liquid-glass liquid-interact relative overflow-hidden rounded-3xl px-2 py-2">
            <div className="absolute inset-0 z-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-violet-500/5" />
            <CardHeader className="relative z-10 pb-8 pt-8 px-8">
              <div className="flex items-start justify-between">
                <div className="space-y-3">
                  <CardTitle className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent dark:from-white dark:to-gray-300">
                    {song.title}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-3 text-base">
                    <Badge variant="outline" className="border-indigo-200 bg-white/50 px-3 py-1 font-semibold uppercase text-indigo-700 backdrop-blur-md dark:border-indigo-800 dark:bg-black/20 dark:text-indigo-300">
                      {song.metadata.language}
                    </Badge>
                    {song.metadata.isChorus && <Badge className="bg-gradient-to-r from-violet-500 to-fuchsia-500 px-3 py-1 font-semibold shadow-sm hover:from-violet-600 hover:to-fuchsia-600">Chorus</Badge>}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>

          {song.track?.metadata.downloadUrl && (
            <Card className="liquid-glass liquid-interact rounded-3xl p-2 transition-shadow hover:shadow-md">
              <MusicPlayer
                audioSrc={song.track?.metadata.downloadUrl}
                title={song.title}
                artist={song.metadata.author || song.metadata.composer || "Unknown"}
                onPlay={() => console.log("Playing:", song.title)}
                onPause={() => console.log("Paused:", song.title)}
              />
            </Card>
          )}
          {/* Tabs for Lyrics and Info */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex justify-center mb-8 mt-4">
              <TabsList className="liquid-glass mx-auto grid w-full max-w-sm grid-cols-2 rounded-full p-0 shadow-[0_8px_32px_0_rgba(79,70,229,0.1)]">
                <TabsTrigger value="lyrics" className="rounded-full">Lyrics</TabsTrigger>
                <TabsTrigger value="structure" className="rounded-full">Structure</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="lyrics" className="mt-8 focus-visible:outline-none">
              <Card className="liquid-glass liquid-interact overflow-hidden rounded-3xl">
                <CardContent className="p-0">
                  <ScrollArea className="h-[600px] px-8 py-6">
                    <div className="space-y-6">
                      {sortedParagraphs.map((paragraph) => (
                        <ParagraphDisplay
                          key={paragraph.id || paragraph.order}
                          paragraph={paragraph}
                        />
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="structure" className="mt-8 focus-visible:outline-none">
              <Card className="liquid-glass liquid-interact rounded-3xl">
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <h3 className="flex items-center gap-3 text-xl font-bold text-gray-900 dark:text-gray-100">
                      <BookOpen className="h-6 w-6 text-indigo-500" />
                      Song Structure
                    </h3>
                    <div className="space-y-3">
                      {sortedParagraphs.map((paragraph) => (
                        <div
                          key={paragraph.id || paragraph.order}
                          className="group flex items-center justify-between rounded-xl border border-gray-200/50 bg-white/40 p-4 transition-all hover:bg-white/80 hover:shadow-sm dark:border-white/5 dark:bg-gray-900/40 dark:hover:bg-gray-800/80">
                          <div className="flex items-center gap-4">
                            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-sm font-bold text-gray-500 transition-colors group-hover:bg-indigo-50 group-hover:text-indigo-600 dark:bg-gray-800 dark:text-gray-400 dark:group-hover:bg-indigo-500/10 dark:group-hover:text-indigo-400">
                              {paragraph.order}
                            </span>
                            <Badge variant="outline" className="border-indigo-200 bg-transparent text-xs font-semibold capitalize text-gray-700 dark:border-indigo-800 dark:text-gray-300">
                              {paragraph.type || "verse"}
                            </Badge>
                          </div>
                          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            {paragraph.lines.length} lines
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Sidebar - Metadata */}

        <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="space-y-8">
          {/* Author & Composer */}
          <Card className="liquid-glass liquid-interact rounded-3xl">
            <CardHeader className="pb-4 pt-6">
              <CardTitle className="text-xl font-bold text-gray-900 dark:text-gray-100">Credits</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 pb-6">
              <MetadataCard title="Author" value={song.metadata.author} icon={User} />
              <MetadataCard title="Composer" value={song.metadata.composer} icon={Music} />
            </CardContent>
          </Card>

          {/* Song Information */}
          <Card className="liquid-glass liquid-interact rounded-3xl">
            <CardHeader className="pb-4 pt-6">
              <CardTitle className="text-xl font-bold text-gray-900 dark:text-gray-100">Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 pb-6">
              <MetadataCard
                title="Language"
                value={song.metadata.language.toUpperCase()}
                icon={Globe}
              />
              <MetadataCard title="Song Number" value={song.metadata.number} icon={Hash} />
              {song.metadata.oldNumber && (
                <MetadataCard title="Old Number" value={song.metadata.oldNumber} icon={Hash} />
              )}
              <MetadataCard title="Tune" value={song.metadata.tune} icon={Music} />
              <MetadataCard title="Meter" value={song.metadata.meter} icon={BookOpen} />
              <MetadataCard title="Reference" value={song.metadata.reference} icon={BookOpen} />
            </CardContent>
          </Card>

          {/* Statistics */}
          <Card className="liquid-glass liquid-interact rounded-3xl">
            <CardHeader className="pb-4 pt-6">
              <CardTitle className="text-xl font-bold text-gray-900 dark:text-gray-100">Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 pb-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl border border-gray-200/50 bg-white/40 p-4 text-center shadow-sm dark:border-white/5 dark:bg-gray-900/40">
                  <p className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">{song.paragraphs.length}</p>
                  <p className="mt-1 text-xs font-medium text-gray-500 dark:text-gray-400">Paragraphs</p>
                </div>
                <div className="rounded-xl border border-gray-200/50 bg-white/40 p-4 text-center shadow-sm dark:border-white/5 dark:bg-gray-900/40">
                  <p className="text-3xl font-extrabold text-violet-600 dark:text-violet-400">{totalLines}</p>
                  <p className="mt-1 text-xs font-medium text-gray-500 dark:text-gray-400">Total Lines</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tags */}
          {song.metadata.tags && song.metadata.tags.length > 0 && (
            <Card className="liquid-glass liquid-interact rounded-3xl">
              <CardHeader className="pb-4 pt-6">
                <CardTitle className="text-xl font-bold text-gray-900 dark:text-gray-100">Tags</CardTitle>
              </CardHeader>
              <CardContent className="pb-6">
                <div className="flex flex-wrap gap-2">
                  {song.metadata.tags.map((tag, idx) => (
                    <Badge key={idx} variant="secondary" className="bg-gray-200/50 text-xs font-medium text-gray-700 hover:bg-gray-300/50 dark:bg-gray-800/80 dark:text-gray-300 dark:hover:bg-gray-700/80">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Dates */}
          {(song.createdAt || song.updatedAt) && (
            <Card className="liquid-glass liquid-interact rounded-3xl">
              <CardHeader className="pb-4 pt-6">
                <CardTitle className="text-xl font-bold text-gray-900 dark:text-gray-100">Dates</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 pb-6 text-sm font-medium text-gray-500 dark:text-gray-400">
                {song.createdAt && (
                  <div className="flex justify-between items-center rounded-lg border border-gray-100/50 bg-white/30 px-3 py-2 dark:border-white/5 dark:bg-white/5">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>Created</span>
                    </div>
                    <span className="text-gray-900 dark:text-gray-200">{new Date(song.createdAt).toLocaleDateString()}</span>
                  </div>
                )}
                {song.updatedAt && (
                  <div className="flex justify-between items-center rounded-lg border border-gray-100/50 bg-white/30 px-3 py-2 dark:border-white/5 dark:bg-white/5">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>Updated</span>
                    </div>
                    <span className="text-gray-900 dark:text-gray-200">{new Date(song.updatedAt).toLocaleDateString()}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </motion.div>
      </div >
    </motion.div >
  );
};

export default SongDetail;
