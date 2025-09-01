import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "../ui/button";

export default function ModalCorte({ isOpen, setIsOpen, editar = false, onClick = () => {} }) {
  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[350px]">
          <DialogHeader>
            <DialogTitle>{!editar ? "Criar corte" : "Editar corte"}</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <form onSubmit={onClick} className="flex flex-col gap-y-4">
            <div className="flex flex-col">
              <label htmlFor="nome">Nome</label>
              <input id="nome" required type="text" className="input-base h-9 uppercase" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="valor">Valor</label>
              <input id="valor" required type="text" className="input-base h-9" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Button className="w-full" variant="outline" onClick={() => setIsOpen(false)}>
                Cancelar
              </Button>
              <Button className="w-full">Confirmar</Button>
            </div>
            {editar && <Button variant="destructive">Excluir</Button>}
          </form>
          <DialogFooter></DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
