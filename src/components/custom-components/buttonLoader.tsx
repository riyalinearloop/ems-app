"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonLoaderProps extends React.ComponentProps<"div"> {
  className?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

const sizeMap = {
  xs: {
    container: "w-8 h-8",
    dot: "w-1.5 h-1.5",
    radius: 12,
  },
  sm: {
    container: "w-10 h-10",
    dot: "w-2 h-2",
    radius: 16,
  },
  md: {
    container: "w-12 h-12",
    dot: "w-2.5 h-2.5",
    radius: 24,
  },
  lg: {
    container: "w-16 h-16",
    dot: "w-3 h-3",
    radius: 32,
  },
  xl: {
    container: "w-24 h-24",
    dot: "w-5 h-5",
    radius: 40,
  },
};

const ButtonLoader = React.forwardRef<HTMLDivElement, ButtonLoaderProps>(
  ({ size = "sm", className, ...props }, ref) => {
    const sizeConfig = sizeMap[size];

    return (
      <div
        ref={ref}
        className={cn("flex items-center justify-center", className)}
        {...props}
      >
        <div className={cn("relative", sizeConfig.container)}>
          {[...Array(8)].map((_, i) => {
            const angle = (i * 360) / 8;
            const x = Math.cos((angle * Math.PI) / 180) * sizeConfig.radius;
            const y = Math.sin((angle * Math.PI) / 180) * sizeConfig.radius;

            return (
              <div
                key={i}
                className={cn(
                  "absolute rounded-full bg-primary",
                  sizeConfig.dot
                )}
                style={{
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% + ${y}px)`,
                  transform: "translate(-50%, -50%)",
                  animation: "dot-pulse 1.4s ease-in-out infinite",
                  animationDelay: `${i * 0.175}s`,
                }}
              />
            );
          })}
        </div>
      </div>
    );
  }
);

ButtonLoader.displayName = "ButtonLoader";

export default ButtonLoader;

