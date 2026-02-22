import { env } from "@/env";
import Link from "next/link";
import { SongSearchInput } from "../page/songs/SongSearchInput";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";

export const NavBar = () => {
  return (
    <nav className="bg-background/40 fixed left-0 top-0 z-20 w-full border-gray-200 shadow-sm backdrop-blur">
      <div className="mx-auto flex flex-wrap items-center justify-between p-4">
        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center whitespace-nowrap text-2xl font-bold uppercase">
            {env.NEXT_PUBLIC_APP_NAME}
          </span>
        </Link>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 md:hidden dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false">
          <span className="sr-only">Plie menu bah</span>
          <svg
            className="h-5 w-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14">
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div className="hidden w-full max-w-lg lg:flex">
          <SongSearchInput />
        </div>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="mt-4 flex flex-col rounded-lg border border-gray-100 p-4 font-medium md:mt-0  md:flex-row md:space-x-8 md:border-0 md:p-0 rtl:space-x-reverse dark:border-gray-700">
            <li>
              <Link
                href="/"
                className="block rounded-sm px-3 py-2 text-white  md:p-0 md:text-blue-700 dark:text-white md:dark:text-blue-500"
                aria-current="page">
                Home
              </Link>
            </li>
            <li>
              <Link
                href="#about"
                className="block rounded-sm px-3 py-2 text-gray-900 hover:bg-gray-100 md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent md:dark:hover:text-blue-500">
                Shaphang
              </Link>
            </li>
            <li>
              <Link
                href="#showCase"
                className="block rounded-sm px-3 py-2 text-gray-900 hover:bg-gray-100 md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent md:dark:hover:text-blue-500">
                Jingtrei
              </Link>
            </li>
            <li>
              <Link
                href="#contact"
                className="block rounded-sm px-3 py-2 text-gray-900 hover:bg-gray-100 md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent md:dark:hover:text-blue-500">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
