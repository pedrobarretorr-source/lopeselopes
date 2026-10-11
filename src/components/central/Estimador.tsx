import { useMemo, useState } from "react";
import { curvaEstim, FAIXAS } from "@/data/central/motor";
import { fmt } from "@/lib/ap";

interface Props {
  tipo: string;
  apfMin: number;
  apfMax: number;
  /** índice de dureza da rocha de referência (granito por padrão) */
  wi?: number;
}

/** Estimador granulométrico por APF — a régua do console, agora na página do modelo. */
export function Estimador({ tipo, apfMin, apfMax, wi = 15.5 }: Props) {
  const [apf, setApf] = useState(Math.round((apfMin + apfMax) / 2));

  const faixas = useMemo(() => {
    const passa = curvaEstim(tipo, apf, wi);
    return FAIXAS.map(([nome, de, ate]) => {
      const pct = ate > 1000 ? 100 - passa(de) : passa(ate) - passa(de);
      return { nome, pct: Math.max(0, pct) };
    });
  }, [tipo, apf, wi]);

  return (
    <div className="rounded-xl border-2 border-ap-azul/20 bg-ap-azul-claro p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-sm font-extrabold uppercase tracking-wide text-ap-azul">
          Estimativa granulométrica
        </h3>
        <span className="text-xs text-ap-fraco">referência: granito</span>
      </div>
      <label className="mt-4 block">
        <span className="flex items-baseline justify-between text-sm font-bold text-ap-azul-esc">
          Abertura APF <output className="text-lg font-black text-ap-azul">{apf} mm</output>
        </span>
        <input
          type="range"
          min={apfMin}
          max={apfMax}
          value={apf}
          onChange={(e) => setApf(Number(e.target.value))}
          className="mt-1 w-full accent-ap-azul"
          aria-label="Abertura APF em milímetros"
        />
        <span className="flex justify-between text-[11px] text-ap-fraco">
          <span>{apfMin} mm</span>
          <span>{apfMax} mm</span>
        </span>
      </label>
      <ul className="mt-4 space-y-1.5">
        {faixas.map((f) => (
          <li key={f.nome} className="flex items-center gap-2 text-xs">
            <span className="w-20 shrink-0 font-bold text-ap-azul-esc">{f.nome}</span>
            <span className="h-3.5 flex-1 overflow-hidden rounded bg-white">
              <span
                className="block h-full rounded bg-ap-ambar transition-[width]"
                style={{ width: `${Math.min(100, f.pct)}%` }}
              />
            </span>
            <span className="w-10 text-right font-mono font-bold text-ap-azul-esc">
              {fmt(f.pct)}%
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-[11px] leading-relaxed text-ap-fraco">
        Curva estimada para partida comercial. O dimensionamento final é confirmado pela engenharia
        XCMG.
      </p>
    </div>
  );
}
