import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { MainProvider } from "@/components/provider";
import HeadMeta from "@/components/common/Head";
import { Suspense } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning suppressContentEditableWarning>
      <HeadMeta />
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Suspense fallback={null}>
          <MainProvider>{children}</MainProvider>
        </Suspense>
      </body>
    </html>
  );
}
