import Link from "next/link";
import { env } from "@/env";
export const Footer = () => {
  return (
    <footer className="dark:bg-gray-900 m-4">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <Link
            href="https://flowbite.com/"
            className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              {env.NEXT_PUBLIC_APP_NAME}
            </span>
          </Link>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <Link href="#showCase" className="hover:underline me-4 md:me-6">
                Jingtrei
              </Link>
            </li>
            <li>
              <Link href="#about" className="hover:underline me-4 md:me-6">
                Shaphang
              </Link>
            </li>
            <li>
              <Link href="#contact" className="hover:underline">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};
