import { CircleMinus, CirclePlus } from "lucide-react";
import { useState } from "react";

export default function Contador() {
  const [contador, setContador] = useState(0);

  const aumentar = () => {
    setContador((prevstate) => prevstate + 1);
  };

  const diminuir = () => {
    if (contador > 0) {
      setContador((prevstate) => prevstate - 1);
    }
  };

  return (
    <>
      <section className="flex justify-around w-40 h-12 ">
        <button onClick={diminuir}>
          <CircleMinus className="text-feedback-error w-10 h-10 " />
        </button>
        <input
          type="Number"
          value={contador}
          onChange={(e) => {
            setContador(Number(e.target.value));
          }}
          className=" outline-text-secondary-1 focus:outline-text-secondary border-1 border-text-secondary w-12 h-12 rounded-xl text-center text-white"
        />
        <button onClick={aumentar}>
          <CirclePlus className="text-brand-primary w-10 h-10" />
        </button>
      </section>
    </>
  );
}
