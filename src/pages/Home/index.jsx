import HomeHero from "./components/HomeHero";
import HomeSobre from "./components/HomeSobre";
import HomeServicos from "./components/HomeServicos";
import HomeRodape from "./components/HomeRodape";
import whatsapp from "@/assets/images/whatssapp.svg";

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { consultarBarbearias } from "../../services/api";
import { useEffect, useState } from "react";

export default function Home() {
  const [isSalaoAberto, setIsSalaoAberto] = useState(false);
  const [numeroClientes, setNumeroClientes] = useState(0);
  const [horarioInicio, setHorarioInicio] = useState("");
  const [horarioFim, setHorarioFim] = useState("");
  const [numeroTelefone, setNumeroTelefone] = useState("");

  async function listarBarbearias() {
    const response = await consultarBarbearias();
    setNumeroClientes(response.numero_clientes ?? 0);
    setIsSalaoAberto(response.status === "ABERTO");
    setHorarioInicio(response.horario_inicio);
    setHorarioFim(response.horario_fim);
    setNumeroTelefone(response.telefone);
  }

  useEffect(() => {
    listarBarbearias();

    const interval = setInterval(() => {
      listarBarbearias();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <section className="flex flex-col justify-center gap-y-20 min-h-screen">
        <HomeHero isSalaoAberto={isSalaoAberto} numeroClientes={numeroClientes} horarioInicio={horarioInicio} horarioFim={horarioFim} />
        <HomeSobre horarioInicio={horarioInicio} horarioFim={horarioFim} />
        <HomeServicos />
        <HomeRodape />

        <Tooltip>
          <TooltipTrigger asChild>
            <a href={`https://api.whatsapp.com/send?phone=55${numeroTelefone}&text=Já%20estou%20chegando,%20Pinja!`} className="fixed bottom-8 right-4 w-16 h-16" target="_blank">
              <img src={whatsapp} alt="Botao whatsapp" />
            </a>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-white">Mandar mensagem</p>
          </TooltipContent>
        </Tooltip>
      </section>
    </>
  );
}
