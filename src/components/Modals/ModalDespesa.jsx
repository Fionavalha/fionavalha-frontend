import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useState } from "react";
import { DatePicker } from "../DatePicker";

export default function ModalDespesa({ isOpen, setIsOpen, editar = false, onClick = () => {} }) {
  const [data, setData] = useState(null);
  const [isDespesaFixa, setIsDespesaFixa] = useState(false);

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[350px]">
          <DialogHeader>
            <DialogTitle>{!editar ? "Adicionar despesa" : "Editar despesa"}</DialogTitle>
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
            <DatePicker label="Data" date={data} setDate={setData} active={isDespesaFixa} />
            <div className="flex justify-end gap-2">
              <label htmlFor="fixa">Despesa fixa?</label>
              <input type="checkbox" className="w-5" id="fixa" value={isDespesaFixa} onChange={(e) => setIsDespesaFixa(e.target.checked)} />
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
