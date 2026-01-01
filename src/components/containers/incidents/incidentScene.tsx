"use client";

import {
  AlertTriangle,
  CheckCircle,
  Eye,
  Phone,
  Plus,
  Shield,
} from "lucide-react";
import {
  ColumnType,
  CommonTable,
} from "@/components/custom-components/commonTable";
import { useState } from "react";
import type { Incident, IncidentStats } from "@/components/data/incidents";

interface IncidentSceneProps {
  incidents: Incident[];
  incidentStats: IncidentStats;
  onOpenReportModal?: () => void;
  onOpenDetailsModal?: (incident: Incident) => void;
}

const IncidentScene = ({
  incidents,
  incidentStats,
  onOpenReportModal,
  onOpenDetailsModal,
}: IncidentSceneProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(incidents.length / itemsPerPage);
  const paginatedIncidents = incidents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const columns: ColumnType[] = [
    {
      title: "Incident ID",
      dataIndex: "id",
      render: (value: string) => (
        <span className="text-sm font-medium text-gray-900">{value}</span>
      ),
    },
    {
      title: "Type",
      dataIndex: "type",
      render: (value: string) => (
        <span className="text-sm text-gray-500">{value}</span>
      ),
    },
    {
      title: "Location",
      dataIndex: "location",
      render: (value: string) => (
        <span className="text-sm text-gray-500">{value}</span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (value: string) => {
        const isOpen = value === "open";
        const StatusIcon = isOpen ? AlertTriangle : CheckCircle;
        return (
          <span
            className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
              isOpen ? "bg-red-100 text-red-800" : "bg-gray-100 text-gray-800"
            }`}
          >
            <StatusIcon className="w-4 h-4" />
            <span className="capitalize">{value}</span>
          </span>
        );
      },
    },
    {
      title: "Reported",
      dataIndex: "reportedBy",
      render: (value: string, row: Incident) => (
        <div>
          <div className="font-medium text-sm text-gray-500">{value}</div>
          <div className="text-xs text-gray-400">{row.reportedDate}</div>
        </div>
      ),
    },
    {
      title: "Reports",
      dataIndex: "reportsCompleted",
      render: (value: number, row: Incident) => (
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium bg-orange-100 text-orange-800">
            {value}/{row.reportsRequired}
          </div>
        </div>
      ),
    },
    {
      title: "Actions",
      dataIndex: "id",
      render: (_value: string, row: Incident) => (
        <button
          onClick={() => onOpenDetailsModal?.(row)}
          className="flex items-center space-x-1 text-xs sm:text-sm text-blue-600 hover:text-blue-800 whitespace-nowrap"
        >
          <Eye className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
          <span className="hidden sm:inline">View Details</span>
          <span className="sm:hidden">View</span>
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-4 sm:space-y-6 px-2 sm:px-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0">
        <div className="flex-1 min-w-0">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            Incidents Management
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mt-1">
            Track and manage controlled substance incidents with regulatory
            compliance
          </p>
        </div>
        {onOpenReportModal && (
          <button
            onClick={onOpenReportModal}
            className="flex items-center justify-center space-x-2 px-3 sm:px-4 py-2 text-sm sm:text-base bg-red-600 text-white rounded-lg hover:bg-red-700 whitespace-nowrap w-full sm:w-auto"
          >
            <Plus className="w-4 h-4 flex-shrink-0" />
            <span>Report Incident</span>
          </button>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
        <StatCard
          label="Open Incidents"
          value={incidentStats.openIncidents}
          icon={AlertTriangle}
          iconBgColor="bg-red-50"
          iconColor="text-red-600"
        />
        <StatCard
          label="Closed"
          value={incidentStats.closedIncidents}
          icon={CheckCircle}
          iconBgColor="bg-gray-50"
          iconColor="text-gray-600"
        />
        <StatCard
          label="EHS Reports"
          value={incidentStats.ehsReports}
          icon={Shield}
          iconBgColor="bg-blue-50"
          iconColor="text-blue-600"
        />
        <StatCard
          label="Police Reports"
          value={incidentStats.policeReports}
          icon={Phone}
          iconBgColor="bg-red-50"
          iconColor="text-red-600"
        />
      </div>

      {/* Incidents Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900">
            Incident Tracking
          </h3>
        </div>
        <CommonTable
          columns={columns}
          data={paginatedIncidents}
          pagePagination={currentPage}
          totalPagesPagination={totalPages}
          onPageChangePagination={setCurrentPage}
        />
      </div>
    </div>
  );
};

interface StatCardProps {
  label: string;
  value: number;
  icon: React.ComponentType<{ className?: string }>;
  iconBgColor: string;
  iconColor: string;
}

const StatCard = ({
  label,
  value,
  icon: Icon,
  iconBgColor,
  iconColor,
}: StatCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center">
        <div className={`p-2 ${iconBgColor} rounded-lg`}>
          <Icon className={`w-6 h-6 ${iconColor}`} />
        </div>
        <div className="ml-4">
          <p className="text-sm text-gray-600">{label}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );
};

export default IncidentScene;
