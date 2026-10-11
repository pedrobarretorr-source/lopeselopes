import { createFileRoute, Link } from "@tanstack/react-router";
import { CAT, ETAPAS, FAM } from "@/data/central/catalogo";
import { BLOG } from "@/data/central/blog";
import { SISTEMAS } from "@/data/central/pecas";
import { MODELOS, OPS, SEG } from "@/data/site";
import { slugModelo } from "@/data/maquinas-detalhes";

export const Route = createFileRoute("/sitemap")({
  head: () => ({
    meta: [
      { title: "Mapa do site | Lopes & Lopes" },
      { name: "description", content: "Todas as páginas do site Lopes & Lopes em um só lugar." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Mapa do site | Lopes & Lopes" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: SitemapPage,
});

function SitemapPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 text-sm">
      <h1 className="text-2xl font-black text-ap-azul-esc">Mapa do site</h1>
      <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <section>
          <h2 className="text-sm font-extrabold uppercase tracking-wide text-ap-fraco">
            Institucional
          </h2>
          <ul className="mt-3 space-y-1.5">
            <li>
              <Link to="/" className="text-ap-azul hover:underline">
                Início
              </Link>
            </li>
            <li>
              <Link to="/maquinas" className="text-ap-azul hover:underline">
                Máquinas XCMG
              </Link>
            </li>
            <li>
              <Link to="/maquinas/catalogo" className="text-ap-azul hover:underline">
                Catálogo de máquinas
              </Link>
            </li>
            <li>
              <Link to="/pecas" className="text-ap-azul hover:underline">
                Peças
              </Link>
            </li>
            <li>
              <Link to="/pecas/linha-amarela" className="text-ap-azul hover:underline">
                Peças linha amarela
              </Link>
            </li>
            <li>
              <Link to="/pos-venda" className="text-ap-azul hover:underline">
                Pós-venda
              </Link>
            </li>
            <li>
              <Link to="/conteudo" className="text-ap-azul hover:underline">
                Blog técnico
              </Link>
            </li>
            <li>
              <Link to="/quem-somos" className="text-ap-azul hover:underline">
                Quem somos
              </Link>
            </li>
          </ul>
          <h2 className="mt-6 text-sm font-extrabold uppercase tracking-wide text-ap-fraco">
            Segmentos
          </h2>
          <ul className="mt-3 space-y-1.5">
            {[...new Set([...Object.keys(SEG), ...OPS.map((o) => o.id)])].map((id) => (
              <li key={id}>
                <Link
                  to="/segmentos/$seg"
                  params={{ seg: id }}
                  className="text-ap-azul hover:underline"
                >
                  {SEG[id]?.h ?? OPS.find((o) => o.id === id)?.n ?? id}
                </Link>
              </li>
            ))}
          </ul>
          <h2 className="mt-6 text-sm font-extrabold uppercase tracking-wide text-ap-fraco">
            Modelos de linha amarela ({MODELOS.length})
          </h2>
          <ul className="mt-3 grid grid-cols-2 gap-1.5">
            {MODELOS.map((m) => (
              <li key={m.cod}>
                <Link
                  to="/maquinas/modelo/$cod"
                  params={{ cod: slugModelo(m.cod) }}
                  className="text-xs text-ap-azul hover:underline"
                >
                  {m.cod}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-sm font-extrabold uppercase tracking-wide text-ap-fraco">
            Central de Britagem
          </h2>
          <ul className="mt-3 space-y-1.5">
            <li>
              <Link to="/central" className="text-ap-azul hover:underline">
                Central — início
              </Link>
            </li>
            <li>
              <Link to="/central/catalogo" className="text-ap-azul hover:underline">
                Catálogo completo
              </Link>
            </li>
            <li>
              <Link to="/central/simulador" className="text-ap-azul hover:underline">
                Simulador de linha
              </Link>
            </li>
            <li>
              <Link to="/central/pecas" className="text-ap-azul hover:underline">
                Peças de desgaste
              </Link>
            </li>
            <li>
              <Link to="/central/comparar" className="text-ap-azul hover:underline">
                Comparador
              </Link>
            </li>
          </ul>
          <h2 className="mt-6 text-sm font-extrabold uppercase tracking-wide text-ap-fraco">
            Etapas
          </h2>
          <ul className="mt-3 space-y-1.5">
            {ETAPAS.map((e) => (
              <li key={e.id}>
                <Link
                  to="/central/etapa/$etapa"
                  params={{ etapa: e.id }}
                  className="text-ap-azul hover:underline"
                >
                  {e.nome}
                </Link>
              </li>
            ))}
          </ul>
          <h2 className="mt-6 text-sm font-extrabold uppercase tracking-wide text-ap-fraco">
            Famílias
          </h2>
          <ul className="mt-3 space-y-1.5">
            {Object.entries(FAM).map(([id, f]) => (
              <li key={id}>
                <Link
                  to="/central/familia/$fam"
                  params={{ fam: id }}
                  className="text-ap-azul hover:underline"
                >
                  {f.titulo ?? f.nome}
                </Link>
              </li>
            ))}
          </ul>
          <h2 className="mt-6 text-sm font-extrabold uppercase tracking-wide text-ap-fraco">
            Sistemas de peças
          </h2>
          <ul className="mt-3 space-y-1.5">
            {SISTEMAS.map((s) => (
              <li key={s.id}>
                <Link
                  to="/central/pecas/$sis"
                  params={{ sis: s.id }}
                  className="text-ap-azul hover:underline"
                >
                  {s.nome}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-sm font-extrabold uppercase tracking-wide text-ap-fraco">
            Modelos ({CAT.length})
          </h2>
          <ul className="mt-3 grid grid-cols-2 gap-1.5">
            {CAT.map((m) => (
              <li key={m.id}>
                <Link
                  to="/central/modelo/$id"
                  params={{ id: m.id }}
                  className="text-xs text-ap-azul hover:underline"
                >
                  {m.mod}
                </Link>
              </li>
            ))}
          </ul>
          <h2 className="mt-6 text-sm font-extrabold uppercase tracking-wide text-ap-fraco">
            Artigos ({BLOG.length})
          </h2>
          <ul className="mt-3 space-y-1.5">
            {BLOG.map((p) => (
              <li key={p.slug}>
                <Link
                  to="/conteudo/$slug"
                  params={{ slug: p.slug }}
                  className="text-xs text-ap-azul hover:underline"
                >
                  {p.titulo}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
