import type { CSSProperties } from "react";
import { ArrowUpRight, Award, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { avaliacoesGoogle, contato, premio } from "@/data/clinic";

export function Avaliacoes() {
  const { nota, total, verificadoEm } = avaliacoesGoogle;

  return (
    <section id="avaliacoes" className="secao bg-papel">
      <div className="container">
        <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-pedra-200 bg-white shadow-card">
          <div className="grid sm:grid-cols-[auto_1fr]">
            {/* Nota */}
            <div
              data-revelar=""
              className="flex flex-col items-center justify-center gap-3 border-b border-pedra-100 bg-verde-50/70 px-8 py-10 sm:border-b-0 sm:border-r sm:px-12"
            >
              <p className="font-display text-6xl leading-none text-verde-800">
                {nota.toLocaleString("pt-BR", { minimumFractionDigits: 1 })}
              </p>
              <p className="flex items-center gap-1" aria-hidden>
                {Array.from({ length: 5 }).map((_, indice) => (
                  <Star
                    key={indice}
                    className="size-[1.1rem] fill-verde-600 text-verde-600"
                  />
                ))}
              </p>
              <p className="text-sm font-medium text-pedra-600">
                {total} avaliações
              </p>
            </div>

            {/* Contexto */}
            <div
              data-revelar=""
              style={{ "--atraso": "80ms" } as CSSProperties}
              className="p-8 sm:p-10"
            >
              <p className="olho">
                <span aria-hidden className="h-px w-6 bg-verde-400" />
                Avaliações
              </p>

              <h2 className="titulo-secao mt-5 max-w-[20ch]">
                A opinião de quem já foi atendido.
              </h2>

              <p className="medida mt-5 leading-relaxed text-pedra-600">
                A Climeq tem{" "}
                <strong className="font-semibold text-tinta">
                  nota {nota.toLocaleString("pt-BR", { minimumFractionDigits: 1 })} em{" "}
                  {total} avaliações
                </strong>{" "}
                no perfil público do Google. Os depoimentos ficam na própria
                página do Google, onde podem ser lidos na íntegra e verificados
                por qualquer pessoa.
              </p>

              <div className="mt-6 flex items-center gap-3 rounded-xl border border-verde-200 bg-verde-50 px-4 py-3">
                <Award className="size-5 shrink-0 text-verde-700" aria-hidden strokeWidth={1.8} />
                <p className="text-[0.95rem] text-pedra-700">
                  <strong className="font-semibold text-tinta">
                    {premio.nome} {premio.ano}
                  </strong>{" "}
                  — {premio.categoria}
                </p>
              </div>

              <div className="mt-7 flex flex-wrap gap-3">
                <Button asChild>
                  <a
                    href={contato.googleMaps}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ler as avaliações no Google
                    <ArrowUpRight className="size-4" aria-hidden />
                  </a>
                </Button>
                <Button asChild variant="secundario">
                  <a
                    href={contato.googleBusca}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ver a Climeq no Google
                  </a>
                </Button>
              </div>

              <p className="mt-6 text-xs leading-relaxed text-pedra-400">
                Fonte: perfil público da Climeq no Google, conferido em{" "}
                {verificadoEm}. O número de avaliações muda com o tempo.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
