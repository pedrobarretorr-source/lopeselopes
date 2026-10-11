import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { CAT, ETAPAS, FAM } from "@/data/central/catalogo";
import { CardFamilia } from "@/components/central/CardFamilia";
import { CardModelo } from "@/components/central/CardModelo";
import { BarraComparador } from "@/components/central/BarraComparador";

export const Route = createFileRoute("/central/etapa/$etapa")({
  loader: ({ params }) => {
    const etapa = ETAPAS.find((e) => e.id === params.etapa);
    if (!etapa) throw notFound();
    return etapa;
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: `${loaderData?.nome ?? "Etapa"} — equipamentos XCMG | Central de Britagem Lopes & Lopes`,
      },
      {
        name: "description",
        content: `${loaderData?.desc}. Modelos XCMG móveis e fixos para esta etapa da linha de britagem.`,
      },
      {
        property: "og:title",
        content: `${loaderData?.nome ?? "Etapa"} | Central de Britagem Lopes & Lopes`,
      },
      { property: "og:description", content: loaderData?.desc ?? "" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: EtapaPage,
});

function EtapaPage() {
  const etapa = Route.useLoaderData();
  const fams = Object.entries(FAM)
    .filter(([, f]) => f.etapa === etapa.id)
    .map(([k]) => k);
  const modelos = CAT.filter((m) => fams.includes(m.fam));

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 pb-28">
      <nav className="text-xs text-ap-fraco" aria-label="Trilha">
        <Link to="/central" className="hover:underline">
          Central de Britagem
        </Link>{" "}
        / <span>{etapa.nome}</span>
      </nav>
      <h1 className="mt-3 text-2xl font-black text-ap-azul-esc md:text-3xl">{etapa.nome}</h1>
      <p className="mt-2 max-w-2xl text-sm text-ap-fraco">{etapa.desc}.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {fams.map((f) => (
          <CardFamilia key={f} fam={f} />
        ))}
      </div>

      <h2 className="mt-10 text-lg font-black text-ap-azul-esc">Todos os modelos desta etapa</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {modelos.map((m) => (
          <CardModelo key={m.id} m={m} compacto />
        ))}
      </div>

      <div className="mt-10">
        <Link
          to="/central/simulador"
          className="inline-block rounded-md bg-ap-ambar px-6 py-3 text-sm font-extrabold uppercase tracking-wide text-ap-azul-esc transition-colors hover:bg-ap-ambar-esc"
        >
          Simular linha completa
        </Link>
      </div>
      <BarraComparador />
    </div>
  );
}
