"use client";

import { ChevronRight, Check } from "lucide-react";

interface CommonModalFooterProps {
  isFirstStep: boolean;
  isLastStep: boolean;
  isSubmitting: boolean;
  canProceed: boolean;
  nextStepLabel?: string;
  submitLabel?: string;
  submittingLabel?: string;
  colorScheme?: "blue" | "green" | "amber";
  onBack: () => void;
  onCancel: () => void;
  onNext?: () => void;
}

export function CommonModalFooter({
  isFirstStep,
  isLastStep,
  isSubmitting,
  canProceed,
  nextStepLabel,
  submitLabel = "Complete",
  submittingLabel = "Processing...",
  colorScheme = "blue",
  onBack,
  onCancel,
  onNext,
}: CommonModalFooterProps) {
  const colorClasses = {
    blue: {
      next: "bg-blue-600 hover:bg-blue-700",
      submit: "bg-green-600 hover:bg-green-700",
    },
    green: {
      next: "bg-green-600 hover:bg-green-700",
      submit: "bg-green-600 hover:bg-green-700",
    },
    amber: {
      next: "bg-amber-600 hover:bg-amber-700",
      submit: "bg-amber-600 hover:bg-amber-700",
    },
  };

  const colors = colorClasses[colorScheme];

  return (
    <div className="flex-shrink-0 p-3 sm:p-4 border-t border-gray-200 bg-white z-10">
      <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-2 sm:gap-3">
        {/* Left Side - Back/Cancel Button */}
        <div>
          {!isFirstStep ? (
            <button
              type="button"
              onClick={onBack}
              disabled={isSubmitting}
              className="px-4 sm:px-6 py-2 sm:py-3 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors text-sm sm:text-base font-medium w-full sm:w-auto min-w-[100px] sm:min-w-[120px]"
            >
              Back
            </button>
          ) : (
            <button
              type="button"
              onClick={onCancel}
              disabled={isSubmitting}
              className="px-4 sm:px-6 py-2 sm:py-3 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors text-sm sm:text-base font-medium w-full sm:w-auto min-w-[100px] sm:min-w-[120px]"
            >
              Cancel
            </button>
          )}
        </div>

        {/* Right Side - Next/Submit Button */}
        <div className="flex items-center justify-end">
          {!isLastStep && (
            <button
              type="button"
              onClick={onNext}
              disabled={isSubmitting || !canProceed}
              className={`px-4 sm:px-6 py-2 sm:py-3 ${colors.next} text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors text-sm sm:text-base font-medium w-full sm:w-auto min-w-[140px] sm:min-w-[180px] flex items-center justify-center gap-2`}
            >
              <span className="truncate">Next: {nextStepLabel}</span>
              <ChevronRight className="w-4 h-4 flex-shrink-0" />
            </button>
          )}
          {isLastStep && (
            <button
              type="submit"
              disabled={isSubmitting || !canProceed}
              className={`px-4 sm:px-6 py-2 sm:py-3 ${colors.submit} text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors text-sm sm:text-base font-medium w-full sm:w-auto min-w-[160px] sm:min-w-[200px] flex items-center justify-center gap-2`}
            >
              {isSubmitting ? (
                <span>{submittingLabel}</span>
              ) : (
                <>
                  <Check className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">{submitLabel}</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
