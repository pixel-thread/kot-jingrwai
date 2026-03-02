import { Sparkles, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export const About = () => {
  return (
    <section
      id="about"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-white px-6 py-24 dark:bg-black">

      {/* Background Decorative Elements */}
      <div className="absolute inset-0 z-0 bg-[url('/assets/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-5 dark:opacity-20" />
      <div className="absolute top-1/2 left-1/2 -z-10 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/10 blur-[100px] dark:bg-indigo-600/20" />

      <motion.header
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
        className="relative z-10 w-full max-w-3xl text-center">
        <motion.h1
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
          }}
          className="mb-6 bg-gradient-to-r from-gray-900 to-gray-500 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl md:text-6xl dark:from-white dark:to-gray-400">
          Shaphang jong ngi
        </motion.h1>
        <motion.p
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
          }}
          className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-500 sm:text-xl dark:text-gray-400">
          Ngi shna ia ka <span className="font-semibold text-indigo-600 dark:text-indigo-400">MyApp</span> ban iarap ia kito ba klet
          ban rah ia ka kot jingrwai lane ban buhdak (bookmark) ia ki jingrwai lane ban copy ia ki
          jingrwai. Ka jingthmu kan dei ban ka long simple bad ka suk ban pyndonkam.
        </motion.p>
      </motion.header>

      {/* Values Grid */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.3, delayChildren: 0.2 },
          },
        }}
        className="container relative z-10 mx-auto mt-20 max-w-5xl">
        <div className="grid gap-8 sm:grid-cols-2 lg:gap-12">
          {/* Card 1 */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
            }}
            className="liquid-glass liquid-interact group relative rounded-3xl p-8">
            <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-indigo-500/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
              <Sparkles className="h-6 w-6" />
            </div>
            <h2 className="mb-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Ka jingiohi jong ngi</h2>
            <p className="leading-relaxed text-gray-500 dark:text-gray-400">
              Ka technology ka long ka jingmyntoi shibun lada ngi nang kumno ban pyndonkam ban pynsuk ia ka jingim kaba man la ka sngi.
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
            }}
            className="liquid-glass liquid-interact group relative rounded-3xl p-8">
            <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-violet-500/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h2 className="mb-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Ka jingtrei jong ngi</h2>
            <p className="leading-relaxed text-gray-500 dark:text-gray-400">
              Ka privacy, ka performance, bad ka rukom design kadei ka jingthmu ba kong san tam
              jong ngi. Ha manla ki update ngin ialeh ban pynbha bad nang wanrah ki features kibi
              donkam ban pyndonkam.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
