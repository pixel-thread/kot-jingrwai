import Image from "next/image";
import { Sparkles, Moon, WifiOff } from "lucide-react";
import { motion } from "framer-motion";

export const ShowCase = () => {
  return (
    <section
      id="showCase"
      className="relative overflow-hidden bg-gray-50 dark:bg-black py-24 sm:py-32">

      {/* Decorative gradient blob */}
      <div className="absolute top-1/2 left-0 -z-10 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/10 blur-[100px] dark:bg-violet-600/20" />

      <div className="container relative z-10 mx-auto flex max-w-7xl flex-col items-center justify-between gap-16 px-6 md:flex-row md:items-center lg:px-8">

        {/* Image Mockup Container */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="relative flex w-full max-w-md justify-center sm:max-w-lg md:max-w-none md:flex-1 md:justify-start">
          <div className="absolute -inset-4 z-0 rounded-full bg-indigo-500/20 opacity-50 blur-3xl filter dark:bg-indigo-600/20" />
          <Image
            src="/assets/mockup/home-2.png"
            alt="Feature showcase"
            width={400}
            height={800}
            className="relative z-10 aspect-[1/2] rounded-[2.5rem] object-contain shadow-2xl ring-1 ring-gray-900/5 transition-transform duration-700 hover:scale-105 dark:ring-white/10"
            priority
            style={{ width: "auto", maxHeight: "700px" }}
            datatype="image/png"
          />
        </motion.div>

        {/* Text Content Area */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.2 },
            },
          }}
          className="w-full max-w-xl text-center md:flex-1 md:text-left">
          <motion.h2
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
            }}
            className="mb-6 bg-gradient-to-br from-gray-900 to-gray-600 bg-clip-text text-4xl font-extrabold tracking-tighter text-transparent sm:text-5xl md:text-6xl dark:from-white dark:to-gray-400">
            Baroh ki jingdonkam jong phi, ha kawei ak App
          </motion.h2>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
            }}
            className="mb-10 text-lg sm:text-xl font-medium leading-relaxed text-gray-500 dark:text-gray-400">
            Da kaba suk mynta phi la lah ban plie ia ka kot jingrwai ha kano kano kapor bad phi lah
            ruh ban ioh ia ki dkhot na ka bible manla ka sngi. phi la ioh ruh ka ka Jingphla ka
            Jingngeit ki Apostol. Baroh tang ha kawei ka App.
          </motion.p>

          <ul className="mx-auto max-w-md space-y-4 text-left md:mx-0">
            <motion.li
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
              className="liquid-interact group flex items-center gap-5 rounded-3xl border border-transparent p-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 transition-transform duration-300 group-hover:scale-110 dark:bg-indigo-500/10 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-500/20">
                <Sparkles className="h-6 w-6" />
              </div>
              <span className="text-xl font-semibold text-gray-900 dark:text-gray-200">Suk ban pyndonkam</span>
            </motion.li>

            <motion.li
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
              className="liquid-interact group flex items-center gap-5 rounded-3xl border border-transparent p-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-violet-50 text-violet-600 transition-transform duration-300 group-hover:scale-110 dark:bg-violet-500/10 dark:text-violet-400 border border-violet-100 dark:border-violet-500/20">
                <Moon className="h-6 w-6" />
              </div>
              <span className="text-xl font-semibold text-gray-900 dark:text-gray-200">Light & dark mode</span>
            </motion.li>

            <motion.li
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
              className="liquid-interact group flex items-center gap-5 rounded-3xl border border-transparent p-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 transition-transform duration-300 group-hover:scale-110 dark:bg-indigo-500/10 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-500/20">
                <WifiOff className="h-6 w-6" />
              </div>
              <span className="text-xl font-semibold text-gray-900 dark:text-gray-200">Lah ban pyndonkam khlem ka internet</span>
            </motion.li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
};
