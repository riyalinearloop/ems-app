"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog";
import CommonButton from "./commonButton";

type CommonDialogProps = {
  trigger?: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  dialogContentClassName?: string;
  children: React.ReactNode;
  showFooter?: boolean;
  footerActions?: React.ReactNode;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  dialogFooterCloseBtnText?: string;
  dialogFooterSaveBtnText?: string;
  onInteractOutside?: () => void;
};

export function CommonDialog({
  trigger,
  open,
  onOpenChange,
  title = "Dialog Title",
  description = "",
  dialogContentClassName = "",
  children,
  showFooter = false,
  dialogFooterCloseBtnText = "Close",
  dialogFooterSaveBtnText = "Save",
  footerActions,
  onSubmit,
  onInteractOutside,
}: CommonDialogProps) {
  return (
    <div className="dialogContainer">
      <Dialog open={open} onOpenChange={onOpenChange}>
        {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}

        <form onSubmit={onSubmit}>
          {/* ------------------- Dialog Main Container ------------------- */}
          <DialogContent
            className={`gap-0 p-0 max-w-[95%] sm:max-w-[90%] md:max-w-[85%] lg:max-w-[1200px] overflow-hidden max-h-[90vh] !border-0 flex flex-col ${dialogContentClassName}`}
            onInteractOutside={onInteractOutside}
          >
            {/* ------------------- DialogHeader ------------------- */}
            <DialogHeader className="flex-shrink-0">
              <div className="flex items-center justify-between gap-2 sm:gap-3 border-b border-input-border p-4 sm:p-5 md:p-6">
                <div className="flex-1 min-w-0">
                  <DialogTitle className="text-left text-base sm:text-lg md:text-xl truncate">
                    {title}
                  </DialogTitle>
                  {description && (
                    <DialogDescription className="text-left text-xs sm:text-sm mt-1">
                      {description}
                    </DialogDescription>
                  )}
                </div>
              </div>
            </DialogHeader>

            {/* ------------------- Dialog Children Content ------------------- */}
            <div className="flex-1 min-h-0 overflow-hidden flex flex-col">
              {children}
            </div>

            {/* ------------------- Dialog Footer ------------------- */}
            {showFooter && (
              <DialogFooter className="p-4 sm:p-5 md:p-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2 sm:gap-3 bg-white border-t border-input-border">
                {footerActions ? (
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
                    {footerActions}
                  </div>
                ) : (
                  <>
                    <DialogClose asChild>
                      <CommonButton
                        variant="light"
                        size="sm"
                        className="w-full sm:w-[120px]"
                      >
                        {dialogFooterCloseBtnText}
                      </CommonButton>
                    </DialogClose>

                    <CommonButton
                      variant="light"
                      type="submit"
                      size="sm"
                      className="w-full sm:w-[120px]"
                    >
                      {dialogFooterSaveBtnText}
                    </CommonButton>
                  </>
                )}
              </DialogFooter>
            )}
          </DialogContent>
        </form>
      </Dialog>
    </div>
  );
}
