"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { List } from "@/types";
import { MovieInfoDialogProps } from "@/types";
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

const DEFAULT_VALUE: MovieInfoDialogProps = {
  onConfirm: () => {},
  title: "",
  desc: "",
  isDestructive: false,
}

type DialogContextType = {
  showDialog: (props: MovieInfoDialogProps) => void;
};

const DialogContext = createContext<DialogContextType | null>(null);

export const useMovieInfoDialog = () => {
  const context = useContext(DialogContext);
  if (!context) throw new Error("DialogProvider is missing");
  return context;
};

export const MovieInfoDialogProvider = ({
  children
}: {
  children: React.ReactNode
}) => {
  // State
  const [value, setValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [dialogProps, setDialogProps] = useState<MovieInfoDialogProps>(DEFAULT_VALUE);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const allowCloseRef = useRef(false);
  const {} = dialogProps;

  const showDialog = useCallback((props: MovieInfoDialogProps) => {
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
    // onConfirm(value);
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
              {/* {title} */}
            </DialogTitle>
            <DialogDescription>
              {/* {desc} */}
            </DialogDescription>
          </DialogHeader>

          {/* Footer */}
          <DialogFooter className="sm:justify-around">
            <Button type="button" variant="outline" className="w-1/3" onClick={closeDialog}>
              Cancel
            </Button>
            
            <Button type="button" variant={"default"} className="w-1/3" onClick={onClick}>
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DialogContext.Provider>
  );
};