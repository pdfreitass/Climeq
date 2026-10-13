import type { CSSProperties } from "react";
import { Clock, Layers, MapPin, Sparkles } from "lucide-react";
import { clinica, contato, horario } from "@/data/clinic";

const itens = [
  {
    icone: Sparkles,
    destaque: `${clinica.anos} anos`,
    titulo: "de história em Teresópolis",
    detalhe: "Atuação contínua em saúde preventiva e ambulatorial.",
  },
  {
    icone: Layers,
    destaque: "Multidisciplinar",
    titulo: "especialidades reunidas",
    detalhe: "Consultas médicas e equipe de apoio no mesmo lugar.",
  },
  {
    icone: MapPin,
    destaque: "Várzea",
    titulo: "Teresópolis — RJ",
    detalhe: contato.endereco.referencia + ".",
  },
  {
    icone: Clock,
    destaque: "Seg a sex",
    titulo: "recepção das 8h às 21h",
    detalhe: "Contato direto por telefone ou WhatsApp.",
  },
];

export function FaixaCredibilidade() {
  return (
    <section aria-label="A Climeq em resumo" className="relative z-10 -mt-px">
      <div className="container">
        <div className="relative -mt-10 rounded-2xl border border-pedra-200 bg-white p-2 shadow-alta sm:-mt-12 lg:-mt-14">
          <ul className="grid gap-px overflow-hidden rounded-xl bg-pedra-100 sm:grid-cols-2 lg:grid-cols-4">
            {itens.map((item, indice) => (
              <li
                key={item.destaque}
                data-revelar=""
                style={{ "--atraso": `${indice * 70}ms` } as CSSProperties}
                className="bg-white p-5 sm:p-6"
              >
                <item.icone
                  className="size-5 text-verde-600"
                  aria-hidden
                  strokeWidth={1.8}
                />
                <p className="mt-4 font-display text-xl leading-tight text-tinta">
                  {item.destaque}
                </p>
                <p className="text-[0.95rem] font-medium text-verde-700">
                  {item.titulo}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-pedra-500">
                  {item.detalhe}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-4 text-center text-xs text-pedra-400">
          {horario.observacao}
        </p>
      </div>
    </section>
  );
}
