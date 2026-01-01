"use client";

import {
  ArrowDownLeft,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Package,
  RefreshCw,
} from "lucide-react";
import {
  CommonTable,
  ColumnType,
} from "@/components/custom-components/commonTable";
import type { SignedOutPouch } from "@/components/data/pouch-management";
import { useState } from "react";

interface PouchManagementSceneProps {
  signedOutPouches: SignedOutPouch[];
  onOpenWithdrawModal: () => void;
  onOpenReturnModal: () => void;
  onOpenRefillModal: () => void;
}

const PouchManagementScene = (props: PouchManagementSceneProps) => {
  const {
    signedOutPouches,
    onOpenWithdrawModal,
    onOpenReturnModal,
    onOpenRefillModal,
  } = props;

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(signedOutPouches.length / itemsPerPage);
  const paginatedPouches = signedOutPouches.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getStatusBadgeClasses = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Inactive":
        return "bg-gray-100 text-gray-800";
      case "Returned":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const columns: ColumnType[] = [
    {
      title: "Pouch Details",
      dataIndex: "pouchNumber",
      render: (value: string, row: SignedOutPouch) => (
        <div className="border rounded-lg p-3 sm:p-4 bg-gray-50">
          <div className="flex justify-between items-start">
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 gap-1 sm:gap-0 mb-1">
                <span className="font-semibold text-base sm:text-lg text-gray-900 truncate">
                  {value}
                </span>
                <span
                  className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium flex-shrink-0 ${getStatusBadgeClasses(
                    row.status
                  )}`}
                >
                  {row.status === "Active" && (
                    <CheckCircle2 className="w-3 h-3 mr-1 flex-shrink-0" />
                  )}
                  {row.status}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">
                Signed out by: {row.signedOutBy} on {row.signedOutDate}
              </p>
              <div className="mt-2">
                <p className="text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  Medications:
                </p>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {row.medications.map((med, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-1.5 sm:px-2 py-0.5 sm:py-1 bg-blue-100 text-blue-800 rounded text-[10px] sm:text-xs"
                    >
                      {med.name} {med.dosage || ""}: {med.quantity}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Location",
      dataIndex: "location",
      render: (value: string) => (
        <span className="text-sm text-gray-600">{value || "-"}</span>
      ),
    },
    {
      title: "Last Updated",
      dataIndex: "lastUpdated",
      render: (value: string) =>
        value ? (
          <div className="flex items-center space-x-1">
            <Clock className="h-3 w-3 text-gray-400" />
            <span className="text-sm text-gray-600">{value}</span>
          </div>
        ) : (
          <span className="text-sm text-gray-400">-</span>
        ),
    },
  ];

  return (
    <div className="space-y-4 sm:space-y-6 px-2 sm:px-0">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-left flex-1 min-w-0">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
            Pouch Management
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-gray-600 mt-1">
            Manage medication pouches: withdraw, return, and refill operations
          </p>
        </div>
      </div>

      {/* Action Buttons Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-4 sm:p-5 md:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {/* Withdraw Pouch Button */}
            <button
              onClick={onOpenWithdrawModal}
              className="bg-blue-600 hover:bg-blue-700 text-white p-4 sm:p-5 md:p-6 rounded-lg shadow-md transition-colors duration-200 flex flex-col items-center space-y-2"
            >
              <ArrowDownLeft className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" />
              <span className="font-semibold text-sm sm:text-base">
                Withdraw Pouch
              </span>
              <span className="text-xs sm:text-sm opacity-90 text-center">
                Sign out narcotic pouch
              </span>
            </button>

            {/* Return Pouch Button */}
            <button
              onClick={onOpenReturnModal}
              className="bg-green-600 hover:bg-green-700 text-white p-4 sm:p-5 md:p-6 rounded-lg shadow-md transition-colors duration-200 flex flex-col items-center space-y-2"
            >
              <ArrowUpRight className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" />
              <span className="font-semibold text-sm sm:text-base">
                Return Pouch
              </span>
              <span className="text-xs sm:text-sm opacity-90 text-center">
                Return signed-out pouch
              </span>
            </button>

            {/* Refill Pouch Button */}
            <button
              onClick={onOpenRefillModal}
              className="bg-amber-600 hover:bg-amber-700 text-white p-4 sm:p-5 md:p-6 rounded-lg shadow-md transition-colors duration-200 flex flex-col items-center space-y-2"
            >
              <RefreshCw className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" />
              <span className="font-semibold text-sm sm:text-base">
                Refill Pouch
              </span>
              <span className="text-xs sm:text-sm opacity-90 text-center">
                Refill medication quantities
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Signed Out Pouches Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-4 sm:p-5 md:p-6 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
          <div className="flex-1 min-w-0">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900">
              Signed Out Pouches
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              View all currently signed out medication pouches
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 flex-shrink-0">
            <Package className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="font-medium">Total:</span>
            <span>{signedOutPouches.length}</span>
          </div>
        </div>
        <CommonTable
          columns={columns}
          data={paginatedPouches}
          pagePagination={currentPage}
          totalPagesPagination={totalPages}
          onPageChangePagination={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default PouchManagementScene;
