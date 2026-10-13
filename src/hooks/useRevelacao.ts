import { useEffect } from "react";

/**
 * Revela os elementos marcados com `data-revelar` quando entram na viewport.
 * O CSS garante que, com `prefers-reduced-motion`, tudo já nasce visível —
 * portanto o conteúdo nunca depende do JavaScript para ser legível.
 */
export function useRevelacao() {
  useEffect(() => {
    const semMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (semMovimento || !("IntersectionObserver" in window)) {
      document
        .querySelectorAll<HTMLElement>("[data-revelar]")
        .forEach((el) => (el.dataset.revelar = "visivel"));
      return;
    }

    const observador = new IntersectionObserver(
      (entradas) => {
        for (const entrada of entradas) {
          if (!entrada.isIntersecting) continue;
          (entrada.target as HTMLElement).dataset.revelar = "visivel";
          observador.unobserve(entrada.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    const observarPendentes = () => {
      document
        .querySelectorAll<HTMLElement>('[data-revelar=""]')
        .forEach((el) => observador.observe(el));
    };

    observarPendentes();

    // Seções com conteúdo filtrável inserem novos nós depois da montagem.
    const mutacoes = new MutationObserver(observarPendentes);
    mutacoes.observe(document.body, { childList: true, subtree: true });

    return () => {
      observador.disconnect();
      mutacoes.disconnect();
    };
  }, []);
}
