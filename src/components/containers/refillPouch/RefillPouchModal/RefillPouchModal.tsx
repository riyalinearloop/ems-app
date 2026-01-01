"use client";

import { useState, useEffect } from "react";
import { CommonDialog } from "@/components/custom-components/commonDialog";
import {
  CommonStepper,
  type StepperStep,
} from "@/components/custom-components/commonStepper";
import { CommonModalFooter } from "@/components/custom-components/commonModalFooter";
import { CommonStepContentWrapper } from "@/components/custom-components/commonStepContentWrapper";
import Step1SelectPouchAndLocation from "./Steps/Step1SelectPouchAndLocation";
import Step2RefillQuantities from "./Steps/Step2RefillQuantities";
import Step3RefillWitnessSignature from "./Steps/Step3RefillWitnessSignature";
import type { SignedOutPouch } from "@/components/data/pouch-management";
import { SIGNED_OUT_POUCHES } from "@/components/data/pouch-management";

interface RefillFormData {
  selectedPouchId?: string;
  refillLocation?: string;
  refillQuantities: Record<string, number>;
  omitWitness: boolean;
  witnessName?: string;
  witnessSignature?: string;
  witnessDate?: string;
}

interface RefillPouchModalProps {
  isOpen: boolean;
  onClose: (data?: any) => void;
  signedOutPouches?: SignedOutPouch[];
}

const STEPS: StepperStep[] = [
  { id: "select", label: "Select Pouch and Location" },
  { id: "refill", label: "Refill Quantities" },
  { id: "witness", label: "Witness Signature" },
];

const REFILL_LOCATIONS = [
  "Station 1",
  "Station 2",
  "Hospital",
  "Pharmacy",
  "Central Supply",
];

const RefillPouchModal = ({
  isOpen,
  onClose,
  signedOutPouches = SIGNED_OUT_POUCHES.filter((p) => p.status === "Active"),
}: RefillPouchModalProps) => {
  const [activeStepId, setActiveStepId] = useState(STEPS[0]?.id || "select");
  const [formData, setFormData] = useState<RefillFormData>({
    selectedPouchId: undefined,
    refillLocation: undefined,
    refillQuantities: {},
    omitWitness: false,
    witnessName: undefined,
    witnessSignature: undefined,
    witnessDate: undefined,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedPouch, setSelectedPouch] = useState<SignedOutPouch | null>(
    null
  );

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setFormData({
        selectedPouchId: undefined,
        refillLocation: undefined,
        refillQuantities: {},
        omitWitness: false,
        witnessName: undefined,
        witnessSignature: undefined,
        witnessDate: undefined,
      });
      setActiveStepId(STEPS[0]?.id || "select");
      setErrors({});
      setSelectedPouch(null);
    }
  }, [isOpen]);

  // Update selected pouch when pouch is selected
  useEffect(() => {
    if (formData.selectedPouchId) {
      const pouch = signedOutPouches.find(
        (p) => p.id === formData.selectedPouchId
      );
      setSelectedPouch(pouch || null);
      // Initialize refill quantities with 0
      if (pouch) {
        const initialQuantities: Record<string, number> = {};
        pouch.medications.forEach((med) => {
          initialQuantities[med.name] = 0;
        });
        setFormData((prev) => ({
          ...prev,
          refillQuantities: initialQuantities,
        }));
      }
    } else {
      setSelectedPouch(null);
    }
  }, [formData.selectedPouchId, signedOutPouches]);

  const handleFieldChange = (field: keyof RefillFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error for this field
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateStep = (stepId: string): boolean => {
    const newErrors: Record<string, string> = {};

    if (stepId === "select") {
      if (!formData.selectedPouchId) {
        newErrors.selectedPouch = "Please select a pouch to refill";
      }
      if (!formData.refillLocation) {
        newErrors.refillLocation = "Please select a refill location";
      }
    }

    if (stepId === "refill") {
      // Check if at least one medication has a refill quantity > 0
      const hasRefill = Object.values(formData.refillQuantities).some(
        (qty) => qty > 0
      );
      if (!hasRefill) {
        newErrors.refillQuantities =
          "Please specify refill quantities for at least one medication";
      }
    }

    if (stepId === "witness") {
      if (!formData.omitWitness) {
        if (!formData.witnessName?.trim()) {
          newErrors.witnessName = "Supervisor/Witness name is required";
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(activeStepId)) {
      const currentIndex = STEPS.findIndex((s) => s.id === activeStepId);
      if (currentIndex < STEPS.length - 1) {
        const nextStep = STEPS[currentIndex + 1];
        if (nextStep) {
          setActiveStepId(nextStep.id);
        }
        const contentElement = document.querySelector("[data-step-content]");
        if (contentElement) {
          contentElement.scrollTop = 0;
        }
      }
    }
  };

  const handleBack = () => {
    const currentIndex = STEPS.findIndex((s) => s.id === activeStepId);
    if (currentIndex > 0) {
      const prevStep = STEPS[currentIndex - 1];
      if (prevStep) {
        setActiveStepId(prevStep.id);
      }
      const contentElement = document.querySelector("[data-step-content]");
      if (contentElement) {
        contentElement.scrollTop = 0;
      }
    }
  };

  const canProceed = () => {
    if (activeStepId === "select") {
      return !!formData.selectedPouchId && !!formData.refillLocation;
    }
    if (activeStepId === "refill") {
      return Object.values(formData.refillQuantities).some((qty) => qty > 0);
    }
    if (activeStepId === "witness") {
      return formData.omitWitness || !!formData.witnessName?.trim();
    }
    return false;
  };

  const handleStepClick = (step: StepperStep) => {
    const clickedIndex = STEPS.findIndex((s) => s.id === step.id);
    const currentIndex = STEPS.findIndex((s) => s.id === activeStepId);

    if (clickedIndex <= currentIndex + 1) {
      setActiveStepId(step.id);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let isValid = true;
    for (const step of STEPS) {
      if (!validateStep(step.id)) {
        isValid = false;
        setActiveStepId(step.id);
        break;
      }
    }

    if (!isValid) return;

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const refillData = {
        ...formData,
        pouch: selectedPouch,
        timestamp: new Date().toISOString(),
      };

      onClose(refillData);
    } catch (error) {
      console.error("Error refilling pouch:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentStepIndex = STEPS.findIndex((s) => s.id === activeStepId);
  const isLastStep = currentStepIndex === STEPS.length - 1;
  const isFirstStep = currentStepIndex === 0;

  const renderStepContent = () => {
    switch (activeStepId) {
      case "select":
        return (
          <Step1SelectPouchAndLocation
            signedOutPouches={signedOutPouches}
            selectedPouchId={formData.selectedPouchId}
            refillLocation={formData.refillLocation}
            locations={REFILL_LOCATIONS}
            errors={errors}
            onSelectPouch={(pouchId) => {
              handleFieldChange("selectedPouchId", pouchId);
            }}
            onLocationChange={(location) => {
              handleFieldChange("refillLocation", location);
            }}
          />
        );
      case "refill":
        return (
          <Step2RefillQuantities
            medications={selectedPouch?.medications || []}
            refillQuantities={formData.refillQuantities}
            selectedPouch={selectedPouch}
            refillLocation={formData.refillLocation}
            errors={errors}
            onQuantityChange={(medicationName, quantity) => {
              const quantities = formData.refillQuantities || {};
              handleFieldChange("refillQuantities", {
                ...quantities,
                [medicationName]: quantity,
              });
            }}
          />
        );
      case "witness":
        return (
          <Step3RefillWitnessSignature
            omitWitness={formData.omitWitness}
            witnessName={formData.witnessName}
            witnessSignature={formData.witnessSignature}
            witnessDate={formData.witnessDate}
            selectedPouch={selectedPouch}
            refillLocation={formData.refillLocation}
            refillQuantities={formData.refillQuantities}
            errors={errors}
            onOmitWitnessChange={(omit) => {
              handleFieldChange("omitWitness", omit);
            }}
            onWitnessNameChange={(name) => {
              handleFieldChange("witnessName", name);
            }}
            onSignatureChange={(signature) => {
              handleFieldChange("witnessSignature", signature);
            }}
            onDateChange={(date) => {
              handleFieldChange("witnessDate", date);
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <CommonDialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          onClose();
        }
      }}
      title="Refill Pouch"
      description="Refill medication quantities in a signed-out pouch"
      showFooter={false}
      dialogContentClassName="max-w-[95%] sm:max-w-[90%] md:max-w-[85%] lg:max-w-4xl"
    >
      <form onSubmit={handleSubmit} className="flex flex-col h-full">
        {/* Stepper */}
        <div className="flex-shrink-0 py-3 sm:py-4 px-4 sm:px-6 border-b border-gray-200">
          <CommonStepper
            steps={STEPS.map((step, index) => ({
              ...step,
              isActive: step.id === activeStepId,
              isDone: index < currentStepIndex,
            }))}
            activeStepId={activeStepId}
            onStepClick={handleStepClick}
            colorScheme="amber"
          />
        </div>

        {/* Step Content - Scrollable with max height constraint */}
        <CommonStepContentWrapper>
          {renderStepContent()}
        </CommonStepContentWrapper>

        {/* Footer Actions - Always Visible */}
        <CommonModalFooter
          isFirstStep={isFirstStep}
          isLastStep={isLastStep}
          isSubmitting={isSubmitting}
          canProceed={canProceed()}
          nextStepLabel={STEPS[currentStepIndex + 1]?.label}
          submitLabel="Complete Refill"
          submittingLabel="Processing..."
          colorScheme="amber"
          onBack={handleBack}
          onCancel={() => onClose()}
          onNext={handleNext}
        />
      </form>
    </CommonDialog>
  );
};

export default RefillPouchModal;
