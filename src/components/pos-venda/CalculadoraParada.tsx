import { useMemo, useState } from "react";
import { fmt, zapLink } from "@/lib/ap";

/**
 * Calculadora de custo de máquina parada.
 * Entradas: produção (t/h), margem por tonelada (R$), horas de operação/dia.
 * Saída: custo por dia/parada de uma semana, comparado à manutenção planejada.
 */
export function CalculadoraParada() {
  const [tonHora, setTonHora] = useState(150);
  const [margem, setMargem] = useState(12);
  const [horasDia, setHorasDia] = useState(10);

  const r = useMemo(() => {
    const dia = tonHora * margem * horasDia;
    return { dia, semana: dia * 5, hora: tonHora * margem };
  }, [tonHora, margem, horasDia]);

  const campo =
    "mt-1 w-full rounded-lg border-2 border-border bg-white px-4 py-2.5 text-sm font-bold text-ap-azul-esc outline-none focus:border-ap-ambar";

  return (
    <div className="grid gap-8 md:grid-cols-2 md:items-center">
      <div>
        <p className="eyebrow text-ap-ambar">Faça as contas</p>
        <h2 className="mt-2 text-2xl leading-tight md:text-3xl">
          Quanto custa um dia com a máquina parada?
        </h2>
        <p className="mt-3 text-sm text-white/75">
          Ajuste os números da sua operação e veja por que manutenção planejada é sempre mais barata
          que quebra.
        </p>
        <div className="mt-6 space-y-4">
          <label className="block text-xs font-extrabold uppercase tracking-wide text-white/70">
            Produção (t/h)
            <input
              type="number"
              min={1}
              value={tonHora || ""}
              onChange={(e) => setTonHora(Number(e.target.value))}
              className={campo}
            />
          </label>
          <label className="block text-xs font-extrabold uppercase tracking-wide text-white/70">
            Margem por tonelada (R$)
            <input
              type="number"
              min={1}
              value={margem || ""}
              onChange={(e) => setMargem(Number(e.target.value))}
              className={campo}
            />
          </label>
          <label className="block text-xs font-extrabold uppercase tracking-wide text-white/70">
            Horas de operação por dia
            <input
              type="number"
              min={1}
              max={24}
              value={horasDia || ""}
              onChange={(e) => setHorasDia(Number(e.target.value))}
              className={campo}
            />
          </label>
        </div>
      </div>

      <div className="rounded-xl bg-white/5 p-6 ring-1 ring-white/10">
        <p className="text-xs font-extrabold uppercase tracking-wide text-white/60">
          Cada hora parada custa
        </p>
        <p className="mt-1 text-3xl font-black text-ap-ambar">R$ {fmt(r.hora)}</p>
        <div className="mt-5 space-y-3 border-t border-white/10 pt-5">
          <div className="flex items-baseline justify-between">
            <span className="text-sm text-white/70">Um dia parado</span>
            <span className="text-xl font-black text-white">R$ {fmt(r.dia)}</span>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-sm text-white/70">Uma semana parada</span>
            <span className="text-xl font-black text-ap-alerta">R$ {fmt(r.semana)}</span>
          </div>
        </div>
        <p className="mt-5 text-xs leading-relaxed text-white/55">
          Um plano de manutenção programada custa uma fração disso — e a parada acontece quando você
          escolhe.
        </p>
        <a
          href={zapLink(
            `Olá! Fiz a conta: minha operação perde ~R$ ${fmt(r.dia)}/dia parada. Quero falar sobre plano de manutenção Lopes & Lopes.`,
          )}
          target="_blank"
          rel="noopener"
          className="corte mt-5 inline-block bg-ap-ambar px-6 py-3.5 text-sm font-extrabold uppercase tracking-wide text-ap-azul-esc transition-colors hover:bg-ap-ambar-esc"
        >
          Falar sobre plano de manutenção
        </a>
      </div>
    </div>
  );
}
