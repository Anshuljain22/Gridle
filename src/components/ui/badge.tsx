import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-mono font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-zinc-800 text-zinc-200 hover:bg-zinc-700",
        secondary:
          "border-zinc-800 bg-zinc-900/80 text-zinc-400 hover:bg-zinc-800",
        destructive:
          "border-red-900/60 bg-red-950/60 text-red-400 hover:bg-red-900",
        outline: "text-zinc-300 border-zinc-700",
        f1: "border-red-600/50 bg-red-950/40 text-red-400",
        success:
          "border-emerald-700/60 bg-emerald-950/50 text-emerald-400 shadow-sm shadow-emerald-950/50",
        warning: "border-amber-700/60 bg-amber-950/50 text-amber-400",
        purple:
          "border-purple-700/60 bg-purple-950/50 text-purple-300 shadow-sm shadow-purple-950/50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };

