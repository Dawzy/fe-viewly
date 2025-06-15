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
  useState,
  useRef
} from "react";
import Link from "next/link";

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
  const [disabled, setDisabled] = useState(true);
  const [dialogProps, setDialogProps] = useState<DisclaimerDialogProps>(DEFAULT_VALUE);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const {
    onConfirm,
  } = dialogProps;

  const showDialog = (props: DisclaimerDialogProps) => {
    setDialogProps(props);
    setIsOpen(true);

    // Disable button for a few seconds so user doesn't instinctively click away from the disclaimer
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(
      () => setDisabled(false),
      5000
    );
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
                not be used as such. All data is wiped reguraly, and the source code can be found on
                <Link
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-accent font-bold inline ml-1"
                  href={process.env.NEXT_PUBLIC_GITHUB_SOURCE || ""}
                >
                  Github
                </Link>
            </DialogDescription>
          </DialogHeader>

          {/* Footer */}
          <DialogFooter className="w-full">
            <Button type="button" variant="default" className="w-1/3 mx-auto" onClick={onClick} disabled={disabled}>
              I Understand
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DialogContext.Provider>
  );
};