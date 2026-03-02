"use client";

import { motion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, scale: 0.98, filter: "blur(8px)" }}
      transition={{ 
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1], // Custom liquid curve 
      }}
      className="flex min-h-[100dvh] flex-col"
    >
      {children}
    </motion.main>
  );
}
