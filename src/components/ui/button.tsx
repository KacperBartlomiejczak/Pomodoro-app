import clsx from "clsx";
import { cn } from "@/lib/utils";

type variant = "primary" | "secondary";
interface ButtonProps {
  children: React.ReactNode;
  variant?: variant;
  className?: string;
}

export default function Button({
  children,
  variant = "primary",
  className,
  ...props
}: ButtonProps) {
  let classes = cn(
    "text-white rounded-md px-4 py-1",
    {
      "bg-button text-lg lg:text-xl hover:bg-button/70 ": variant === "primary",
      "bg-cards text-base lg:text-lg hover:bg-cards/70 ":
        variant === "secondary",
    },
    "transition-colors duration-300 cursor-pointer"
  );

  return (
    <button className={cn(classes, className)} {...props}>
      {children}
    </button>
  );
}
