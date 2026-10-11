import { SVGS } from "@/data/site";

interface Props {
  id: string;
  className?: string;
}

/**
 * Ícone de linha/operação. Os valores de SVGS em site.ts são fragmentos
 * (<path>/<circle>) — este componente os envolve no <svg> correto.
 * (Antes eram injetados direto num <span>, o que não renderizava nada.)
 */
export function IconeLinha({ id, className = "" }: Props) {
  const paths = SVGS[id];
  if (!paths) return null;
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
      dangerouslySetInnerHTML={{ __html: paths }}
    />
  );
}
