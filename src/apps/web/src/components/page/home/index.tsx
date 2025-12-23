"use client";

import { buttonVariants } from "@/components/ui/button";
import { env } from "@/env";
import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowRightIcon, DownloadIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import http from "@/utils/http";
import { UPDATE_ENDPOINT } from "@/lib/constants/endpoints/update";
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
    <div className="min-h-screen bg-background dark:text-white flex flex-col justify-center">
      <section className="container mx-auto h-full flex flex-col md:flex-row items-center justify-between px-6 py-40 md:py-16 gap-10 md:gap-16">
        {/* Text content */}
        <div className="max-w-xl md:max-w-2xl text-center md:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold leading-tight tracking-tight">
            Ngi wanrah sha phi ia ka {""}
            <span className="text-indigo-600">{env.NEXT_PUBLIC_APP_NAME}</span>
          </h1>
          <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-md md:max-w-none mx-auto md:mx-0">
            Ka app mobile ka ban iarap ia phi haba phi donkam ia ka kot
            jingrwai, kaba suk bad kloi ban pyndonkam lada phi klet ban rah ia
            ka kot jingrwai.
          </p>

          <div className="flex flex-col md:flex-row mt-4 w-full gap-2 md:w-auto md:justify-start justify-center items-center">
            {data?.downloadUrl && (
              <div className="w-full md:w-auto">
                <a
                  className={cn(
                    buttonVariants({
                      size: "lg",
                      className: "py-6 w-full md:w-auto",
                    }),
                  )}
                  href={data?.downloadUrl}
                >
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
                      className: "py-6 w-full md:w-auto",
                    }),
                  )}
                  href={"/admin"}
                >
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
                    className: "py-6 w-full md:w-auto",
                  }),
                )}
                href={"/songs"}
              >
                Continue online
                <ArrowRightIcon />
              </Link>
            </div>
          </div>
        </div>

        {/* App mockup */}
        <div className="flex justify-center md:justify-end w-full max-w-md md:max-w-lg mx-auto">
          <Image
            src={images[imageIndex]}
            alt="Ka dur pynshai jong ka App"
            width={600}
            height={1200}
            priority
            style={{
              maxHeight: 900,
              width: "auto",
              height: "auto",
            }}
            className="drop-shadow-2xl rounded-2xl"
          />
        </div>
      </section>
    </div>
  );
}
