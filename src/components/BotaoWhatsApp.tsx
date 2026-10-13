import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { linkWhatsApp, mensagens } from "@/data/clinic";

/**
 * Atalho flutuante para o WhatsApp. Só aparece depois da primeira dobra — na
 * qual o CTA principal já está visível — para não competir com o hero nem
 * cobrir conteúdo logo na entrada.
 */
export function BotaoWhatsApp() {
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const aoRolar = () => setVisivel(window.scrollY > 640);
    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, []);

  return (
    <a
      href={linkWhatsApp(mensagens.geral)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar com a Climeq pelo WhatsApp"
      tabIndex={visivel ? 0 : -1}
      aria-hidden={!visivel}
      className={cn(
        "group fixed bottom-5 right-5 z-40 grid size-14 place-items-center rounded-full bg-verde-700 text-white shadow-alta transition-all duration-300 ease-suave hover:bg-verde-800",
        "sm:bottom-7 sm:right-7",
        visivel
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0",
      )}
      style={{
        marginBottom: "env(safe-area-inset-bottom, 0px)",
      }}
    >
      <MessageCircle className="size-6" aria-hidden strokeWidth={1.9} />
      <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-full bg-tinta px-3.5 py-2 text-sm font-medium text-white opacity-0 shadow-card transition-opacity duration-200 group-hover:opacity-100 lg:block">
        Falar no WhatsApp
      </span>
    </a>
  );
}
