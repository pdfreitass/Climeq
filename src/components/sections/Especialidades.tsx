import { useMemo, useState, type CSSProperties } from "react";
import {
  Activity,
  Apple,
  BookOpenCheck,
  Brain,
  Ear,
  Flower2,
  HeartHandshake,
  HeartPulse,
  Leaf,
  MessageCircle,
  Speech,
  Stethoscope,
  Users,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  especialidades,
  grupos,
  linkWhatsApp,
  mensagens,
  type GrupoId,
} from "@/data/clinic";

const icones: Record<string, LucideIcon> = {
  Stethoscope,
  HeartPulse,
  Flower2,
  Brain,
  Ear,
  Users,
  Speech,
  HeartHandshake,
  Apple,
  Activity,
  Leaf,
  BookOpenCheck,
};

type Filtro = GrupoId | "todas";

const filtros: { id: Filtro; rotulo: string }[] = [
  { id: "todas", rotulo: "Todas" },
  ...grupos.map((g) => ({ id: g.id as Filtro, rotulo: g.rotulo })),
];

export function Especialidades() {
  const [filtro, setFiltro] = useState<Filtro>("todas");

  const visiveis = useMemo(
    () =>
      filtro === "todas"
        ? especialidades
        : especialidades.filter((e) => e.grupo === filtro),
    [filtro],
  );

  const resumoAtivo =
    filtro === "todas"
      ? "Todas as áreas atendidas pela clínica, reunidas em um só endereço."
      : grupos.find((g) => g.id === filtro)?.resumo;

  return (
    <section id="especialidades" className="secao bg-verde-50">
      <div className="container">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p data-revelar="" className="olho">
              <span aria-hidden className="h-px w-6 bg-verde-400" />
              Especialidades
            </p>
            <h2
              data-revelar=""
              style={{ "--atraso": "60ms" } as CSSProperties}
              className="titulo-secao mt-5 max-w-[18ch]"
            >
              Diferentes áreas, um só lugar.
            </h2>
          </div>

          <p
            data-revelar=""
            style={{ "--atraso": "120ms" } as CSSProperties}
            aria-live="polite"
            className="medida-curta text-pedra-600 lg:pb-2 lg:text-right"
          >
            {resumoAtivo}
          </p>
        </div>

        {/* Filtro por grupo */}
        <div
          data-revelar=""
          style={{ "--atraso": "160ms" } as CSSProperties}
          className="mt-10"
        >
          {/*
            Grupo de botões de alternância em vez de `role="tablist"`: não há
            painéis de aba associados, e `aria-pressed` descreve corretamente o
            estado de cada filtro.
          */}
          <div
            role="group"
            aria-label="Filtrar especialidades por grupo"
            className="flex flex-wrap gap-2"
          >
            {filtros.map((item) => {
              const ativo = filtro === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={ativo}
                  onClick={() => setFiltro(item.id)}
                  className={cn(
                    "min-h-11 whitespace-nowrap rounded-full border px-4 py-2.5 text-sm font-medium transition-all duration-200 ease-suave",
                    ativo
                      ? "border-verde-700 bg-verde-700 text-white shadow-suave"
                      : "border-pedra-200 bg-white text-pedra-600 hover:border-verde-300 hover:text-verde-800",
                  )}
                >
                  {item.rotulo}
                </button>
              );
            })}
          </div>
        </div>

        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visiveis.map((especialidade, indice) => {
            const Icone = icones[especialidade.icone] ?? Stethoscope;
            return (
              <li
                key={especialidade.nome}
                data-revelar=""
                style={{ "--atraso": `${Math.min(indice, 6) * 50}ms` } as CSSProperties}
              >
                <article className="group relative flex h-full flex-col rounded-xl border border-pedra-200 bg-white p-6 transition-all duration-300 ease-suave hover:-translate-y-1 hover:border-verde-200 hover:shadow-card">
                  <span className="grid size-11 place-items-center rounded-lg bg-verde-50 text-verde-700 transition-colors duration-300 group-hover:bg-verde-700 group-hover:text-white">
                    <Icone className="size-[1.35rem]" aria-hidden strokeWidth={1.7} />
                  </span>

                  <h3 className="mt-5 font-display text-xl leading-snug">
                    {especialidade.nome}
                  </h3>
                  <p className="mt-2 flex-1 text-[0.95rem] leading-relaxed text-pedra-500">
                    {especialidade.descricao}
                  </p>

                  <a
                    href={linkWhatsApp(mensagens.especialidade(especialidade.nome))}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex min-h-11 items-center gap-2 self-start text-sm font-medium text-verde-700 transition-colors hover:text-verde-900"
                  >
                    <MessageCircle className="size-4" aria-hidden />
                    Consultar informações
                    <span className="sr-only">sobre {especialidade.nome}</span>
                  </a>
                </article>
              </li>
            );
          })}
        </ul>

        <p className="mt-8 text-center text-sm text-pedra-500">
          A agenda varia conforme a especialidade e o profissional.{" "}
          <a
            href={linkWhatsApp(mensagens.especialidades)}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-verde-700 underline underline-offset-4 hover:text-verde-900"
          >
            Consulte a disponibilidade com a recepção
          </a>
          .
        </p>
      </div>
    </section>
  );
}
