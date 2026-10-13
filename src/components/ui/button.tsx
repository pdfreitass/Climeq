import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Botão da Climeq. A base do shadcn/ui foi mantida (Slot + cva, para preservar
 * acessibilidade e composição), mas as variantes seguem os tokens da marca.
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium transition-all duration-200 ease-suave disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-[1.05em] [&_svg]:shrink-0 active:translate-y-px",
  {
    variants: {
      variant: {
        primario:
          "bg-verde-700 text-white shadow-card hover:bg-verde-800 hover:shadow-alta",
        secundario:
          "bg-white text-verde-800 shadow-suave ring-1 ring-pedra-200 hover:ring-verde-300 hover:bg-verde-50",
        contorno:
          "border border-white/30 bg-white/5 text-white backdrop-blur-sm hover:bg-white/15 hover:border-white/50",
        sutil:
          "bg-verde-50 text-verde-800 hover:bg-verde-100",
        texto:
          "text-verde-700 hover:text-verde-900 underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-10 px-4 text-sm",
        md: "h-12 px-6 text-[0.95rem]",
        lg: "h-14 px-7 text-base",
      },
    },
    defaultVariants: { variant: "primario", size: "md" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
