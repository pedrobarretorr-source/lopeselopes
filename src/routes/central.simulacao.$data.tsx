import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { decodificarCompartilhamento } from "@/data/central/motor";
import { ResultadoSimulacao } from "@/components/central/ResultadoSimulacao";

export const Route = createFileRoute("/central/simulacao/$data")({
  loader: ({ params }) => {
    const resp = decodificarCompartilhamento(params.data);
    if (!resp) throw notFound();
    return resp;
  },
  head: () => ({
    meta: [
      { title: "Simulação de linha de britagem compartilhada | Lopes & Lopes" },
      {
        name: "description",
        content: "Linha de britagem XCMG estimada pelo simulador da Lopes & Lopes.",
      },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Simulação de linha de britagem | Lopes & Lopes" },
      {
        property: "og:description",
        content: "Linha de britagem XCMG estimada pelo simulador da Lopes & Lopes.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: SimulacaoCompartilhadaPage,
});

function SimulacaoCompartilhadaPage() {
  const resp = Route.useLoaderData();
  return (
    <div className="py-10 md:py-14">
      <div className="mx-auto max-w-4xl px-4">
        <p className="eyebrow">Simulação compartilhada</p>
        <h1 className="mt-2 text-2xl font-black text-ap-azul-esc md:text-3xl">
          Linha de britagem estimada pelo simulador Lopes & Lopes
        </h1>
        <p className="mt-2 text-sm text-ap-fraco">
          Alguém da sua equipe simulou esta configuração.{" "}
          <Link to="/central/simulador" className="font-bold text-ap-azul hover:underline">
            Faça sua própria simulação →
          </Link>
        </p>
      </div>
      <div className="mt-8">
        <ResultadoSimulacao r={resp} />
      </div>
    </div>
  );
}
