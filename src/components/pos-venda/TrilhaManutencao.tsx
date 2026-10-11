import { useState } from "react";

interface Intervalo {
  h: string;
  titulo: string;
  itens: string[];
}

const TRILHA: Intervalo[] = [
  {
    h: "250 h",
    titulo: "Primeira revisão",
    itens: ["Troca de óleo e filtros", "Torque de fixações", "Inspeção de mangueiras e vazamentos"],
  },
  {
    h: "500 h",
    titulo: "Manutenção de desgaste",
    itens: [
      "Filtros de ar e combustível",
      "Inspeção de dentes, unhas e blindagens",
      "Análise de óleo (telemetria)",
    ],
  },
  {
    h: "1.000 h",
    titulo: "Revisão estrutural",
    itens: [
      "Óleo hidráulico e respiros",
      "Inspeção de estrutura e soldas",
      "Calibragem e testes de ciclo",
    ],
  },
  {
    h: "2.000 h",
    titulo: "Revisão maior",
    itens: [
      "Fluidos de transmissão e eixos",
      "Componentes de desgaste programado",
      "Relatório completo de frota",
    ],
  },
];

/** Linha do tempo interativa do plano de manutenção programada. */
export function TrilhaManutencao() {
  const [ativo, setAtivo] = useState(0);
  const sel = TRILHA[ativo];

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Intervalos de manutenção">
        {TRILHA.map((t, i) => (
          <button
            key={t.h}
            role="tab"
            aria-selected={ativo === i}
            onClick={() => setAtivo(i)}
            className={`rounded-full border-2 px-4 py-2 text-xs font-extrabold transition-colors ${
              ativo === i
                ? "border-ap-ambar bg-ap-ambar text-ap-azul-esc"
                : "border-border bg-white text-ap-fraco hover:border-ap-ambar hover:text-ap-ambar-esc"
            }`}
          >
            {t.h}
          </button>
        ))}
      </div>

      {sel && (
        <div className="mt-5 rounded-xl border-2 border-border bg-white p-6 shadow-sm">
          <div className="flex items-baseline gap-3">
            <span className="text-2xl font-black text-ap-azul">{sel.h}</span>
            <h3 className="text-base font-extrabold text-ap-azul-esc">{sel.titulo}</h3>
          </div>
          <ul className="mt-4 space-y-2">
            {sel.itens.map((it) => (
              <li key={it} className="flex items-start gap-2 text-sm text-ap-fraco">
                <svg
                  className="mt-0.5 h-4 w-4 shrink-0 text-ap-ok"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="m5 13 4 4L19 7" />
                </svg>
                {it}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-ap-fraco/70">
            Peças e mão de obra programadas — a parada acontece no dia que você escolher.
          </p>
        </div>
      )}
    </div>
  );
}
