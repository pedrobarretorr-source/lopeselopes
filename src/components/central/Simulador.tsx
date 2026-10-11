import { useMemo, useState } from "react";
import { PASSOS, ROCHAS } from "@/data/central/simulador";
import { fatoresPadrao, type RespostasSim } from "@/data/central/motor";
import { fmt } from "@/lib/ap";
import { LeadForm } from "@/components/LeadForm";
import { ResultadoSimulacao } from "./ResultadoSimulacao";

type Fase = "perguntas" | "portao" | "resultado";

export function Simulador() {
  const [fase, setFase] = useState<Fase>("perguntas");
  const [passo, setPasso] = useState(0);
  const [resp, setResp] = useState<RespostasSim>({});
  const [multi, setMulti] = useState<string[]>([]);
  const [volume, setVolume] = useState(40);

  const atual = PASSOS[passo]!;
  const total = PASSOS.length;
  const progresso = ((fase === "perguntas" ? passo : total) / total) * 100;

  const prevVolume = useMemo(() => {
    const rocha = (ROCHAS[resp.pedra ?? "granito"] ?? ROCHAS["granito"])!;
    const tMes = volume * 20 * 22;
    const tHora = tMes / (8 * 22);
    return { tMes, tHora: tHora * fatoresPadrao(rocha), tHoraCat: tHora };
  }, [volume, resp.pedra]);

  function escolher(id: string, val: string) {
    setResp((r) => ({ ...r, [id]: val }));
    avancar();
  }

  function avancar() {
    if (atual.tipo === "multi") {
      setResp((r) => ({ ...r, produtos: multi.length ? multi : ["b1"] }));
    }
    if (atual.tipo === "volume") {
      setResp((r) => ({ ...r, volume }));
    }
    if (passo + 1 < total) {
      setPasso(passo + 1);
      setMulti([]);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setFase("portao");
    }
  }

  function voltar() {
    if (passo > 0) setPasso(passo - 1);
  }

  function reiniciar() {
    setResp({});
    setPasso(0);
    setMulti([]);
    setVolume(40);
    setFase("perguntas");
  }

  if (fase === "resultado") {
    return <ResultadoSimulacao r={resp} aoRefazer={reiniciar} />;
  }

  return (
    <div className="mx-auto max-w-3xl px-4">
      {/* Progresso */}
      <div className="mb-6">
        <div className="flex items-baseline justify-between text-xs font-bold text-ap-fraco">
          <span>{fase === "perguntas" ? `Pergunta ${passo + 1} de ${total}` : "Último passo"}</span>
          <span>{Math.round(progresso)}%</span>
        </div>
        <div className="mt-1 h-1.5 overflow-hidden rounded bg-ap-azul-claro">
          <div
            className="h-full rounded bg-ap-ambar transition-[width] duration-300"
            style={{ width: `${progresso}%` }}
          />
        </div>
      </div>

      {fase === "perguntas" && (
        <div>
          <h2 className="text-xl font-black text-ap-azul-esc md:text-2xl">{atual.titulo}</h2>

          {atual.tipo === "um" && (
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {atual.ops?.map(([val, t, d]) => (
                <button
                  key={val}
                  onClick={() => escolher(atual.id, val)}
                  className={`rounded-xl border-2 p-4 text-left transition-colors ${
                    (resp as Record<string, unknown>)[atual.id] === val
                      ? "border-ap-ambar bg-ap-ambar/10"
                      : "border-border bg-white hover:border-ap-azul"
                  }`}
                >
                  <span className="block text-sm font-extrabold text-ap-azul-esc">{t}</span>
                  <span className="mt-0.5 block text-xs text-ap-fraco">{d}</span>
                </button>
              ))}
            </div>
          )}

          {atual.tipo === "multi" && (
            <>
              <p className="mt-1 text-sm text-ap-fraco">Marque tudo que você quer vender.</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {atual.ops?.map(([val, t, d]) => {
                  const on = multi.includes(val);
                  return (
                    <button
                      key={val}
                      onClick={() =>
                        setMulti((m) => (on ? m.filter((x) => x !== val) : [...m, val]))
                      }
                      aria-pressed={on}
                      className={`rounded-xl border-2 p-4 text-left transition-colors ${
                        on
                          ? "border-ap-ambar bg-ap-ambar/10"
                          : "border-border bg-white hover:border-ap-azul"
                      }`}
                    >
                      <span className="flex items-center gap-2 text-sm font-extrabold text-ap-azul-esc">
                        <span
                          className={`flex h-4 w-4 items-center justify-center rounded border-2 text-[10px] ${
                            on ? "border-ap-ambar bg-ap-ambar text-ap-azul-esc" : "border-border"
                          }`}
                        >
                          {on && "✓"}
                        </span>
                        {t}
                      </span>
                      <span className="mt-0.5 block text-xs text-ap-fraco">{d}</span>
                    </button>
                  );
                })}
              </div>
            </>
          )}

          {atual.tipo === "volume" && (
            <div className="mt-5 rounded-xl border-2 border-border bg-white p-5">
              <label className="block">
                <span className="flex items-baseline justify-between">
                  <span className="text-sm font-bold text-ap-azul-esc">Volume mensal</span>
                  <output className="text-lg font-black text-ap-azul">
                    {fmt(volume)} mil m³/mês
                  </output>
                </span>
                <input
                  type="range"
                  min={5}
                  max={300}
                  step={5}
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  className="mt-2 w-full accent-ap-azul"
                />
                <span className="flex justify-between text-[11px] text-ap-fraco">
                  <span>5 mil</span>
                  <span>300 mil m³/mês</span>
                </span>
              </label>
              <p className="mt-3 rounded-lg bg-ap-azul-claro px-3 py-2 text-xs text-ap-azul-esc">
                ≈ <b>{fmt(prevVolume.tMes)} t/mês</b> · meta de{" "}
                <b>{fmt(prevVolume.tHoraCat)} t/h</b> em turno de 8 h
              </p>
            </div>
          )}

          <div className="mt-6 flex items-center justify-between">
            <button
              onClick={voltar}
              disabled={passo === 0}
              className="rounded-md px-4 py-2 text-sm font-bold text-ap-fraco transition-colors hover:text-ap-azul disabled:invisible"
            >
              ← Voltar
            </button>
            {(atual.tipo === "multi" || atual.tipo === "volume") && (
              <button
                onClick={avancar}
                className="rounded-md bg-ap-azul px-6 py-3 text-sm font-extrabold uppercase tracking-wide text-white transition-colors hover:bg-ap-azul-med"
              >
                {passo + 1 === total ? "Concluir" : "Avançar"} →
              </button>
            )}
          </div>
        </div>
      )}

      {fase === "portao" && (
        <div className="mx-auto max-w-lg">
          <div className="rounded-2xl border-2 border-ap-ambar/50 bg-white p-6 shadow-lg md:p-8">
            <p className="eyebrow-amb">Simulação pronta</p>
            <h2 className="mt-2 text-xl font-black text-ap-azul-esc md:text-2xl">
              Sua linha está calculada. Para onde envio o resultado?
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-ap-fraco">
              O resultado abre aqui na hora — e fica registrado para a equipe comercial já chegar
              sabendo da sua operação.
            </p>
            <div className="mt-5">
              <LeadForm
                origem="simulador"
                rotuloCta="Ver minha linha recomendada"
                simulacao={resp as Record<string, unknown>}
                compacto
                onSucesso={() => setFase("resultado")}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
