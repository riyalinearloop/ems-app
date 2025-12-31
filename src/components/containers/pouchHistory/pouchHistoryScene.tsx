"use client";

import React from "react";
import {
  FileText,
  Calendar,
  User,
  Package,
  Image as ImageIcon,
  Clock,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import CommonButton from "@/components/custom-components/commonButton";
import { CommonTable, ColumnType } from "@/components/custom-components/commonTable";
import { useState } from "react";
import type { Report } from "@/components/data/pouch-history";

interface PouchHistorySceneProps {
  reports: Report[];
}

const getReportTypeColor = (type: string) => {
  switch (type) {
    case "count out":
      return "bg-blue-100 text-blue-800";
    case "administration":
      return "bg-purple-100 text-purple-800";
    case "count in":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const formatReportType = (type: string) => {
  return type
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const PouchHistoryScene = ({ reports }: PouchHistorySceneProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(reports.length / itemsPerPage);
  const paginatedReports = reports.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const columns: ColumnType[] = [
    {
      title: "Report ID",
      dataIndex: "id",
      render: (value: string) => (
        <span className="font-semibold text-gray-900">#{value}</span>
      ),
    },
    {
      title: "Type",
      dataIndex: "type",
      render: (value: string) => (
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getReportTypeColor(value)}`}
        >
          {formatReportType(value)}
        </span>
      ),
    },
    {
      title: "Pouch",
      dataIndex: "pouchNumber",
      render: (value: string) => (
        <div className="flex items-center gap-1">
          <Package className="w-4 h-4 text-gray-400" />
          <span className="text-gray-700">{value}</span>
        </div>
      ),
    },
    {
      title: "User",
      dataIndex: "user",
      render: (value: string) => (
        <div className="flex items-center gap-1">
          <User className="w-4 h-4 text-gray-400" />
          <span className="text-gray-700">{value}</span>
        </div>
      ),
    },
    {
      title: "Timestamp",
      dataIndex: "timestamp",
      render: (value: string) => (
        <div className="flex items-center gap-1">
          <Calendar className="w-4 h-4 text-gray-400" />
          <span className="text-gray-600">{value}</span>
        </div>
      ),
    },
    {
      title: "Medications",
      dataIndex: "medications",
      render: (value: { name: string; quantity: number }[]) => (
        <div className="max-w-xs">
          <div className="space-y-1">
            {value.map((med, index) => (
              <div
                key={index}
                className={`text-xs p-1 rounded ${
                  med.quantity < 0
                    ? "bg-red-50 text-red-700"
                    : med.quantity > 0
                    ? "bg-green-50 text-green-700"
                    : "bg-gray-50 text-gray-700"
                }`}
              >
                {med.name}: {med.quantity > 0 ? "+" : ""}
                {med.quantity}
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      title: "Actions",
      dataIndex: "id",
      render: (value: string, row: Report) => (
        <div className="flex gap-2">
          <CommonButton variant="secondary" size="sm">
            View
          </CommonButton>
          {row.images && row.images.length > 0 && (
            <CommonButton variant="secondary" size="sm">
              Images
            </CommonButton>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <CardHeader className="border-b border-gray-200 p-4 md:p-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle className="text-xl md:text-2xl font-bold text-gray-900 flex items-center">
                <FileText className="w-5 h-5 md:w-6 md:h-6 mr-2 md:mr-3 text-blue-600" />
                Pouch History
              </CardTitle>
              <CardDescription className="text-sm md:text-base text-gray-600 mt-1">
                Complete audit trail of all pouch transactions and activities
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4 md:p-6">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Package className="w-4 h-4" />
            <span className="font-medium">Total Reports:</span>
            <span>{reports.length}</span>
          </div>
        </CardContent>
      </Card>

      {/* Reports Table */}
      <Card className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <CardHeader className="border-b border-gray-200 p-4 md:p-6">
          <CardTitle className="text-lg font-semibold text-gray-900">
            All Reports
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 md:p-6">
          <CommonTable
            columns={columns}
            data={paginatedReports}
            pagePagination={currentPage}
            totalPagesPagination={totalPages}
            onPageChangePagination={setCurrentPage}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default PouchHistoryScene;

