"use client";

import { Button } from "@/components/ui/button";
import { ConfirmDialogProps } from "@/types";
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
  useCallback,
  useContext,
  useRef,
  useState
} from "react";

const DEFAULT_VALUE: ConfirmDialogProps = {
  onConfirm: () => {},
  title: "",
  desc: "",
  isDestructive: false,
}

type DialogContextType = {
  showDialog: (props: ConfirmDialogProps) => void;
};

const DialogContext = createContext<DialogContextType | null>(null);

export const useConfirmDialog = () => {
  const context = useContext(DialogContext);
  if (!context) throw new Error("DialogProvider is missing");
  return context;
};

export const ConfirmDialogProvider = ({
  children
}: {
  children: React.ReactNode
}) => {
  // State
  const [value, setValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [dialogProps, setDialogProps] = useState<ConfirmDialogProps>(DEFAULT_VALUE);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const allowCloseRef = useRef(false);
  const {
    onConfirm,
    title,
    desc,
    confirmButtonText,
    isDestructive,
  } = dialogProps;

  const showDialog = useCallback((props: ConfirmDialogProps) => {
    setDialogProps(props);
    setIsOpen(true);

    // Set timeout to prevent UI bug where click on dropdown menu items
    // closes dialog. Fixing it by debouncing closing on outside click
    allowCloseRef.current = false;

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(
      () => { allowCloseRef.current = true; },
      250
    );
  }, []);

  const closeDialog = () => {
    setIsOpen(false);
    setValue("");
  };

  const onClick = () => {
    onConfirm(value);
    closeDialog();
  }

  return (
    <DialogContext.Provider value={{ showDialog }}>
      {children}
      <Dialog modal={false} open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent onInteractOutside={(e) => !allowCloseRef.current && e.preventDefault()}>
          {/* Header */}
          <DialogHeader>
            <DialogTitle>
              {title}
            </DialogTitle>
            <DialogDescription>
              {desc}
            </DialogDescription>
          </DialogHeader>

          {/* Footer */}
          <DialogFooter className="sm:justify-around">
            <Button type="button" variant="outline" className="w-1/3" onClick={closeDialog}>
              Cancel
            </Button>
            
            <Button type="button" variant={isDestructive && "destructive" || "default"} className="w-1/3" onClick={onClick}>
              {confirmButtonText ?? "Continue"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DialogContext.Provider>
  );
};