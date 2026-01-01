"use client";

import { Camera } from "lucide-react";
import type { SignedOutPouch } from "@/components/data/pouch-management";

interface Step3ReturnWitnessSignatureProps {
  omitWitness: boolean;
  witnessName?: string;
  witnessSignature?: string;
  witnessDate?: string;
  selectedPouch?: SignedOutPouch | null;
  actualQuantities?: Record<string, number>;
  errors?: Record<string, string>;
  onOmitWitnessChange: (omit: boolean) => void;
  onWitnessNameChange: (name: string) => void;
  onSignatureChange: (signature: string) => void;
  onDateChange: (date: string) => void;
}

const Step3ReturnWitnessSignature = ({
  omitWitness,
  witnessName = "",
  witnessSignature: _witnessSignature = "",
  witnessDate = "",
  selectedPouch,
  actualQuantities = {},
  errors = {},
  onOmitWitnessChange,
  onWitnessNameChange,
  onSignatureChange: _onSignatureChange,
  onDateChange: _onDateChange,
}: Step3ReturnWitnessSignatureProps) => {
  return (
    <div className="py-4 sm:py-5 md:py-6">
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-5 md:p-6">
        <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">
          Witness Signature
        </h2>
        <div className="space-y-4">
          {/* Omit Witness Checkbox */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <input
              type="checkbox"
              id="omitWitness"
              checked={omitWitness}
              onChange={(e) => onOmitWitnessChange(e.target.checked)}
              className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
            />
            <label
              htmlFor="omitWitness"
              className="text-xs sm:text-sm font-medium text-gray-700"
            >
              Omit witness signature
            </label>
          </div>

          {/* Witness Signature/ID */}
          {!omitWitness && (
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                Witness Signature/ID
              </label>
              <div className="space-y-2 sm:space-y-3">
                <input
                  type="text"
                  value={witnessName}
                  onChange={(e) => onWitnessNameChange(e.target.value)}
                  placeholder="Enter witness name or scan QR code"
                  required={!omitWitness}
                  className={`w-full p-2 sm:p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm sm:text-base ${
                    errors.witnessName ? "border-red-300" : "border-gray-300"
                  }`}
                />
                {errors.witnessName && (
                  <p className="text-xs sm:text-sm text-red-600">
                    {errors.witnessName}
                  </p>
                )}
                <button
                  type="button"
                  className="flex items-center justify-center space-x-2 px-4 py-2.5 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 active:bg-gray-300 transition-colors text-sm font-medium w-full sm:w-auto"
                >
                  <Camera className="w-4 h-4 flex-shrink-0" />
                  <span>Scan QR Code</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Return Summary */}
        <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-gray-50 rounded-lg">
          <h3 className="font-medium mb-2 sm:mb-3 text-sm sm:text-base">
            Return Summary
          </h3>
          <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
            <p>
              <span className="font-medium">Pouch:</span>{" "}
              {selectedPouch?.pouchNumber || "N/A"}
            </p>
            <p>
              <span className="font-medium">Returned by:</span>{" "}
              {witnessName || "N/A"}
            </p>
            <p>
              <span className="font-medium">Date:</span>{" "}
              {witnessDate
                ? new Date(witnessDate).toLocaleDateString()
                : new Date().toLocaleDateString()}
            </p>
            {selectedPouch && (
              <div className="mt-3">
                <p className="font-medium">Actual Quantities:</p>
                {selectedPouch.medications.map((med, index) => {
                  const actual = actualQuantities[med.name] ?? 0;
                  return (
                    <p key={index} className="ml-2">
                      {med.name} {med.dosage || ""}: {actual} (expected:{" "}
                      {med.quantity})
                    </p>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step3ReturnWitnessSignature;
