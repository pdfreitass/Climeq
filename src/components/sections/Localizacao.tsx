import { useState, type CSSProperties } from "react";
import {
  Clock,
  Map as IconeMapa,
  Instagram,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Serra } from "@/components/Marca";
import { contato, horario, linkWhatsApp, mensagens } from "@/data/clinic";

export function Localizacao() {
  // O mapa só é carregado a pedido do visitante: evita um iframe de terceiros
  // (e seus cookies) no carregamento inicial da página.
  const [mapaCarregado, setMapaCarregado] = useState(false);

  return (
    <section id="localizacao" className="secao bg-verde-50">
      <div className="container">
        <div className="max-w-[44ch]">
          <p data-revelar="" className="olho">
            <span aria-hidden className="h-px w-6 bg-verde-400" />
            Localização e contato
          </p>
          <h2
            data-revelar=""
            style={{ "--atraso": "60ms" } as CSSProperties}
            className="titulo-secao mt-5"
          >
            Onde encontrar a Climeq.
          </h2>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-12">
          {/* Dados de contato */}
          <div
            data-revelar=""
            className="flex flex-col gap-6 lg:col-span-5"
          >
            <ul className="divide-y divide-pedra-100 overflow-hidden rounded-2xl border border-pedra-200 bg-white">
              <li className="flex gap-4 p-6">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-verde-50 text-verde-700">
                  <MapPin className="size-5" aria-hidden strokeWidth={1.8} />
                </span>
                <div>
                  <h3 className="font-display text-base text-tinta">Endereço</h3>
                  <address className="mt-1.5 not-italic leading-relaxed text-pedra-600">
                    {contato.endereco.logradouro}, {contato.endereco.complemento}
                    <br />
                    {contato.endereco.bairro}, {contato.endereco.cidade} —{" "}
                    {contato.endereco.estado}
                    <br />
                    CEP {contato.endereco.cep}
                  </address>
                  <p className="mt-2 text-sm text-pedra-500">
                    {contato.endereco.referencia}
                  </p>
                  <a
                    href={contato.googleMaps}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-verde-700 transition-colors hover:text-verde-900"
                  >
                    <Navigation className="size-4" aria-hidden />
                    Abrir rotas no Google Maps
                  </a>
                </div>
              </li>

              <li className="flex gap-4 p-6">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-verde-50 text-verde-700">
                  <Phone className="size-5" aria-hidden strokeWidth={1.8} />
                </span>
                <div>
                  <h3 className="font-display text-base text-tinta">
                    Telefone e WhatsApp
                  </h3>
                  <p className="mt-1.5 flex flex-col gap-1">
                    <a
                      href={contato.telefone.link}
                      className="font-medium text-pedra-700 transition-colors hover:text-verde-700"
                    >
                      {contato.telefone.exibicao}
                    </a>
                    <a
                      href={linkWhatsApp(mensagens.geral)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-medium text-pedra-700 transition-colors hover:text-verde-700"
                    >
                      <MessageCircle className="size-4" aria-hidden />
                      {contato.whatsapp.exibicao} (WhatsApp)
                    </a>
                  </p>
                </div>
              </li>

              <li className="flex gap-4 p-6">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-verde-50 text-verde-700">
                  <Clock className="size-5" aria-hidden strokeWidth={1.8} />
                </span>
                <div>
                  <h3 className="font-display text-base text-tinta">
                    Horário da recepção
                  </h3>
                  <dl className="mt-1.5 space-y-1">
                    {horario.detalhe.map((faixa) => (
                      <div key={faixa.dias} className="flex flex-wrap gap-x-2">
                        <dt className="text-pedra-600">{faixa.dias}:</dt>
                        <dd className="font-medium text-pedra-700">
                          {faixa.horas}
                        </dd>
                      </div>
                    ))}
                  </dl>
                  <p className="mt-2.5 text-sm leading-relaxed text-pedra-500">
                    {horario.observacao}
                  </p>
                </div>
              </li>

              <li className="flex gap-4 p-6">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-verde-50 text-verde-700">
                  <Instagram className="size-5" aria-hidden strokeWidth={1.8} />
                </span>
                <div>
                  <h3 className="font-display text-base text-tinta">Instagram</h3>
                  <a
                    href={contato.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1.5 inline-block font-medium text-pedra-700 transition-colors hover:text-verde-700"
                  >
                    @clinicaclimeq
                  </a>
                </div>
              </li>
            </ul>

            <Button asChild size="lg">
              <a
                href={linkWhatsApp(mensagens.geral)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="size-[1.05rem]" aria-hidden />
                Falar com a recepção
              </a>
            </Button>
          </div>

          {/* Mapa sob demanda */}
          <div
            data-revelar=""
            style={{ "--atraso": "120ms" } as CSSProperties}
            className="lg:col-span-7"
          >
            <div className="relative h-full min-h-[380px] overflow-hidden rounded-2xl border border-pedra-200 bg-verde-900">
              {mapaCarregado ? (
                <iframe
                  title="Mapa com a localização da Climeq na Av. Delfim Moreira, 598, Teresópolis"
                  src={contato.mapaEmbed}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 size-full border-0"
                />
              ) : (
                <>
                  <div
                    aria-hidden
                    className="textura-serra pointer-events-none absolute inset-0"
                  />
                  <Serra
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-44 fill-verde-950/60"
                    aria-hidden
                  />

                  <div className="relative flex h-full flex-col items-center justify-center gap-5 p-8 text-center">
                    <span className="grid size-14 place-items-center rounded-full bg-white/10 text-verde-200">
                      <MapPin className="size-7" aria-hidden strokeWidth={1.6} />
                    </span>
                    <div>
                      <p className="font-display text-2xl text-white">
                        {contato.endereco.logradouro}
                      </p>
                      <p className="mt-2 text-verde-100/75">
                        {contato.endereco.bairro}, {contato.endereco.cidade} —{" "}
                        {contato.endereco.estado}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-3">
                      <button
                        type="button"
                        onClick={() => setMapaCarregado(true)}
                        className="inline-flex h-12 items-center gap-2 rounded-full bg-white px-6 text-[0.95rem] font-medium text-verde-800 shadow-card transition-all duration-200 ease-suave hover:bg-verde-50 active:translate-y-px"
                      >
                        <IconeMapa className="size-4" aria-hidden />
                        Carregar o mapa
                      </button>
                      <a
                        href={contato.googleMaps}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-12 items-center gap-2 rounded-full border border-white/30 px-6 text-[0.95rem] font-medium text-white transition-colors hover:bg-white/10"
                      >
                        <Navigation className="size-4" aria-hidden />
                        Traçar rota
                      </a>
                    </div>

                    <p className="max-w-[40ch] text-xs text-verde-100/55">
                      O mapa é carregado apenas quando você pede, para não
                      atrasar o site nem acionar serviços de terceiros sem
                      necessidade.
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
