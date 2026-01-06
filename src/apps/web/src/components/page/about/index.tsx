export const About = () => {
  return (
    <>
      <section
        id={"about"}
        className="flex min-h-full flex-col bg-gradient-to-b from-white to-gray-50 px-6 text-gray-900 dark:from-gray-900 dark:to-black dark:text-white">
        <header className="py-20 text-center">
          <h1 className="mb-6 text-4xl font-bold sm:text-5xl">Shaphang jong ngi</h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
            Ngi shna ia ka <span className="font-semibold">MyApp</span> ban iarap ia kito ba klet
            ban rah ia ka kot jingrwai lane ban buhdak (bookmark) ia ki jingrwai lane ban copy ia ki
            jingrwai. Ka jingthmu kan dei ban ka long simple bad ka suk ban pyndonkam.
          </p>
        </header>

        {/* Values */}
        <section className="container mx-auto max-w-4xl py-16">
          <div className="grid gap-12 sm:grid-cols-2">
            <div>
              <h2 className="mb-4 text-2xl font-semibold">🌍 Ka jingiohi jong ngi</h2>
              <p className="text-gray-600 dark:text-gray-300">
                Ka technology ka long ka jingmyntoi shibun lada ngi nang kumno ban pyndonkam
              </p>
            </div>
            <div>
              <h2 className="mb-4 text-2xl font-semibold">🤝 Ka jingtrei jong ngi</h2>
              <p className="text-gray-600 dark:text-gray-300">
                Ka privacy, ka performance,bad ka rukom design kadei ka jingthmu ba kong san tam
                jong ngi. Ha manla ki update ngin ialeh ban pynbha bad nang wanrah ki features kibi
                donkam ban pyndonkam.
              </p>
            </div>
          </div>
        </section>
      </section>
    </>
  );
};
