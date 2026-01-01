"use client";

import { Camera } from "lucide-react";

interface CommonWitnessInputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  onScanQR?: () => void;
  omitWitness?: boolean;
  onOmitWitnessChange?: (omit: boolean) => void;
  omitLabel?: string;
  error?: string;
  colorScheme?: "blue" | "green" | "amber";
  required?: boolean;
}

export function CommonWitnessInput({
  label = "Witness Signature/ID",
  placeholder = "Enter witness name or scan QR code",
  value,
  onChange,
  onScanQR,
  omitWitness = false,
  onOmitWitnessChange,
  omitLabel = "Omit witness signature",
  error,
  colorScheme = "blue",
  required = false,
}: CommonWitnessInputProps) {
  const focusRingColor = {
    blue: "focus:ring-blue-500 focus:border-blue-500",
    green: "focus:ring-green-500 focus:border-green-500",
    amber: "focus:ring-amber-500 focus:border-amber-500",
  }[colorScheme];

  const checkboxColor = {
    blue: "text-blue-600 focus:ring-blue-500",
    green: "text-green-600 focus:ring-green-500",
    amber: "text-amber-600 focus:ring-amber-500",
  }[colorScheme];

  return (
    <div className="space-y-4">
      {/* Omit Witness Checkbox */}
      {onOmitWitnessChange && (
        <div className="flex items-center space-x-2 sm:space-x-3">
          <input
            type="checkbox"
            id="omitWitness"
            checked={omitWitness}
            onChange={(e) => onOmitWitnessChange(e.target.checked)}
            className={`h-4 w-4 ${checkboxColor} border-gray-300 rounded`}
          />
          <label
            htmlFor="omitWitness"
            className="text-xs sm:text-sm font-medium text-gray-700"
          >
            {omitLabel}
          </label>
        </div>
      )}

      {/* Witness Input */}
      {!omitWitness && (
        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
            {label} {required && <span className="text-red-500">*</span>}
          </label>
          <div className="space-y-2 sm:space-y-3">
            <input
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              required={required && !omitWitness}
              className={`w-full p-2 sm:p-3 border rounded-lg ${focusRingColor} text-sm sm:text-base ${
                error ? "border-red-300" : "border-gray-300"
              }`}
            />
            {error && (
              <p className="text-xs sm:text-sm text-red-600">{error}</p>
            )}
            {onScanQR && (
              <button
                type="button"
                className="flex items-center justify-center space-x-2 px-4 py-2.5 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 active:bg-gray-300 transition-colors text-sm font-medium w-full sm:w-auto"
                onClick={onScanQR}
              >
                <Camera className="w-4 h-4 flex-shrink-0" />
                <span>Scan QR Code</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
