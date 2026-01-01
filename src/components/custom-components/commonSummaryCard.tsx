"use client";

interface SummaryItem {
  label: string;
  value: string | React.ReactNode;
}

interface CommonSummaryCardProps {
  title: string;
  items: SummaryItem[];
  details?: React.ReactNode;
  bgColor?: "gray" | "amber";
  className?: string;
}

export function CommonSummaryCard({
  title,
  items,
  details,
  bgColor = "gray",
  className = "",
}: CommonSummaryCardProps) {
  const bgColorClass = bgColor === "amber" ? "bg-amber-50" : "bg-gray-50";

  return (
    <div className={`p-3 sm:p-4 ${bgColorClass} rounded-lg ${className}`}>
      <h3 className="font-medium mb-2 sm:mb-3 text-sm sm:text-base">{title}</h3>
      <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
        {items.map((item, index) => (
          <p key={index}>
            <span className="font-medium">{item.label}:</span> {item.value}
          </p>
        ))}
        {details && <div className="mt-3">{details}</div>}
      </div>
    </div>
  );
}
