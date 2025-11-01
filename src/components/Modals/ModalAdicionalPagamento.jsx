import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { editarAdicional } from "../../services/api";

export default function ModalAdicionalPagamento({
  isOpen,
  setIsOpen,
  dateAdicional,
  editar = false,
}) {
  const [adicional, setAdicional] = useState("");

  async function handleConfirmar(e) {
    e.preventDefault();

    if (!adicional) {
      toast.error("Por favor, preencha o Adicional");
      return;
    }

    try {
      if (editar) {
        await editarAdicional(adicional);
        toast.success("Adicional editado com sucesso!");
      }
      setIsOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Erro ao salvar Adicional.");
    }
  }
  useEffect(() => {
    if (isOpen && dateAdicional) {
      setAdicional(dateAdicional.adicional_forma_pagamento || "");
    } else if (isOpen && !dateAdicional) {
      setAdicional("");
    }
  }, [isOpen, dateAdicional]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[350px]">
        <DialogHeader>
          <DialogTitle>
            {editar ? "Editar Adicional de Pagamento" : "Adicionar Adicional"}
          </DialogTitle>
          <DialogDescription>
            Altere o valor do Adicional de Pagamento
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleConfirmar} className="flex flex-col gap-y-4">
          <div className="flex flex-col">
            <label htmlFor="inicio">Adicional</label>
            <input
              id="inicio"
              required
              type="text"
              value={adicional}
              onChange={(e) => setAdicional(e.target.value)}
              className="input-base h-9"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Button
              type="button"
              className="w-full"
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              Cancelar
            </Button>
            <Button type="submit" className="w-full">
              Confirmar
            </Button>
          </div>
        </form>

        <DialogFooter />
      </DialogContent>
    </Dialog>
  );
}
