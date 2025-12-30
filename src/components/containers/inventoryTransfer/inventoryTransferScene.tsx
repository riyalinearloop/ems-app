"use client";

import { ArrowRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { CommonSelectInput } from "@/components/custom-components/commonSelectInput";

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
}

const InventoryTransferScene = (props: InventoryTransferSceneProps) => {
  const { locations, recentTransfers, transferStatusConfig } = props;

  return (
    <div className="space-y-6">
      {/* Inventory transfer card */}
      <Card className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <CardHeader className="border-b border-gray-200 p-6">
          <CardTitle className="text-lg font-semibold text-gray-900">
            Inventory Transfer
          </CardTitle>
          <CardDescription className="text-sm text-gray-600">
            Transfer medications between locations
          </CardDescription>
        </CardHeader>

        <CardContent className="p-6">
          <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* From location */}
            <div>
              {/* <label className="mb-2 block text-sm font-medium text-gray-700">
                From Location
              </label>
              <select className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-blue-500">
                {locations.map((loc) => (
                  <option key={loc.value || "placeholder"} value={loc.value}>
                    {loc.label}
                  </option>
                ))}
              </select> */}
              <CommonSelectInput
                label="From Location"
                placeholder="Select From Location"
                options={locations.filter((loc) => loc.value !== "")}
                value={undefined}
                onValueChange={(val) => {
                  const selected = locations.find((opt) => opt.value === val);
                  // if (selected) {
                  //   setValue("role", selected); // store { label, value }
                  // }
                }}
                className="w-full"
                
                // disabled={modalOpenMode !== MODE.ADD}
                // error={formState.errors.role?.message}
              />
            </div>

            {/* Arrow */}
            <div className="flex items-center justify-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50">
                <ArrowRight className="h-6 w-6 text-blue-600" />
              </div>
            </div>

            {/* To location */}
            <div>
              <CommonSelectInput
                label="To Location"
                placeholder="Select To Location"
                options={locations.filter((loc) => loc.value !== "")}
                value={undefined}
                onValueChange={(val) => {
                  const selected = locations.find((opt) => opt.value === val);
                  // Handle value change
                }}
                className="w-full"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent transfers table */}
      <Card className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <CardHeader className="border-b border-gray-200 p-6">
          <CardTitle className="text-lg font-semibold text-gray-900">
            Recent Transfers
          </CardTitle>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Transfer ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    From → To
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Medications
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {recentTransfers.map((transfer) => {
                  const statusConfig = transferStatusConfig[transfer.status];

                  return (
                    <tr key={transfer.id} className="hover:bg-gray-50">
                      <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                        {transfer.id}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                        {transfer.from} → {transfer.to}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                        {transfer.medications}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusConfig.badgeClasses} ${statusConfig.textClasses}`}
                        >
                          {statusConfig.label}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                        {transfer.date}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InventoryTransferScene;
