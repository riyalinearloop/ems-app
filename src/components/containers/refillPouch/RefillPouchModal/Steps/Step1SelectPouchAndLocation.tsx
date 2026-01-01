"use client";

import { CommonPouchCard } from "@/components/custom-components/commonPouchCard";
import type { SignedOutPouch } from "@/components/data/pouch-management";

interface Step1SelectPouchAndLocationProps {
  signedOutPouches: SignedOutPouch[];
  selectedPouchId?: string;
  refillLocation?: string;
  locations: string[];
  errors?: Record<string, string>;
  onSelectPouch: (pouchId: string) => void;
  onLocationChange: (location: string) => void;
}

const Step1SelectPouchAndLocation = ({
  signedOutPouches,
  selectedPouchId,
  refillLocation,
  locations,
  errors = {},
  onSelectPouch,
  onLocationChange,
}: Step1SelectPouchAndLocationProps) => {
  return (
    <div className="py-4 sm:py-5 md:py-6">
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-5 md:p-6">
        <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">
          Select Pouch and Location
        </h2>

        {/* Signed-Out Pouches */}
        <div className="mb-4 sm:mb-6">
          <h3 className="text-base sm:text-lg font-medium mb-3 sm:mb-4">
            Signed-Out Pouches
          </h3>
          <div className="grid gap-2 sm:gap-3 max-h-96 overflow-y-auto">
            {signedOutPouches.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-4">
                No signed-out pouches available to refill
              </p>
            ) : (
              signedOutPouches.map((pouch) => (
                <CommonPouchCard
                  key={pouch.id}
                  pouch={pouch}
                  isSelected={selectedPouchId === pouch.id}
                  colorScheme="amber"
                  showSignedOutInfo={true}
                  onClick={() => onSelectPouch(pouch.id)}
                />
              ))
            )}
          </div>
          {errors.selectedPouch && (
            <p className="mt-2 text-xs sm:text-sm text-red-600">
              {errors.selectedPouch}
            </p>
          )}
        </div>

        {/* Refill Location */}
        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
            Refill Location
          </label>
          <select
            value={refillLocation || ""}
            onChange={(e) => onLocationChange(e.target.value)}
            required
            className={`w-full p-2 sm:p-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-sm sm:text-base ${
              errors.refillLocation ? "border-red-300" : "border-gray-300"
            }`}
          >
            <option value="">Select location...</option>
            {locations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
          {errors.refillLocation && (
            <p className="mt-1 text-xs sm:text-sm text-red-600">
              {errors.refillLocation}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Step1SelectPouchAndLocation;
