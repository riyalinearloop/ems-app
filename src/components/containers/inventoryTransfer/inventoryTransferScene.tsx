"use client";

import { CommonTable, ColumnType } from "@/components/custom-components/commonTable";
import { useState } from "react";
import CommonButton from "@/components/custom-components/commonButton";
import { Plus } from "lucide-react";

interface InventoryTransferSceneProps {
  locations: Array<{ value: string; label: string }>;
  recentTransfers: Array<{
    id: string;
    from: string;
    to: string;
    medications: string;
    status: string;
    date: string;
  }>;
  transferStatusConfig: Record<
    string,
    { label: string; badgeClasses: string; textClasses: string }
  >;
  onOpenTransferModal: () => void;
}

const InventoryTransferScene = (props: InventoryTransferSceneProps) => {
  const {
    locations,
    recentTransfers,
    transferStatusConfig,
    onOpenTransferModal,
  } = props;
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(recentTransfers.length / itemsPerPage);
  const paginatedTransfers = recentTransfers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const columns: ColumnType[] = [
    {
      title: "Transfer ID",
      dataIndex: "id",
      render: (value: string) => (
        <span className="text-sm font-medium text-gray-900">{value}</span>
      ),
    },
    {
      title: "From → To",
      dataIndex: "from",
      render: (value: string, row: any) => (
        <span className="text-sm text-gray-500">
          {value} → {row.to}
        </span>
      ),
    },
    {
      title: "Medications",
      dataIndex: "medications",
      render: (value: string) => (
        <span className="text-sm text-gray-500">{value}</span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (value: string) => {
        const statusConfig = transferStatusConfig[value];
        return (
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusConfig.badgeClasses} ${statusConfig.textClasses}`}
          >
            {statusConfig.label}
          </span>
        );
      },
    },
    {
      title: "Date",
      dataIndex: "date",
      render: (value: string) => (
        <span className="text-sm text-gray-500">{value}</span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Recent transfers table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Recent Transfers
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              View and manage inventory transfers between locations
            </p>
          </div>
          <CommonButton
            variant="primary"
            size="default"
            onClick={onOpenTransferModal}
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            New Transfer
          </CommonButton>
        </div>
        <CommonTable
          columns={columns}
          data={paginatedTransfers}
          pagePagination={currentPage}
          totalPagesPagination={totalPages}
          onPageChangePagination={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default InventoryTransferScene;
