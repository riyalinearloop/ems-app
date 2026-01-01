"use client";

import { Check } from "lucide-react";
import type { SignedOutPouch } from "@/components/data/pouch-management";

interface CommonPouchCardProps {
  pouch: SignedOutPouch;
  isSelected: boolean;
  colorScheme?: "blue" | "green" | "amber";
  showSignedOutInfo?: boolean;
  onClick: () => void;
}

export function CommonPouchCard({
  pouch,
  isSelected,
  colorScheme = "blue",
  showSignedOutInfo = false,
  onClick,
}: CommonPouchCardProps) {
  const colorClasses = {
    blue: {
      selected: "border-blue-500 bg-blue-50",
      check: "text-blue-500",
    },
    green: {
      selected: "border-green-500 bg-green-50",
      check: "text-green-500",
    },
    amber: {
      selected: "border-amber-500 bg-amber-50",
      check: "text-amber-500",
    },
  };

  const colors = colorClasses[colorScheme];

  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        text-left p-3 sm:p-4 border rounded-lg transition-colors w-full
        ${isSelected ? colors.selected : "border-gray-200 hover:bg-gray-50"}
      `}
    >
      <div className="flex justify-between items-center">
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm sm:text-base text-gray-900">
            {pouch.pouchNumber}
          </p>
          {showSignedOutInfo && (
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              Signed out by: {pouch.signedOutBy} on {pouch.signedOutDate}
            </p>
          )}
          <div className="flex flex-wrap gap-1 sm:gap-1.5 mt-1 sm:mt-2">
            {pouch.medications.map((med, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
              >
                {med.name} {med.dosage || ""}: {med.quantity}
              </span>
            ))}
          </div>
        </div>
        {isSelected && (
          <Check
            className={`w-4 h-4 sm:w-5 sm:h-5 ${colors.check} flex-shrink-0 ml-2`}
          />
        )}
      </div>
    </button>
  );
}
