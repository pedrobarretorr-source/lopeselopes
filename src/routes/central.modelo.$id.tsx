import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { byId, CAT, FAM } from "@/data/central/catalogo";
import { IMG } from "@/data/central/images";
import { fotoReal } from "@/data/central/fotos";
import { TIPO2SIS } from "@/data/central/pecas";
import { Estimador } from "@/components/central/Estimador";
import { BarraComparador } from "@/components/central/BarraComparador";
import { BlocoCaptura } from "@/components/BlocoCaptura";
import { fmt, zapLink } from "@/lib/ap";
import { useComparador } from "@/components/central/comparador";
import { toast } from "sonner";

export const Route = createFileRoute("/central/modelo/$id")({
  loader: ({ params }) => {
    const m = byId(params.id);
    if (!m) throw notFound();
    return m;
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: `${loaderData?.mod ?? "Modelo"} — ficha técnica | Central de Britagem Lopes & Lopes`,
      },
      {
        name: "description",
        content: loaderData
          ? `${loaderData.mod}: ${fmt(loaderData.capMin)}–${fmt(loaderData.capMax)} t/h, alimentação até ${fmt(loaderData.alim)} mm, ${fmt(loaderData.pot)} kW. ${FAM[loaderData.fam]?.nome ?? ""}`
          : "",
      },
      {
        property: "og:title",
        content: `${loaderData?.mod ?? "Modelo"} | Central de Britagem Lopes & Lopes`,
      },
      {
        property: "og:description",
        content: loaderData
          ? `${fmt(loaderData.capMin)}–${fmt(loaderData.capMax)} t/h · até ${fmt(loaderData.alim)} mm`
          : "",
      },
      { property: "og:type", content: "product" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ModeloPage,
});

const APF_RANGE: Record<string, [number, number]> = {
  mandibula: [80, 250],
  giratorio: [100, 250],
  cone: [10, 60],
  impacto: [20, 80],
  vsi: [10, 45],
};

function ModeloPage() {
  const m = Route.useLoaderData();
  const { ids, alternar } = useComparador();
  const fam = FAM[m.fam];
  const foto =
    fotoReal(m.id) ??
    IMG[m.id + "-hero"] ??
    IMG[m.id + "-unit"] ??
    (fam?.img ? IMG[fam.img] : null);
  const sisId = TIPO2SIS[m.tipo];
  const apf = APF_RANGE[m.tipo];
  const relacionados = CAT.filter((x) => x.fam === m.fam && x.id !== m.id).slice(0, 4);

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
        /{" "}
        <Link to="/central/familia/$fam" params={{ fam: m.fam }} className="hover:underline">
          {fam?.titulo ?? fam?.nome ?? m.fam}
        </Link>{" "}
        / <span>{m.mod}</span>
      </nav>

      <div className="mt-4 grid gap-8 md:grid-cols-2">
        <div className="flex items-center justify-center rounded-xl bg-white p-6 shadow-sm">
          {foto ? (
            <img
              src={foto}
              alt={`${m.mod} — ${fam?.nome ?? ""}`}
              className="max-h-80 w-auto object-contain"
            />
          ) : (
            <span className="text-6xl font-black text-ap-azul/20">{m.mod}</span>
          )}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <p className="eyebrow">
              {m.inst === "movel" ? "Móvel · sobre esteiras" : "Planta fixa"}
            </p>
            <span
              className={`rounded px-2 py-0.5 text-[10px] font-extrabold uppercase ${
                m.status === "disponivel"
                  ? "bg-ap-ok/15 text-ap-ok"
                  : "bg-ap-ambar/20 text-ap-ambar-esc"
              }`}
            >
              {m.status === "disponivel" ? "Disponível" : "Sob consulta"}
            </span>
          </div>
          <h1 className="mt-2 text-3xl font-black text-ap-azul-esc">{m.mod}</h1>
          <p className="mt-1 text-sm text-ap-fraco">{fam?.nome}</p>

          <dl className="mt-5 grid grid-cols-2 gap-3 rounded-xl border-2 border-border bg-white p-4 sm:grid-cols-3">
            {[
              ["Capacidade", `${fmt(m.capMin)}–${fmt(m.capMax)} t/h`],
              ["Alimentação máx.", `${fmt(m.alim)} mm`],
              ["Boca", m.boca],
              ["Potência", `${fmt(m.pot)} kW`],
              ...(m.peso ? [["Peso", `${fmt(m.peso)} t`] as [string, string]] : []),
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="text-[11px] uppercase tracking-wide text-ap-fraco">{k}</dt>
                <dd className="text-sm font-extrabold text-ap-azul-esc">{v}</dd>
              </div>
            ))}
          </dl>

          {m.nota && <p className="mt-3 text-xs leading-relaxed text-ap-fraco">{m.nota}</p>}
          <p className="mt-1 text-[11px] text-ap-fraco/70">Fonte: {m.fonte}</p>

          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href={zapLink(
                `Olá! Quero cotação do ${m.mod} (${fmt(m.capMin)}–${fmt(m.capMax)} t/h).`,
              )}
              target="_blank"
              rel="noopener"
              className="rounded-md bg-ap-ambar px-5 py-3 text-sm font-extrabold text-ap-azul-esc transition-colors hover:bg-ap-ambar-esc"
            >
              Cotar pelo WhatsApp
            </a>
            <button
              onClick={() => {
                const r = alternar(m.id);
                if (r === "cheio") toast.warning("O comparador leva no máximo 3 modelos.");
                else if (r === "adicionado") toast.success(`${m.mod} adicionado ao comparador.`);
                else toast.info(`${m.mod} removido.`);
              }}
              className="rounded-md border-2 border-ap-azul px-5 py-3 text-sm font-extrabold text-ap-azul transition-colors hover:bg-ap-azul hover:text-white"
            >
              {ids.includes(m.id) ? "No comparador ✓" : "Comparar"}
            </button>
          </div>
        </div>
      </div>

      {/* Tabela CSS/APF se houver */}
      {m.cssTab && (
        <section className="mt-10" aria-label="Tabela de regulagens">
          <h2 className="text-lg font-black text-ap-azul-esc">Regulagens e capacidade</h2>
          <div className="mt-3 overflow-x-auto rounded-xl border-2 border-border bg-white">
            <table className="w-full min-w-[420px] text-sm">
              <thead>
                <tr className="bg-ap-azul text-left text-white">
                  <th className="px-4 py-2.5">Regulagem (mm)</th>
                  <th className="px-4 py-2.5">Capacidade (t/h)</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(m.cssTab).map(([reg, faixa]) => (
                  <tr key={reg} className="border-t border-border">
                    <td className="px-4 py-2 font-bold text-ap-azul-esc">{reg} mm</td>
                    <td className="px-4 py-2 text-ap-fraco">
                      {fmt(faixa[0])}–{fmt(faixa[1])} t/h
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Estimador granulométrico */}
      {apf && (
        <section className="mt-10 max-w-2xl">
          <Estimador tipo={m.tipo} apfMin={apf[0]} apfMax={apf[1]} />
        </section>
      )}

      {/* Peças */}
      {sisId && (
        <section className="mt-10 rounded-xl border-2 border-ap-azul/20 bg-white p-5">
          <h2 className="text-lg font-black text-ap-azul-esc">Peças de desgaste do {m.mod}</h2>
          <p className="mt-1 text-sm text-ap-fraco">
            Mandíbulas, mantos, telas e kits — amarrados a este modelo, com estoque a pronta
            entrega.
          </p>
          <div className="mt-3 flex flex-wrap gap-3">
            <Link
              to="/central/pecas/$sis/$modelo"
              params={{ sis: sisId, modelo: m.id }}
              className="rounded-md bg-ap-azul px-4 py-2.5 text-sm font-extrabold text-white transition-colors hover:bg-ap-azul-med"
            >
              Ver peças deste modelo
            </Link>
            <Link
              to="/central/pecas"
              className="rounded-md border-2 border-border px-4 py-2.5 text-sm font-extrabold text-ap-fraco transition-colors hover:border-ap-azul hover:text-ap-azul"
            >
              Todos os sistemas
            </Link>
          </div>
        </section>
      )}

      {/* Relacionados */}
      {relacionados.length > 0 && (
        <section className="mt-10">
          <h2 className="text-lg font-black text-ap-azul-esc">Outros da mesma família</h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {relacionados.map((x) => (
              <li key={x.id}>
                <Link
                  to="/central/modelo/$id"
                  params={{ id: x.id }}
                  className="rounded-full border-2 border-border bg-white px-4 py-1.5 text-xs font-extrabold text-ap-azul transition-colors hover:border-ap-azul"
                >
                  {x.mod}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <BlocoCaptura
        origem={`modelo-${m.id}`}
        titulo={`Quer o ${m.mod} na sua operação?`}
        sub="Disponibilidade, prazo e condição comercial — direto com a equipe Lopes & Lopes."
        textoZap={`Olá! Quero cotação do ${m.mod}.`}
      />
      <BarraComparador />
    </div>
  );
}
