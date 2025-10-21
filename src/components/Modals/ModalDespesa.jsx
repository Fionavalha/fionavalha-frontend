import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { DatePicker } from "../DatePicker";
import { toast } from "sonner";
import { adicionarDespesaRealizada, editarDespesa, excluirDespesaRealizada } from "../../services/api";

export default function ModalDespesa({ isOpen, setIsOpen, dataServico, editar = false, onClick = () => { } }) {
  const [data, setData] = useState(null);
  const [isDespesaFixa, setIsDespesaFixa] = useState(false);
  const [nomeDespesa, setNomeDespesa] = useState("");
  const [valorDespesa, setValorDespesa] = useState("");



  async function handleConfirmar() {
    if (!nomeDespesa?.trim() || !valorDespesa || Number(valorDespesa) <= 0) {
      toast.error("Por favor, preencha o nome e um valor válido para a despesa.");
      return;
    }

    try {
      if (editar) {
        await editarDespesa(dataServico[0].id_despesa, nomeDespesa, valorDespesa, data, isDespesaFixa);
        toast.success("Despesa editada com sucesso!");
      } else {
        await adicionarDespesaRealizada(nomeDespesa, valorDespesa, data, isDespesaFixa);
        toast.success("Despesa adicionada com sucesso!");
      }
      setIsOpen(false);

      setTimeout(() => {
        window.location.reload();
      }, 1000);


    } catch (error) {
      toast.error(error.message || "Erro ao salvar despesa.");
    }
  };

  async function handleExcluir() {
    if (!dataServico || dataServico.length === 0) return;

    try {
      await excluirDespesaRealizada(dataServico[0].id_despesa);
      toast.success("Despesa excluída com sucesso!");
      setIsOpen(false);

      setTimeout(() => {
        window.location.reload();
      }, 1000);

    } catch (error) {
      toast.error(error.message || "Erro ao excluir despesa");
    }
  }

  useEffect(() => {
    if (!isOpen) return;

    if (editar && dataServico?.length > 0) {
      const item = dataServico[0];
      setNomeDespesa(item.nome_despesa ?? "");
      setValorDespesa(item.valor_despesa ?? "");
      setData(item.data_despesa ? new Date(item.data_despesa) : null);
      setIsDespesaFixa(Boolean(item.fixa));
    } else {
      setNomeDespesa("");
      setValorDespesa("");
      setData(null);
      setIsDespesaFixa(false);
    }
  }, [isOpen, editar, dataServico]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[350px]">
        <DialogHeader>
          <DialogTitle>{!editar ? "Adicionar despesa" : "Editar despesa"}</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <form onSubmit={onClick} className="flex flex-col gap-y-4">
          <div className="flex flex-col">
            <label htmlFor="nome">Nome</label>
            <input
              id="nome"
              required
              type="text"
              value={nomeDespesa}
              onChange={(e) => setNomeDespesa(e.target.value)}
              className="input-base h-9 uppercase"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="valor">Valor</label>
            <input
              id="valor"
              required
              type="text"
              value={valorDespesa}
              onChange={(e) => setValorDespesa(e.target.value)}
              className="input-base h-9"
            />
          </div>

          <DatePicker label="Data" date={data} setDate={setData} active={isDespesaFixa} />

          <div className="flex justify-end gap-2">
            <label htmlFor="fixa">Despesa fixa?</label>
            <input
              type="checkbox"
              className="w-5"
              id="fixa"
              checked={isDespesaFixa}
              onChange={(e) => setIsDespesaFixa(e.target.checked)}
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Button className="w-full" variant="outline" onClick={() => setIsOpen(false)}>
              Cancelar
            </Button>
            <Button className="w-full" onClick={handleConfirmar}>
              Confirmar
            </Button>
          </div>

          {editar && <Button onClick={handleExcluir} variant="destructive">Excluir</Button>}
        </form>

        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
