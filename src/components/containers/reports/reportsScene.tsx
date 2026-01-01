"use client";

import { useState } from "react";
import {
  Calendar,
  Download,
  FileText,
  Filter,
  Package,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CommonButton from "@/components/custom-components/commonButton";
import {
  CommonTable,
  ColumnType,
} from "@/components/custom-components/commonTable";
import type {
  ReportHistoryRow,
  ReportStats,
  QuickReportTemplate,
} from "@/components/data/reports";

type ReportTabType = "medication" | "inventory" | "paramedic";

interface ReportsSceneProps {
  reportHistory: ReportHistoryRow[];
  reportStats: ReportStats;
  quickReportTemplates: QuickReportTemplate[];
  activeTab?: ReportTabType;
  onTabChange?: (tab: ReportTabType) => void;
  onGenerateReport?: () => void;
}

const ReportsScene = ({
  reportHistory,
  reportStats: _reportStats,
  quickReportTemplates,
  activeTab = "medication",
  onTabChange,
  onGenerateReport,
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
                ? `${formatReportType(row.type)} - ${formatReportType(
                    row.subtype
                  )}`
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
      render: (value: string) => (
        <span className="text-gray-500">{value || "-"}</span>
      ),
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

  const reportTabs = [
    {
      key: "medication" as ReportTabType,
      label: "Medication Reports",
      icon: FileText,
    },
    {
      key: "inventory" as ReportTabType,
      label: "Inventory Reports",
      icon: Package,
    },
    {
      key: "paramedic" as ReportTabType,
      label: "Paramedic Reports",
      icon: FileText,
    },
  ];

  return (
    <div className="space-y-4 sm:space-y-6 px-2 sm:px-0">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
            <div className="flex-1 min-w-0">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                Reports Module
              </h2>
              <p className="text-sm sm:text-base text-gray-600 mt-1">
                Generate and download medication and inventory reports
              </p>
            </div>
            <button
              onClick={onGenerateReport}
              className="flex items-center justify-center space-x-2 px-3 sm:px-4 py-2 text-sm sm:text-base bg-blue-600 text-white rounded-lg hover:bg-blue-700 whitespace-nowrap w-full sm:w-auto"
            >
              <Filter className="w-4 h-4 flex-shrink-0" />
              <span>Generate Report</span>
            </button>
          </div>
        </div>
        <div className="p-4 sm:p-6">
          <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1 flex-wrap gap-1">
            {reportTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => onTabChange?.(tab.key)}
                  className={`flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-colors text-xs sm:text-sm ${
                    isActive
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <Icon className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                  <span className="whitespace-nowrap">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Quick Report Templates */}
      <div>
        <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 px-2">
          Quick Report Templates
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
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

// StatCard component removed - not currently used

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
          className={`w-12 h-12 rounded-lg ${
            iconColors[template.iconColor]
          } flex items-center justify-center mb-4`}
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
