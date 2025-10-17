import { CircleMinus, CirclePlus } from "lucide-react";
import { useEffect } from "react";
import { alterarNumeroClientes, consultarNumeroClientes } from "../../services/api";

export default function Contador({contador, setContador}) {

  function aumentar() {
    setContador((prev) => {
      const novoValor = Math.min(prev + 1, 100);
      atualizarNumeroClientes(novoValor);
      return novoValor;
    });
  }

  function diminuir() {
    setContador((prev) => {
      const novoValor = Math.max(prev - 1, 0);
      atualizarNumeroClientes(novoValor);
      return novoValor;
    });
  }

  async function atualizarNumeroClientes(pContador) {
    const idBarbeiro = localStorage.getItem("id_barbeiro");
    if (idBarbeiro) {
      await alterarNumeroClientes(idBarbeiro, pContador);
    }
  }

  async function listarNumeroClientes() {
    const response = await consultarNumeroClientes();
    setContador(response ?? 0);
  }

  useEffect(() => {
    listarNumeroClientes();
  }, []);

  return (
    <section className="flex justify-around w-46 h-12">
      <button onClick={diminuir}>
        <CircleMinus className="text-feedback-error w-13 h-13" />
      </button>

      <input
        type="text"
        maxLength={2}
        value={contador}
        onChange={(e) => {
          const valor = Number(e.target.value);
          if (!isNaN(valor) && valor >= 0 && valor <= 100) {
            setContador(valor);
            atualizarNumeroClientes(valor);
          }
        }}
        className="outline-text-secondary-1 focus:outline-text-secondary border-1 border-text-secondary w-13 h-13 rounded-xl text-center text-white"
      />

      <button onClick={aumentar}>
        <CirclePlus className="text-brand-primary w-13 h-13" />
      </button>
    </section>
  );
}
