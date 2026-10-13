import { cn } from "@/lib/utils";

/** Logo institucional da Climeq, servido a partir do arquivo original da marca. */
export function Logo({
  className,
  tamanho = 44,
  prioridade = false,
}: {
  className?: string;
  tamanho?: number;
  prioridade?: boolean;
}) {
  return (
    <img
      src="/brand/climeq-logo-192.png"
      srcSet="/brand/climeq-logo-192.png 192w, /brand/climeq-logo-512.png 512w"
      sizes={`${tamanho}px`}
      width={tamanho}
      height={tamanho}
      alt="Climeq — Centro Médico Multidisciplinar"
      className={cn("shrink-0 select-none", className)}
      loading={prioridade ? "eager" : "lazy"}
      // @ts-expect-error fetchPriority ainda não está nos tipos do React 18
      fetchpriority={prioridade ? "high" : undefined}
      decoding="async"
      draggable={false}
    />
  );
}

/**
 * Silhueta da serra, derivada do pictograma de montanha do logo da Climeq.
 * É o elemento gráfico recorrente que amarra as seções e referencia Teresópolis.
 */
export function Serra({
  className,
  ...props
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 1200 180"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
      className={cn("block w-full", className)}
      {...props}
    >
      <path d="M0 148 L96 104 L168 128 L268 62 L352 116 L452 44 L556 112 L664 58 L760 118 L868 76 L972 124 L1080 88 L1200 132 L1200 180 L0 180 Z" />
    </svg>
  );
}
