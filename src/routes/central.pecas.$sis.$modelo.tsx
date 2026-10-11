import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { byId } from "@/data/central/catalogo";
import { SISTEMAS, TIPO2SIS } from "@/data/central/pecas";
import { BlocoCaptura } from "@/components/BlocoCaptura";
import { fmt } from "@/lib/ap";

export const Route = createFileRoute("/central/pecas/$sis/$modelo")({
  loader: ({ params }) => {
    const sis = SISTEMAS.find((s) => s.id === params.sis);
    const m = byId(params.modelo);
    if (!sis || !m || TIPO2SIS[m.tipo] !== sis.id) throw notFound();
    return { sis, m };
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: `Peças para ${loaderData?.m.mod ?? ""} — ${loaderData?.sis.nome ?? ""} | Lopes & Lopes`,
      },
      {
        name: "description",
        content: loaderData
          ? `Peças de desgaste para o ${loaderData.m.mod}: ${loaderData.sis.itens.map((i) => i.nome).join(", ")}. Estoque e prazo com a Lopes & Lopes.`
          : "",
      },
      { property: "og:title", content: `Peças para ${loaderData?.m.mod ?? ""} | Lopes & Lopes` },
      { property: "og:description", content: loaderData?.sis.intro.slice(0, 155) ?? "" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PecasModeloPage,
});

function PecasModeloPage() {
  const { sis, m } = Route.useLoaderData();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <nav className="text-xs text-ap-fraco" aria-label="Trilha">
        <Link to="/central/pecas" className="hover:underline">
          Peças
        </Link>{" "}
        /{" "}
        <Link to="/central/pecas/$sis" params={{ sis: sis.id }} className="hover:underline">
          {sis.nome}
        </Link>{" "}
        / <span>{m.mod}</span>
      </nav>

      <p className="eyebrow mt-4">{sis.aplica}</p>
      <h1 className="mt-2 text-2xl font-black text-ap-azul-esc md:text-3xl">
        Peças de desgaste para o {m.mod}
      </h1>
      <p className="mt-2 max-w-2xl text-sm text-ap-fraco">
        {m.mod}: {fmt(m.capMin)}–{fmt(m.capMax)} t/h · alimentação até {fmt(m.alim)} mm.{" "}
        <Link
          to="/central/modelo/$id"
          params={{ id: m.id }}
          className="font-bold text-ap-azul hover:underline"
        >
          Ver ficha completa →
        </Link>
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {sis.itens.map((i) => (
          <div key={i.nome} className="rounded-xl border-2 border-border bg-white p-5">
            <h2 className="text-base font-extrabold text-ap-azul-esc">{i.nome}</h2>
            <p className="mt-1 text-sm text-ap-fraco">{i.funcao}</p>
            <dl className="mt-3 space-y-2 text-xs">
              <div>
                <dt className="font-extrabold uppercase tracking-wide text-ap-alerta">
                  Sinal de troca
                </dt>
                <dd className="mt-0.5 text-ap-fraco">{i.troca}</dd>
              </div>
              {i.mat && (
                <div>
                  <dt className="font-extrabold uppercase tracking-wide text-ap-azul">Material</dt>
                  <dd className="mt-0.5 text-ap-fraco">{i.mat}</dd>
                </div>
              )}
            </dl>
          </div>
        ))}
      </div>

      <BlocoCaptura
        origem={`pecas-${m.id}`}
        titulo={`Consultar peças do ${m.mod}`}
        sub="Informe a peça e a urgência — a Lopes & Lopes confirma estoque ou prazo de importação."
        textoZap={`Olá! Preciso de peças para o ${m.mod}. Peça: `}
        rotuloCta="Consultar disponibilidade"
        escuro
      />
    </div>
  );
}
