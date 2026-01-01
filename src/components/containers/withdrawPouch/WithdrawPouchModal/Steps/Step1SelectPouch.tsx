"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { CommonPouchCard } from "@/components/custom-components/commonPouchCard";
import type { Pouch } from "@/components/data/withdraw-pouch";
import { POUCH_TYPES } from "@/components/data/withdraw-pouch";

interface Step1SelectPouchProps {
  availablePouches: Pouch[];
  selectedPouchId?: string;
  newPouchType?: string;
  newPouchNumber?: string;
  isNewPouch?: boolean;
  errors?: Record<string, string>;
  onSelectPouch: (pouchId: string) => void;
  onAddNewPouch: (type: string, number: string) => void;
}

const Step1SelectPouch = ({
  availablePouches,
  selectedPouchId,
  newPouchType,
  newPouchNumber,
  isNewPouch,
  errors = {},
  onSelectPouch,
  onAddNewPouch,
}: Step1SelectPouchProps) => {
  const [localPouchType, setLocalPouchType] = useState(newPouchType || "");
  const [localPouchNumber, setLocalPouchNumber] = useState(
    newPouchNumber || ""
  );

  const pouchTypeOptions = POUCH_TYPES.map((type) => ({
    value: type.value,
    label: type.label,
  }));

  const handleAddPouch = () => {
    if (localPouchType && localPouchNumber) {
      onAddNewPouch(localPouchType, localPouchNumber);
      setLocalPouchType("");
      setLocalPouchNumber("");
    }
  };

  return (
    <div className="py-4 sm:py-5 md:py-6">
      {/* Available Pouches Section */}
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-5 md:p-6">
        <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">
          Select or Add Pouch
        </h2>
        <div className="mb-4 sm:mb-6">
          <h3 className="text-base sm:text-lg font-medium mb-3 sm:mb-4">
            Available Pouches
          </h3>
          <div className="grid gap-2 sm:gap-3 max-h-64 sm:max-h-80 overflow-y-auto">
            {availablePouches.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-4">
                No available pouches
              </p>
            ) : (
              availablePouches.map((pouch) => {
                const isSelected = selectedPouchId === pouch.id && !isNewPouch;
                return (
                  <CommonPouchCard
                    key={pouch.id}
                    pouch={{
                      id: pouch.id,
                      pouchNumber: pouch.pouchNumber,
                      pouchType: pouch.pouchType,
                      status: "Active",
                      signedOutBy: "",
                      signedOutDate: "",
                      medications: pouch.medications,
                    }}
                    isSelected={isSelected}
                    colorScheme="blue"
                    showSignedOutInfo={false}
                    onClick={() => onSelectPouch(pouch.id)}
                  />
                );
              })
            )}
          </div>
        </div>

        {/* Add New Pouch Section */}
        <div className="border-t border-gray-200 pt-4 sm:pt-6">
          <h3 className="text-base sm:text-lg font-medium mb-3 sm:mb-4">
            Add New Pouch
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                Pouch Type
              </label>
              <select
                value={localPouchType}
                onChange={(e) => setLocalPouchType(e.target.value)}
                className={`w-full p-2 sm:p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base ${
                  errors.pouchType ? "border-red-300" : "border-gray-300"
                }`}
              >
                <option value="">Select type...</option>
                {pouchTypeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.pouchType && (
                <p className="mt-1 text-xs sm:text-sm text-red-600">
                  {errors.pouchType}
                </p>
              )}
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                Pouch Number
              </label>
              <input
                type="text"
                value={localPouchNumber}
                onChange={(e) => setLocalPouchNumber(e.target.value)}
                placeholder="e.g., A004"
                className={`w-full p-2 sm:p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base ${
                  errors.pouchNumber ? "border-red-300" : "border-gray-300"
                }`}
              />
              {errors.pouchNumber && (
                <p className="mt-1 text-xs sm:text-sm text-red-600">
                  {errors.pouchNumber}
                </p>
              )}
            </div>
            <div className="flex items-end">
              <button
                type="button"
                onClick={handleAddPouch}
                disabled={!localPouchType || !localPouchNumber}
                className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 sm:py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 active:bg-green-800 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed transition-colors text-sm sm:text-base font-medium shadow-sm"
              >
                <Plus className="w-4 h-4 flex-shrink-0" />
                <span>Add Pouch</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step1SelectPouch;
