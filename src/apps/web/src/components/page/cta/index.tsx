import { Button } from "@/components/ui/button";
import {
  LucideGithub as Github,
  LucideInstagram as Instagram,
  LucideFacebook as Facebook,
} from "lucide-react";
import { motion } from "framer-motion";

export const CTA = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-indigo-500 to-violet-600 py-24 text-center text-white dark:from-indigo-900 dark:via-indigo-800 dark:to-violet-900">
      <div className="absolute inset-0 bg-[url('/assets/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20" />
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.2 },
          },
        }}
        className="container relative z-10 mx-auto px-6 max-w-3xl">
        <motion.h2 variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="text-4xl font-extrabold tracking-tight sm:text-5xl">Connect bad ngi</motion.h2>
        <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="mt-6 text-lg sm:text-xl text-indigo-100">Follow ia ngi ha social media ban ioh update bad kiwei kiwei.</motion.p>
        <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            variant="outline"
            size="lg"
            className="liquid-glass liquid-interact liquid-ripple flex w-full sm:w-auto items-center gap-3 rounded-full border-white/20 px-8 py-6 text-base font-semibold text-white shadow-xl transition-all">
            <Facebook className="h-5 w-5" />
            Facebook
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="liquid-glass liquid-interact liquid-ripple flex w-full sm:w-auto items-center gap-3 rounded-full border-white/20 px-8 py-6 text-base font-semibold text-white shadow-xl transition-all">
            <Instagram className="h-5 w-5" />
            Instagram
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="liquid-glass liquid-interact liquid-ripple flex w-full sm:w-auto items-center gap-3 rounded-full border-white/20 px-8 py-6 text-base font-semibold text-white shadow-xl transition-all">
            <Github className="h-5 w-5" />
            Github
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
};
