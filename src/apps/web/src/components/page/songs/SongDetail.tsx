"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Music, User, BookOpen, Hash, Globe, Calendar } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import http from "@/utils/http";
import { Prisma } from "@/lib/database/prisma/generated/prisma";
import { MusicPlayer } from "@/components/common/MusicPlayer";

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
        return "bg-primary/5 border-l-4 border-primary pl-6 italic";
      case "verse":
        return "border-l-2 border-muted-foreground/20 pl-6";
      case "bridge":
        return "bg-accent/30 border-l-4 border-accent pl-6";
      case "intro":
      case "outro":
        return "text-muted-foreground border-l-2 border-dashed border-muted-foreground/30 pl-6";
      default:
        return "pl-6";
    }
  };

  return (
    <div
      className={`py-4 rounded-md transition-colors ${getTypeStyles(paragraph?.type || "")}`}
    >
      <div className="flex items-center gap-2 mb-2">
        {paragraph.type && (
          <Badge variant="outline" className="text-xs capitalize">
            {paragraph.type}
          </Badge>
        )}
        <span className="text-xs text-muted-foreground">
          Paragraph {paragraph.order}
        </span>
      </div>

      <div className="space-y-2">
        {paragraph.lines.map((line, idx) => (
          <p key={idx} className="text-base leading-relaxed font-serif">
            {line.text}
          </p>
        ))}
      </div>
    </div>
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
    <div className="flex items-start gap-3 p-3 rounded-lg border bg-card">
      <Icon className="h-4 w-4 mt-1 text-muted-foreground" />
      <div className="flex-1 min-w-0">
        <p className="text-xs text-muted-foreground mb-1">{title}</p>
        <p className="text-sm font-medium truncate">{value}</p>
      </div>
    </div>
  );
};

// Main Song Detail Component
const SongDetail = ({ id }: { id: string }) => {
  const [activeTab, setActiveTab] = useState("lyrics");

  const { data: song } = useQuery({
    queryKey: ["song", id],
    queryFn: () => http.get<SongT>(`/songs/${id}`),
    select: (data) => data.data,
    enabled: !!id,
  });

  if (!song) {
    return <div>Loading...</div>;
  }

  const totalLines = song.paragraphs.reduce(
    (acc, p) => acc + p.lines.length,
    0
  );
  const sortedParagraphs = [...song.paragraphs].sort(
    (a, b) => a.order - b.order
  );

  // const handleShare = () => {
  //   if (navigator.share) {
  //     navigator.share({
  //       title: song.title,
  //       text: `Check out this song: ${song.title}`,
  //       url: window.location.href,
  //     });
  //   }
  // };

  return (
    <div className="min-h-screen">
      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content - Lyrics */}
        <div className="lg:col-span-2 space-y-6">
          {/* Song Info Card */}
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-3xl">{song.title}</CardTitle>
                  <CardDescription className="flex items-center gap-2 text-base">
                    <Badge variant="secondary" className="uppercase">
                      {song.metadata.language}
                    </Badge>
                    {song.metadata.isChorus && (
                      <Badge variant="default">Chorus</Badge>
                    )}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>

          {song.track?.metadata.downloadUrl && (
            <Card className="p-2">
              <MusicPlayer
                audioSrc={song.track?.metadata.downloadUrl}
                title={song.title}
                artist={
                  song.metadata.author || song.metadata.composer || "Unknown"
                }
                onPlay={() => console.log("Playing:", song.title)}
                onPause={() => console.log("Paused:", song.title)}
              />
            </Card>
          )}
          {/* Tabs for Lyrics and Info */}
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="lyrics">Lyrics</TabsTrigger>
              <TabsTrigger value="structure">Structure</TabsTrigger>
            </TabsList>

            <TabsContent value="lyrics" className="mt-6">
              <Card>
                <CardContent className="pt-6">
                  <ScrollArea className="pr-4">
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

            <TabsContent value="structure" className="mt-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <BookOpen className="h-5 w-5" />
                      Song Structure
                    </h3>
                    <div className="space-y-2">
                      {sortedParagraphs.map((paragraph) => (
                        <div
                          key={paragraph.id || paragraph.order}
                          className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent/50 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-medium text-muted-foreground">
                              #{paragraph.order}
                            </span>
                            <Badge variant="outline" className="capitalize">
                              {paragraph.type || "verse"}
                            </Badge>
                          </div>
                          <span className="text-xs text-muted-foreground">
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
        </div>

        {/* Sidebar - Metadata */}

        <div className="space-y-6">
          {/* Author & Composer */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Credits</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <MetadataCard
                title="Author"
                value={song.metadata.author}
                icon={User}
              />
              <MetadataCard
                title="Composer"
                value={song.metadata.composer}
                icon={Music}
              />
            </CardContent>
          </Card>

          {/* Song Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <MetadataCard
                title="Language"
                value={song.metadata.language.toUpperCase()}
                icon={Globe}
              />
              <MetadataCard
                title="Song Number"
                value={song.metadata.number}
                icon={Hash}
              />
              {song.metadata.oldNumber && (
                <MetadataCard
                  title="Old Number"
                  value={song.metadata.oldNumber}
                  icon={Hash}
                />
              )}
              <MetadataCard
                title="Tune"
                value={song.metadata.tune}
                icon={Music}
              />
              <MetadataCard
                title="Meter"
                value={song.metadata.meter}
                icon={BookOpen}
              />
              <MetadataCard
                title="Reference"
                value={song.metadata.reference}
                icon={BookOpen}
              />
            </CardContent>
          </Card>

          {/* Statistics */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-lg border bg-card text-center">
                  <p className="text-2xl font-bold">{song.paragraphs.length}</p>
                  <p className="text-xs text-muted-foreground">Paragraphs</p>
                </div>
                <div className="p-3 rounded-lg border bg-card text-center">
                  <p className="text-2xl font-bold">{totalLines}</p>
                  <p className="text-xs text-muted-foreground">Total Lines</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tags */}
          {song.metadata.tags && song.metadata.tags.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {song.metadata.tags.map((tag, idx) => (
                    <Badge key={idx} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Dates */}
          {(song.createdAt || song.updatedAt) && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Dates</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-xs text-muted-foreground">
                {song.createdAt && (
                  <div className="flex items-center gap-2">
                    <Calendar className="h-3 w-3" />
                    <span>
                      Created: {new Date(song.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                )}
                {song.updatedAt && (
                  <div className="flex items-center gap-2">
                    <Calendar className="h-3 w-3" />
                    <span>
                      Updated: {new Date(song.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default SongDetail;
