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
            className={`gap-0 p-0 max-w-[95%] md:max-w-[95%] lg:max-w-[1200px] overflow-hidden max-h-[90vh] !border-0 ${dialogContentClassName}`}
            onInteractOutside={onInteractOutside}
          >
            {/* ------------------- DialogHeader ------------------- */}
            <DialogHeader>
              <div className="flex items-center justify-between gap-3 border-b border-input-border p-6">
                <div>
                  <DialogTitle className="text-left">{title}</DialogTitle>
                  {description && (
                    <DialogDescription className="text-left">
                      {description}
                    </DialogDescription>
                  )}
                </div>
              </div>
            </DialogHeader>

            {/* ------------------- Dialog Children Content ------------------- */}
            <div>{children}</div>

            {/* ------------------- Dialog Footer ------------------- */}
            {showFooter && (
              <DialogFooter className="p-6 flex items-center justify-end gap-3 bg-white border-t border-input-border">
                {footerActions ? (
                  footerActions
                ) : (
                  <>
                    <DialogClose asChild>
                      <CommonButton
                        variant="light"
                        size="sm"
                        className="w-[120px]"
                      >
                        {dialogFooterCloseBtnText}
                      </CommonButton>
                    </DialogClose>

                    <CommonButton
                      variant="light"
                      type="submit"
                      size="sm"
                      className="w-[120px]"
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
