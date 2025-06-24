import React from "react";
import logoBarbearia from "../../assets/logo_barbearia_fionavalha.png";

export default function Home() {
  return (
    <>
      <section class="flex justify-center bg-[url('../assets/bg.svg')] bg-gradient-to-b from-[rgba(6,18,30,0.1)] bg-no-repeat to-[#06121e] min-h-screen">
        <div className="container">
          <section className="flex flex-col justify-center items-center h-150 text-white gap-y-6">
            <div className="flex flex-col items-center">
              <h2 className="heading-3">Clientes no salão:</h2>
              <h2 className="heading-1">10</h2>
            </div>

            <div className="flex flex-col items-center gap-2">
              <img src={logoBarbearia} className="rounded-full w-40 h-40 border-2 border-white" alt="Logo" />
              <h1 className="heading-1 text-center">ESTILO É UM REFLEXO DA SUA ATITUDE E SUA PERSONALIDADE.</h1>
            </div>

            <div className="flex flex-col items-center gap-y-2">
              <h3 className="text-body-bold">Horário de funcionamento: 09:00 ás 19:00</h3>
              <button className="botao-primario w-52 h-10 text-white">Entre em contato</button>
            </div>
          </section>
        </div>
      </section>
    </>
  );
}
