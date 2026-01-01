"use client";

import { useState, useEffect } from "react";
import { Camera, Check } from "lucide-react";
import type { SignedOutPouch } from "@/components/data/pouch-management";

interface Step2VerifyReturnQuantitiesProps {
  medications: Array<{
    name: string;
    dosage?: string;
    quantity: number;
  }>;
  actualQuantities?: Record<string, number>;
  photoUrl?: string;
  selectedPouch?: SignedOutPouch | null;
  errors?: Record<string, string>;
  onQuantityChange: (medicationName: string, quantity: number) => void;
  onPhotoCapture: (photoUrl: string) => void;
}

const Step2VerifyReturnQuantities = ({
  medications,
  actualQuantities = {},
  photoUrl,
  selectedPouch,
  errors = {},
  onQuantityChange,
  onPhotoCapture,
}: Step2VerifyReturnQuantitiesProps) => {
  const [localQuantities, setLocalQuantities] =
    useState<Record<string, number>>(actualQuantities);

  useEffect(() => {
    const initialQuantities: Record<string, number> = {};
    medications.forEach((med) => {
      if (med.name in actualQuantities) {
        const existingQuantity = actualQuantities[med.name];
        initialQuantities[med.name] = existingQuantity ?? 0;
      } else {
        initialQuantities[med.name] = 0;
      }
    });
    setLocalQuantities(initialQuantities);
  }, [medications, actualQuantities]);

  const handleQuantityChange = (medicationName: string, value: string) => {
    const numValue = parseInt(value) || 0;
    setLocalQuantities((prev) => ({
      ...prev,
      [medicationName]: numValue,
    }));
    onQuantityChange(medicationName, numValue);
  };

  const handleTakePhoto = () => {
    const simulatedPhotoUrl = `data:image/jpeg;base64,simulated_photo_${Date.now()}`;
    onPhotoCapture(simulatedPhotoUrl);
  };

  return (
    <div className="py-4 sm:py-5 md:py-6">
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-5 md:p-6">
        <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">
          Enter Actual Quantities
        </h2>
        <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
          Enter the actual quantities found in{" "}
          {selectedPouch?.pouchNumber || "selected pouch"}
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
                  Expected
                </th>
                <th className="border border-gray-300 px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-center text-xs sm:text-sm font-medium text-gray-700">
                  Actual Count
                </th>
              </tr>
            </thead>
            <tbody>
              {medications.map((medication, index) => {
                const expected = medication.quantity;
                const actual = localQuantities[medication.name] ?? 0;
                return (
                  <tr key={index}>
                    <td className="border border-gray-300 px-2 sm:px-3 md:px-4 py-2 sm:py-3 font-medium text-xs sm:text-sm text-gray-900">
                      {medication.name} {medication.dosage || ""}
                    </td>
                    <td className="border border-gray-300 px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-center text-xs sm:text-sm text-gray-900">
                      {expected}
                    </td>
                    <td className="border border-gray-300 px-2 sm:px-3 md:px-4 py-2 sm:py-3">
                      <input
                        type="number"
                        min="0"
                        value={actual}
                        onChange={(e) =>
                          handleQuantityChange(medication.name, e.target.value)
                        }
                        className="w-16 sm:w-20 p-1.5 sm:p-2 border border-gray-300 rounded text-center text-xs sm:text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Photo Capture Section */}
        <div className="mt-4 sm:mt-6 p-3 sm:p-4 border-2 border-dashed border-gray-300 rounded-lg">
          <div className="text-center">
            {photoUrl ? (
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center justify-center">
                  <Check className="w-8 h-8 sm:w-10 sm:w-10 md:w-12 md:h-12 text-green-600" />
                </div>
                <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
                  Photo captured successfully
                </p>
                <button
                  type="button"
                  onClick={handleTakePhoto}
                  className="px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 active:bg-green-800 transition-colors text-sm font-medium shadow-sm"
                >
                  Retake Photo
                </button>
              </div>
            ) : (
              <>
                <Camera className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-gray-400 mx-auto mb-3 sm:mb-4" />
                <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
                  Capture photo of returned pouch
                </p>
                <button
                  type="button"
                  onClick={handleTakePhoto}
                  className="px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 active:bg-green-800 transition-colors text-sm font-medium shadow-sm"
                >
                  Take Photo
                </button>
              </>
            )}
          </div>
        </div>
        {errors.photo && (
          <p className="mt-2 text-xs sm:text-sm text-red-600">{errors.photo}</p>
        )}
      </div>
    </div>
  );
};

export default Step2VerifyReturnQuantities;
