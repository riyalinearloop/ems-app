"use client";

import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CommonSelectInputProps
  extends React.ComponentProps<typeof SelectPrimitive.Root> {
  label?: string;
  placeholder?: string;
  options: { label: string; value: string }[];
  size?: "sm" | "default";
  className?: string;
  error?: string;
}

export function CommonSelectInput({
  label,
  placeholder = "Select Option",
  options,
  size = "default",
  className,
  error,
  ...props
}: CommonSelectInputProps) {
  return (
    <div className="w-full flex flex-col gap-1">
      {/* Label */}
      {label && <p className="text-sm font-medium">{label}</p>}

      {/* Select */}
      <SelectPrimitive.Root {...props}>
        <SelectPrimitive.Trigger
          className={cn(
            "border-input flex items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm shadow-sm outline-none focus:ring-2 focus:ring-ring disabled:opacity-50",
            size === "default" && "h-10",
            size === "sm" && "h-8",
            error && "border-red-500",
            className
          )}
        >
          <SelectPrimitive.Value placeholder={placeholder} />
          <SelectPrimitive.Icon>
            <ChevronDownIcon className="size-4 opacity-50" />
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>

        {/* Dropdown */}
        <SelectPrimitive.Portal>
          <SelectPrimitive.Content
            className={cn(
              "bg-popover text-popover-foreground z-50 rounded-md border shadow-md overflow-hidden animate-in fade-in",
              "relative"
            )}
          >
            {/* Scroll Up */}
            <SelectPrimitive.ScrollUpButton className="flex items-center justify-center py-1">
              <ChevronUpIcon className="size-4" />
            </SelectPrimitive.ScrollUpButton>

            {/* Items */}
            <SelectPrimitive.Viewport className="p-1">
              {options.map((opt) => (
                <SelectPrimitive.Item
                  key={opt.value}
                  value={opt.value}
                  className={cn(
                    "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 pr-8 text-sm outline-none",
                    "data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground"
                  )}
                >
                  <SelectPrimitive.ItemIndicator className="absolute right-2 flex items-center">
                    <CheckIcon className="size-4" />
                  </SelectPrimitive.ItemIndicator>
                  <SelectPrimitive.ItemText>
                    {opt.label}
                  </SelectPrimitive.ItemText>
                </SelectPrimitive.Item>
              ))}
            </SelectPrimitive.Viewport>

            {/* Scroll Down */}
            <SelectPrimitive.ScrollDownButton className="flex items-center justify-center py-1">
              <ChevronDownIcon className="size-4" />
            </SelectPrimitive.ScrollDownButton>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>

      {/* Error message */}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
