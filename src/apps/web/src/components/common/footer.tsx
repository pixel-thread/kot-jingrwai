import Link from "next/link";
import Image from "next/image";
import { env } from "@/env";
export const Footer = () => {
  return (
    <footer className="liquid-glass relative mt-auto border-t">
      <div className="mx-auto w-full max-w-screen-xl px-6 py-8 md:py-12">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <Link
            href="/"
            className="group flex items-center space-x-3 transition-opacity hover:opacity-90">
             <div className="relative h-14 w-auto sm:h-16">
               <Image 
                 src="/assets/logo.png" 
                 alt={`${env.NEXT_PUBLIC_APP_NAME} Logo`} 
                 width={500} 
                 height={150} 
                 quality={100}
                 className="h-full w-auto object-contain drop-shadow-md opacity-80 transition-opacity group-hover:opacity-100 dark:opacity-90"
               />
             </div>
          </Link>
          <ul className="flex flex-wrap items-center justify-center gap-6 text-sm font-medium text-gray-500 dark:text-gray-400">
            <li>
              <Link
                href="#showCase"
                className="transition-colors hover:text-indigo-600 dark:hover:text-indigo-400">
                Jingtrei
              </Link>
            </li>
            <li>
              <Link
                href="#about"
                className="transition-colors hover:text-indigo-600 dark:hover:text-indigo-400">
                Shaphang
              </Link>
            </li>
            <li>
              <Link
                href="#contact"
                className="transition-colors hover:text-indigo-600 dark:hover:text-indigo-400">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200/50 sm:mx-auto lg:my-8 dark:border-white/10" />
        <span className="block text-center text-sm text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()}{" "}
          <Link href="/" className="hover:underline">
            {env.NEXT_PUBLIC_APP_NAME}
          </Link>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};
