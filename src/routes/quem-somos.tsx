import { createFileRoute, Link } from "@tanstack/react-router";
import { BlocoCaptura } from "@/components/BlocoCaptura";

export const Route = createFileRoute("/quem-somos")({
  head: () => ({
    meta: [
      { title: "Quem somos — Lopes & Lopes, máquinas XCMG para todo o Brasil" },
      {
        name: "description",
        content:
          "A Lopes & Lopes é especializada em equipamentos XCMG com atendimento nacional: britagem, máquinas pesadas e pós-venda técnico. Conheça a equipe e a história.",
      },
      { property: "og:title", content: "Quem somos | Lopes & Lopes" },
      {
        property: "og:description",
        content: "Especialista em XCMG no Brasil: britagem, máquinas e pós-venda.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: QuemSomosPage,
});

function QuemSomosPage() {
  return (
    <div>
      <section className="corte-b bg-ap-noite pb-14 pt-12 text-white">
        <div className="mx-auto max-w-3xl px-4">
          <p className="eyebrow text-ap-ambar">Quem somos</p>
          <h1 className="mt-3 text-3xl leading-tight md:text-4xl">
            A Lopes & Lopes nasceu dentro da pedreira, não do showroom
          </h1>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 py-10">
        <div className="mt-6 space-y-5 text-sm leading-relaxed text-ap-azul-esc md:text-base">
          <p>
            A Lopes & Lopes é especializada em equipamentos XCMG, com atendimento em todo o Brasil.
            Somos uma equipe de gente que veio da operação — engenheiros, técnicos e comerciais que
            já passaram madrugada em pedreira e sabem o que significa uma linha parada.
          </p>
          <p>
            Por isso o nosso jeito é diferente: a gente não vende máquina, a gente monta operação.
            Antes de falar de preço, a gente pergunta de rocha, de produção, de granulometria.
            Depois da venda, a gente continua — com peças em estoque, assistência em campo e
            telemetria.
          </p>
          <p>
            A{" "}
            <Link to="/central" className="font-bold text-ap-azul hover:underline">
              Central de Britagem
            </Link>{" "}
            é a expressão pública desse compromisso: o conhecimento técnico que usamos para
            especificar linhas, aberto para qualquer operador consultar — com catálogo, simulador e
            guia de peças.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {[
            ["BR", "Atendimento em todo o Brasil"],
            ["XCMG", "Linha completa da maior fabricante da China"],
            ["24h", "Resposta de suporte para máquina parada"],
          ].map(([n, d]) => (
            <div key={n} className="rounded-xl border-2 border-border bg-white p-5 text-center">
              <p className="text-2xl font-black text-ap-azul">{n}</p>
              <p className="mt-1 text-xs text-ap-fraco">{d}</p>
            </div>
          ))}
        </div>

        <BlocoCaptura
          origem="quem-somos"
          titulo="Vamos conversar sobre a sua operação?"
          sub="Visita técnica, cotação ou só uma dúvida — a equipe Lopes & Lopes responde."
          escuro
        />
      </div>
    </div>
  );
}
