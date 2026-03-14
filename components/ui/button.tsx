import * as React from "react";
import { cn } from "@/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
};

export function Button({
  className,
  variant = "primary",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink disabled:cursor-not-allowed disabled:opacity-60",
        variant === "primary" &&
          "bg-ink text-white shadow-card hover:bg-black/85",
        variant === "secondary" &&
          "border border-black/10 bg-white/80 text-ink hover:bg-white",
        variant === "ghost" && "text-ink hover:bg-black/5",
        className
      )}
      {...props}
    />
  );
}
