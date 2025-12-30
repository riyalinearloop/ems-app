"use client";

import * as React from "react";
import { Loader2Icon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CommonSpinnerProps
  extends React.ComponentProps<typeof Loader2Icon> {
  size?: "xs" | "sm" | "md" | "lg";
}

const spinnerSizeMap = {
  xs: "size-3",
  sm: "size-4",
  md: "size-5",
  lg: "size-6",
};

const CommonSpinner = React.forwardRef<SVGSVGElement, CommonSpinnerProps>(
  ({ size = "sm", className, ...props }, ref) => {
    return (
      <Loader2Icon
        ref={ref}
        role="status"
        aria-label="Loading"
        className={cn(
          "animate-spin text-current",
          spinnerSizeMap[size],
          className
        )}
        {...props}
      />
    );
  }
);

CommonSpinner.displayName = "CommonSpinner";

export default CommonSpinner;
