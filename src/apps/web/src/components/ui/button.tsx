import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex liquid-interact liquid-ripple items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "liquid-glass border-transparent bg-indigo-600/90 text-white hover:bg-indigo-600 dark:bg-indigo-500/80 dark:hover:bg-indigo-500 shadow-[0_8px_32px_0_rgba(79,70,229,0.2)]",
        destructive:
          "liquid-glass border-transparent bg-red-600/90 text-white hover:bg-red-600 focus-visible:ring-red-500/20 dark:focus-visible:ring-red-500/40 dark:bg-red-500/80 dark:hover:bg-red-500 shadow-[0_8px_32px_0_rgba(220,38,38,0.2)]",
        outline:
          "liquid-glass border border-gray-200/50 bg-white/40 shadow-sm hover:bg-white/60 hover:text-indigo-600 dark:border-white/10 dark:bg-black/40 dark:hover:bg-white/10 dark:hover:text-indigo-400",
        secondary: "liquid-glass bg-violet-100/50 text-violet-900 border-transparent hover:bg-violet-200/50 dark:bg-violet-900/40 dark:text-violet-100 dark:hover:bg-violet-800/40",
        ghost: "hover:bg-indigo-50/50 hover:text-indigo-600 dark:hover:bg-indigo-500/10 dark:hover:text-indigo-400",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
