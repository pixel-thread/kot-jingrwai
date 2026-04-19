"use client";

import { About } from "@/components/page/about";
import { CTA } from "@/components/page/cta";
import Home from "@/components/page/home";
import { ShowCase } from "@/components/page/showcase";
import { NavBar } from "@/components/common/header";
import { Footer } from "@/components/common/footer";

export default function page() {
  return (
    <>
      <NavBar />
      <Home />
      <CTA />
      <About />
      <ShowCase />
      <Footer />
    </>
  );
}
