"use client";

import {
  Calendar,
  Plus,
  AlertTriangle,
  CheckCircle,
  Clock,
  Package,
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
import type {
  OrderHistoryRow,
  OrderMedication,
  IconName,
} from "../../data/order-management";
import { useState } from "react";

// Icon mapping for converting string identifiers to components
const iconMap: Record<IconName, React.ComponentType<{ className?: string }>> = {
  Clock,
  AlertTriangle,
  CheckCircle,
  Package,
};

interface OrderManagementSceneProps {
  expirySummaryRows: Array<{ name: string; detail: string }>;
  thresholdSummaryRows: Array<{ name: string; detail: string }>;
  orderHistoryRows: OrderHistoryRow[];
  orderStatusConfig: Record<
    string,
    {
      label: string;
      icon: IconName;
      badgeClasses: string;
      textClasses: string;
    }
  >;
  statusFlowSteps: Array<{
    label: string;
    icon: IconName;
    circleClasses: string;
  }>;
  onOpenOrderModal: () => void;
}

const OrderManagementScene = (props: OrderManagementSceneProps) => {
  const {
    orderHistoryRows,
    orderStatusConfig,
    statusFlowSteps,
    onOpenOrderModal,
  } = props;

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(orderHistoryRows.length / itemsPerPage);
  const paginatedOrders = orderHistoryRows.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const columns: ColumnType[] = [
    {
      title: "Order ID",
      dataIndex: "id",
      render: (value: string) => (
        <span className="font-semibold text-gray-900">{value}</span>
      ),
    },
    {
      title: "Medications",
      dataIndex: "medications",
      render: (value: OrderMedication[]) => (
        <div className="max-w-xs space-y-1">
          {value.map((medication: OrderMedication) => (
            <div key={medication.name} className="text-xs">
              {medication.name}:{" "}
              <span className="font-medium">{medication.amount}</span>
            </div>
          ))}
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (value: string, row: OrderHistoryRow) => {
        const statusConfig = orderStatusConfig[value];
        const StatusIcon = iconMap[statusConfig.icon];
        return (
          <span
            className={`inline-flex items-center space-x-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${statusConfig.badgeClasses} ${statusConfig.textClasses}`}
          >
            <StatusIcon className="h-4 w-4" />
            <span>{statusConfig.label}</span>
          </span>
        );
      },
    },
    {
      title: "Type",
      dataIndex: "typeVersion",
      render: (value: string, row: OrderHistoryRow) => (
        <div>
          <div className="font-medium text-sm">{value}</div>
          <div className="text-xs capitalize text-gray-400">
            {row.typeLabel}
          </div>
        </div>
      ),
    },
    {
      title: "Created",
      dataIndex: "created",
      render: (value: string) => <span className="text-gray-600">{value}</span>,
    },
    {
      title: "ETA",
      dataIndex: "eta",
      render: (value: string) =>
        value ? (
          <div className="flex items-center space-x-1">
            <Calendar className="h-3 w-3" />
            <span className="text-gray-600">{value}</span>
          </div>
        ) : (
          <span className="text-gray-400">-</span>
        ),
    },
    {
      title: "Actions",
      dataIndex: "id",
      render: () => (
        <CommonButton variant="secondary" size="sm">
          View Details
        </CommonButton>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header + primary action */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-left">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">
            Order Management
          </h2>
          <p className="text-sm md:text-base text-gray-600">
            Manage medication orders and authorization requests
          </p>
        </div>

        <CommonButton
          variant="primary"
          onClick={onOpenOrderModal}
          className="w-full sm:w-auto"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Order
        </CommonButton>
      </div>

      {/* Order history table */}
      {/* <Card className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <CardHeader className="border-b border-gray-200 p-4 md:p-6">
          <CardTitle className="text-lg font-semibold text-gray-900">
            Order History
          </CardTitle>
        </CardHeader>

        <CardContent className="p-4 md:p-6">
          <CommonTable
            columns={columns}
            data={paginatedOrders}
            pagePagination={currentPage}
            totalPagesPagination={totalPages}
            onPageChangePagination={setCurrentPage}
          />
        </CardContent>
      </Card> */}

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Order History
            </h3>
          </div>
        </div>
        <CommonTable
          columns={columns}
          data={paginatedOrders}
          pagePagination={currentPage}
          totalPagesPagination={totalPages}
          onPageChangePagination={setCurrentPage}
        />
      </div>

      {/* Order status flow */}
      <Card className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <CardHeader className="border-b border-gray-200 p-4 md:p-6">
          <CardTitle className="text-lg font-semibold text-gray-900">
            Order Status Flow
          </CardTitle>
          <CardDescription className="text-sm text-gray-600">
            Track the progress of your orders through the system
          </CardDescription>
        </CardHeader>

        <CardContent className="p-4 md:p-6">
          <div className="flex items-start justify-center overflow-x-auto pb-2">
            {statusFlowSteps.flatMap((step, index) => {
              const StepIcon = iconMap[step.icon];
              const elements = [
                <div key={step.label} className="flex flex-col items-center">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full ${step.circleClasses}`}
                  >
                    <StepIcon className="h-4 w-4" />
                  </div>
                  <span className="mt-2 text-center text-xs font-medium text-gray-600 whitespace-nowrap">
                    {step.label}
                  </span>
                </div>,
              ];

              if (index < statusFlowSteps.length - 1) {
                elements.push(
                  <div
                    key={`line-${index}`}
                    className="flex-1 h-0.5 bg-gray-200 mx-2 min-w-[40px] relative top-5"
                  />
                );
              }

              return elements;
            })}
          </div>
        </CardContent>
      </Card>

    </div>
  );
};

export default OrderManagementScene;
