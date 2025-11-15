import logoBarbearia from "../../../assets/images/logo_barbearia_fionavalha.png";
import { CircleUserRound } from "lucide-react";
import { Link } from "react-router";

export default function HomeHero({ numeroClientes, isSalaoAberto, horarioInicio, horarioFim }) {
  return (
    <section className="flex flex-col bg-[url('../assets/images/bg.svg')] bg-gradient-to-b from-[rgba(6,18,30,0.1)] bg-no-repeat to-[#06121e] min-h-svh">
      <header className="flex justify-end w-full p-6">
        <Link to="/login">
          <CircleUserRound aria-label="Login" width={40} height={40} className="text-white hover:text-brand-primary cursor-pointer" />
        </Link>
      </header>

      <section className="flex flex-col items-center grow gap-y-2">
        <img src={logoBarbearia} alt="Logo" className="rounded-full w-48 h-48 border-2 border-white" fetchpriority="high" loading="eager" />
        <h1 className="heading-1 text-center leading-10 sm:leading-16 text-white">
          BARBEARIA <br /> FIO NAVALHA
        </h1>
        <h2 className="text-body-bold text-white px-4 text-center">
          Horário de funcionamento: Seg à Sab / <strong>{horarioInicio}</strong> às <strong>{horarioFim}</strong>
        </h2>

        <div>
          {isSalaoAberto ? (
            <span className="flex justify-center items-center rounded-lg select-none bg-feedback-success w-24 h-7 text-white font-bold">Aberto</span>
          ) : (
            <span className="flex justify-center items-center rounded-lg select-none bg-feedback-error w-24 h-7 text-white font-bold">Fechado</span>
          )}
        </div>
      </section>

      {isSalaoAberto && (
        <div className="text-white gap-y-2 pb-8">
          {numeroClientes > 1 ? (
            <>
              <h2 className="heading-3 text-center">Clientes no salão:</h2>
              <h2 className="heading-1 text-center">{numeroClientes}</h2>
            </>
          ) : (
            <h2 className="heading-2 text-center">Disponível</h2>
          )}
        </div>
      )}
    </section>
  );
}
