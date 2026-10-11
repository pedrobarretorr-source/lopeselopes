import type { ReactNode } from "react";

/**
 * Cabeçalho de seção padrão das páginas sobre fundo azul:
 * eyebrow âmbar com tick diagonal (assinatura "corte") + título branco + ação opcional,
 * com linha divisória. Mantém todas as páginas consistentes.
 */
export function SecaoTitulo({
  eyebrow,
  titulo,
  acao,
}: {
  eyebrow: string;
  titulo: string;
  acao?: ReactNode;
}) {
  return (
    <header className="flex flex-wrap items-end justify-between gap-3 border-b border-white/15 pb-4">
      <div>
        <p className="flex items-center gap-3 text-[0.72rem] font-extrabold uppercase tracking-[0.16em] text-ap-ambar">
          <span className="h-2.5 w-6 -skew-x-[22deg] rounded-[2px] bg-ap-ambar" />
          {eyebrow}
        </p>
        <h2 className="mt-2 font-display text-2xl text-white md:text-3xl">{titulo}</h2>
      </div>
      {acao}
    </header>
  );
}
