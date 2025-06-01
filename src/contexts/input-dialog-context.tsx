"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { List } from "@/types";
import { InputDialogProps } from "@/types";
import validator from "validator";
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
import { sanitizeString } from "@/utils";

const DEFAULT_VALUE: InputDialogProps = {
  onConfirm: (_: List["listName"]) => {},
  title: "",
  desc: "",
  label: "",
  isDestructive: false,
  confirmButtonText: "",
  maxInputLength: 0
}

type DialogContextType = {
  showDialog: (props: InputDialogProps) => void;
};

const DialogContext = createContext<DialogContextType | null>(null);

export const useInputDialog = () => {
  const context = useContext(DialogContext);
  if (!context) throw new Error("DialogProvider is missing");
  return context;
};

export const InputDialogProvider = ({
  children
}: {
  children: React.ReactNode
}) => {
  // State
  const [value, setValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [dialogProps, setDialogProps] = useState<InputDialogProps>(DEFAULT_VALUE);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const allowCloseRef = useRef(false);
  const {
    onConfirm,
    title,
    desc,
    label,
    confirmButtonText,
    maxInputLength,
    isDestructive,
  } = dialogProps;
  
  // Max Length UI State
  const remaining = (maxInputLength ?? 0) - value.length;
  const isNearLimit = remaining <= 5;
  const isAtLimit = remaining === 0;

  const showDialog = useCallback((props: InputDialogProps) => {
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
    if (validator.isEmpty(value)) return;
    onConfirm(value);
    closeDialog();
  }

  // Used for destructive user actions
  const onDeleteClick = () => {
    if (value.toLowerCase() !== "delete") return;
    onConfirm();
    closeDialog();
  }

  const onChange = (str: string) =>
    setValue(
      sanitizeString(str)
      .substring(0, maxInputLength)
    );

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
              {isDestructive &&
                <>
                  <br />
                  <span>
                    Enter <label className="text-accent">DELETE</label> to confirm.
                  </span>
                </>
              }
            </DialogDescription>
          </DialogHeader>

          {/* Body */}
          <div className="grid grid-cols-7 gap-4 my-4">
            <Label className="justify-end">
              {label}
            </Label>
            <Input
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="col-span-5 col-start-2"
              placeholder={isDestructive ? "DELETE": ""}
            />

            {/* Character Limit Group */}
            {maxInputLength &&
              <div className="flex justify-between items-center text-xs col-start-2 col-span-5">
                <span className="text-muted-foreground">
                  Character limit: {maxInputLength}
                </span>
                <span
                  className={`font-medium ${
                    isAtLimit ? "text-red-500" : isNearLimit ? "text-yellow-600" : "text-muted-foreground"
                  }`}
                >
                  {value.length}/{maxInputLength}
                </span>
              </div>
            }
          </div>

          {/* Footer */}
          <DialogFooter className="sm:justify-around">
            <Button type="button" variant="outline" className="w-1/3" onClick={closeDialog}>
              Cancel
            </Button>
            
            <Button type="button" variant={isDestructive && "destructive" || "default"} className="w-1/3" onClick={isDestructive ? onDeleteClick : onClick}>
              {confirmButtonText ?? "Confirm"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DialogContext.Provider>
  );
};