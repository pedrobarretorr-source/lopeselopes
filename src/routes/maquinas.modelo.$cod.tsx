import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { MODELOS, OPS } from "@/data/site";
import { detalheDoModelo, slugModelo } from "@/data/maquinas-detalhes";
import { fotoReal } from "@/data/central/fotos";
import { IconeLinha } from "@/components/IconeLinha";
import { BlocoCaptura } from "@/components/BlocoCaptura";

const encontrar = (cod: string) => MODELOS.find((m) => slugModelo(m.cod) === cod);

export const Route = createFileRoute("/maquinas/modelo/$cod")({
  loader: ({ params }) => {
    const modelo = encontrar(params.cod);
    if (!modelo) throw notFound();
    return { modelo, ficha: detalheDoModelo(modelo) };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Modelo não encontrado | Lopes & Lopes" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { modelo, ficha } = loaderData;
    const titulo = `${modelo.cod} — ${modelo.linha} XCMG | Lopes & Lopes`;
    const desc = `${ficha.tagline}. ${modelo.linha} XCMG com peças a pronta entrega e pós-venda Lopes & Lopes em todo o Brasil. Cote com a Lopes & Lopes.`;
    return {
      meta: [
        { title: titulo },
        { name: "description", content: desc },
        { property: "og:title", content: titulo },
        { property: "og:description", content: desc },
        { property: "og:type", content: "product" },
        { property: "og:url", content: `/maquinas/modelo/${params.cod}` },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: `/maquinas/modelo/${params.cod}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: `XCMG ${modelo.cod}`,
            category: modelo.linha,
            brand: { "@type": "Brand", name: "XCMG" },
            description: ficha.tagline,
          }),
        },
      ],
    };
  },
  notFoundComponent: ModeloNaoEncontrado,
  component: ModeloPage,
});

function ModeloNaoEncontrado() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-24 text-center">
      <h1 className="text-2xl font-black text-ap-azul-esc">Modelo não encontrado</h1>
      <p className="mt-2 text-sm text-ap-fraco">
        Este modelo não consta no catálogo ou foi descontinuado.
      </p>
      <Link
        to="/maquinas/catalogo"
        className="mt-6 inline-block rounded-md bg-ap-azul px-6 py-3 text-sm font-extrabold uppercase tracking-wide text-white hover:bg-ap-azul-med"
      >
        Ver catálogo completo
      </Link>
    </div>
  );
}

function ModeloPage() {
  const { modelo: m, ficha } = Route.useLoaderData();
  const slug = slugModelo(m.cod);
  const foto = fotoReal(slug);
  const op = OPS.find((o) => o.id === m.op);
  const relacionados = MODELOS.filter((x) => x.linha === m.linha && x.cod !== m.cod).slice(0, 3);

  return (
    <div>
      {/* Hero institucional */}
      <section className="corte-b bg-ap-noite pb-16 pt-10 text-white">
        <div className="mx-auto max-w-6xl px-4">
          <nav className="text-xs text-white/55" aria-label="Trilha">
            <Link to="/maquinas" className="hover:text-ap-ambar">
              Máquinas
            </Link>
            {" / "}
            <Link to="/maquinas/catalogo" className="hover:text-ap-ambar">
              Catálogo
            </Link>
            {" / "}
            <span className="text-white/80">{m.cod}</span>
          </nav>

          <div className="mt-6 grid items-center gap-10 md:grid-cols-[1.15fr_1fr]">
            <div>
              <p className="eyebrow text-ap-ambar">
                {m.linha}
                {op ? ` · ${op.n}` : ""}
              </p>
              <h1 className="mt-3 text-3xl leading-none md:text-5xl">{m.cod}</h1>
              <p className="mt-4 max-w-xl text-base font-bold leading-snug text-white md:text-lg">
                {ficha.tagline}
              </p>
              <p className="mt-2 max-w-xl text-sm text-white/70">{m.d}</p>

              <div className="mt-5 flex flex-wrap gap-2">
                {m.ev && (
                  <span className="rounded-full bg-ap-ok/20 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wide text-ap-ok">
                    100% elétrica
                  </span>
                )}
                {m.gen && (
                  <span className="rounded-full bg-ap-ambar/20 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wide text-ap-ambar">
                    Nova geração
                  </span>
                )}
              </div>

              <p className="mt-6 inline-flex items-center gap-2 rounded-md border border-ap-ambar/50 bg-ap-ambar/10 px-3.5 py-2 text-[11px] font-extrabold uppercase tracking-wide text-ap-ambar">
                Atendimento em todo o Brasil
              </p>
            </div>

            {/* Visual: foto real quando houver, senão painel de marca */}
            <div className="corte relative flex h-56 items-center justify-center overflow-hidden border border-white/10 bg-white md:h-72">
              {foto ? (
                <img
                  src={foto}
                  alt={`${m.cod} — ${m.linha} XCMG`}
                  className="h-full w-full object-contain p-4"
                  loading="lazy"
                />
              ) : (
                <IconeLinha id={m.svg} className="h-24 w-24 text-ap-ambar/70 md:h-32 md:w-32" />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Apresentação */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-10 md:grid-cols-[1fr_1.2fr]">
          <div>
            <h2 className="text-lg font-black text-ap-azul-esc">Apresentação</h2>
            {ficha.apresentacao.map((p, i) => (
              <p key={i} className="mt-3 text-sm leading-relaxed text-ap-fraco">
                {p}
              </p>
            ))}

            {ficha.aplicacoes.length > 0 && (
              <div className="mt-6">
                <h3 className="text-xs font-extrabold uppercase tracking-wide text-ap-fraco">
                  Aplicações típicas
                </h3>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {ficha.aplicacoes.map((a) => (
                    <li
                      key={a}
                      className="rounded-full border-2 border-border bg-white px-3 py-1 text-xs font-bold text-ap-azul"
                    >
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {ficha.specs.length > 0 && (
              <div className="mt-8">
                <h3 className="text-xs font-extrabold uppercase tracking-wide text-ap-fraco">
                  Especificações
                </h3>
                <dl className="mt-3 divide-y divide-border rounded-xl border-2 border-border bg-white">
                  {ficha.specs.map(([k, v]) => (
                    <div
                      key={k}
                      className="flex items-center justify-between gap-4 px-4 py-3 text-sm"
                    >
                      <dt className="text-ap-fraco">{k}</dt>
                      <dd className="text-right font-extrabold text-ap-azul-esc">{v}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-2 text-[11px] text-ap-fraco/70">
                  Valores de referência; configuração final conforme pedido.
                </p>
              </div>
            )}
          </div>

          <div>
            <h2 className="text-lg font-black text-ap-azul-esc">Por que essa máquina</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {ficha.destaques.map((d) => (
                <div
                  key={d.h}
                  className="rounded-xl border-2 border-border bg-white p-4 transition-colors hover:border-ap-ambar"
                >
                  <h3 className="text-sm font-extrabold text-ap-azul-esc">{d.h}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-ap-fraco">{d.p}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Combinação com a Central (quando aplicável) */}
      {ficha.combo && (
        <section className="mx-auto max-w-6xl px-4 pb-12">
          <div className="rounded-xl border-2 border-ap-azul/20 bg-ap-azul-claro/40 p-6">
            <h2 className="text-lg font-black text-ap-azul-esc">{ficha.combo.titulo}</h2>
            <p className="mt-2 max-w-2xl text-sm text-ap-fraco">{ficha.combo.texto}</p>
            <Link
              to="/central/simulador"
              className="mt-4 inline-block rounded-md bg-ap-azul px-5 py-3 text-sm font-extrabold text-white transition-colors hover:bg-ap-azul-med"
            >
              Simular linha de britagem
            </Link>
          </div>
        </section>
      )}

      {/* Cotação — depois da apresentação */}
      <BlocoCaptura
        origem={`modelo-${slug}`}
        titulo={`Quer a ${m.cod} na sua operação?`}
        sub="Disponibilidade, condição comercial e financiamento — direto com a equipe Lopes & Lopes."
        textoZap={`Olá! Quero cotação da ${m.cod} (${m.linha}).`}
        escuro
      />

      {/* Relacionados */}
      {relacionados.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 pb-14">
          <h2 className="text-lg font-black text-ap-azul-esc">Outros modelos de {m.linha}</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {relacionados.map((r) => (
              <Link
                key={r.cod}
                to="/maquinas/modelo/$cod"
                params={{ cod: slugModelo(r.cod) }}
                className="group flex items-center gap-4 rounded-xl border-2 border-border bg-white p-4 transition-all hover:border-ap-ambar hover:shadow-md"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-ap-noite">
                  <IconeLinha id={r.svg} className="h-6 w-6 text-ap-ambar" />
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-extrabold text-ap-azul-esc group-hover:text-ap-azul">
                    {r.cod}
                  </span>
                  <span className="block truncate text-xs text-ap-fraco">{r.d}</span>
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
