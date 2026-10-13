import { useRevelacao } from "@/hooks/useRevelacao";
import { Cabecalho } from "@/components/sections/Cabecalho";
import { Hero } from "@/components/sections/Hero";
import { FaixaCredibilidade } from "@/components/sections/FaixaCredibilidade";
import { AClimeq } from "@/components/sections/AClimeq";
import { Especialidades } from "@/components/sections/Especialidades";
import { Diferenciais } from "@/components/sections/Diferenciais";
import { Avaliacoes } from "@/components/sections/Avaliacoes";
import { ChamadaFinal } from "@/components/sections/ChamadaFinal";
import { Localizacao } from "@/components/sections/Localizacao";
import { Duvidas } from "@/components/sections/Duvidas";
import { Rodape } from "@/components/sections/Rodape";
import { BotaoWhatsApp } from "@/components/BotaoWhatsApp";

export default function App() {
  useRevelacao();

  return (
    <>
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-verde-700 focus:px-5 focus:py-3 focus:text-sm focus:font-medium focus:text-white"
      >
        Pular para o conteúdo
      </a>

      <Cabecalho />

      <main id="conteudo">
        <Hero />
        <FaixaCredibilidade />
        <AClimeq />
        <Especialidades />
        <Diferenciais />
        <Avaliacoes />
        <ChamadaFinal />
        <Localizacao />
        <Duvidas />
      </main>

      <Rodape />
      <BotaoWhatsApp />
    </>
  );
}
