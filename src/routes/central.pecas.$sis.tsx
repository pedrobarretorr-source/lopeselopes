import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { CAT, byId } from "@/data/central/catalogo";
import { KITS, SISTEMAS, TIPO2SIS } from "@/data/central/pecas";
import { IMG } from "@/data/central/images";
import { BlocoCaptura } from "@/components/BlocoCaptura";

export const Route = createFileRoute("/central/pecas/$sis")({
  loader: ({ params }) => {
    const sis = SISTEMAS.find((s) => s.id === params.sis);
    if (!sis) throw notFound();
    return sis;
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: `Peças para ${loaderData?.nome ?? "sistema"} — desgaste e reposição | Lopes & Lopes`,
      },
      { name: "description", content: loaderData?.intro?.slice(0, 155) ?? "" },
      {
        property: "og:title",
        content: `Peças para ${loaderData?.nome ?? "sistema"} | Lopes & Lopes`,
      },
      { property: "og:description", content: loaderData?.intro?.slice(0, 155) ?? "" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SistemaPage,
});

function SistemaPage() {
  const sis = Route.useLoaderData();
  const kits = KITS.filter(
    (k) =>
      k.id === `kit-${sis.id}` ||
      k.para.some((p) => p.toLowerCase().includes(sis.nome.toLowerCase().slice(0, 5))),
  );
  const modelos = CAT.filter((m) => TIPO2SIS[m.tipo] === sis.id);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <nav className="text-xs text-ap-fraco" aria-label="Trilha">
        <Link to="/central/pecas" className="hover:underline">
          Peças
        </Link>{" "}
        / <span>{sis.nome}</span>
      </nav>

      <div className="mt-4 grid items-center gap-8 md:grid-cols-[1.3fr_1fr]">
        <div>
          <p className="eyebrow">{sis.aplica}</p>
          <h1 className="mt-2 text-2xl font-black text-ap-azul-esc md:text-3xl">
            Peças para {sis.nome}
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-ap-fraco md:text-base">{sis.intro}</p>
        </div>
        {IMG[sis.img] && (
          <img
            src={IMG[sis.img]}
            alt={sis.nome}
            loading="lazy"
            className="w-full rounded-xl bg-white object-contain p-4 shadow-sm"
          />
        )}
      </div>

      {/* Itens */}
      <div className="mt-8 overflow-x-auto rounded-xl border-2 border-border bg-white">
        <table className="w-full min-w-[640px] text-sm">
          <thead>
            <tr className="bg-ap-azul text-left text-white">
              <th className="px-4 py-3">Peça</th>
              <th className="px-4 py-3">Função</th>
              <th className="px-4 py-3">Sinal de troca</th>
              <th className="px-4 py-3">Material</th>
            </tr>
          </thead>
          <tbody>
            {sis.itens.map((i) => (
              <tr key={i.nome} className="border-t border-border align-top">
                <td className="px-4 py-3 font-bold text-ap-azul-esc">{i.nome}</td>
                <td className="px-4 py-3 text-ap-fraco">{i.funcao}</td>
                <td className="px-4 py-3 text-ap-fraco">{i.troca}</td>
                <td className="px-4 py-3 text-ap-fraco">{i.mat ?? "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Por modelo */}
      {modelos.length > 0 && (
        <section className="mt-10">
          <h2 className="text-lg font-black text-ap-azul-esc">
            Buscar peças pelo modelo da máquina
          </h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {modelos.map((m) => (
              <li key={m.id}>
                <Link
                  to="/central/pecas/$sis/$modelo"
                  params={{ sis: sis.id, modelo: m.id }}
                  className="rounded-full border-2 border-border bg-white px-4 py-1.5 text-xs font-extrabold text-ap-azul transition-colors hover:border-ap-azul"
                >
                  {m.mod}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Kits */}
      {kits.length > 0 && (
        <section className="mt-10">
          <h2 className="text-lg font-black text-ap-azul-esc">Kits relacionados</h2>
          <div className="mt-3 grid gap-4 md:grid-cols-2">
            {kits.map((k) => (
              <div key={k.id} className="rounded-xl border-2 border-border bg-white p-5">
                <h3 className="text-base font-extrabold text-ap-azul-esc">{k.nome}</h3>
                <p className="mt-1 text-xs text-ap-fraco">{k.quando}</p>
                <ul className="mt-2 space-y-1 text-sm text-ap-azul-esc">
                  {k.itens.map((i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-ap-ambar">▸</span> {i}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      <BlocoCaptura
        origem={`pecas-${sis.id}`}
        titulo={`Precisa de ${sis.nome.toLowerCase()} agora?`}
        sub="Mande o modelo da máquina e a peça — respondemos com disponibilidade e prazo."
        textoZap={`Olá! Preciso de peças para ${sis.nome} (${sis.aplica}). Modelo: `}
        rotuloCta="Consultar peças"
        escuro
      />
    </div>
  );
}
