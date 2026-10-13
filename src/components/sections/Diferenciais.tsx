import type { CSSProperties } from "react";
import { Serra } from "@/components/Marca";
import { clinica } from "@/data/clinic";

const diferenciais = [
  {
    titulo: "Uma trajetória longa na mesma cidade",
    texto: `São ${clinica.anos} anos atendendo Teresópolis em saúde preventiva e ambulatorial. Tempo de casa não é promessa de resultado clínico — é histórico de funcionamento, equipe formada e pacientes que voltam.`,
  },
  {
    titulo: "Especialidades que conversam entre si",
    texto:
      "Consultas médicas e equipe multidisciplinar dividem o mesmo endereço. Quando um acompanhamento envolve mais de uma área, o paciente não precisa recomeçar a busca em outro lugar da cidade.",
  },
  {
    titulo: "Endereço central, fácil de chegar",
    texto:
      "A clínica fica na Av. Delfim Moreira, 598, 1º andar, na Várzea, em frente ao Shopping Teresópolis — uma referência que praticamente todo morador da cidade conhece.",
  },
  {
    titulo: "Uma recepção que responde",
    texto:
      "Telefone e WhatsApp são atendidos pela equipe da recepção, de segunda a sexta, das 8h às 21h. É com ela que se consultam especialidades, atendimentos e disponibilidade.",
  },
];

export function Diferenciais() {
  return (
    <section className="relative overflow-hidden bg-verde-950 text-white">
      <div
        aria-hidden
        className="textura-serra pointer-events-none absolute inset-0"
      />
      <Serra
        className="pointer-events-none absolute inset-x-0 top-0 h-24 rotate-180 fill-verde-50"
        aria-hidden
      />

      <div className="container secao relative">
        <div className="max-w-[46ch]">
          <p data-revelar="" className="olho text-verde-300">
            <span aria-hidden className="h-px w-6 bg-verde-400" />
            Diferenciais
          </p>
          <h2
            data-revelar=""
            style={{ "--atraso": "60ms" } as CSSProperties}
            className="titulo-secao mt-5 text-white"
          >
            O que a Climeq oferece, em termos concretos.
          </h2>
        </div>

        <ol className="mt-14 grid gap-px overflow-hidden rounded-2xl bg-white/10 sm:grid-cols-2">
          {diferenciais.map((item, indice) => (
            <li
              key={item.titulo}
              data-revelar=""
              style={{ "--atraso": `${indice * 80}ms` } as CSSProperties}
              className="bg-verde-950/60 p-7 backdrop-blur-sm sm:p-9"
            >
              <span
                aria-hidden
                className="font-display text-sm font-semibold tabular-nums text-verde-400"
              >
                {String(indice + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-display text-2xl leading-tight text-white">
                {item.titulo}
              </h3>
              <p className="mt-3 text-[0.98rem] leading-relaxed text-verde-100/75">
                {item.texto}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
