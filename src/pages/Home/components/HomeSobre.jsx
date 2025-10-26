import React from "react";
import imagemSobre from "../../../assets/images/imagem-sobre.svg";

export default function HomeSobre({ horarioInicio, horarioFim }) {
  return (
    <>
      <section className="flex justify-center items-center px-2 min-h-svh">
        <div className="container flex flex-wrap justify-around items-center px-2">
          <picture>
            <img
              src={imagemSobre}
              className="w-96 h-96 sm:w-full sm:h-full"
              alt=""
            />
          </picture>
          <section className="flex flex-col max-w-174 gap-y-4">
            <h2 className="heading-1 text-white">Sobre</h2>
            <p className="text-white">
              Barbearia Fio Navalha, tradição e cuidado andam juntos. Cada corte
              é feito com atenção, boa conversa e aquele clima acolhedor de
              barbearia de verdade. Aqui, o cliente entra pra se cuidar e sai se
              sentindo novo.
            </p>
            <p className="text-white">
              Horário de funcionamento: <strong>Seg</strong> à{" "}
              <strong>Sab</strong> /<strong> {horarioInicio}</strong> ás{" "}
              <strong>{horarioFim}</strong>
            </p>
          </section>
        </div>
      </section>
    </>
  );
}
