"use client";

import { CommonPouchCard } from "@/components/custom-components/commonPouchCard";
import type { SignedOutPouch } from "@/components/data/pouch-management";

interface Step1SelectPouchToReturnProps {
  signedOutPouches: SignedOutPouch[];
  selectedPouchId?: string;
  errors?: Record<string, string>;
  onSelectPouch: (pouchId: string) => void;
}

const Step1SelectPouchToReturn = ({
  signedOutPouches,
  selectedPouchId,
  errors = {},
  onSelectPouch,
}: Step1SelectPouchToReturnProps) => {
  return (
    <div className="py-4 sm:py-5 md:py-6">
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-5 md:p-6">
        <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">
          Select Pouch to Return
        </h2>
        <div className="grid gap-2 sm:gap-3 max-h-96 overflow-y-auto">
          {signedOutPouches.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-4">
              No signed-out pouches available to return
            </p>
          ) : (
            signedOutPouches.map((pouch) => (
              <CommonPouchCard
                key={pouch.id}
                pouch={pouch}
                isSelected={selectedPouchId === pouch.id}
                colorScheme="green"
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
    </div>
  );
};

export default Step1SelectPouchToReturn;
