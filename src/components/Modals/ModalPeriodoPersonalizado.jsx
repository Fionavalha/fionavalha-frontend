import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DatePicker } from "../DatePicker";
import { Button } from "../ui/button";
import { useState } from "react";
import { toast } from "sonner";

export default function ModalPeriodoPersonalizado({ isOpen, setIsOpen, onClick = () => {} }) {
  const [dataInicial, setDataInicial] = useState(null);
  const [dataFinal, setDataFinal] = useState(null);

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[250px]">
          <DialogHeader>
            <DialogTitle></DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <DatePicker label="Período inicial" date={dataInicial} setDate={setDataInicial} disabled={dataFinal !== null && { after: dataFinal }} />
          <DatePicker label="Período final" date={dataFinal} setDate={setDataFinal} disabled={dataInicial !== null && { before: dataInicial }} />
          <DialogFooter>
            <Button
              onClick={(e) => {
                e.preventDefault();
                if (dataInicial === null || dataFinal === null) {
                  toast.error("Período inválido");
                  return;
                }
                onClick(dataInicial, dataFinal);
              }}
            >
              Filtrar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
