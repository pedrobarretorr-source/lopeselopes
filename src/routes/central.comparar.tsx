import { createFileRoute, Link } from "@tanstack/react-router";
import { FAM } from "@/data/central/catalogo";
import { IMG } from "@/data/central/images";
import { fotoReal } from "@/data/central/fotos";
import { fmt, zapLink } from "@/lib/ap";
import { useComparador } from "@/components/central/comparador";

export const Route = createFileRoute("/central/comparar")({
  head: () => ({
    meta: [
      { title: "Comparar modelos lado a lado | Central de Britagem Lopes & Lopes" },
      {
        name: "description",
        content:
          "Compare até 3 britadores ou peneiras XCMG: capacidade, boca, potência e peso lado a lado.",
      },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Comparador de modelos XCMG | Lopes & Lopes" },
      { property: "og:description", content: "Compare até 3 modelos XCMG lado a lado." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: CompararPage,
});

function CompararPage() {
  const { modelos, limpar } = useComparador();

  const linhas: [string, (m: (typeof modelos)[number]) => string][] = [
    ["Família", (m) => FAM[m.fam]?.nome ?? m.fam],
    ["Instalação", (m) => (m.inst === "movel" ? "Móvel (sobre esteiras)" : "Fixa")],
    ["Capacidade", (m) => `${fmt(m.capMin)}–${fmt(m.capMax)} t/h`],
    ["Alimentação máx.", (m) => `${fmt(m.alim)} mm`],
    ["Boca", (m) => m.boca],
    ["Potência", (m) => `${fmt(m.pot)} kW`],
    ["Peso", (m) => (m.peso ? `${fmt(m.peso)} t` : "—")],
    ["Disponibilidade", (m) => (m.status === "disponivel" ? "Disponível" : "Sob consulta")],
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <p className="eyebrow">Comparador</p>
      <h1 className="mt-2 text-2xl font-black text-ap-azul-esc md:text-3xl">Modelos lado a lado</h1>

      {modelos.length < 2 ? (
        <div className="mt-8 rounded-xl border-2 border-dashed border-border bg-white p-10 text-center">
          <p className="text-sm text-ap-fraco">
            {modelos.length === 0
              ? "Nenhum modelo selecionado. Use o botão + nos cards do catálogo para comparar até 3 modelos."
              : "Selecione pelo menos 2 modelos para comparar."}
          </p>
          <Link
            to="/central/catalogo"
            className="mt-4 inline-block rounded-md bg-ap-azul px-5 py-2.5 text-sm font-extrabold text-white transition-colors hover:bg-ap-azul-med"
          >
            Ir para o catálogo
          </Link>
        </div>
      ) : (
        <>
          <div className="mt-6 overflow-x-auto rounded-xl border-2 border-border bg-white">
            <table className="w-full min-w-[560px] text-sm">
              <thead>
                <tr className="bg-ap-azul text-white">
                  <th className="px-4 py-3 text-left text-xs uppercase tracking-wide">
                    Característica
                  </th>
                  {modelos.map((m) => (
                    <th key={m.id} className="px-4 py-3 text-left">
                      <div className="flex flex-col gap-2">
                        {(fotoReal(m.id) ?? IMG[m.id + "-hero"]) && (
                          <img
                            src={fotoReal(m.id) ?? IMG[m.id + "-hero"]}
                            alt={m.mod}
                            loading="lazy"
                            className="h-16 w-auto rounded bg-white object-contain"
                          />
                        )}
                        <Link
                          to="/central/modelo/$id"
                          params={{ id: m.id }}
                          className="text-base font-black hover:underline"
                        >
                          {m.mod}
                        </Link>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {linhas.map(([rotulo, fn]) => (
                  <tr key={rotulo} className="border-t border-border">
                    <th className="px-4 py-2.5 text-left text-xs font-bold uppercase tracking-wide text-ap-fraco">
                      {rotulo}
                    </th>
                    {modelos.map((m) => (
                      <td key={m.id} className="px-4 py-2.5 font-semibold text-ap-azul-esc">
                        {fn(m)}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr className="border-t border-border bg-ap-azul-claro/50">
                  <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wide text-ap-fraco">
                    Cotação
                  </th>
                  {modelos.map((m) => (
                    <td key={m.id} className="px-4 py-3">
                      <a
                        href={zapLink(`Olá! Comparei modelos no site e quero cotação do ${m.mod}.`)}
                        target="_blank"
                        rel="noopener"
                        className="inline-block rounded-md bg-ap-ambar px-3 py-2 text-xs font-extrabold text-ap-azul-esc transition-colors hover:bg-ap-ambar-esc"
                      >
                        Cotar {m.mod}
                      </a>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
          <button
            onClick={limpar}
            className="mt-4 text-xs font-bold text-ap-fraco underline-offset-2 hover:underline"
          >
            Limpar comparação
          </button>
        </>
      )}
    </div>
  );
}
