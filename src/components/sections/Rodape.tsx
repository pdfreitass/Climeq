import { Instagram, MapPin, MessageCircle, Phone } from "lucide-react";
import { Logo, Serra } from "@/components/Marca";
import {
  clinica,
  contato,
  horario,
  linkWhatsApp,
  mensagens,
  navegacao,
} from "@/data/clinic";

export function Rodape() {
  const ano = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-verde-950 text-verde-100/70">
      <Serra
        className="pointer-events-none absolute inset-x-0 top-0 h-20 rotate-180 fill-papel"
        aria-hidden
      />

      <div className="container relative pb-10 pt-24 sm:pt-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Marca */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3">
              <Logo tamanho={48} className="size-12" />
              <span className="flex flex-col leading-none">
                <span className="font-display text-xl font-semibold text-white">
                  {clinica.nome}
                </span>
                <span className="mt-1 text-[0.7rem] font-medium uppercase tracking-[0.14em] text-verde-300">
                  {clinica.descritor}
                </span>
              </span>
            </div>

            <p className="medida-curta mt-6 leading-relaxed">
              Clínica popular multidisciplinar em Teresópolis — RJ, com{" "}
              {clinica.anos} anos de atuação em saúde preventiva e ambulatorial.
              Direção: {clinica.direcao}.
            </p>

            <a
              href={contato.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:border-white/40 hover:bg-white/5"
            >
              <Instagram className="size-4" aria-hidden />
              @clinicaclimeq
            </a>
          </div>

          {/* Navegação */}
          <nav aria-label="Navegação do rodapé" className="lg:col-span-3">
            <h2 className="font-display text-base text-white">Navegação</h2>
            <ul className="mt-5 flex flex-col gap-3">
              {navegacao.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-[0.95rem] transition-colors hover:text-white"
                  >
                    {item.rotulo}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={contato.googleBusca}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[0.95rem] transition-colors hover:text-white"
                >
                  A Climeq no Google
                </a>
              </li>
            </ul>
          </nav>

          {/* Contato */}
          <div className="lg:col-span-4">
            <h2 className="font-display text-base text-white">Contato</h2>
            <ul className="mt-5 flex flex-col gap-4 text-[0.95rem]">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-verde-400" aria-hidden />
                <address className="not-italic leading-relaxed">
                  {contato.endereco.linhaUnica}
                  <br />
                  <span className="text-verde-100/50">
                    {contato.endereco.referencia}
                  </span>
                </address>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 size-4 shrink-0 text-verde-400" aria-hidden />
                <a
                  href={contato.telefone.link}
                  className="transition-colors hover:text-white"
                >
                  {contato.telefone.exibicao}
                </a>
              </li>
              <li className="flex gap-3">
                <MessageCircle
                  className="mt-0.5 size-4 shrink-0 text-verde-400"
                  aria-hidden
                />
                <a
                  href={linkWhatsApp(mensagens.geral)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-white"
                >
                  {contato.whatsapp.exibicao} (WhatsApp)
                </a>
              </li>
            </ul>

            <p className="mt-5 text-sm text-verde-100/50">{horario.resumo}.</p>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-7 text-xs text-verde-100/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {ano} {clinica.nome} — {clinica.nomeCompleto}.
          </p>
          <p>Teresópolis, Rio de Janeiro.</p>
        </div>
      </div>
    </footer>
  );
}
