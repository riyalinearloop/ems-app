"use client";

import { useState } from "react";
import { CommonDialog } from "@/components/custom-components/commonDialog";
import CommonButton from "@/components/custom-components/commonButton";
import { CommonSelectInput } from "@/components/custom-components/commonSelectInput";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Substance {
  id: string;
  medication: string;
  dosageType: string;
  quantity: number;
  reasonForLoss: string;
  lastKnownLocation: string;
  discoveryDetails: string;
}

interface IncidentReportModalProps {
  isOpen: boolean;
  onClose: (data?: unknown) => void;
  medications: Array<{ value: string; label: string }>;
  dosageTypes: Array<{ value: string; label: string }>;
  lossReasons: Array<{ value: string; label: string }>;
}

const IncidentReportModal = (props: IncidentReportModalProps) => {
  const {
    isOpen,
    onClose,
    medications = [],
    dosageTypes = [],
    lossReasons = [],
  } = props;

  const [formData, setFormData] = useState({
    location: "",
    discoveryDate: "",
    discoveryTime: "",
    circumstances: "",
    witnessName: "",
    witnessContact: "",
    policeNotified: false,
    additionalNotes: "",
  });

  const [substances, setSubstances] = useState<Substance[]>([
    {
      id: "1",
      medication: "",
      dosageType: "",
      quantity: 1,
      reasonForLoss: "",
      lastKnownLocation: "",
      discoveryDetails: "",
    },
  ]);

  // Handle form field changes
  const handleFieldChange = (field: string, value: unknown) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Handle substance field changes
  const handleSubstanceChange = (
    id: string,
    field: keyof Substance,
    value: unknown
  ) => {
    setSubstances((prev) =>
      prev.map((sub) => (sub.id === id ? { ...sub, [field]: value } : sub))
    );
  };

  // Add new substance
  const handleAddSubstance = () => {
    setSubstances((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        medication: "",
        dosageType: "",
        quantity: 1,
        reasonForLoss: "",
        lastKnownLocation: "",
        discoveryDetails: "",
      },
    ]);
  };

  // Remove substance
  const handleRemoveSubstance = (id: string) => {
    setSubstances((prev) => prev.filter((sub) => sub.id !== id));
  };

  // Handle form submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const incidentData = {
      ...formData,
      substances,
    };
    onClose(incidentData);
    // Reset form
    handleClose();
  };

  // Handle close
  const handleClose = () => {
    setFormData({
      location: "",
      discoveryDate: "",
      discoveryTime: "",
      circumstances: "",
      witnessName: "",
      witnessContact: "",
      policeNotified: false,
      additionalNotes: "",
    });
    setSubstances([
      {
        id: "1",
        medication: "",
        dosageType: "",
        quantity: 1,
        reasonForLoss: "",
        lastKnownLocation: "",
        discoveryDetails: "",
      },
    ]);
    onClose();
  };

  const footerActions = (
    <>
      <CommonButton
        variant="secondary"
        size="sm"
        type="button"
        onClick={handleClose}
        className="w-full sm:w-auto"
      >
        Cancel
      </CommonButton>
      <CommonButton
        variant="primary"
        type="submit"
        size="sm"
        className="w-full sm:w-auto bg-red-600 hover:bg-red-700"
      >
        Report Incident
      </CommonButton>
    </>
  );

  return (
    <CommonDialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) handleClose();
      }}
      title="Report Lost/Stolen Controlled Substances"
      description="Document lost or stolen controlled substances incident"
      showFooter={true}
      footerActions={footerActions}
      onSubmit={handleSubmit}
      dialogContentClassName="max-w-[95%] md:max-w-[90%] lg:max-w-[900px]"
    >
      <form onSubmit={handleSubmit}>
        <div className="max-h-[70vh] sm:max-h-[75vh] overflow-y-auto px-3 sm:px-4 md:px-6 py-4 sm:py-5 md:py-6 space-y-4 sm:space-y-5 md:space-y-6">
          {/* Incident Information Section */}
          <div>
            <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-3 sm:mb-4">
              Incident Information
            </h4>
            <div className="space-y-3 sm:space-y-4">
              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location Where Loss Discovered{" "}
                  <span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  placeholder="e.g., 5040 Mainway, Burlington"
                  value={formData.location}
                  onChange={(e) =>
                    handleFieldChange("location", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Date and Time Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {/* Discovery Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Discovery Date <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Input
                      type="date"
                      value={formData.discoveryDate}
                      onChange={(e) =>
                        handleFieldChange("discoveryDate", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                {/* Discovery Time */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Discovery Time
                  </label>
                  <div className="relative">
                    <Input
                      type="time"
                      value={formData.discoveryTime}
                      onChange={(e) =>
                        handleFieldChange("discoveryTime", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Circumstances */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Circumstances of Discovery{" "}
                  <span className="text-red-500">*</span>
                </label>
                <textarea
                  placeholder="Describe how and when the loss was discovered, including any relevant circumstances..."
                  value={formData.circumstances}
                  onChange={(e) =>
                    handleFieldChange("circumstances", e.target.value)
                  }
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  required
                />
              </div>

              {/* Witness Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Witness Name (if applicable)
                  </label>
                  <Input
                    type="text"
                    value={formData.witnessName}
                    onChange={(e) =>
                      handleFieldChange("witnessName", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Witness Contact Information
                  </label>
                  <Input
                    type="text"
                    placeholder="Phone number or email"
                    value={formData.witnessContact}
                    onChange={(e) =>
                      handleFieldChange("witnessContact", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Police Notification Checkbox */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="policeNotified"
                  checked={formData.policeNotified}
                  onChange={(e) =>
                    handleFieldChange("policeNotified", e.target.checked)
                  }
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label
                  htmlFor="policeNotified"
                  className="ml-2 text-sm text-gray-700"
                >
                  Police have been notified of this incident
                </label>
              </div>
            </div>
          </div>

          {/* Lost Substances Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-base font-semibold text-gray-900">
                Lost Substances
              </h4>
              <Button
                type="button"
                onClick={handleAddSubstance}
                className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                <Plus className="w-4 h-4" />
                <span>Add Substance</span>
              </Button>
            </div>

            <div className="space-y-4 sm:space-y-5 md:space-y-6">
              {substances.map((substance, index) => (
                <div
                  key={substance.id}
                  className="border border-gray-200 rounded-lg p-3 sm:p-4 bg-gray-50"
                >
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <h5 className="text-xs sm:text-sm font-semibold text-gray-900">
                      Substance #{index + 1}
                    </h5>
                    {substances.length > 1 && (
                      <Button
                        type="button"
                        onClick={() => handleRemoveSubstance(substance.id)}
                        className="text-red-600 hover:text-red-700 text-xs sm:text-sm"
                        variant="ghost"
                      >
                        Remove
                      </Button>
                    )}
                  </div>

                  <div className="space-y-3 sm:space-y-4">
                    {/* Medication */}
                    <CommonSelectInput
                      label={
                        <>
                          Medication <span className="text-red-500">*</span>
                        </>
                      }
                      placeholder="Select medication..."
                      options={medications}
                      value={substance.medication}
                      onValueChange={(value) =>
                        handleSubstanceChange(substance.id, "medication", value)
                      }
                      className="w-full"
                    />

                    {/* Dosage Type and Quantity Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <CommonSelectInput
                        label={
                          <>
                            Dosage Type <span className="text-red-500">*</span>
                          </>
                        }
                        placeholder="Select type..."
                        options={dosageTypes}
                        value={substance.dosageType}
                        onValueChange={(value) =>
                          handleSubstanceChange(
                            substance.id,
                            "dosageType",
                            value
                          )
                        }
                        className="w-full"
                      />
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Quantity <span className="text-red-500">*</span>
                        </label>
                        <Input
                          type="number"
                          min="1"
                          value={substance.quantity}
                          onChange={(e) =>
                            handleSubstanceChange(
                              substance.id,
                              "quantity",
                              parseInt(e.target.value) || 1
                            )
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        />
                      </div>
                    </div>

                    {/* Reason for Loss */}
                    <CommonSelectInput
                      label={
                        <>
                          Reason for Loss{" "}
                          <span className="text-red-500">*</span>
                        </>
                      }
                      placeholder="Select reason..."
                      options={lossReasons}
                      value={substance.reasonForLoss}
                      onValueChange={(value) =>
                        handleSubstanceChange(
                          substance.id,
                          "reasonForLoss",
                          value
                        )
                      }
                      className="w-full"
                    />

                    {/* Last Known Location */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Known Location
                      </label>
                      <Input
                        type="text"
                        placeholder="Where was this substance last seen or used?"
                        value={substance.lastKnownLocation}
                        onChange={(e) =>
                          handleSubstanceChange(
                            substance.id,
                            "lastKnownLocation",
                            e.target.value
                          )
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    {/* Discovery Details */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Discovery Details
                      </label>
                      <textarea
                        placeholder="Specific details about how this substance was discovered to be missing..."
                        value={substance.discoveryDetails}
                        onChange={(e) =>
                          handleSubstanceChange(
                            substance.id,
                            "discoveryDetails",
                            e.target.value
                          )
                        }
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Notes Section */}
          <div>
            <h4 className="text-base font-semibold text-gray-900 mb-4">
              Additional Notes or Comments
            </h4>
            <textarea
              placeholder="Any additional information that may be relevant to this incident..."
              value={formData.additionalNotes}
              onChange={(e) =>
                handleFieldChange("additionalNotes", e.target.value)
              }
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>
        </div>
      </form>
    </CommonDialog>
  );
};

export default IncidentReportModal;
