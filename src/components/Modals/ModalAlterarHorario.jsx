import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { editarHora } from "../../services/api";

export default function ModalAlterarHorario({ isOpen, setIsOpen, dateHorario, editar = false }) {
  const [horarioInicio, setHorarioInicio] = useState("");
  const [horarioFim, setHorarioFim] = useState("");

  async function handleConfirmar(e) {
    e.preventDefault();

    if (!horarioInicio || !horarioFim) {
      toast.error("Por favor, preencha os dois horários.");
      return;
    }
    
    try {
      if (editar) {
        await editarHora(horarioInicio, horarioFim);
        toast.success("Horário editado com sucesso!");
      }
      setIsOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Erro ao salvar horário.");
    }
  }
  useEffect(() => {
    if (isOpen && dateHorario) {
      setHorarioInicio(dateHorario.horario_inicio || "");
      setHorarioFim(dateHorario.horario_fim || "");
    } else if (isOpen && !dateHorario) {
      setHorarioInicio("");
      setHorarioFim("");
    }
  }, [isOpen, dateHorario]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[350px]">
        <DialogHeader>
          <DialogTitle>
            {editar ? "Editar Horário de Funcionamento" : "Adicionar Horário"}
          </DialogTitle>
          <DialogDescription>
            Defina os horários de abertura e fechamento da barbearia.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleConfirmar} className="flex flex-col gap-y-4">
          <div className="flex flex-col">
            <label htmlFor="inicio">Abre</label>
            <input
              id="inicio"
              required
              type="time"
              value={horarioInicio}
              onChange={(e) => setHorarioInicio(e.target.value)}
              className="input-base h-9"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="fim">Fecha</label>
            <input
              id="fim"
              required
              type="time"
              value={horarioFim}
              onChange={(e) => setHorarioFim(e.target.value)}
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
