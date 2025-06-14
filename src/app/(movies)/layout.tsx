"use client"

import { useDisclaimerDialog } from "@/contexts/disclaimer-dialog";
import { useEffect } from "react";

const MoviesLayout = ({
  children
}: {
  children: React.ReactNode
}) => {
  const { showDialog } = useDisclaimerDialog();

  useEffect(() => {
    // Display disclaimer if not read it
    if (!localStorage.getItem("disclaimer"))
      showDialog({
          onConfirm: () => localStorage.setItem("disclaimer", "true")
        }
      );
  }, [showDialog]);

  return children;
}
export default MoviesLayout;