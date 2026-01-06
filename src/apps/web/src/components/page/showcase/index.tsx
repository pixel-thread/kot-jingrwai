import Image from "next/image";

export const ShowCase = () => {
  return (
    <section
      id={"showCase"}
      className="container mx-auto flex max-w-7xl flex-col items-center justify-between gap-12 px-4 py-16 sm:px-6 sm:py-24 md:flex-row md:items-start md:gap-16 lg:px-8">
      <div className="flex w-full max-w-md justify-center sm:max-w-lg md:max-w-none md:flex-1 md:justify-start">
        <Image
          src="/assets/mockup/home-2.png"
          alt="Feature showcase"
          width={200}
          height={200}
          className="aspect-square rounded-3xl object-contain drop-shadow-2xl"
          priority
          style={{ width: "100%", height: "auto" }}
        />
      </div>

      <div className="w-full max-w-lg text-center md:flex-1 md:text-left">
        <h2 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 sm:mb-6 sm:text-4xl dark:text-white">
          Baroh ki jingdonkam jong phi, ha kawei ak App
        </h2>

        <p className="mb-6 text-base leading-relaxed text-gray-700 sm:mb-8 sm:text-lg dark:text-gray-300">
          Da kaba suk mynta phi la lah ban plie ia ka kot jingrwai ha kano kano kapor bad phi lah
          ruh ban ioh ia ki dkhot na ka bible manla ka sngi. phi la ioh ruh ka ka Jingphla ka
          Jingngeit ki Apostol. Baroh tang ha kawei ka App.
        </p>

        <ul className="mx-auto max-w-md space-y-3 text-base text-gray-800 sm:space-y-4 sm:text-lg md:mx-0 dark:text-gray-300">
          <li className="flex items-center gap-3">
            <span className="text-lg text-indigo-500 sm:text-xl dark:text-indigo-400">✅</span>
            Suk ban pyndonkam
          </li>
          <li className="flex items-center gap-3">
            <span className="text-lg text-indigo-500 sm:text-xl dark:text-indigo-400">✅</span>
            Light & dark mode
          </li>
          <li className="flex items-center gap-3">
            <span className="text-lg text-indigo-500 sm:text-xl dark:text-indigo-400">✅</span>
            Lah ban pyndonkam khlem ka internet
          </li>
        </ul>
      </div>
    </section>
  );
};
