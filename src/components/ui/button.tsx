import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none",
  {
    variants: {
      variant: {
        default:
          "bg-zinc-100 text-zinc-900 hover:bg-white shadow active:scale-[0.98]",
        f1: "bg-red-600 hover:bg-red-500 text-white font-mono font-bold shadow-lg shadow-red-950/60 border border-red-500/40 active:scale-[0.98]",
        destructive:
          "bg-red-950/80 text-red-300 border border-red-800/80 hover:bg-red-900 shadow-sm",
        outline:
          "border border-zinc-800 bg-zinc-950/60 hover:bg-zinc-900 text-zinc-200 hover:text-white hover:border-zinc-700",
        secondary:
          "bg-zinc-800 text-zinc-100 hover:bg-zinc-700 border border-zinc-700/50",
        ghost: "hover:bg-zinc-900 text-zinc-400 hover:text-zinc-100",
        link: "text-red-500 underline-offset-4 hover:underline",
        purple:
          "bg-purple-950/80 text-purple-300 border border-purple-800/80 hover:bg-purple-900 shadow-sm",
        emerald:
          "bg-emerald-600 hover:bg-emerald-500 text-white font-mono font-bold shadow-lg shadow-emerald-950/60 active:scale-[0.98]",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-lg px-3 text-xs",
        lg: "h-12 rounded-2xl px-6 text-base",
        icon: "h-10 w-10 p-0",
        xs: "h-7 rounded-md px-2 text-[11px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

