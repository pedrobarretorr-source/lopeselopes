import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { calcularLinha, codificarCompartilhamento, type RespostasSim } from "@/data/central/motor";
import { fmt, zapLink } from "@/lib/ap";
import { BlocoCaptura } from "@/components/BlocoCaptura";

const NOMES_PRODUTO: Record<string, string> = {
  rachao: "Rachão / bica corrida",
  b3: "Brita 3",
  b2: "Brita 2",
  b1: "Brita 1",
  b0: "Brita 0",
  areia: "Pó / areia de brita",
  gran: "Minério classificado",
};

export function ResultadoSimulacao({ r, aoRefazer }: { r: RespostasSim; aoRefazer?: () => void }) {
  const res = calcularLinha(r);
  const produtos = (r.produtos ?? ["b1"]).map((p) => NOMES_PRODUTO[p] ?? p);

  const textoZap = [
    "Olá! Fiz a simulação de britagem no site da Lopes & Lopes:",
    `· Rocha: ${res.rocha.nome}`,
    `· Meta: ${fmt(res.tMes)} t/mês (${fmt(res.tHora)} t/h)`,
    `· Bloco: até ${res.top} mm · Produto mais fino: ${res.alvo} mm`,
    `· Linha sugerida: ${res.linha.map((l) => (l.m ? `${l.estagio} ${l.m.mod}` : l.estagio)).join(" → ")}`,
    "Quero conversar sobre essa configuração.",
  ].join("\n");

  function copiarLink() {
    const url = `${window.location.origin}/central/simulacao/${codificarCompartilhamento(r)}`;
    navigator.clipboard
      .writeText(url)
      .then(() => toast.success("Link da simulação copiado!"))
      .catch(() => toast.error("Não consegui copiar — anote a URL da página."));
  }

  return (
    <div className="mx-auto max-w-4xl px-4">
      {/* Veredito */}
      <div
        className={`rounded-xl border-2 p-5 ${res.atende ? "border-ap-ok/50 bg-ap-ok/10" : "border-ap-ambar/60 bg-ap-ambar/10"}`}
      >
        <p className="eyebrow">Resultado da simulação</p>
        <h2 className="mt-1 text-xl font-black text-ap-azul-esc md:text-2xl">
          {res.atende
            ? "A linha abaixo atende sua meta — com folga."
            : "Sua meta é agressiva: a linha abaixo chega perto. Vamos refinar juntos."}
        </h2>
        <div className="mt-3 flex flex-wrap gap-2 text-xs font-bold">
          <span className="rounded bg-white px-2.5 py-1 text-ap-azul-esc shadow-sm">
            {res.rocha.nome}
          </span>
          <span className="rounded bg-white px-2.5 py-1 text-ap-azul-esc shadow-sm">
            Meta: {fmt(res.tHora)} t/h
          </span>
          <span className="rounded bg-white px-2.5 py-1 text-ap-azul-esc shadow-sm">
            Estimativa da linha: {fmt(res.realMin)}–{fmt(res.realMax)} t/h
          </span>
          <span className="rounded bg-white px-2.5 py-1 text-ap-azul-esc shadow-sm">
            {res.est.length} {res.est.length === 1 ? "estágio" : "estágios"} de redução
          </span>
        </div>
      </div>

      {/* Fluxo de redução */}
      <h3 className="mt-8 text-sm font-extrabold uppercase tracking-wide text-ap-azul">
        Redução prevista
      </h3>
      <ol className="mt-2 space-y-1.5">
        {res.est.map((s) => (
          <li
            key={s.nome}
            className="flex flex-wrap items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm shadow-sm"
          >
            <span className="font-extrabold text-ap-azul">{s.nome}</span>
            <span className="text-ap-fraco">
              {fmt(s.entrada)} mm → {fmt(s.saida)} mm
            </span>
            <span className="ml-auto rounded bg-ap-azul-claro px-2 py-0.5 font-mono text-xs font-bold text-ap-azul">
              {s.rr.toFixed(1)}:1
            </span>
          </li>
        ))}
      </ol>

      {/* Linha sugerida */}
      <h3 className="mt-8 text-sm font-extrabold uppercase tracking-wide text-ap-azul">
        Linha sugerida
      </h3>
      <div className="mt-2 space-y-3">
        {res.linha.map((l, i) => (
          <div
            key={i}
            className="flex items-center gap-4 rounded-xl border-2 border-border bg-white p-4 shadow-sm"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-ap-azul text-sm font-black text-white">
              {i + 1}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold uppercase tracking-wide text-ap-fraco">{l.estagio}</p>
              {l.m ? (
                <>
                  <Link
                    to="/central/modelo/$id"
                    params={{ id: l.m.id }}
                    className="text-lg font-black text-ap-azul hover:underline"
                  >
                    {l.m.mod}
                  </Link>
                  <p className="text-xs text-ap-fraco">
                    {fmt(l.m.capMin)}–{fmt(l.m.capMax)} t/h · alimentação até {fmt(l.m.alim)} mm
                  </p>
                </>
              ) : (
                <p className="text-sm font-bold text-ap-alerta">
                  Sob consulta — configuração específica, fale com a Lopes & Lopes
                </p>
              )}
            </div>
            {l.m && (
              <Link
                to="/central/modelo/$id"
                params={{ id: l.m.id }}
                className="shrink-0 rounded-md border-2 border-ap-azul px-3 py-1.5 text-xs font-extrabold text-ap-azul transition-colors hover:bg-ap-azul hover:text-white"
              >
                Ficha
              </Link>
            )}
          </div>
        ))}
      </div>

      {/* Produtos */}
      <p className="mt-6 text-sm text-ap-fraco">
        <b className="text-ap-azul-esc">Produtos de saída:</b> {produtos.join(" · ")}
      </p>

      {/* Ações */}
      <div className="mt-6 flex flex-wrap gap-3">
        <a
          href={zapLink(textoZap)}
          target="_blank"
          rel="noopener"
          className="rounded-md bg-ap-ambar px-5 py-3 text-sm font-extrabold text-ap-azul-esc transition-colors hover:bg-ap-ambar-esc"
        >
          Enviar simulação no WhatsApp
        </a>
        <button
          onClick={copiarLink}
          className="rounded-md border-2 border-ap-azul px-5 py-3 text-sm font-extrabold text-ap-azul transition-colors hover:bg-ap-azul hover:text-white"
        >
          Copiar link da simulação
        </button>
        {aoRefazer && (
          <button
            onClick={aoRefazer}
            className="rounded-md border-2 border-border px-5 py-3 text-sm font-extrabold text-ap-fraco transition-colors hover:border-ap-azul hover:text-ap-azul"
          >
            Refazer simulação
          </button>
        )}
      </div>

      <p className="mt-6 rounded-lg bg-ap-azul-claro p-4 text-xs leading-relaxed text-ap-fraco">
        <b className="text-ap-azul">Nota técnica:</b> esta é uma estimativa de partida comercial,
        calculada com parâmetros típicos da rocha informada. Capacidades reais dependem de
        granulometria de alimentação, umidade e regulagem. O dimensionamento final é confirmado pela
        engenharia XCMG junto com a Lopes & Lopes.
      </p>

      <BlocoCaptura
        origem="simulador"
        titulo="Quer essa linha detalhada para sua pedreira?"
        sub="A simulação já ficou registrada com seus dados. Complete com sua necessidade e a equipe comercial responde com proposta."
        textoZap={textoZap}
        rotuloCta="Receber proposta da linha"
      />
    </div>
  );
}
