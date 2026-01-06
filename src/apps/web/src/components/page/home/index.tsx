"use client";

import { buttonVariants } from "@/components/ui/button";
import { env } from "@/env";
import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowRightIcon, DownloadIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import http from "@/utils/http";
import { UPDATE_ENDPOINT } from "@repo/constants";
import { AppVersion } from "@/lib/database/prisma/generated/prisma";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/auth/useAuth";

export default function Home() {
  const { isSuperAdmin } = useAuth();
  const images = ["/assets/mockup/home-1.png", "/assets/mockup/home-2.png"];
  const [imageIndex, setImageIndex] = useState(0);

  const { data, isFetching } = useQuery({
    queryKey: ["latest-update"],
    queryFn: () => http.get<AppVersion>(UPDATE_ENDPOINT.GET_LATEST_UPDATE),
    select: (data) => data.data,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="bg-background flex min-h-screen flex-col justify-center dark:text-white">
      <section className="container mx-auto flex h-full flex-col items-center justify-between gap-10 px-6 py-40 md:flex-row md:gap-16 md:py-16">
        {/* Text content */}
        <div className="max-w-xl text-center md:max-w-2xl md:text-left">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-6xl">
            Ngi wanrah sha phi ia ka {""}
            <span className="text-indigo-600">{env.NEXT_PUBLIC_APP_NAME}</span>
          </h1>
          <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-gray-600 sm:mt-6 sm:text-lg md:mx-0 md:max-w-none md:text-xl dark:text-gray-300">
            Ka app mobile ka ban iarap ia phi haba phi donkam ia ka kot jingrwai, kaba suk bad kloi
            ban pyndonkam lada phi klet ban rah ia ka kot jingrwai.
          </p>

          <div className="mt-4 flex w-full flex-col items-center justify-center gap-2 md:w-auto md:flex-row md:justify-start">
            {data?.downloadUrl && (
              <div className="w-full md:w-auto">
                <a
                  className={cn(
                    buttonVariants({
                      size: "lg",
                      className: "w-full py-6 md:w-auto",
                    })
                  )}
                  href={data?.downloadUrl}>
                  {isFetching ? (
                    "Downloading..."
                  ) : (
                    <>
                      <DownloadIcon className="mr-2 font-bold" size={24} />
                      Download Apk
                    </>
                  )}
                </a>
              </div>
            )}

            {isSuperAdmin && (
              <div className="w-full md:w-auto">
                <Link
                  className={cn(
                    buttonVariants({
                      size: "lg",
                      variant: "secondary",
                      className: "w-full py-6 md:w-auto",
                    })
                  )}
                  href={"/admin"}>
                  Dashboard
                  <ArrowRightIcon />
                </Link>
              </div>
            )}
            <div className="w-full md:w-auto">
              <Link
                className={cn(
                  buttonVariants({
                    size: "lg",
                    variant: "secondary",
                    className: "w-full py-6 md:w-auto",
                  })
                )}
                href={"/songs"}>
                Continue online
                <ArrowRightIcon />
              </Link>
            </div>
          </div>
        </div>

        {/* App mockup */}
        <div className="mx-auto flex w-full max-w-md justify-center md:max-w-lg md:justify-end">
          <Image
            src={images[imageIndex] || ""}
            alt="Ka dur pynshai jong ka App"
            width={600}
            height={1200}
            priority
            style={{
              maxHeight: 900,
              width: "auto",
              height: "auto",
            }}
            className="rounded-2xl drop-shadow-2xl"
          />
        </div>
      </section>
    </div>
  );
}
