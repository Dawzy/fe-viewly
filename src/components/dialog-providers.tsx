import { InputDialogProvider } from "@/contexts/input-dialog-context";
import { ConfirmDialogProvider } from "@/contexts/confirm-dialog-context";
import { MovieInfoDialogProvider } from "@/contexts/movie-info-dialog-context";

const DialogProviders = ({
  children
}: {
  children: React.ReactNode
}) => {
  return (
    <ConfirmDialogProvider>
      <InputDialogProvider>
        {children}
      </InputDialogProvider>
    </ConfirmDialogProvider>
  )
}
export default DialogProviders;