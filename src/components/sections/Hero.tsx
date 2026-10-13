import type { CSSProperties } from "react";
import { ArrowRight, MapPin, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CenaSerra } from "@/components/CenaSerra";
import {
  avaliacoesGoogle,
  clinica,
  contato,
  linkWhatsApp,
  mensagens,
} from "@/data/clinic";

export function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden bg-verde-950">
      {/* Camada atmosférica da marca */}
      <div
        aria-hidden
        className="textura-serra pointer-events-none absolute inset-0"
      />

      <div className="container relative pb-16 pt-28 sm:pb-20 sm:pt-32 lg:pb-24 lg:pt-36">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Coluna editorial */}
          <div className="lg:col-span-7">
            <p
              data-revelar=""
              className="inline-flex items-center gap-2 rounded-full border border-verde-400/25 bg-verde-400/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-verde-200"
            >
              <MapPin className="size-3.5" aria-hidden />
              {clinica.cidade} — {clinica.estado}
            </p>

            <h1
              data-revelar=""
              style={{ "--atraso": "70ms", fontSize: "var(--passo-5)" } as CSSProperties}
              className="mt-6 max-w-[17ch] font-display leading-[1.03] text-white"
            >
              Há {clinica.anos} anos, cuidando de você em{" "}
              <span className="text-verde-300">Teresópolis</span>.
            </h1>

            <p
              data-revelar=""
              style={{ "--atraso": "140ms" } as CSSProperties}
              className="medida mt-7 text-lg leading-relaxed text-verde-100/85"
            >
              Atendimento multidisciplinar, profissionais de diferentes
              especialidades e mais praticidade para cuidar da sua saúde — tudo
              em um só endereço, na Várzea.
            </p>

            <div
              data-revelar=""
              style={{ "--atraso": "210ms" } as CSSProperties}
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
                  Entre em contato pelo WhatsApp
                  <ArrowRight className="size-4" aria-hidden />
                </a>
              </Button>
              <Button asChild size="lg" variant="contorno">
                <a href="#especialidades">Conheça nossas especialidades</a>
              </Button>
            </div>

            {/* Prova social verificada no perfil público do Google */}
            <a
              data-revelar=""
              style={{ "--atraso": "280ms" } as CSSProperties}
              href={contato.googleMaps}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-8 inline-flex min-h-11 flex-wrap items-center gap-x-3 gap-y-1 py-2 text-sm text-verde-100/70 transition-colors hover:text-white"
            >
              <span className="flex items-center gap-1" aria-hidden>
                {Array.from({ length: 5 }).map((_, indice) => (
                  <Star
                    key={indice}
                    className="size-4 fill-verde-300 text-verde-300"
                  />
                ))}
              </span>
              <span>
                <strong className="font-semibold text-white">
                  {avaliacoesGoogle.nota.toLocaleString("pt-BR")}
                </strong>{" "}
                em {avaliacoesGoogle.total} avaliações no Google
              </span>
              <span className="underline-offset-4 group-hover:underline">
                Ver no Google
              </span>
            </a>
          </div>

          {/* Composição gráfica da marca */}
          <div
            data-revelar=""
            style={{ "--atraso": "160ms" } as CSSProperties}
            className="lg:col-span-5"
          >
            <figure className="relative overflow-hidden rounded-2xl shadow-alta ring-1 ring-white/10">
              <div className="aspect-[16/10] sm:aspect-[2/1] lg:aspect-[4/5]">
                <CenaSerra />
              </div>

              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-verde-950/95 via-verde-950/70 to-transparent p-5 sm:p-6">
                <p className="font-display text-lg leading-tight text-white">
                  Equipe multidisciplinar
                </p>
                <p className="mt-1 text-sm text-verde-100/75">
                  Diferentes especialidades em um só endereço.
                </p>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
