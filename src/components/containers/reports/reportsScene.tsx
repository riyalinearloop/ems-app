"use client";

import React, { useState } from "react";
import {
  FileText,
  Download,
  Calendar,
  TrendingUp,
  Package,
  User,
  Plus,
  FileBarChart,
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
import type {
  ReportHistoryRow,
  ReportStats,
  QuickReportTemplate,
} from "@/components/data/reports";

interface ReportsSceneProps {
  reportHistory: ReportHistoryRow[];
  reportStats: ReportStats;
  quickReportTemplates: QuickReportTemplate[];
}

const ReportsScene = ({
  reportHistory,
  reportStats,
  quickReportTemplates,
}: ReportsSceneProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(reportHistory.length / itemsPerPage);
  const paginatedReports = reportHistory.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getReportTypeColor = (type: string) => {
    switch (type) {
      case "medication":
        return {
          bg: "bg-blue-100",
          text: "text-blue-800",
          icon: "text-blue-600",
        };
      case "inventory":
        return {
          bg: "bg-green-100",
          text: "text-green-800",
          icon: "text-green-600",
        };
      case "paramedic":
        return {
          bg: "bg-purple-100",
          text: "text-purple-800",
          icon: "text-purple-600",
        };
      default:
        return {
          bg: "bg-gray-100",
          text: "text-gray-800",
          icon: "text-gray-600",
        };
    }
  };

  const formatReportType = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  const columns: ColumnType[] = [
    {
      title: "Report ID",
      dataIndex: "id",
      render: (value: string) => (
        <span className="font-semibold text-gray-900">{value}</span>
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      render: (value: string, row: ReportHistoryRow) => (
        <span className="text-gray-900">
          {value || (
            <span className="text-gray-400 italic">
              {row.subtype
                ? `${formatReportType(row.type)} - ${formatReportType(row.subtype)}`
                : formatReportType(row.type)}
            </span>
          )}
        </span>
      ),
    },
    {
      title: "Type",
      dataIndex: "type",
      render: (value: string, row: ReportHistoryRow) => {
        const typeColors = getReportTypeColor(value);
        return (
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${typeColors.bg} ${typeColors.text}`}
          >
            {formatReportType(value)}
            {row.subtype && (
              <span className="ml-1">({formatReportType(row.subtype)})</span>
            )}
          </span>
        );
      },
    },
    {
      title: "Period",
      dataIndex: "period",
      render: (value: string) => <span className="text-gray-500">{value || "-"}</span>,
    },
    {
      title: "Generated",
      dataIndex: "generated",
      render: (value: string) => (
        <div className="flex items-center gap-1">
          {value !== "Invalid Date" ? (
            <>
              <Calendar className="w-4 h-4 text-gray-400" />
              <span className="text-gray-500">{value}</span>
            </>
          ) : (
            <span className="text-gray-400">-</span>
          )}
        </div>
      ),
    },
    {
      title: "Actions",
      dataIndex: "id",
      render: () => (
        <CommonButton variant="secondary" size="sm">
          <Download className="w-4 h-4 mr-1" />
          Download
        </CommonButton>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <Card className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <CardHeader className="border-b border-gray-200 p-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle className="text-xl md:text-2xl font-bold text-gray-900 flex items-center">
                <FileBarChart className="w-5 h-5 md:w-6 md:h-6 mr-2 md:mr-3 text-blue-600" />
                Reports
              </CardTitle>
              <CardDescription className="text-sm md:text-base text-gray-600">
                Generate and manage system reports
              </CardDescription>
            </div>
            <CommonButton variant="primary">
              <Plus className="w-4 h-4 mr-2" />
              Generate Report
            </CommonButton>
          </div>
        </CardHeader>
        <CardContent className="p-4 md:p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            <StatCard
              label="Medication Reports"
              value={reportStats.medication}
              iconColor="text-blue-600"
              bgColor="bg-blue-50"
            />
            <StatCard
              label="Inventory Reports"
              value={reportStats.inventory}
              iconColor="text-green-600"
              bgColor="bg-green-50"
            />
            <StatCard
              label="Paramedic Reports"
              value={reportStats.paramedic}
              iconColor="text-purple-600"
              bgColor="bg-purple-50"
            />
            <StatCard
              label="This Month"
              value={reportStats.thisMonth}
              iconColor="text-orange-600"
              bgColor="bg-orange-50"
            />
          </div>
        </CardContent>
      </Card>

      {/* Quick Report Templates */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4 px-2">
          Quick Report Templates
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {quickReportTemplates.map((template) => (
            <QuickReportCard key={template.id} template={template} />
          ))}
        </div>
      </div>

      {/* Report History */}
      <Card className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <CardHeader className="border-b border-gray-200 p-4 md:p-6">
          <CardTitle className="text-lg font-semibold text-gray-900">
            Report History
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

interface StatCardProps {
  label: string;
  value: number;
  iconColor: string;
  bgColor: string;
}

const StatCard = ({ label, value, iconColor, bgColor }: StatCardProps) => {
  return (
    <div className={`text-center p-4 rounded-lg ${bgColor}`}>
      <p className={`text-2xl font-bold ${iconColor}`}>{value}</p>
      <p className="text-sm text-gray-600 mt-1">{label}</p>
    </div>
  );
};

interface QuickReportCardProps {
  template: QuickReportTemplate;
}

const QuickReportCard = ({ template }: QuickReportCardProps) => {
  const iconColors = {
    blue: "text-blue-600 bg-blue-50",
    green: "text-green-600 bg-green-50",
    purple: "text-purple-600 bg-purple-50",
  };

  return (
    <Card className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div
          className={`w-12 h-12 rounded-lg ${iconColors[template.iconColor]} flex items-center justify-center mb-4`}
        >
          <FileText className="w-6 h-6" />
        </div>
        <h4 className="font-semibold text-gray-900 mb-2">{template.title}</h4>
        <p className="text-sm text-gray-600 mb-4">{template.description}</p>
        <CommonButton variant="secondary" size="sm" className="w-full">
          Generate
        </CommonButton>
      </CardContent>
    </Card>
  );
};

export default ReportsScene;

