"use client";

import { useState, useEffect } from "react";
import { Plus, Minus } from "lucide-react";
import type { SignedOutPouch } from "@/components/data/pouch-management";

interface Step2RefillQuantitiesProps {
  medications: Array<{
    name: string;
    dosage?: string;
    quantity: number;
  }>;
  refillQuantities?: Record<string, number>;
  selectedPouch?: SignedOutPouch | null;
  refillLocation?: string;
  errors?: Record<string, string>;
  onQuantityChange: (medicationName: string, quantity: number) => void;
}

const Step2RefillQuantities = ({
  medications,
  refillQuantities = {},
  selectedPouch,
  refillLocation,
  errors = {},
  onQuantityChange,
}: Step2RefillQuantitiesProps) => {
  const [localQuantities, setLocalQuantities] =
    useState<Record<string, number>>(refillQuantities);

  useEffect(() => {
    const initialQuantities: Record<string, number> = {};
    medications.forEach((med) => {
      if (med.name in refillQuantities) {
        const existingQuantity = refillQuantities[med.name];
        initialQuantities[med.name] = existingQuantity ?? 0;
      } else {
        initialQuantities[med.name] = 0;
      }
    });
    setLocalQuantities(initialQuantities);
  }, [medications, refillQuantities]);

  const handleQuantityChange = (medicationName: string, value: string) => {
    const numValue = Math.max(0, parseInt(value) || 0);
    setLocalQuantities((prev) => ({
      ...prev,
      [medicationName]: numValue,
    }));
    onQuantityChange(medicationName, numValue);
  };

  const handleIncrement = (medicationName: string) => {
    const current = localQuantities[medicationName] || 0;
    const newValue = current + 1;
    handleQuantityChange(medicationName, newValue.toString());
  };

  const handleDecrement = (medicationName: string) => {
    const current = localQuantities[medicationName] || 0;
    const newValue = Math.max(0, current - 1);
    handleQuantityChange(medicationName, newValue.toString());
  };

  const getNewTotal = (medication: { name: string; quantity: number }) => {
    const current = medication.quantity;
    const refill = localQuantities[medication.name] || 0;
    return current + refill;
  };

  const hasRefillQuantities = Object.values(localQuantities).some(
    (qty) => qty > 0
  );

  return (
    <div className="py-4 sm:py-5 md:py-6">
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-5 md:p-6">
        <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">
          Refill Quantities
        </h2>
        <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
          Add medication quantities to{" "}
          {selectedPouch?.pouchNumber || "selected pouch"} at{" "}
          {refillLocation || "selected location"}
        </p>

        {/* Medications Table */}
        <div className="overflow-x-auto mb-4 sm:mb-6">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-gray-300 px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-700">
                  Medication
                </th>
                <th className="border border-gray-300 px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-center text-xs sm:text-sm font-medium text-gray-700">
                  Current
                </th>
                <th className="border border-gray-300 px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-center text-xs sm:text-sm font-medium text-gray-700">
                  Refill Amount
                </th>
                <th className="border border-gray-300 px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-center text-xs sm:text-sm font-medium text-gray-700">
                  New Total
                </th>
                <th className="border border-gray-300 px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-center text-xs sm:text-sm font-medium text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {medications.map((medication, index) => {
                const refillAmount = localQuantities[medication.name] || 0;
                const newTotal = getNewTotal(medication);
                return (
                  <tr key={index}>
                    <td className="border border-gray-300 px-2 sm:px-3 md:px-4 py-2 sm:py-3 font-medium text-xs sm:text-sm text-gray-900">
                      {medication.name} {medication.dosage || ""}
                    </td>
                    <td className="border border-gray-300 px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-center text-xs sm:text-sm text-gray-900">
                      {medication.quantity}
                    </td>
                    <td className="border border-gray-300 px-2 sm:px-3 md:px-4 py-2 sm:py-3">
                      <input
                        type="number"
                        min="0"
                        value={refillAmount}
                        onChange={(e) =>
                          handleQuantityChange(medication.name, e.target.value)
                        }
                        className="w-16 sm:w-20 p-1.5 sm:p-2 border border-gray-300 rounded text-center text-xs sm:text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                      />
                    </td>
                    <td className="border border-gray-300 px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-center">
                      <span className="font-semibold text-green-600 text-xs sm:text-sm">
                        {newTotal}
                      </span>
                    </td>
                    <td className="border border-gray-300 px-2 sm:px-3 md:px-4 py-2 sm:py-3">
                      <div className="flex justify-center space-x-1">
                        <button
                          type="button"
                          onClick={() => handleDecrement(medication.name)}
                          disabled={refillAmount === 0}
                          className="p-1 text-gray-500 hover:text-red-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleIncrement(medication.name)}
                          className="p-1 text-gray-500 hover:text-green-600 transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Refill Summary */}
        <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-amber-50 rounded-lg">
          <h3 className="font-medium mb-2 text-sm sm:text-base">
            Refill Summary
          </h3>
          <div className="space-y-1 text-xs sm:text-sm">
            {hasRefillQuantities ? (
              medications
                .filter((med) => (localQuantities[med.name] || 0) > 0)
                .map((med, index) => {
                  const refill = localQuantities[med.name] || 0;
                  return (
                    <p key={index} className="text-gray-700">
                      {med.name} {med.dosage || ""}: +{refill}
                    </p>
                  );
                })
            ) : (
              <p className="text-gray-500">No refill quantities specified</p>
            )}
          </div>
        </div>
        {errors.refillQuantities && (
          <p className="mt-2 text-xs sm:text-sm text-red-600">
            {errors.refillQuantities}
          </p>
        )}
      </div>
    </div>
  );
};

export default Step2RefillQuantities;
