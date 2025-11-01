import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { editarAdicionais, editarBarba, editarCabelo, editarSobrancelha } from "../../services/api";

export default function ModalServicoPersonalizado({ isOpen, setIsOpen, data, editar = false }) {
  const [nome, setNome] = useState("");
  const [valor, setValor] = useState("");

  async function handleConfirmar(e) {
    e.preventDefault();
    if (!nome?.trim() || !valor || Number(valor) <= 0) {
      toast.error("Por favor, preencha o nome e um valor válido para o Serviço.");
      return;
    }
    try {
      if (editar) {
        switch (data.tipo) {
          case "cabelo":
            await editarCabelo(data.id_cabelo, nome.toLocaleUpperCase(), valor);
            break;
          case "barba":
            await editarBarba(data.id_barba, nome, valor);
            break;
          case "sobrancelha":
            await editarSobrancelha(data.id_sobrancelha, nome, valor);
            break;
          case "adicionais":
            await editarAdicionais(data.id_adicional, nome, valor);
            break;
        }
        toast.success("Serviço editado com sucesso!");
      }
      setIsOpen(false);
    } catch (error) {
      toast.error(error || "Erro ao salvar Serviço.");
    }
  }

  useEffect(() => {
    if (!isOpen) return;

    if (editar && data) {
      switch (data.tipo) {
        case "cabelo":
          setNome(data.nome_cabelo ?? "");
          setValor(data.valor_cabelo ?? "");
          break;
        case "barba":
          setNome(data.nome_barba ?? "");
          setValor(data.valor_barba ?? "");
          break;
        case "sobrancelha":
          setNome(data.nome_sobrancelha ?? "");
          setValor(data.valor_sobrancelha ?? "");
          break;
        case "adicionais":
          setNome(data.nome_adicional ?? "");
          setValor(data.valor_adicional ?? "");
          break;
        default:
          setNome("");
          setValor("");
      }
    } else {
      setNome("");
      setValor("");
    }
  }, [isOpen, editar, data]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[350px]">
        <DialogHeader>
          <DialogTitle>{!editar ? "Adicionar Serviço" : "Editar Serviço"}</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <form onSubmit={handleConfirmar} className="flex flex-col gap-y-4">
          <div className="flex flex-col">
            <label htmlFor="nome">Nome</label>
            <input id="nome" required type="text" value={nome} onChange={(e) => setNome(e.target.value.toLocaleUpperCase())} className="input-base h-9 uppercase" />
          </div>

          <div className="flex flex-col">
            <label htmlFor="valor">Valor</label>
            <input id="valor" required type="number" value={valor} onChange={(e) => setValor(e.target.value)} className="input-base h-9" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Button className="w-full" variant="outline" onClick={() => setIsOpen(false)}>
              Cancelar
            </Button>
            <Button className="w-full">Confirmar</Button>
          </div>
        </form>

        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
