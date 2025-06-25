import React from "react";
import logoBarbearia from "../../../assets/images/logo_barbearia_fionavalha.png";

export default function HomeHero() {
  return (
    <>
      <section className="flex flex-col justify-around bg-[url('../assets/images/bg.svg')] bg-gradient-to-b from-[rgba(6,18,30,0.1)] bg-no-repeat to-[#06121e] min-h-screen">
          <header className="flex flex-col items-center gap-y-2">
            <img src={logoBarbearia} className="rounded-full w-48 h-48 border-2 border-white" alt="Logo" />
            <h1 className="heading-1 text-center leading-10 sm:leading-16 text-white">BARBEARIA <br /> FIO NAVALHA</h1>
          </header>
          <div className="flex flex-col items-center gap-y-2">
            <h3 className="text-body-bold text-white">
              Horário de funcionamento: <strong>09:00</strong> ás <strong>19:00</strong>
            </h3>
            <button className="botao-primario w-52 h-10 text-white">Entre em contato</button>
          </div>
          <div className="text-white gap-y-2">
            <h2 className="heading-3 text-center">Clientes no salão:</h2>
            <h2 className="heading-1 text-center">10</h2>
          </div>
      </section>
    </>
  );
}
