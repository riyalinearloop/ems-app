"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  Package,
  Activity,
  CheckCircle,
  User,
  Clock,
  Eye,
  SquareChevronLeft,
  SquareChevronRight,
} from "lucide-react";
import type { Pouch, PouchStats } from "@/components/data/live-pouch-status";

interface LivePouchSceneProps {
  pouches: Pouch[];
  pouchStats: PouchStats;
  onSignOutPouch?: () => void;
  onSignInPouch?: () => void;
  onBulkUpdate?: () => void;
  onViewDetails?: (pouch: Pouch) => void;
  itemsPerPage?: number;
}

const LivePouchScene = ({
  pouches,
  pouchStats,
  onSignOutPouch,
  onSignInPouch,
  onBulkUpdate,
  onViewDetails,
  itemsPerPage = 12,
}: LivePouchSceneProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Reset to page 1 when pouches array changes
  useEffect(() => {
    setCurrentPage(1);
  }, [pouches.length]);

  // Calculate pagination
  const totalPages = Math.ceil(pouches.length / itemsPerPage);
  const paginatedPouches = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return pouches.slice(startIndex, endIndex);
  }, [pouches, currentPage, itemsPerPage]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      // Scroll to top of pouches section
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Live Pouch Status</h2>
        <p className="text-gray-600">
          Real-time monitoring of controlled substance pouches
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          label="Total Pouches"
          value={pouchStats.totalPouches}
          icon={Package}
          iconBgColor="bg-blue-50"
          iconColor="text-blue-600"
        />
        <StatCard
          label="Signed Out"
          value={pouchStats.signedOut}
          icon={Activity}
          iconBgColor="bg-green-50"
          iconColor="text-green-600"
        />
        <StatCard
          label="Signed In"
          value={pouchStats.signedIn}
          icon={Package}
          iconBgColor="bg-gray-50"
          iconColor="text-gray-600"
        />
        <StatCard
          label="Full Pouches"
          value={pouchStats.fullPouches}
          icon={CheckCircle}
          iconBgColor="bg-green-50"
          iconColor="text-green-600"
        />
      </div>

      {/* Pouches Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {paginatedPouches.map((pouch) => (
          <PouchCard
            key={pouch.id}
            pouch={pouch}
            onViewDetails={onViewDetails}
          />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 pt-4">
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            className="flex items-center justify-center w-10 h-10 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Previous page"
          >
            <SquareChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-sm text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            className="flex items-center justify-center w-10 h-10 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Next page"
          >
            <SquareChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <QuickActionButton
              icon={Package}
              iconColor="text-blue-600"
              title="Sign Out Pouch"
              description="Assign pouch to paramedic"
              onClick={onSignOutPouch}
            />
            <QuickActionButton
              icon={CheckCircle}
              iconColor="text-green-600"
              title="Sign In Pouch"
              description="Return and verify pouch"
              onClick={onSignInPouch}
            />
            <QuickActionButton
              icon={Activity}
              iconColor="text-purple-600"
              title="Bulk Update"
              description="Update multiple pouches"
              onClick={onBulkUpdate}
            />
          </div>
        </div>
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

interface PouchCardProps {
  pouch: Pouch;
  onViewDetails?: (pouch: Pouch) => void;
}

const PouchCard = ({ pouch, onViewDetails }: PouchCardProps) => {
  const isSignedOut = pouch.status === "Signed Out";
  const isFull = pouch.fullness === "Full";
  const totalItems = pouch.medications.reduce(
    (sum, med) => sum + med.quantity,
    0
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            {pouch.pouchNumber}
          </h3>
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              isSignedOut
                ? "bg-green-100 text-green-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {pouch.status}
          </span>
        </div>

        {/* User and Time */}
        <div className="mb-4">
          <div
            className={`flex items-center text-sm ${
              pouch.assignedTo ? "text-gray-600" : "text-gray-400"
            }`}
          >
            <User className="w-4 h-4 mr-2" />
            <span>{pouch.assignedTo || "Unassigned"}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500 mt-1">
            <Clock className="w-4 h-4 mr-2" />
            <span>{pouch.timeAgo}</span>
          </div>
        </div>

        {/* Inventory */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">
            Inventory ({totalItems} items)
          </h4>
          <div className="flex flex-wrap gap-2">
            {pouch.medications.map((med, index) => {
              const displayText = med.abbreviation
                ? `${med.abbreviation}: ${med.quantity}`
                : `${med.name.substring(0, 3)}: ${med.quantity}`;
              return (
                <button
                  key={index}
                  className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium hover:bg-blue-100 transition-colors"
                  title={`${med.name}: ${med.quantity} units`}
                >
                  {displayText}
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div
            className={`flex items-center text-sm ${
              isFull ? "text-green-600" : "text-orange-600"
            }`}
          >
            <CheckCircle className="w-4 h-4 mr-1" />
            <span>{pouch.fullness}</span>
          </div>
          <button
            onClick={() => onViewDetails?.(pouch)}
            className="flex items-center text-sm text-blue-600 hover:text-blue-800"
          >
            <Eye className="w-4 h-4 mr-1" />
            <span>Details</span>
          </button>
        </div>
      </div>
    </div>
  );
};

interface QuickActionButtonProps {
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
  title: string;
  description: string;
  onClick?: () => void;
}

const QuickActionButton = ({
  icon: Icon,
  iconColor,
  title,
  description,
  onClick,
}: QuickActionButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
    >
      <div className="text-center">
        <Icon className={`w-6 h-6 ${iconColor} mx-auto mb-2`} />
        <p className="text-sm font-medium text-gray-900">{title}</p>
        <p className="text-xs text-gray-500">{description}</p>
      </div>
    </button>
  );
};

export default LivePouchScene;
