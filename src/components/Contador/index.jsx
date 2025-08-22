import { CircleMinus, CirclePlus } from "lucide-react";
import { useState } from "react";

export default function Contador() {
  const [contador, setContador] = useState(0);

  const aumentar = () => {
    if (contador <= 99) {
      setContador((prevstate) => prevstate + 1);
    }
  };

  const diminuir = () => {
    if (contador > 0) {
      setContador((prevstate) => prevstate - 1);
    }
  };

  return (
    <>
      <section className="flex justify-around w-46 h-12 ">
        <button onClick={diminuir}>
          <CircleMinus className="text-feedback-error w-13 h-13 " />
        </button>
        <input
          type="text"
          maxLength={2}
          value={contador}
          onChange={(e) => {
            const valor = Number(e.target.value);
            if (!isNaN(valor)) {
              setContador(valor);
            }
          }}
          className=" outline-text-secondary-1 focus:outline-text-secondary border-1 border-text-secondary w-13 h-13 rounded-xl text-center text-white"
        />
        <button onClick={aumentar}>
          <CirclePlus className="text-brand-primary w-13 h-13" />
        </button>
      </section>
    </>
  );
}
