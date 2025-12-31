"use client";

import React, { useState } from "react";
import {
  Package,
  MapPin,
  Clock,
  CheckCircle2,
  ArrowDownCircle,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import CommonButton from "@/components/custom-components/commonButton";
import type { Pouch } from "@/components/data/withdraw-pouch";

interface WithdrawPouchSceneProps {
  pouches: Pouch[];
}

const WithdrawPouchScene = ({ pouches }: WithdrawPouchSceneProps) => {
  const [selectedPouch, setSelectedPouch] = useState<string | null>(null);

  const handleWithdraw = (pouchId: string) => {
    setSelectedPouch(pouchId);
    // TODO: Implement withdraw logic
    console.log("Withdrawing pouch:", pouchId);
  };

  return (
    <div>
      {/* Header */}
      <Card className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <CardHeader className="border-b border-gray-200 p-4 md:p-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle className="text-xl md:text-2xl font-bold text-gray-900 flex items-center">
                <ArrowDownCircle className="w-5 h-5 md:w-6 md:h-6 mr-2 md:mr-3 text-blue-600" />
                Withdraw Pouch
              </CardTitle>
              <CardDescription className="text-sm md:text-base text-gray-600 mt-1">
                Select and withdraw available medication pouches
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4 md:p-6">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Package className="w-4 h-4" />
            <span className="font-medium">Available Pouches:</span>
            <span>{pouches.length}</span>
          </div>
        </CardContent>
      </Card>

      {/* Available Pouches Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {pouches.map((pouch) => (
          <PouchCard
            key={pouch.id}
            pouch={pouch}
            onWithdraw={handleWithdraw}
            isWithdrawing={selectedPouch === pouch.id}
          />
        ))}
      </div>
    </div>
  );
};

interface PouchCardProps {
  pouch: Pouch;
  onWithdraw: (pouchId: string) => void;
  isWithdrawing: boolean;
}

const PouchCard = ({ pouch, onWithdraw, isWithdrawing }: PouchCardProps) => {
  return (
    <Card className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <CardHeader className="border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-gray-900">
            {pouch.pouchNumber}
          </CardTitle>
          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            {pouch.status}
          </span>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-4">
          {/* Location */}
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="w-4 h-4 text-gray-400" />
            <span className="text-gray-600">
              <span className="font-medium">Location:</span> {pouch.location}
            </span>
          </div>

          {/* Medications */}
          <div>
            <p className="text-xs font-medium text-gray-500 mb-2">
              Medications:
            </p>
            <div className="space-y-1">
              {pouch.medications.map((med, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between text-sm bg-gray-50 p-2 rounded"
                >
                  <span className="text-gray-700">{med.name}</span>
                  <span className="font-medium text-gray-900">
                    Qty: {med.quantity}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Last Updated */}
          <div className="flex items-center gap-2 text-xs text-gray-500 pt-2 border-t border-gray-200">
            <Clock className="w-3 h-3" />
            <span>Last updated: {pouch.lastUpdated}</span>
          </div>

          {/* Actions */}
          <div className="pt-2">
            <CommonButton
              variant="primary"
              size="sm"
              className="w-full"
              onClick={() => onWithdraw(pouch.id)}
              loading={isWithdrawing}
              loadingText="Withdrawing..."
            >
              <ArrowDownCircle className="w-4 h-4 mr-2" />
              Withdraw Pouch
            </CommonButton>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WithdrawPouchScene;
