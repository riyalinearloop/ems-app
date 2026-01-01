"use client";

interface CommonStepContentWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export function CommonStepContentWrapper({
  children,
  className = "",
}: CommonStepContentWrapperProps) {
  return (
    <div
      data-step-content
      className={`flex-1 min-h-0 overflow-y-auto px-4 sm:px-6 ${className}`}
      style={{
        maxHeight: "calc(90vh - 250px)",
        minHeight: "200px",
      }}
    >
      {children}
    </div>
  );
}
