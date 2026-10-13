import { cn } from "@/lib/utils";

/**
 * Composição gráfica da serra de Teresópolis, construída a partir do pictograma
 * de montanha presente no logo da Climeq.
 *
 * É um elemento de marca — não representa, nem pretende representar, uma
 * fotografia da clínica ou de seus profissionais.
 */
export function CenaSerra({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 600 680"
      className={cn("block size-full", className)}
      role="img"
      aria-label="Ilustração da serra de Teresópolis, elemento gráfico da marca Climeq"
      preserveAspectRatio="xMidYMax slice"
    >
      <defs>
        <linearGradient id="ceu" x1="0" y1="0" x2="0.3" y2="1">
          <stop offset="0%" stopColor="#062A52" />
          <stop offset="45%" stopColor="#063F8E" />
          <stop offset="100%" stopColor="#0A5235" />
        </linearGradient>
        <radialGradient id="halo" cx="0.68" cy="0.2" r="0.52">
          <stop offset="0%" stopColor="#7FCFA6" stopOpacity="0.55" />
          <stop offset="55%" stopColor="#2A9A63" stopOpacity="0.14" />
          <stop offset="100%" stopColor="#2A9A63" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="cume3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0F6A45" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#0F6A45" stopOpacity="0.18" />
        </linearGradient>
        <linearGradient id="cume2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0A5235" />
          <stop offset="100%" stopColor="#073623" />
        </linearGradient>
        <linearGradient id="cume1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#073623" />
          <stop offset="100%" stopColor="#042317" />
        </linearGradient>
        <linearGradient id="neblina" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#B4E5CC" stopOpacity="0" />
          <stop offset="100%" stopColor="#B4E5CC" stopOpacity="0.16" />
        </linearGradient>
      </defs>

      <rect width="600" height="680" fill="url(#ceu)" />
      <rect width="600" height="680" fill="url(#halo)" />

      <g transform="translate(0 -150) scale(1 1.22)">
      {/* Cordilheira distante */}
      <path
        d="M0 430 L70 372 L128 404 L205 318 L268 376 L340 290 L404 352 L470 300 L540 358 L600 326 L600 680 L0 680 Z"
        fill="url(#cume3)"
      />
      <rect y="380" width="600" height="150" fill="url(#neblina)" />

      {/* Cordilheira média, com o pico agulhado característico da região */}
      <path
        d="M0 512 L84 462 L146 492 L226 404 L262 348 L300 418 L366 462 L436 400 L512 460 L600 414 L600 680 L0 680 Z"
        fill="url(#cume2)"
      />

      {/* Primeiro plano */}
      <path
        d="M0 596 L96 548 L168 582 L258 510 L340 566 L430 512 L520 570 L600 534 L600 680 L0 680 Z"
        fill="url(#cume1)"
      />
      </g>
    </svg>
  );
}
