import { cn } from "@/lib/utils";

interface LogoProps {
  /** Classes extras no wrapper (ex.: fundo/padding, caso queira um contêiner). */
  className?: string;
  /**
   * Sobrescreve a altura fluida da imagem. Por padrão a logo escala
   * suavemente entre ~28px (telas pequenas) e ~44px (telas grandes)
   * via clamp(), mantendo a proporção (w-auto) em qualquer tela.
   */
  imgClassName?: string;
}

/**
 * Logo do site — fonte única da verdade (arquivo + alt). Fundo transparente,
 * sem contêiner. Altura fluida com clamp(): proporcional a qualquer tela, sem
 * media queries e sem JS. Trocar aqui reflete no site todo.
 */
export function Logo({ className, imgClassName }: LogoProps) {
  return (
    <span className={cn("inline-flex items-center", className)}>
      <img
        src="/logo.png"
        alt="Lopes & Lopes — Equipamentos e Mineração"
        width={1200}
        height={500}
        className={cn("h-[clamp(1.75rem,1.45rem+1vw,2.75rem)] w-auto", imgClassName)}
      />
    </span>
  );
}
