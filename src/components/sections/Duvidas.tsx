import type { CSSProperties } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { linkWhatsApp, mensagens, perguntasFrequentes } from "@/data/clinic";

export function Duvidas() {
  return (
    <section id="duvidas" className="secao bg-papel">
      <div className="container">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <p data-revelar="" className="olho">
              <span aria-hidden className="h-px w-6 bg-verde-400" />
              Dúvidas frequentes
            </p>
            <h2
              data-revelar=""
              style={{ "--atraso": "60ms" } as CSSProperties}
              className="titulo-secao mt-5 max-w-[16ch]"
            >
              O que costumam perguntar.
            </h2>
            <p
              data-revelar=""
              style={{ "--atraso": "120ms" } as CSSProperties}
              className="medida-curta mt-5 leading-relaxed text-pedra-600"
            >
              Não encontrou o que procurava?{" "}
              <a
                href={linkWhatsApp(mensagens.geral)}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-verde-700 underline underline-offset-4 hover:text-verde-900"
              >
                Pergunte à recepção pelo WhatsApp
              </a>
              .
            </p>
          </div>

          <div
            data-revelar=""
            style={{ "--atraso": "100ms" } as CSSProperties}
            className="lg:col-span-8"
          >
            <Accordion type="single" collapsible className="flex flex-col gap-3">
              {perguntasFrequentes.map((item, indice) => (
                <AccordionItem key={item.pergunta} value={`pergunta-${indice}`}>
                  <AccordionTrigger>{item.pergunta}</AccordionTrigger>
                  <AccordionContent>{item.resposta}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
