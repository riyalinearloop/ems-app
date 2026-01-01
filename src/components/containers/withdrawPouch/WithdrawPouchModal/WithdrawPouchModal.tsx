"use client";

import { useState, useEffect } from "react";
import { CommonDialog } from "@/components/custom-components/commonDialog";
import {
  CommonStepper,
  type StepperStep,
} from "@/components/custom-components/commonStepper";
import { CommonModalFooter } from "@/components/custom-components/commonModalFooter";
import { CommonStepContentWrapper } from "@/components/custom-components/commonStepContentWrapper";
import Step1SelectPouch from "./Steps/Step1SelectPouch";
import Step2VerifyQuantities from "./Steps/Step2VerifyQuantities";
import Step3WitnessSignature from "./Steps/Step3WitnessSignature";
import type { Pouch, WithdrawFormData } from "@/components/data/withdraw-pouch";
import { AVAILABLE_POUCHES } from "@/components/data/withdraw-pouch";

interface WithdrawPouchModalProps {
  isOpen: boolean;
  onClose: (data?: any) => void;
  availablePouches?: Pouch[];
}

const STEPS: StepperStep[] = [
  { id: "select", label: "Select or Add Pouch" },
  { id: "verify", label: "Verify Quantities" },
  { id: "witness", label: "Witness Signature" },
];

const WithdrawPouchModal = ({
  isOpen,
  onClose,
  availablePouches = AVAILABLE_POUCHES,
}: WithdrawPouchModalProps) => {
  const [activeStepId, setActiveStepId] = useState(STEPS[0]?.id || "select");
  const [formData, setFormData] = useState<WithdrawFormData>({
    selectedPouchId: undefined,
    newPouchType: undefined,
    newPouchNumber: undefined,
    isNewPouch: false,
    verifiedQuantities: {},
    photoUrl: undefined,
    witnessName: undefined,
    witnessSignature: undefined,
    witnessDate: undefined,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedPouch, setSelectedPouch] = useState<Pouch | null>(null);

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setFormData({
        selectedPouchId: undefined,
        newPouchType: undefined,
        newPouchNumber: undefined,
        isNewPouch: false,
        verifiedQuantities: {},
        photoUrl: undefined,
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
    if (formData.selectedPouchId && !formData.isNewPouch) {
      const pouch = availablePouches.find(
        (p) => p.id === formData.selectedPouchId
      );
      setSelectedPouch(pouch || null);
    } else {
      setSelectedPouch(null);
    }
  }, [formData.selectedPouchId, formData.isNewPouch, availablePouches]);

  const handleFieldChange = (field: keyof WithdrawFormData, value: any) => {
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
      if (!formData.selectedPouchId && !formData.isNewPouch) {
        newErrors.selectedPouch = "Please select a pouch or create a new one";
      }
      if (formData.isNewPouch) {
        if (!formData.newPouchType) {
          newErrors.pouchType = "Pouch type is required";
        }
        if (!formData.newPouchNumber) {
          newErrors.pouchNumber = "Pouch number is required";
        }
      }
    }

    if (stepId === "verify") {
      if (!formData.photoUrl) {
        newErrors.photo = "Please capture a photo of the pouch contents";
      }
    }

    if (stepId === "witness") {
      if (!formData.witnessName?.trim()) {
        newErrors.witnessName = "Witness name is required";
      }
      if (!formData.witnessSignature?.trim()) {
        newErrors.witnessSignature = "Witness signature is required";
      }
      if (!formData.witnessDate) {
        newErrors.witnessDate = "Date is required";
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
        // Scroll to top of content when moving to next step
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
      // Scroll to top of content when moving to previous step
      const contentElement = document.querySelector("[data-step-content]");
      if (contentElement) {
        contentElement.scrollTop = 0;
      }
    }
  };

  // Check if current step can proceed
  const canProceed = (): boolean => {
    if (activeStepId === "select") {
      return !!(
        formData.selectedPouchId ||
        (formData.isNewPouch &&
          formData.newPouchType &&
          formData.newPouchNumber)
      );
    }
    if (activeStepId === "verify") {
      return !!(formData.photoUrl && selectedPouch);
    }
    if (activeStepId === "witness") {
      return !!(
        formData.witnessName?.trim() &&
        formData.witnessSignature?.trim() &&
        formData.witnessDate
      );
    }
    return false;
  };

  const handleStepClick = (step: StepperStep) => {
    const clickedIndex = STEPS.findIndex((s) => s.id === step.id);
    const currentIndex = STEPS.findIndex((s) => s.id === activeStepId);

    // Allow clicking on previous steps or the next step
    if (clickedIndex <= currentIndex + 1) {
      setActiveStepId(step.id);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate all steps
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
      // TODO: Replace with actual API call
      // const response = await withdrawPouchAPI(formData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const withdrawData = {
        ...formData,
        pouch: selectedPouch,
        timestamp: new Date().toISOString(),
      };

      onClose(withdrawData);
    } catch (error) {
      console.error("Error withdrawing pouch:", error);
      // Handle error (show toast, etc.)
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
          <Step1SelectPouch
            availablePouches={availablePouches}
            selectedPouchId={formData.selectedPouchId}
            newPouchType={formData.newPouchType}
            newPouchNumber={formData.newPouchNumber}
            isNewPouch={formData.isNewPouch}
            errors={errors}
            onSelectPouch={(pouchId) => {
              handleFieldChange("selectedPouchId", pouchId);
              handleFieldChange("isNewPouch", false);
            }}
            onAddNewPouch={(type, number) => {
              handleFieldChange("newPouchType", type);
              handleFieldChange("newPouchNumber", number);
              handleFieldChange("isNewPouch", true);
              handleFieldChange("selectedPouchId", undefined);
            }}
          />
        );
      case "verify":
        return (
          <Step2VerifyQuantities
            medications={
              selectedPouch?.medications || (formData.isNewPouch ? [] : [])
            }
            verifiedQuantities={formData.verifiedQuantities}
            photoUrl={formData.photoUrl}
            errors={errors}
            selectedPouch={selectedPouch}
            onQuantityChange={(medicationName, quantity) => {
              const quantities = formData.verifiedQuantities || {};
              handleFieldChange("verifiedQuantities", {
                ...quantities,
                [medicationName]: quantity,
              });
            }}
            onPhotoCapture={(photoUrl) => {
              handleFieldChange("photoUrl", photoUrl);
            }}
          />
        );
      case "witness":
        return (
          <Step3WitnessSignature
            witnessName={formData.witnessName}
            witnessSignature={formData.witnessSignature}
            witnessDate={formData.witnessDate}
            errors={errors}
            selectedPouch={selectedPouch}
            newPouchNumber={formData.newPouchNumber}
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
      title="Withdraw Pouch"
      description="Sign out narcotic pouches for field use"
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
          nextStepLabel={STEPS[currentStepIndex + 1]?.label || ""}
          submitLabel="Complete Withdrawal"
          submittingLabel="Processing..."
          colorScheme="blue"
          onBack={handleBack}
          onCancel={() => onClose()}
          onNext={handleNext}
        />
      </form>
    </CommonDialog>
  );
};

export default WithdrawPouchModal;
