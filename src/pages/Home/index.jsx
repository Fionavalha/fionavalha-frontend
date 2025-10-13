import HomeHero from "./components/HomeHero";
import HomeSobre from "./components/HomeSobre";
import HomeServicos from "./components/HomeServicos";
import HomeRodape from "./components/HomeRodape";
import whatsapp from "@/assets/images/whatssapp.svg";

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export default function Home() {
  return (
    <>
      <section className="flex flex-col justify-center gap-y-20 min-h-screen">
        <HomeHero />
        <HomeSobre />
        <HomeServicos />
        <HomeRodape />

        <Tooltip>
          <TooltipTrigger asChild>
            <a href="https://api.whatsapp.com/send?phone=5567999456400&text=Quero%20fazer%20um%20agendamento%20hoje!" className="fixed bottom-8 right-4 w-16 h-16" target="_blank">
              <img src={whatsapp} alt="Botao whatsapp" />
            </a>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-white">Agende seu horário</p>
          </TooltipContent>
        </Tooltip>
      </section>
    </>
  );
}
