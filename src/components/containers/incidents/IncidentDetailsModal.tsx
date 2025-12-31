"use client";

import { CommonDialog } from "@/components/custom-components/commonDialog";
import CommonButton from "@/components/custom-components/commonButton";
import {
  AlertTriangle,
  CheckCircle,
  Shield,
  Phone,
  FileText,
  Hexagon,
} from "lucide-react";
import type { Incident } from "@/components/data/incidents";

interface IncidentDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  incident: Incident | null;
}

interface RegulatoryReport {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  checked: boolean;
}

const IncidentDetailsModal = ({
  isOpen,
  onClose,
  incident,
}: IncidentDetailsModalProps) => {
  if (!incident) return null;

  // Format date from DD/MM/YYYY to M/D/YYYY
  const formatDate = (dateStr: string) => {
    const [day, month, year] = dateStr.split("/");
    return `${parseInt(month)}/${parseInt(day)}/${year}`;
  };

  // Get severity from incident data, default to "high"
  const severity = incident.severity || "high";

  // Affected medications from incident data
  const affectedMedications = incident.affectedMedications || [];

  // Description from incident data
  const description = incident.description || "No description provided.";

  // Regulatory reporting compliance from incident data
  const regulatoryReportsData = incident.regulatoryReports || {
    ehs: false,
    cper: false,
    police: false,
    healthCanada: false,
  };

  const regulatoryReports: RegulatoryReport[] = [
    {
      id: "ehs",
      name: "EHS",
      icon: Shield,
      checked: regulatoryReportsData.ehs,
    },
    {
      id: "cper",
      name: "CPER",
      icon: FileText,
      checked: regulatoryReportsData.cper,
    },
    {
      id: "police",
      name: "Police",
      icon: Phone,
      checked: regulatoryReportsData.police,
    },
    {
      id: "health-canada",
      name: "Health Canada",
      icon: Hexagon,
      checked: regulatoryReportsData.healthCanada,
    },
  ];

  const handleUpdateStatus = () => {
    // Handle update status action
    console.log("Update status clicked");
  };

  const handleExportReport = () => {
    // Handle export report action
    console.log("Export report clicked");
  };

  const footerActions = (
    <>
      <CommonButton
        variant="secondary"
        size="sm"
        type="button"
        onClick={handleExportReport}
        className="w-30 bg-gray-600 hover:bg-gray-700 text-white"
      >
        Export Report
      </CommonButton>
      <CommonButton
        variant="primary"
        size="sm"
        type="button"
        onClick={handleUpdateStatus}
        className="w-30"
      >
        Update Status
      </CommonButton>
    </>
  );

  const isOpenStatus = incident.status === "open";
  const StatusIcon = isOpenStatus ? AlertTriangle : CheckCircle;

  return (
    <CommonDialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
      title="Incident Details"
      description={incident.id}
      showFooter={true}
      footerActions={footerActions}
      dialogContentClassName="max-w-[95%] md:max-w-[90%] lg:max-w-[800px]"
    >
      <div className="max-h-[75vh] overflow-y-auto px-4 py-5 sm:px-6 sm:py-6 space-y-6">
        {/* Incident Information Section */}
        <div>
          <h4 className="text-base font-semibold text-gray-900 mb-4">
            Incident Information
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                Type
              </label>
              <p className="text-sm text-gray-900">{incident.type}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                Location
              </label>
              <p className="text-sm text-gray-900">{incident.location}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                Reported By
              </label>
              <p className="text-sm text-gray-900">{incident.reportedBy}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                Date
              </label>
              <p className="text-sm text-gray-900">
                {formatDate(incident.reportedDate)}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                Status
              </label>
              <span
                className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  isOpenStatus
                    ? "bg-red-100 text-red-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                <StatusIcon className="w-4 h-4" />
                <span className="capitalize">{incident.status}</span>
              </span>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                Severity
              </label>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  severity === "high"
                    ? "bg-orange-100 text-orange-800"
                    : severity === "medium"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-green-100 text-green-800"
                }`}
              >
                {severity}
              </span>
            </div>
          </div>
        </div>

        {/* Affected Medications Section */}
        <div>
          <h4 className="text-base font-semibold text-gray-900 mb-4">
            Affected Medications
          </h4>
          <div className="flex flex-wrap gap-2">
            {affectedMedications.map((medication, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800"
              >
                {medication}
              </span>
            ))}
          </div>
        </div>

        {/* Description Section */}
        <div>
          <h4 className="text-base font-semibold text-gray-900 mb-4">
            Description
          </h4>
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <p className="text-sm text-gray-700 whitespace-pre-wrap">
              {description}
            </p>
          </div>
        </div>

        {/* Regulatory Reporting Compliance Section */}
        <div>
          <h4 className="text-base font-semibold text-gray-900 mb-4">
            Regulatory Reporting Compliance
          </h4>
          <div className="space-y-3">
            {regulatoryReports.map((report) => {
              const Icon = report.icon;
              return (
                <div
                  key={report.id}
                  className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <Icon className="w-5 h-5 text-gray-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {report.name}
                    </span>
                  </div>
                  <div
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                      report.checked
                        ? "bg-blue-600 border-blue-600"
                        : "border-gray-300"
                    }`}
                  >
                    {report.checked && (
                      <CheckCircle className="w-4 h-4 text-white" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </CommonDialog>
  );
};

export default IncidentDetailsModal;

