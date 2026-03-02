"use client";
import { useState } from "react";
import { env } from "@/env";
import Link from "next/link";
import Image from "next/image";
import { SongSearchInput } from "../page/songs/SongSearchInput";

export const NavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="fixed left-0 right-0 top-4 z-50 mx-auto w-[95%] max-w-7xl transition-all duration-300">
      <nav className="liquid-glass flex items-center justify-between rounded-full border border-indigo-200/40 bg-gradient-to-r from-indigo-100/50 via-white/40 to-blue-50/50 px-4 py-3 shadow-[0_8px_32px_0_rgba(79,70,229,0.1)] backdrop-blur-3xl transition-all duration-300 md:px-6 dark:border-indigo-500/20 dark:from-indigo-950/60 dark:via-gray-900/60 dark:to-blue-950/40">

        <div className="flex w-1/2 md:w-1/3 items-center justify-start">
          <Link href="/" className="liquid-interact group flex items-center gap-3 transition-opacity hover:opacity-90">
             <div className="relative h-10 w-auto sm:h-12">
               <Image 
                 src="/assets/logo.png" 
                 alt={`${env.NEXT_PUBLIC_APP_NAME} Logo`} 
                 width={500} 
                 height={150} 
                 quality={100}
                 className="h-full w-auto object-contain drop-shadow-md"
                 priority
               />
             </div>
          </Link>
        </div>

        {/* Center: Search Input */}
        <div className="hidden flex-1 items-center justify-center lg:flex">
          <div className="w-full max-w-md">
            <SongSearchInput />
          </div>
        </div>

        {/* Right: Navigation Links */}
        <div className="hidden md:flex md:w-1/3 md:items-center md:justify-end">
          <ul className="flex items-center gap-1 lg:gap-2">
            <li>
              <Link
                href="/"
                className="flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold text-indigo-700 transition-colors hover:bg-indigo-600/10 dark:text-indigo-300 dark:hover:bg-indigo-400/20"
                aria-current="page">
                Home
              </Link>
            </li>
            <li>
              <Link
                href="#about"
                className="flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-indigo-600/10 hover:text-indigo-700 dark:text-gray-300 dark:hover:bg-indigo-400/20 dark:hover:text-indigo-300">
                Shaphang
              </Link>
            </li>
            <li>
              <Link
                href="#showCase"
                className="flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-indigo-600/10 hover:text-indigo-700 dark:text-gray-300 dark:hover:bg-indigo-400/20 dark:hover:text-indigo-300">
                Jingtrei
              </Link>
            </li>
            <li>
              <Link
                href="#contact"
                className="flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-indigo-600/10 hover:text-indigo-700 dark:text-gray-300 dark:hover:bg-indigo-400/20 dark:hover:text-indigo-300">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex w-1/2 justify-end md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl p-2 text-gray-500 transition-all hover:bg-indigo-600/10 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 dark:text-gray-400 dark:hover:bg-indigo-400/20"
            aria-expanded={isMobileMenuOpen}>
            <span className="sr-only">Toggle mobile menu</span>
            {isMobileMenuOpen ? (
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="liquid-glass absolute left-0 right-0 top-full mt-2 flex flex-col gap-4 rounded-3xl border border-indigo-200/40 bg-gradient-to-b from-white/60 to-blue-50/60 p-5 shadow-xl backdrop-blur-3xl md:hidden dark:border-indigo-500/20 dark:from-gray-900/80 dark:to-blue-950/80">
          <div className="w-full">
            <SongSearchInput />
          </div>
          <ul className="flex flex-col gap-2">
            <li>
              <Link
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block rounded-2xl px-4 py-3 text-base font-semibold text-gray-800 transition-colors hover:bg-indigo-600/10 dark:text-gray-200 dark:hover:bg-indigo-400/20">
                Home
              </Link>
            </li>
            <li>
              <Link
                href="#about"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block rounded-2xl px-4 py-3 text-base font-medium text-gray-700 transition-colors hover:bg-indigo-600/10 dark:text-gray-300 dark:hover:bg-indigo-400/20">
                Shaphang
              </Link>
            </li>
            <li>
              <Link
                href="#showCase"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block rounded-2xl px-4 py-3 text-base font-medium text-gray-700 transition-colors hover:bg-indigo-600/10 dark:text-gray-300 dark:hover:bg-indigo-400/20">
                Jingtrei
              </Link>
            </li>
            <li>
              <Link
                href="#contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block rounded-2xl px-4 py-3 text-base font-medium text-gray-700 transition-colors hover:bg-indigo-600/10 dark:text-gray-300 dark:hover:bg-indigo-400/20">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};
