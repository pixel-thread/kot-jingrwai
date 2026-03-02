"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { delay, motion, AnimatePresence } from "framer-motion";
import { env } from "@/env";

export const SplashScreen = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Lock body scroll while splash screen is active
    document.body.style.overflow = "hidden";

    // Hide the splash screen after the main components have hydrated and a short delay
    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.overflow = "";
    }, 1500); // 1.5 seconds loading time to show off the brand

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="splash-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white dark:bg-[#0a0a0a]">
          
          {/* Background subtle glowing orbs */}
          <div className="absolute top-1/2 left-1/2 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/10 blur-[120px] dark:bg-indigo-500/20" />
          <div className="absolute top-1/2 left-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/10 blur-[100px] dark:bg-violet-500/20" />

          {/* Core content wrapper */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="relative z-10 flex flex-col items-center gap-8">
            
            <div className="relative h-40 w-auto sm:h-56 md:h-64 lg:h-72">
              <Image 
                src="/assets/logo.png" 
                alt={`${env.NEXT_PUBLIC_APP_NAME} Logo`} 
                width={1200} 
                height={500} 
                quality={100}
                className="h-full w-auto object-contain drop-shadow-xl"
                priority
              />
            </div>

            {/* Premium Liquid loader */}
            <div className="flex flex-col items-center gap-4">
              <div className="liquid-glass relative flex h-14 w-14 items-center justify-center rounded-full border border-indigo-200/50 bg-white/50 shadow-lg backdrop-blur-md dark:border-indigo-500/30 dark:bg-black/50">
                <span className="h-6 w-6 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent dark:border-indigo-400 dark:border-t-transparent" />
              </div>
              <span className="text-sm font-semibold tracking-widest text-indigo-900/50 uppercase dark:text-indigo-200/50">
                Pynkhreh...
              </span>
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
