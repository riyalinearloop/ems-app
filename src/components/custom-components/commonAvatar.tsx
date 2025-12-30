"use client";

import * as React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*                                   TYPES                                    */
/* -------------------------------------------------------------------------- */

type Size = "sm" | "md" | "lg" | "xl";

interface BaseProps extends React.ComponentPropsWithoutRef<typeof Avatar> {
  size?: Size;
}

interface SimpleAvatarProps extends BaseProps {
  src: string;
  alt?: string;
  fallback?: React.ReactNode;
  imageClassName?: string;
  fallbackClassName?: string;
  children?: never;
}

interface ChildrenAvatarProps extends BaseProps {
  src?: never;
  fallback?: never;
  children: React.ReactNode;
}

export type CommonAvatarProps = SimpleAvatarProps | ChildrenAvatarProps;

/* -------------------------------------------------------------------------- */
/*                                SIZE MAP                                    */
/* -------------------------------------------------------------------------- */

const avatarSizeMap: Record<Size, string> = {
  sm: "h-6 w-6",
  md: "h-8 w-8",
  lg: "h-10 w-10",
  xl: "h-12 w-12",
};

/* -------------------------------------------------------------------------- */
/*                              COMMON AVATAR                                 */
/* -------------------------------------------------------------------------- */

const CommonAvatar = React.forwardRef<
  React.ElementRef<typeof Avatar>,
  CommonAvatarProps
>((props, ref) => {
  const { size = "md", className, ...rest } = props;

  return (
    <Avatar ref={ref} className={cn(avatarSizeMap[size], className)}>
      {"children" in rest ? (
        rest.children
      ) : (
        <>
          <AvatarImage
            src={rest.src}
            alt={rest.alt}
            className={rest.imageClassName}
          />
          <AvatarFallback className={cn("bg-muted", rest.fallbackClassName)}>
            {rest.fallback}
          </AvatarFallback>
        </>
      )}
    </Avatar>
  );
});

CommonAvatar.displayName = "CommonAvatar";

export default CommonAvatar;
