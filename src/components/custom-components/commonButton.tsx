import * as React from "react";
import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

interface CommonButtonProps
  extends Omit<React.ComponentProps<typeof Button>, "variant"> {
  loading?: boolean;
  loadingText?: string;
  variant?: string; // Custom variants allowed
  size?: "sm" | "default" | "lg" | "icon";
}

const CommonButton = React.forwardRef<HTMLButtonElement, CommonButtonProps>(
  (
    {
      children,
      loading = false,
      loadingText,
      disabled,
      className,
      variant = "primary",
      size = "default",
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    /* ------------------------------
    COLOR / VARIANT CLASSES
    ------------------------------ */
    const getVariantStateClasses = () => {
      switch (variant) {
        case "primary":
          return "cursor-pointer border border-transparent bg-primary text-white focus:ring-2 focus:ring-ring active:bg-primary/90 disabled:bg-primary/50 disabled:cursor-not-allowed";

        case "secondary":
          return "cursor-pointer border border-border bg-secondary text-secondary-foreground hover:bg-muted active:bg-muted/90 focus:ring-2 focus:ring-ring disabled:bg-secondary/50 disabled:cursor-not-allowed";

        case "link":
          return "cursor-pointer border border-transparent text-primary hover:underline focus:outline-none active:text-primary-hover disabled:opacity-50 disabled:cursor-not-allowed";

        default:
          return "";
      }
    };

    /* ------------------------------
       📏 SIZE VARIANT CLASSES
    ------------------------------ */
    const getSizeClasses = () => {
      switch (size) {
        case "sm":
          return "h-8 px-3 text-sm";
        case "lg":
          return "h-12 px-6 text-base";
        case "icon":
          return "h-9 w-9 p-0";
        default:
          return "h-10 px-4 text-sm"; // default size
      }
    };

    const combinedStateClasses = cn(
      getVariantStateClasses(),
      getSizeClasses(),
      className
    );

    return (
      <Button
        ref={ref}
        disabled={isDisabled}
        size={size}
        className={combinedStateClasses}
        {...props} // removed variant to avoid TS errors
      >
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {loading && loadingText ? loadingText : children}
      </Button>
    );
  }
);

CommonButton.displayName = "CommonButton";

export default CommonButton;
