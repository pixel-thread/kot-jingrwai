export const About = () => {
  return (
    <>
      <section
        id={"about"}
        className="min-h-full bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black text-gray-900 dark:text-white flex flex-col px-6"
      >
        <header className="text-center py-20">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            Shaphang jong ngi
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Ngi shna ia ka <span className="font-semibold">MyApp</span> ban
            iarap ia kito ba klet ban rah ia ka kot jingrwai lane ban buhdak
            (bookmark) ia ki jingrwai lane ban copy ia ki jingrwai. Ka jingthmu
            kan dei ban ka long simple bad ka suk ban pyndonkam.
          </p>
        </header>

        {/* Values */}
        <section className="container mx-auto max-w-4xl py-16">
          <div className="grid sm:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-semibold mb-4">
                🌍 Ka jingiohi jong ngi
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Ka technology ka long ka jingmyntoi shibun lada ngi nang kumno
                ban pyndonkam
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-4">
                🤝 Ka jingtrei jong ngi
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Ka privacy, ka performance,bad ka rukom design kadei ka jingthmu
                ba kong san tam jong ngi. Ha manla ki update ngin ialeh ban
                pynbha bad nang wanrah ki features kibi donkam ban pyndonkam.
              </p>
            </div>
          </div>
        </section>
      </section>
    </>
  );
};
