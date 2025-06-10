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
        <MovieInfoDialogProvider>
          {children}
        </MovieInfoDialogProvider>
      </InputDialogProvider>
    </ConfirmDialogProvider>
  )
}
export default DialogProviders;