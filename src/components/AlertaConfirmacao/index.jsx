import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

export function AlertaConfirmacao({
  isModalOpen,
  setIsModalOpen,
  titulo = "",
  descricao = "",
  cancelar = "Cancelar",
  confirmar = "Confirmar",
  variant = "default",
  onConfirm = () => {},
  onCancel = () => {},
}) {
  return (
    <AlertDialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{titulo}</AlertDialogTitle>
          <AlertDialogDescription>{descricao}</AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>{cancelar}</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} variant={variant}>
            {confirmar}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

