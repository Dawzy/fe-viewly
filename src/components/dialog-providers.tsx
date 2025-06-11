import { InputDialogProvider } from "@/contexts/input-dialog-context";
import { ConfirmDialogProvider } from "@/contexts/confirm-dialog-context";
import { MovieInfoDialogProvider } from "@/contexts/movie-info-dialog-context";
import { DisclaimerDialogProvider } from "@/contexts/disclaimer-dialog";

const DialogProviders = ({
  children
}: {
  children: React.ReactNode
}) => {
  return (
    <DisclaimerDialogProvider>
      <ConfirmDialogProvider>
        <InputDialogProvider>
          <MovieInfoDialogProvider>
            {children}
          </MovieInfoDialogProvider>
        </InputDialogProvider>
      </ConfirmDialogProvider>
    </DisclaimerDialogProvider>
  )
}
export default DialogProviders;