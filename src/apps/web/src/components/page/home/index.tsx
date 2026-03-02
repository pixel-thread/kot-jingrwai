"use client";

import { env } from "@/env";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { ArrowRightIcon, DownloadIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import http from "@/utils/http";
import { UPDATE_ENDPOINTS } from "@repo/constants";
import { AppVersion } from "@/lib/database/prisma/generated/prisma";
import Link from "next/link";
import { motion } from "framer-motion";

import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const images = useMemo(() => ["/assets/mockup/home-1.png", "/assets/mockup/home-2.png"], []);
  const [imageIndex, setImageIndex] = useState(0);

  const { data, isFetching } = useQuery({
    queryKey: ["latest-update"],
    queryFn: () => http.get<AppVersion>(UPDATE_ENDPOINTS.GET_LATEST_UPDATE),
    select: (data) => data.data,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, scale: 1.02, filter: "blur(10px)" }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex min-h-[100dvh] w-full flex-col items-center justify-center overflow-hidden bg-[#fbfbfd] pt-20 dark:bg-[#050505] dark:text-white">
      {/* 1. Fluid Ambient Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <motion.div
          animate={{ x: [0, 40, 0], y: [0, -40, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-[20%] -top-[10%] h-[70vw] w-[70vw] rounded-full bg-indigo-400/10 blur-[100px] sm:h-[50vw] sm:w-[50vw] dark:bg-indigo-600/10" />
        <motion.div
          animate={{ x: [0, -30, 0], y: [0, 50, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-[10%] top-[30%] h-[60vw] w-[60vw] rounded-full bg-violet-400/10 blur-[100px] sm:h-[40vw] sm:w-[40vw] dark:bg-violet-600/10" />
        <div className="absolute bottom-0 left-1/2 h-[50vw] w-[50vw] -translate-x-1/2 translate-y-1/2 rounded-full bg-blue-400/10 blur-[120px] dark:bg-blue-600/10" />
      </div>

      <section className="container relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center justify-center gap-16 px-6 py-12 md:flex-row md:justify-between md:gap-10 lg:px-12">
        {/* 2. Text Content Left */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], staggerChildren: 0.2 }}
          className="flex w-full max-w-2xl flex-col items-center text-center md:w-1/2 md:items-start md:text-left">

          {/* Glass Update Pill */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="liquid-glass mb-8 inline-flex items-center rounded-full border border-indigo-200/50 bg-white/30 px-5 py-2 text-sm font-bold tracking-wide text-indigo-700 shadow-sm backdrop-blur-md dark:border-indigo-500/30 dark:bg-black/20 dark:text-indigo-300">
            <span className="mr-3 relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-500 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-500"></span>
            </span>
            KOT JINGRWAI v1.0
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="text-5xl font-black leading-[1.05] tracking-tighter text-gray-900 sm:text-6xl md:text-[5rem] lg:text-[6rem] dark:text-white">
            Ngi wanrah sha phi ia ka
            <span className="mt-3 block bg-gradient-to-r from-indigo-500 via-violet-500 to-blue-500 bg-clip-text text-transparent drop-shadow-sm dark:from-indigo-400 dark:via-violet-400 dark:to-blue-400">
              {env.NEXT_PUBLIC_APP_NAME}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            className="mx-auto mt-8 max-w-xl text-lg font-medium leading-relaxed text-gray-500/90 sm:text-xl md:mx-0 dark:text-gray-400">
            Ka app mobile ka ban iarap ia phi haba phi donkam ia ka kot jingrwai, kaba suk bad kloi
            ban pyndonkam lada phi klet ban rah ia ka kot jingrwai.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
            className="mt-12 flex w-full flex-col items-center justify-center gap-4 sm:flex-row md:justify-start">

            {isFetching ? (
              <Skeleton className="h-16 w-full rounded-2xl sm:w-[220px]" />
            ) : data?.downloadUrl ? (
              <div className="w-full sm:w-auto">
                <a
                  className="liquid-ripple liquid-interact group relative flex w-full items-center justify-center overflow-hidden rounded-2xl bg-gray-900 px-8 py-5 text-base font-bold text-white shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] transition-all active:scale-[0.98] active:filter-none sm:w-auto dark:bg-white dark:text-black dark:shadow-[0_10px_40px_-10px_rgba(255,255,255,0.3)]"
                  href={data?.downloadUrl}>
                  <div className="absolute inset-0 -z-10 bg-gradient-to-r from-indigo-500 to-violet-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <DownloadIcon className="mr-3 h-5 w-5 transition-transform group-hover:-translate-y-1" />
                  Download App
                </a>
              </div>
            ) : null}

            <div className="w-full sm:w-auto">
              <Link
                className="liquid-glass liquid-interact liquid-ripple group flex w-full items-center justify-center rounded-2xl border border-gray-200/50 bg-black/5 px-8 py-5 text-base font-bold text-gray-800 transition-all active:scale-[0.98] active:brightness-90 sm:w-auto dark:border-white/10 dark:bg-white/5 dark:text-gray-200"
                href={"/songs"}>
                Continue online
                <ArrowRightIcon className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>
        </motion.div>

        {/* 3. Liquid Glass App Display Case */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, x: 20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex w-full max-w-md justify-center md:w-1/2 md:max-w-none md:justify-end">

          <div className="liquid-glass liquid-interact relative flex items-center justify-center rounded-[3rem] p-4 shadow-[0_20px_80px_-20px_rgba(79,70,229,0.3)] transition-transform duration-700 hover:-translate-y-4 hover:rotate-1 sm:p-6 dark:shadow-[0_40px_100px_-20px_rgba(79,70,229,0.5)]">
            {/* Inner dynamic highlight */}
            <div className="absolute inset-0 z-0 rounded-[3rem] bg-gradient-to-tr from-white/10 to-white/40 opacity-50 dark:from-white/5 dark:to-white/10" />

            <Image
              src={images[imageIndex] || ""}
              alt="Ka dur pynshai jong ka App"
              width={600}
              height={1200}
              priority
              style={{
                maxHeight: 800,
                width: "auto",
                height: "auto",
              }}
              className="relative z-10 w-[240px] rounded-[2.25rem] ring-4 ring-black/5 sm:w-[280px] lg:w-[320px] dark:ring-white/10"
            />
          </div>
        </motion.div>
      </section>
    </motion.div>
  );
}
