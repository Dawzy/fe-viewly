"use client";

import { Button } from "@/components/ui/button";
import { DisclaimerDialogProps } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";

import {
  createContext,
  useContext,
  useState
} from "react";

const DEFAULT_VALUE: DisclaimerDialogProps = {
  onConfirm: () => {},
}

type DialogContextType = {
  showDialog: (props: DisclaimerDialogProps) => void;
};

const DialogContext = createContext<DialogContextType | null>(null);

export const useDisclaimerDialog = () => {
  const context = useContext(DialogContext);
  if (!context) throw new Error("DialogProvider is missing");
  return context;
};

export const DisclaimerDialogProvider = ({
  children
}: {
  children: React.ReactNode
}) => {
  // State
  const [isOpen, setIsOpen] = useState(false);
  const [dialogProps, setDialogProps] = useState<DisclaimerDialogProps>(DEFAULT_VALUE);
  const {
    onConfirm,
  } = dialogProps;

  const showDialog = (props: DisclaimerDialogProps) => {
    setDialogProps(props);
    setIsOpen(true);
  }

  const closeDialog = () => {
    setIsOpen(false);
  };

  const onClick = () => {
    onConfirm();
    closeDialog();
  }

  return (
    <DialogContext.Provider value={{ showDialog }}>
      {children}
      <Dialog modal={true} open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="[&>button]:hidden" onInteractOutside={(e) => e.preventDefault()}>
          {/* Header */}
          <DialogHeader>
            <DialogTitle className="text-center">
              DISCLAIMER
            </DialogTitle>
            <DialogDescription className="text-center">
              Viewly is a sample project developed to demonstrate technical skills. It is by no means a finished product and should
              not be used as such. All list and movie data is wiped reguraly, and most of the code is open source and that can be
              found on my Github.
            </DialogDescription>
          </DialogHeader>

          {/* Footer */}
          <DialogFooter className="w-full">
            <Button type="button" variant="default" className="w-1/3 mx-auto" onClick={onClick}>
              I Understand
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DialogContext.Provider>
  );
};