import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";
import { Spinner } from "./spinner";

interface SpinnerContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg";
  fullScreen?: boolean;
  overlayColor?: string; // Allow customization of the overlay color
}

export function SpinnerContainer({
  size = "md",
  fullScreen = false,
  overlayColor = "bg-background/80",
  className,
  ...props
}: SpinnerContainerProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center",
        fullScreen ? `fixed inset-0 ${overlayColor}` : "h-full w-full",
        className
      )}
      {...props}
    >
      <Spinner size={size} />
    </div>
  );
}
