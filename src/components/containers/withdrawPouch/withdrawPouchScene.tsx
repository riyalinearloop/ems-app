"use client";

import { useState } from "react";
import {
  Package,
  MapPin,
  Clock,
  CheckCircle2,
  ArrowDownCircle,
  Plus,
} from "lucide-react";
import CommonButton from "@/components/custom-components/commonButton";
import {
  CommonTable,
  ColumnType,
} from "@/components/custom-components/commonTable";
import type { Pouch } from "@/components/data/withdraw-pouch";

interface WithdrawPouchSceneProps {
  pouches: Pouch[];
  onOpenWithdrawModal?: () => void;
}

const WithdrawPouchScene = ({
  pouches,
  onOpenWithdrawModal,
}: WithdrawPouchSceneProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(pouches.length / itemsPerPage);
  const paginatedPouches = pouches.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const columns: ColumnType[] = [
    {
      title: "Pouch Number",
      dataIndex: "pouchNumber",
      render: (value: string) => (
        <span className="text-sm font-medium text-gray-900">{value}</span>
      ),
    },
    {
      title: "Type",
      dataIndex: "pouchType",
      render: (value: string) => (
        <span className="text-sm text-gray-500 capitalize">
          {value || "Standard"}
        </span>
      ),
    },
    {
      title: "Location",
      dataIndex: "location",
      render: (value: string) => (
        <div className="flex items-center space-x-2">
          <MapPin className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-500">{value}</span>
        </div>
      ),
    },
    {
      title: "Medications",
      dataIndex: "medications",
      render: (
        medications: Array<{ name: string; quantity: number; dosage?: string }>
      ) => (
        <div className="flex flex-wrap gap-1">
          {medications.map((med, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
            >
              {med.name} {med.dosage || ""}: {med.quantity}
            </span>
          ))}
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (value: string) => (
        <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800">
          <CheckCircle2 className="w-3 h-3 mr-1" />
          {value}
        </span>
      ),
    },
    {
      title: "Last Updated",
      dataIndex: "lastUpdated",
      render: (value: string) => (
        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-500">{value}</span>
        </div>
      ),
    },
    {
      title: "Actions",
      dataIndex: "id",
      render: (_value: string, _row: Pouch) => (
        <CommonButton
          variant="primary"
          size="sm"
          onClick={onOpenWithdrawModal}
          className="flex items-center space-x-2"
        >
          <ArrowDownCircle className="w-4 h-4" />
          <span>Withdraw</span>
        </CommonButton>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Available Pouches Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Available Pouches
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Select and withdraw available medication pouches for field use
            </p>
          </div>
          <CommonButton
            variant="primary"
            size="default"
            onClick={onOpenWithdrawModal}
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Withdraw Pouch
          </CommonButton>
        </div>
        {pouches.length === 0 ? (
          <div className="p-12 text-center">
            <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg font-medium">
              No available pouches
            </p>
            <p className="text-gray-400 text-sm mt-2">
              All pouches are currently signed out
            </p>
          </div>
        ) : (
          <CommonTable
            columns={columns}
            data={paginatedPouches}
            pagePagination={currentPage}
            totalPagesPagination={totalPages}
            onPageChangePagination={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
};

export default WithdrawPouchScene;
