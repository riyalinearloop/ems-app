"use client";

import { useEffect, useState } from "react";
import { Camera, Check } from "lucide-react";
import type { MedicationInventory } from "@/components/data/withdraw-pouch";

interface Step2VerifyQuantitiesProps {
  medications: MedicationInventory[];
  verifiedQuantities?: Record<string, number>;
  photoUrl?: string;
  errors?: Record<string, string>;
  selectedPouch?: { pouchNumber: string } | null;
  onQuantityChange: (medicationName: string, quantity: number) => void;
  onPhotoCapture: (photoUrl: string) => void;
}

const Step2VerifyQuantities = ({
  medications,
  verifiedQuantities = {},
  photoUrl,
  errors: _errors = {},
  selectedPouch,
  onQuantityChange,
  onPhotoCapture,
}: Step2VerifyQuantitiesProps) => {
  const [localQuantities, setLocalQuantities] =
    useState<Record<string, number>>(verifiedQuantities);

  // Initialize quantities with expected values if not set
  useEffect(() => {
    const initialQuantities: Record<string, number> = {};
    medications.forEach((med) => {
      if (!(med.name in localQuantities)) {
        initialQuantities[med.name] = med.quantity;
      } else {
        const existingQuantity = localQuantities[med.name];
        initialQuantities[med.name] = existingQuantity ?? med.quantity;
      }
    });
    setLocalQuantities(initialQuantities);
  }, [medications]);

  const handleQuantityChange = (medicationName: string, value: string) => {
    const numValue = parseInt(value) || 0;
    setLocalQuantities((prev) => ({
      ...prev,
      [medicationName]: numValue,
    }));
    onQuantityChange(medicationName, numValue);
  };

  const getStatus = (medication: MedicationInventory) => {
    const expected = medication.quantity;
    const actual = localQuantities[medication.name] ?? expected;
    const isMatch = actual === expected;

    return {
      isMatch,
      actual,
      expected,
    };
  };

  const handleTakePhoto = () => {
    // TODO: Implement actual photo capture functionality
    // For now, simulate photo capture
    const simulatedPhotoUrl = `data:image/jpeg;base64,simulated_photo_${Date.now()}`;
    onPhotoCapture(simulatedPhotoUrl);
  };

  return (
    <div className="space-y-4 sm:space-y-6 py-4 sm:py-5 md:py-6">
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-5 md:p-6">
        <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">
          Verify Quantities
        </h2>
        <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
          Verify medication quantities for{" "}
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
                <th className="border border-gray-300 px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-center text-xs sm:text-sm font-medium text-gray-700">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {medications.map((medication, index) => {
                const status = getStatus(medication);
                return (
                  <tr key={index}>
                    <td className="border border-gray-300 px-2 sm:px-3 md:px-4 py-2 sm:py-3 font-medium text-xs sm:text-sm text-gray-900">
                      {medication.name} {medication.dosage || ""}
                    </td>
                    <td className="border border-gray-300 px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-center text-xs sm:text-sm text-gray-900">
                      {status.expected}
                    </td>
                    <td className="border border-gray-300 px-2 sm:px-3 md:px-4 py-2 sm:py-3">
                      <input
                        type="number"
                        min="0"
                        value={status.actual}
                        onChange={(e) =>
                          handleQuantityChange(medication.name, e.target.value)
                        }
                        className="w-16 sm:w-20 p-1.5 sm:p-2 border border-gray-300 rounded text-center text-xs sm:text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </td>
                    <td className="border border-gray-300 px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-center">
                      {status.isMatch ? (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <Check className="w-3 h-3 mr-1" />
                          Match
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                          Mismatch
                        </span>
                      )}
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
                <img
                  src={photoUrl}
                  alt="Pouch contents"
                  className="w-full max-w-md mx-auto h-48 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={handleTakePhoto}
                  className="px-4 py-2.5 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 active:bg-gray-300 transition-colors text-sm font-medium"
                >
                  Retake Photo
                </button>
              </div>
            ) : (
              <>
                <Camera className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-gray-400 mx-auto mb-3 sm:mb-4" />
                <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
                  Capture photo of pouch contents
                </p>
                <button
                  type="button"
                  onClick={handleTakePhoto}
                  className="px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors text-sm font-medium shadow-sm"
                >
                  Take Photo
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step2VerifyQuantities;
