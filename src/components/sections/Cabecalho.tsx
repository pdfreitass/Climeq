import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Menu, Phone, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Marca";
import { cn } from "@/lib/utils";
import { contato, linkWhatsApp, mensagens, navegacao } from "@/data/clinic";

export function Cabecalho() {
  const [rolado, setRolado] = useState(false);
  const [menuAberto, setMenuAberto] = useState(false);

  useEffect(() => {
    const aoRolar = () => setRolado(window.scrollY > 12);
    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-suave",
        rolado
          ? "border-b border-pedra-200/80 bg-papel/85 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="container flex h-[68px] items-center justify-between gap-4 lg:h-[76px]">
        <a
          href="#inicio"
          className="group flex items-center gap-2.5 rounded-lg"
          aria-label="Climeq — ir para o início da página"
        >
          <Logo tamanho={40} prioridade className="size-9 lg:size-10" />
          <span className="flex flex-col leading-none">
            <span className={cn("font-display text-lg font-semibold tracking-tight transition-colors lg:text-xl", rolado ? "text-tinta" : "text-white")}>
              Climeq
            </span>
            <span className={cn("mt-0.5 hidden whitespace-nowrap text-[0.68rem] font-medium uppercase tracking-[0.14em] transition-colors sm:block", rolado ? "text-pedra-500" : "text-verde-200/80")}>
              Centro Médico Multidisciplinar
            </span>
          </span>
        </a>

        <nav aria-label="Navegação principal" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navegacao.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={cn("relative whitespace-nowrap rounded-full px-3.5 py-2 text-[0.92rem] font-medium transition-colors", rolado ? "text-pedra-600 hover:text-verde-800" : "text-verde-100/80 hover:text-white")}
                >
                  {item.rotulo}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={contato.telefone.link}
            className={cn("hidden items-center gap-2 whitespace-nowrap rounded-full px-3 py-2 text-[0.92rem] font-medium transition-colors xl:inline-flex", rolado ? "text-pedra-600 hover:text-verde-800" : "text-verde-100/80 hover:text-white")}
          >
            <Phone className="size-4" aria-hidden />
            {contato.telefone.exibicao}
          </a>

          <Button asChild size="sm" className="hidden sm:inline-flex">
            <a
              href={linkWhatsApp(mensagens.geral)}
              target="_blank"
              rel="noopener noreferrer"
            >
              Falar no WhatsApp
            </a>
          </Button>

          <Dialog.Root open={menuAberto} onOpenChange={setMenuAberto}>
            <Dialog.Trigger asChild>
              <button
                type="button"
                className={cn("grid size-11 place-items-center rounded-full transition-colors lg:hidden", rolado ? "text-tinta hover:bg-verde-50" : "text-white hover:bg-white/10")}
                aria-label="Abrir menu de navegação"
              >
                <Menu className="size-6" aria-hidden />
              </button>
            </Dialog.Trigger>

            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 z-50 bg-tinta/40 backdrop-blur-sm data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out data-[state=open]:fade-in" />
              <Dialog.Content
                aria-describedby={undefined}
                className="fixed inset-x-0 top-0 z-50 max-h-[100dvh] overflow-y-auto rounded-b-2xl bg-papel p-5 shadow-alta data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top"
              >
                <Dialog.Title className="sr-only">Menu de navegação</Dialog.Title>

                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2.5">
                    <Logo tamanho={36} className="size-9" />
                    <span className="font-display text-lg font-semibold text-tinta">
                      Climeq
                    </span>
                  </span>
                  <Dialog.Close asChild>
                    <button
                      type="button"
                      className="grid size-11 place-items-center rounded-full text-tinta transition-colors hover:bg-verde-50"
                      aria-label="Fechar menu"
                    >
                      <X className="size-6" aria-hidden />
                    </button>
                  </Dialog.Close>
                </div>

                <nav aria-label="Navegação principal (celular)" className="mt-6">
                  <ul className="flex flex-col">
                    {navegacao.map((item) => (
                      <li key={item.href}>
                        <a
                          href={item.href}
                          onClick={() => setMenuAberto(false)}
                          className="flex min-h-[52px] items-center border-b border-pedra-100 font-display text-xl text-tinta transition-colors hover:text-verde-700"
                        >
                          {item.rotulo}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>

                <div className="mt-6 flex flex-col gap-2.5 pb-2">
                  <Button asChild size="lg">
                    <a
                      href={linkWhatsApp(mensagens.geral)}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setMenuAberto(false)}
                    >
                      Falar no WhatsApp
                    </a>
                  </Button>
                  <Button asChild variant="secundario" size="lg">
                    <a href={contato.telefone.link}>
                      <Phone className="size-4" aria-hidden />
                      {contato.telefone.exibicao}
                    </a>
                  </Button>
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>
    </header>
  );
}
