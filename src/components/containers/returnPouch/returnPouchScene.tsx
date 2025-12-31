"use client";

import React, { useState } from "react";
import {
  Package,
  User,
  Calendar,
  ArrowUpCircle,
  CheckCircle2,
  Clock,
  AlertCircle,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import CommonButton from "@/components/custom-components/commonButton";
import {
  CommonTable,
  ColumnType,
} from "@/components/custom-components/commonTable";
import type { ReturnPouch } from "@/components/data/return-pouch";

interface ReturnPouchSceneProps {
  pouches: ReturnPouch[];
}

const ReturnPouchScene = ({ pouches }: ReturnPouchSceneProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(pouches.length / itemsPerPage);
  const paginatedPouches = pouches.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Verified":
        return "bg-blue-100 text-blue-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const columns: ColumnType[] = [
    {
      title: "Pouch Number",
      dataIndex: "pouchNumber",
      render: (value: string) => (
        <span className="font-semibold text-gray-900">{value}</span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (value: string) => (
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(
            value
          )}`}
        >
          {value === "Completed" && <CheckCircle2 className="w-3 h-3 mr-1" />}
          {value === "Pending" && <Clock className="w-3 h-3 mr-1" />}
          {value === "Verified" && <AlertCircle className="w-3 h-3 mr-1" />}
          {value}
        </span>
      ),
    },
    {
      title: "Withdrawn By",
      dataIndex: "withdrawnBy",
      render: (value: string) => (
        <div className="flex items-center gap-1">
          <User className="w-4 h-4 text-gray-400" />
          <span className="text-gray-700">{value}</span>
        </div>
      ),
    },
    {
      title: "Withdrawn Date",
      dataIndex: "withdrawnDate",
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
      render: (
        value: {
          name: string;
          quantity: number;
          used: number;
          remaining: number;
        }[]
      ) => (
        <div className="max-w-xs">
          <div className="space-y-1">
            {value.map((med, index) => (
              <div key={index} className="text-xs p-1 rounded bg-gray-50">
                {med.name}: {med.used}/{med.quantity} used, {med.remaining}{" "}
                remaining
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      title: "Actions",
      dataIndex: "id",
      render: (value: string, row: ReturnPouch) => (
        <div className="flex gap-2">
          {row.status === "Pending" && (
            <CommonButton variant="primary" size="sm">
              <ArrowUpCircle className="w-4 h-4 mr-1" />
              Return
            </CommonButton>
          )}
          <CommonButton variant="secondary" size="sm">
            View Details
          </CommonButton>
        </div>
      ),
    },
  ];

  return (
    <div>
      {/* Header */}
      <Card className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <CardHeader className="border-b border-gray-200 p-4 md:p-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle className="text-xl md:text-2xl font-bold text-gray-900 flex items-center">
                <ArrowUpCircle className="w-5 h-5 md:w-6 md:h-6 mr-2 md:mr-3 text-blue-600" />
                Return Pouch
              </CardTitle>
              <CardDescription className="text-sm md:text-base text-gray-600 mt-1">
                Return withdrawn medication pouches
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4 md:p-6">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Package className="w-4 h-4" />
            <span className="font-medium">Total Pouches:</span>
            <span>{pouches.length}</span>
          </div>
        </CardContent>
      </Card>

      {/* Return Pouches Table */}
      <Card className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <CardHeader className="border-b border-gray-200 p-4 md:p-6">
          <CardTitle className="text-lg font-semibold text-gray-900">
            My Withdrawn Pouches
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 md:p-6">
          <CommonTable
            columns={columns}
            data={paginatedPouches}
            pagePagination={currentPage}
            totalPagesPagination={totalPages}
            onPageChangePagination={setCurrentPage}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default ReturnPouchScene;
