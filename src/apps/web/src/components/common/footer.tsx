import Link from "next/link";
import { env } from "@/env";
export const Footer = () => {
  return (
    <footer className="m-4 dark:bg-gray-900">
      <div className="mx-auto w-full max-w-screen-xl p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <Link
            href="https://flowbite.com/"
            className="mb-4 flex items-center space-x-3 sm:mb-0 rtl:space-x-reverse">
            <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
              {env.NEXT_PUBLIC_APP_NAME}
            </span>
          </Link>
          <ul className="mb-6 flex flex-wrap items-center text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <Link href="#showCase" className="me-4 hover:underline md:me-6">
                Jingtrei
              </Link>
            </li>
            <li>
              <Link href="#about" className="me-4 hover:underline md:me-6">
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
