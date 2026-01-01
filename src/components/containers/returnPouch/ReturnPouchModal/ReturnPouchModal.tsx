"use client";

import { useState, useEffect } from "react";
import { CommonDialog } from "@/components/custom-components/commonDialog";
import {
  CommonStepper,
  type StepperStep,
} from "@/components/custom-components/commonStepper";
import { CommonModalFooter } from "@/components/custom-components/commonModalFooter";
import { CommonStepContentWrapper } from "@/components/custom-components/commonStepContentWrapper";
import Step1SelectPouchToReturn from "./Steps/Step1SelectPouchToReturn";
import Step2VerifyReturnQuantities from "./Steps/Step2VerifyReturnQuantities";
import Step3ReturnWitnessSignature from "./Steps/Step3ReturnWitnessSignature";
import type { SignedOutPouch } from "@/components/data/pouch-management";
import { SIGNED_OUT_POUCHES } from "@/components/data/pouch-management";

interface ReturnFormData {
  selectedPouchId?: string;
  actualQuantities: Record<string, number>;
  photoUrl?: string;
  omitWitness: boolean;
  witnessName?: string;
  witnessSignature?: string;
  witnessDate?: string;
}

interface ReturnPouchModalProps {
  isOpen: boolean;
  onClose: (data?: any) => void;
  signedOutPouches?: SignedOutPouch[];
}

const STEPS: StepperStep[] = [
  { id: "select", label: "Select Pouch to Return" },
  { id: "verify", label: "Verify Return Quantities" },
  { id: "witness", label: "Witness Signature" },
];

const ReturnPouchModal = ({
  isOpen,
  onClose,
  signedOutPouches = SIGNED_OUT_POUCHES.filter((p) => p.status === "Active"),
}: ReturnPouchModalProps) => {
  const [activeStepId, setActiveStepId] = useState(STEPS[0]?.id || "select");
  const [formData, setFormData] = useState<ReturnFormData>({
    selectedPouchId: undefined,
    actualQuantities: {},
    photoUrl: undefined,
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
        actualQuantities: {},
        photoUrl: undefined,
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
      // Initialize actual quantities with 0
      if (pouch) {
        const initialQuantities: Record<string, number> = {};
        pouch.medications.forEach((med) => {
          initialQuantities[med.name] = 0;
        });
        setFormData((prev) => ({
          ...prev,
          actualQuantities: initialQuantities,
        }));
      }
    } else {
      setSelectedPouch(null);
    }
  }, [formData.selectedPouchId, signedOutPouches]);

  const handleFieldChange = (field: keyof ReturnFormData, value: any) => {
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
        newErrors.selectedPouch = "Please select a pouch to return";
      }
    }

    if (stepId === "verify") {
      if (!formData.photoUrl) {
        newErrors.photo = "Please capture a photo of the returned pouch";
      }
    }

    if (stepId === "witness") {
      if (!formData.omitWitness) {
        if (!formData.witnessName?.trim()) {
          newErrors.witnessName = "Witness name is required";
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
      return !!formData.selectedPouchId;
    }
    if (activeStepId === "verify") {
      return !!formData.photoUrl && selectedPouch !== null;
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

      const returnData = {
        ...formData,
        pouch: selectedPouch,
        timestamp: new Date().toISOString(),
      };

      onClose(returnData);
    } catch (error) {
      console.error("Error returning pouch:", error);
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
          <Step1SelectPouchToReturn
            signedOutPouches={signedOutPouches}
            selectedPouchId={formData.selectedPouchId}
            errors={errors}
            onSelectPouch={(pouchId) => {
              handleFieldChange("selectedPouchId", pouchId);
            }}
          />
        );
      case "verify":
        return (
          <Step2VerifyReturnQuantities
            medications={selectedPouch?.medications || []}
            actualQuantities={formData.actualQuantities}
            photoUrl={formData.photoUrl}
            selectedPouch={selectedPouch}
            errors={errors}
            onQuantityChange={(medicationName, quantity) => {
              const quantities = formData.actualQuantities || {};
              handleFieldChange("actualQuantities", {
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
          <Step3ReturnWitnessSignature
            omitWitness={formData.omitWitness}
            witnessName={formData.witnessName}
            witnessSignature={formData.witnessSignature}
            witnessDate={formData.witnessDate}
            selectedPouch={selectedPouch}
            actualQuantities={formData.actualQuantities}
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
      title="Return Pouch"
      description="Return a signed-out narcotic pouch"
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
            colorScheme="green"
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
          submitLabel="Complete Return"
          submittingLabel="Processing..."
          colorScheme="green"
          onBack={handleBack}
          onCancel={() => onClose()}
          onNext={handleNext}
        />
      </form>
    </CommonDialog>
  );
};

export default ReturnPouchModal;
