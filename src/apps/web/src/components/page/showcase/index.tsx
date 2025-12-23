import Image from "next/image";

export const ShowCase = () => {
  return (
    <section
      id={"showCase"}
      className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 flex flex-col md:flex-row items-center md:items-start justify-between gap-12 md:gap-16 max-w-7xl"
    >
      <div className="flex justify-center md:justify-start md:flex-1 w-full max-w-md sm:max-w-lg md:max-w-none">
        <Image
          src="/assets/mockup/home-2.png"
          alt="Feature showcase"
          width={200}
          height={200}
          className="rounded-3xl aspect-square drop-shadow-2xl object-contain"
          priority
          style={{ width: "100%", height: "auto" }}
        />
      </div>

      <div className="md:flex-1 max-w-lg w-full text-center md:text-left">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white leading-tight mb-4 sm:mb-6">
          Baroh ki jingdonkam jong phi, ha kawei ak App
        </h2>

        <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6 sm:mb-8">
          Da kaba suk mynta phi la lah ban plie ia ka kot jingrwai ha kano kano
          kapor bad phi lah ruh ban ioh ia ki dkhot na ka bible manla ka sngi.
          phi la ioh ruh ka ka Jingphla ka Jingngeit ki Apostol. Baroh tang ha kawei ka App.
        </p>

        <ul className="space-y-3 sm:space-y-4 text-gray-800 dark:text-gray-300 text-base sm:text-lg max-w-md mx-auto md:mx-0">
          <li className="flex items-center gap-3">
            <span className="text-indigo-500 dark:text-indigo-400 text-lg sm:text-xl">
              ✅
            </span>
         Suk ban pyndonkam
          </li>
          <li className="flex items-center gap-3">
            <span className="text-indigo-500 dark:text-indigo-400 text-lg sm:text-xl">
              ✅
            </span>
           Light & dark mode
          </li>
          <li className="flex items-center gap-3">
            <span className="text-indigo-500 dark:text-indigo-400 text-lg sm:text-xl">
              ✅
            </span>
           Lah ban pyndonkam khlem ka internet
          </li>
        </ul>
      </div>
    </section>
  );
};
