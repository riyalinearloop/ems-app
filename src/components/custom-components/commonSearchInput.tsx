"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import debounce from "debounce-promise";


interface CommonSearchInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  register?: any; // react-hook-form register
  handleSearch: (d?: any) => void;
}

export function CommonSearchInput({
  label,
  id,
  placeholder = "Search...",
  register,
  error,
  className,
  handleSearch,
  ...props
}: CommonSearchInputProps) {

  const handleLoadOptions = debounce(handleSearch, 1000);
  return (
    <div className="w-full">
      {/* Label */}
      {label && (
        <label
          htmlFor={id}
          className="text-sm font-medium text-gray-700 dark:text-white"
        >
          {label}
        </label>
      )}

      {/* Search Input Wrapper */}
      <div className="relative mt-1">
        {/* Search Icon */}
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-300" />

        <input
          {...(register ? register(id) : {})}
          id={id}
          type="search"
          placeholder={placeholder}
          className={cn(
            "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full rounded-md border bg-transparent pl-10 pr-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none",
            "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
            error ? "border-red-500 focus:ring-red-500" : "",
            className
          )}
          {...props}
          onChange={(e: any) => {
            if (typeof handleSearch === "function") {
                handleLoadOptions(e);
            }
        }}
        />
      </div>

      {/* Error */}
      {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
    </div>
  );
}
