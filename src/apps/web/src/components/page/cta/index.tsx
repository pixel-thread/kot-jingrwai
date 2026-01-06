import { Button } from "@/components/ui/button";
import {
  LucideGithub as Github,
  LucideInstagram as Instagram,
  LucideFacebook as Facebook,
} from "lucide-react";

export const CTA = () => {
  return (
    <section className="bg-indigo-500 py-20 text-center text-white">
      <h2 className="text-3xl font-bold md:text-4xl">Connect bad ngi</h2>
      <p className="mt-4 text-lg">Follow ia ngi ha social media ban ioh update bad kiwei kiwei.</p>
      <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
        <Button
          variant={"secondary"}
          className="flex items-center gap-2 rounded-xl px-6 py-3 shadow-lg">
          <Facebook />
          Facebook
        </Button>
        <Button
          variant="secondary"
          className="flex items-center gap-2 rounded-xl px-6 py-3 shadow-lg">
          <Instagram />
          Instagram
        </Button>
        <Button
          variant={"secondary"}
          className="flex items-center gap-2 rounded-xl px-6 py-3 shadow-lg">
          <Github />
          Github
        </Button>
      </div>
    </section>
  );
};
