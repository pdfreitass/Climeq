import type { CSSProperties } from "react";
import { MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CenaSerra } from "@/components/CenaSerra";
import { contato, linkWhatsApp, mensagens } from "@/data/clinic";

export function ChamadaFinal() {
  return (
    <section className="secao bg-papel">
      <div className="container">
        <div
          data-revelar=""
          className="relative overflow-hidden rounded-3xl bg-verde-900 shadow-alta"
        >
          {/* Composição de marca ao fundo */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 opacity-45 lg:block"
          >
            <CenaSerra />
          </div>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-r from-verde-900 via-verde-900/95 to-verde-900/20"
          />

          <div className="relative px-7 py-14 sm:px-12 sm:py-16 lg:px-16 lg:py-20">
            <div className="max-w-[34ch]">
              <h2
                className="font-display text-white"
                style={{ fontSize: "var(--passo-4)" }}
              >
                Seu cuidado começa com uma conversa.
              </h2>

              <p
                data-revelar=""
                style={{ "--atraso": "80ms" } as CSSProperties}
                className="mt-6 text-lg leading-relaxed text-verde-100/85"
              >
                Entre em contato com nossa equipe para consultar especialidades,
                informações sobre atendimentos e disponibilidade.
              </p>
            </div>

            <div
              data-revelar=""
              style={{ "--atraso": "150ms" } as CSSProperties}
              className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <Button
                asChild
                size="lg"
                className="bg-verde-400 font-semibold text-verde-950 hover:bg-verde-300"
              >
                <a
                  href={linkWhatsApp(mensagens.geral)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="size-[1.1rem]" aria-hidden />
                  Falar com a Climeq
                </a>
              </Button>

              <Button asChild size="lg" variant="contorno">
                <a href={contato.telefone.link}>
                  <Phone className="size-[1.05rem]" aria-hidden />
                  {contato.telefone.exibicao}
                </a>
              </Button>
            </div>

            <p className="mt-6 max-w-[48ch] text-sm text-verde-100/60">
              O botão abre uma conversa no WhatsApp com a recepção da clínica.
              O agendamento é confirmado pela própria equipe durante o
              atendimento.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
