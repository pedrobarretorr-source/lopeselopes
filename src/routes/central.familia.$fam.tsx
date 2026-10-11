import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { CAT, FAM } from "@/data/central/catalogo";
import { IMG } from "@/data/central/images";
import { TIPO2SIS } from "@/data/central/pecas";
import { CardModelo } from "@/components/central/CardModelo";
import { BarraComparador } from "@/components/central/BarraComparador";
import { BlocoCaptura } from "@/components/BlocoCaptura";

export const Route = createFileRoute("/central/familia/$fam")({
  loader: ({ params }) => {
    const fam = FAM[params.fam];
    if (!fam) throw notFound();
    return { id: params.fam, ...fam };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.nome ?? "Família"} XCMG | Central de Britagem Lopes & Lopes` },
      { name: "description", content: loaderData?.cliente?.slice(0, 155) ?? "" },
      { property: "og:title", content: `${loaderData?.nome ?? "Família"} XCMG | Lopes & Lopes` },
      { property: "og:description", content: loaderData?.cliente?.slice(0, 155) ?? "" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FamiliaPage,
});

function FamiliaPage() {
  const fam = Route.useLoaderData();
  const modelos = CAT.filter((m) => m.fam === fam.id);
  const foto = fam.img && IMG[fam.img] ? IMG[fam.img] : null;
  const sisId = modelos[0] ? TIPO2SIS[modelos[0].tipo] : null;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 pb-28">
      <nav className="text-xs text-ap-fraco" aria-label="Trilha">
        <Link to="/central" className="hover:underline">
          Central
        </Link>{" "}
        /{" "}
        <Link to="/central/catalogo" className="hover:underline">
          Catálogo
        </Link>{" "}
        / <span>{fam.titulo ?? fam.nome}</span>
      </nav>

      <div className="mt-4 grid items-center gap-8 md:grid-cols-[1.2fr_1fr]">
        <div>
          <p className="eyebrow">{fam.cat ?? "Catálogo XCMG"}</p>
          <h1 className="mt-2 text-2xl font-black text-ap-azul-esc md:text-3xl">{fam.nome}</h1>
          <p className="mt-3 text-sm leading-relaxed text-ap-fraco md:text-base">{fam.cliente}</p>
          {fam.quando && (
            <p className="mt-3 rounded-lg border-l-4 border-ap-ambar bg-ap-ambar/10 p-3 text-sm text-ap-azul-esc">
              <b>Quando escolher:</b> {fam.quando}
            </p>
          )}
          {fam.desgaste && (
            <div className="mt-4">
              <p className="text-xs font-extrabold uppercase tracking-wide text-ap-fraco">
                Itens de desgaste
              </p>
              <ul className="mt-2 flex flex-wrap gap-2">
                {fam.desgaste.map((d) => (
                  <li
                    key={d}
                    className="rounded-full bg-ap-azul-claro px-3 py-1 text-xs font-bold text-ap-azul"
                  >
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        {foto && (
          <img
            src={foto}
            alt={fam.nome}
            loading="lazy"
            className="w-full rounded-xl bg-white object-contain p-4 shadow-sm"
          />
        )}
      </div>

      <h2 className="mt-10 text-lg font-black text-ap-azul-esc">
        {modelos.length} {modelos.length === 1 ? "modelo" : "modelos"} nesta família
      </h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {modelos.map((m) => (
          <CardModelo key={m.id} m={m} />
        ))}
      </div>

      {sisId && (
        <p className="mt-8 text-sm">
          <Link
            to="/central/pecas/$sis"
            params={{ sis: sisId }}
            className="font-extrabold text-ap-azul hover:underline"
          >
            Ver peças de desgaste desta família →
          </Link>
        </p>
      )}

      <BlocoCaptura
        origem={`familia-${fam.id}`}
        titulo={`Quer cotação de ${fam.titulo ?? fam.nome}?`}
        sub="Deixe seus dados ou chame no WhatsApp — a equipe responde com disponibilidade e condição."
      />
      <BarraComparador />
    </div>
  );
}
