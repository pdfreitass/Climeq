import type { CSSProperties } from "react";
import { Building2, Stethoscope, UserRound } from "lucide-react";
import { Serra } from "@/components/Marca";
import { clinica, contato } from "@/data/clinic";

const marcos = [
  {
    icone: UserRound,
    rotulo: "Direção",
    valor: clinica.direcao,
  },
  {
    icone: Stethoscope,
    rotulo: "Atuação",
    valor: "Saúde preventiva e ambulatorial",
  },
  {
    icone: Building2,
    rotulo: "Referência",
    valor: contato.endereco.referencia,
  },
];

export function AClimeq() {
  return (
    <section id="a-climeq" className="secao relative overflow-hidden bg-papel">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <p data-revelar="" className="olho">
              <span aria-hidden className="h-px w-6 bg-verde-400" />
              A Climeq
            </p>

            <h2
              data-revelar=""
              style={{ "--atraso": "60ms" } as CSSProperties}
              className="titulo-secao mt-5 max-w-[20ch]"
            >
              Um centro médico que cresceu junto com a cidade.
            </h2>

            <div
              data-revelar=""
              style={{ "--atraso": "120ms" } as CSSProperties}
              className="medida mt-7 space-y-5 text-[1.05rem] leading-relaxed text-pedra-600"
            >
              <p>
                A <strong className="font-semibold text-tinta">Climeq</strong> —
                Clínica Médica Equipe Multidisciplinar — é uma clínica popular
                que atua há {clinica.anos} anos em Teresópolis, na região
                serrana do Rio de Janeiro, com foco em saúde preventiva e
                atendimento ambulatorial.
              </p>
              <p>
                Sob a direção da{" "}
                <strong className="font-semibold text-tinta">
                  {clinica.direcao}
                </strong>
                , a clínica reúne consultas médicas em diferentes
                especialidades e uma equipe multidisciplinar de apoio. Na
                prática, isso significa resolver em um só endereço o que
                normalmente exigiria procurar vários lugares da cidade.
              </p>
              <p>
                A recepção fica no 1º andar da Av. Delfim Moreira, 598, na
                Várzea — em frente ao Shopping Teresópolis — e é por
                ela que passam o agendamento, as dúvidas sobre especialidades e
                a confirmação de disponibilidade.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div
              data-revelar=""
              style={{ "--atraso": "160ms" } as CSSProperties}
              className="relative overflow-hidden rounded-2xl bg-verde-900 shadow-alta"
            >
              <Serra
                className="absolute inset-x-0 bottom-0 h-40 fill-verde-950/70"
                aria-hidden
              />
              <div
                aria-hidden
                className="textura-serra pointer-events-none absolute inset-0"
              />

              <ul className="relative divide-y divide-white/10 p-2">
                {marcos.map((marco) => (
                  <li key={marco.rotulo} className="flex gap-4 p-5 sm:p-6">
                    <span className="grid size-10 shrink-0 place-items-center rounded-full bg-white/10 text-verde-200">
                      <marco.icone className="size-5" aria-hidden strokeWidth={1.8} />
                    </span>
                    <span>
                      <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-verde-300">
                        {marco.rotulo}
                      </span>
                      <span className="mt-1 block font-display text-lg leading-snug text-white">
                        {marco.valor}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
