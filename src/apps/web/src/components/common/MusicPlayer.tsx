"use client";
import React, { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause, SkipBack, SkipForward, Volume2, Maximize2, Minimize2 } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

interface MusicPlayerProps {
  audioSrc?: string;
  title?: string;
  artist?: string;
  onPlay?: () => void;
  onPause?: () => void;
  className?: string;
}

export const MusicPlayer = ({
  audioSrc,
  title = "Song Title",
  artist = "Artist",
  onPlay,
  className,
  onPause,
}: MusicPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isExpanded, setIsExpanded] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlayPause = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      onPause?.();
    } else {
      audio.play();
      onPlay?.();
    }
    setIsPlaying(!isPlaying);
  }, [isPlaying, onPlay, onPause]);

  const handleTimeUpdate = useCallback(() => {
    const audio = audioRef.current;
    if (audio) {
      setCurrentTime(audio.currentTime);
      setDuration(audio.duration || 0);
    }
  }, []);

  const handleLoadedMetadata = useCallback(() => {
    const audio = audioRef.current;
    if (audio) {
      setDuration(audio.duration || 0);
    }
  }, []);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleSeek = (value: number[]) => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = value[0] || 0;
      setCurrentTime(value[0] || 0);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    const audio = audioRef.current;
    if (audio) {
      const newVolume = value[0];
      audio.volume = newVolume || 0;
      setVolume(newVolume || 0);
    }
  };

  const toggleExpand = () => setIsExpanded(!isExpanded);

  return (
    <div
      className={cn(
        "bg-background/50 rounded-2xl border p-4 shadow-lg backdrop-blur-sm transition-all duration-300",
        isExpanded ? "mx-auto w-full" : "",
        className
      )}>
      {/* Audio Element */}
      <audio
        ref={audioRef}
        src={audioSrc}
        preload="metadata"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
      />

      {/* Compact View */}
      {!isExpanded ? (
        <div className="flex items-center justify-between">
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <div className="from-primary to-primary/80 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br shadow-md">
              <div className="h-5 w-5 animate-pulse rounded-sm bg-white/20" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">{title}</p>
              <p className="text-muted-foreground text-xs">{artist}</p>

              <div className="space-y-3">
                <div className="text-muted-foreground flex items-center justify-between text-xs">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
                <Slider
                  value={[currentTime]}
                  max={duration}
                  step={0.1}
                  onValueChange={handleSeek}
                  className="w-full"
                />
              </div>
            </div>
          </div>

          <div className="ml-4 flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={togglePlayPause}
              className="hover:bg-primary/20 h-10 w-10 rounded-full p-0">
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleExpand}
              className="hover:bg-accent h-10 w-10 rounded-full p-0">
              <Maximize2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ) : (
        /* Expanded View */
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="from-primary to-primary/80 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br shadow-lg">
                <div className="h-7 w-7 animate-pulse rounded-lg bg-white/20" />
              </div>
              <div>
                <h3 className="text-xl font-bold">{title}</h3>
                <p className="text-muted-foreground">{artist}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleExpand}
              className="hover:bg-accent h-10 w-10 rounded-full p-0">
              <Minimize2 className="h-4 w-4" />
            </Button>
          </div>

          {/* Progress Bar */}
          <div className="space-y-3">
            <div className="text-muted-foreground flex items-center justify-between text-xs">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
            <Slider
              value={[currentTime]}
              max={duration}
              step={0.1}
              onValueChange={handleSeek}
              className="w-full"
            />
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              className="hover:bg-accent h-12 w-12 rounded-full p-0"
              disabled>
              <SkipBack className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="lg"
              disabled={!audioSrc}
              onClick={togglePlayPause}
              className="hover:bg-primary/20 h-14 w-14 rounded-full p-0 shadow-lg transition-all hover:scale-105 hover:shadow-xl">
              {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="hover:bg-accent h-12 w-12 rounded-full p-0"
              disabled>
              <SkipForward className="h-5 w-5" />
            </Button>
          </div>

          {/* Volume */}
          <div className="flex items-center gap-3">
            <Volume2 className={`h-4 w-4 ${volume === 0 ? "text-muted-foreground" : ""}`} />
            <Slider
              value={[volume]}
              max={1}
              step={0.01}
              onValueChange={handleVolumeChange}
              className="w-32 flex-1"
            />
          </div>
        </div>
      )}
    </div>
  );
};
