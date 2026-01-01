"use client";

import { Check } from "lucide-react";

export interface StepperStep {
  id: string;
  label: string;
  isActive?: boolean;
  isDone?: boolean;
  isDisabled?: boolean;
}

interface CommonStepperProps {
  steps: StepperStep[];
  activeStepId: string;
  onStepClick?: (step: StepperStep) => void;
  className?: string;
  colorScheme?: "blue" | "green" | "amber";
}

export function CommonStepper({
  steps,
  activeStepId,
  onStepClick,
  className = "",
  colorScheme = "blue",
}: CommonStepperProps) {
  const getStepStatus = (step: StepperStep, index: number) => {
    const activeIndex = steps.findIndex((s) => s.id === activeStepId);
    const isActive = step.id === activeStepId;
    const isDone = activeIndex > index;
    const isDisabled = step.isDisabled || false;

    return { isActive, isDone, isDisabled };
  };

  const colorClasses = {
    blue: {
      active: "bg-blue-600 text-white",
      done: "bg-blue-600 text-white",
      inactive: "bg-gray-200 text-gray-600",
      connector: "bg-blue-600",
    },
    green: {
      active: "bg-green-600 text-white",
      done: "bg-green-600 text-white",
      inactive: "bg-gray-200 text-gray-600",
      connector: "bg-green-600",
    },
    amber: {
      active: "bg-amber-600 text-white",
      done: "bg-amber-600 text-white",
      inactive: "bg-gray-200 text-gray-600",
      connector: "bg-amber-600",
    },
  };

  const colors = colorClasses[colorScheme];

  return (
    <div className={`w-full ${className}`}>
      {/* Centered Stepper - Desktop and Mobile */}
      <div className="flex items-center justify-center">
        {steps.map((step, index) => {
          const { isActive, isDone, isDisabled } = getStepStatus(step, index);
          const isLast = index === steps.length - 1;

          return (
            <div key={step.id} className="flex items-center">
              {/* Step Circle */}
              <button
                type="button"
                onClick={() => !isDisabled && onStepClick?.(step)}
                disabled={isDisabled}
                className={`
                  w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-medium transition-all
                  ${
                    isDone
                      ? colors.done
                      : isActive
                      ? colors.active
                      : colors.inactive
                  }
                  ${
                    isDisabled
                      ? "cursor-not-allowed opacity-50"
                      : "cursor-pointer"
                  }
                `}
              >
                {isDone ? (
                  <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
                ) : (
                  <span>{index + 1}</span>
                )}
              </button>

              {/* Connector Line */}
              {!isLast && (
                <div
                  className={`
                    w-8 sm:w-12 md:w-16 h-0.5 sm:h-1 mx-1 sm:mx-2 transition-colors
                    ${isDone ? colors.connector : "bg-gray-200"}
                  `}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
