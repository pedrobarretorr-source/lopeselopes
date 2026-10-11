import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { MODELOS, OPS } from "@/data/site";
import { slugModelo } from "@/data/maquinas-detalhes";
import { fotoReal } from "@/data/central/fotos";
import { IconeLinha } from "@/components/IconeLinha";

type Busca = { op?: string | undefined; linha?: string | undefined };

export const Route = createFileRoute("/maquinas/catalogo")({
  validateSearch: (s: Record<string, unknown>): Busca => ({
    op: typeof s["op"] === "string" ? s["op"] : undefined,
    linha: typeof s["linha"] === "string" ? s["linha"] : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Catálogo de máquinas XCMG | Lopes & Lopes" },
      {
        name: "description",
        content:
          "Todos os modelos XCMG disponíveis na Lopes & Lopes: escavadeiras, carregadeiras, rolos, guindastes e linha de mineração. Cada modelo com ficha completa.",
      },
      { property: "og:title", content: "Catálogo de máquinas XCMG | Lopes & Lopes" },
      {
        property: "og:description",
        content: "Linha completa XCMG — cada modelo com sua ficha e apresentação.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/maquinas/catalogo" }],
  }),
  component: CatalogoMaquinasPage,
});

const AUTORIDADE = [
  "Estoque próprio de peças a pronta entrega",
  "Atendimento em campo em todo o Brasil",
  "Entrega técnica e pós-venda Lopes & Lopes",
];

function CatalogoMaquinasPage() {
  const { op, linha } = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });

  // Linhas compatíveis com a operação selecionada (evita combinações impossíveis)
  const linhasCompativeis = [
    ...new Set(MODELOS.filter((m) => !op || m.op === op).map((m) => m.linha)),
  ];
  const linhaValida = linha && linhasCompativeis.includes(linha) ? linha : undefined;

  const lista = MODELOS.filter(
    (m) => (!op || m.op === op) && (!linhaValida || m.linha === linhaValida),
  );
  const opNome = OPS.find((o) => o.id === op)?.n;

  return (
    <div>
      {/* Hero padrão — grudado no header, mesma linguagem da home */}
      <section className="relative overflow-hidden bg-ap-noite text-white">
        <img
          src="/maquinas/mineracao.jpg"
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-ap-noite via-ap-noite/85 to-ap-azul/40" />
        <div className="relative z-10 mx-auto max-w-6xl px-4 py-10 md:py-14">
          <nav className="text-xs text-white/55" aria-label="Trilha">
            <Link to="/maquinas" className="hover:text-ap-ambar">
              Máquinas
            </Link>{" "}
            / <span className="text-white/80">Catálogo</span>
          </nav>
          <p className="eyebrow mt-5 flex items-center gap-3 text-ap-ambar">
            <span className="h-px w-8 bg-ap-ambar" />
            Linha amarela · catálogo completo
          </p>
          <h1 className="mt-3 max-w-3xl text-3xl leading-tight md:text-4xl">
            {opNome ?? linhaValida ?? "Catálogo de máquinas XCMG"}
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-white/70 md:text-base">
            Cada modelo tem sua ficha completa: apresentação, destaques e especificações de
            referência — antes da cotação.
          </p>
          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-xs font-bold text-white/80">
            {AUTORIDADE.map((a) => (
              <li key={a} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-ap-ambar" aria-hidden />
                {a}
              </li>
            ))}
          </ul>
        </div>
        {/* Fio âmbar de acabamento, como no hero da home */}
        <div className="relative z-10 h-1 bg-ap-ambar" />
      </section>

      {/* Coluna central branca sobre o fundo azul — mesma hierarquia da home */}
      <div className="px-3 pb-3 md:px-6 md:pb-6">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-b-2xl bg-white shadow-2xl shadow-ap-azul-esc/25">
          {/* Banner azul \__/ — mesmo detalhe da home, iniciando onde o branco começa */}
          <div className="mx-auto max-w-3xl px-4 [filter:drop-shadow(0_3px_8px_rgba(1,16,46,0.30))_drop-shadow(0_0_18px_rgba(1,16,46,0.18))]">
            <div className="bg-ap-azul-vivo px-9 py-4 text-center text-white [clip-path:polygon(0_0,100%_0,calc(100%-26px)_100%,26px_100%)] md:px-12 md:py-5">
              <p className="text-sm leading-relaxed md:text-[15px]">
                Linha completa XCMG — escavadeiras, carregadeiras, motoniveladoras, guindastes e
                mineração — cada modelo com ficha completa.
              </p>
            </div>
          </div>

          <div className="mx-auto max-w-6xl px-4 pb-16 pt-8">
            {/* Grade */}
            {lista.length === 0 ? (
              <div className="rounded-xl border-2 border-dashed border-border bg-white p-10 text-center">
                <p className="text-sm text-ap-fraco">
                  Nenhum modelo com essa combinação de filtros.
                </p>
                <button
                  onClick={() => navigate({ search: {} })}
                  className="mt-4 rounded-md bg-ap-azul px-5 py-2.5 text-xs font-extrabold uppercase tracking-wide text-white hover:bg-ap-azul-med"
                >
                  Limpar filtros
                </button>
              </div>
            ) : (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {lista.map((m) => {
                  const slug = slugModelo(m.cod);
                  const foto = fotoReal(slug);
                  return (
                    <Link
                      key={m.cod}
                      to="/maquinas/modelo/$cod"
                      params={{ cod: slug }}
                      className="group flex flex-col overflow-hidden rounded-xl border-2 border-border bg-white shadow-sm transition-all hover:border-ap-ambar hover:shadow-lg"
                    >
                      {/* Painel visual */}
                      <div className="corte-b relative flex h-40 items-center justify-center overflow-hidden bg-white">
                        {foto ? (
                          <img
                            src={foto}
                            alt={`${m.cod} — ${m.linha} XCMG`}
                            className="h-full w-full object-contain p-3"
                            loading="lazy"
                          />
                        ) : (
                          <IconeLinha
                            id={m.svg}
                            className="h-16 w-16 text-ap-azul/70 transition-transform duration-300 group-hover:scale-110"
                          />
                        )}
                        {(m.ev || m.gen) && (
                          <div className="absolute left-3 top-3 flex gap-1.5">
                            {m.ev && (
                              <span className="rounded bg-ap-ok px-1.5 py-0.5 text-[10px] font-extrabold uppercase text-white">
                                Elétrica
                              </span>
                            )}
                            {m.gen && (
                              <span className="rounded bg-ap-ambar px-1.5 py-0.5 text-[10px] font-extrabold uppercase text-ap-azul-esc">
                                Nova geração
                              </span>
                            )}
                          </div>
                        )}
                      </div>

                      <div className="flex flex-1 flex-col p-5">
                        <p className="text-[11px] font-extrabold uppercase tracking-wide text-ap-fraco">
                          {m.linha}
                        </p>
                        <h2 className="mt-1 text-xl text-ap-azul-esc transition-colors group-hover:text-ap-azul">
                          {m.cod}
                        </h2>
                        <p className="mt-1.5 flex-1 text-sm text-ap-fraco">{m.d}</p>
                        <div className="mt-4 rounded-lg bg-[#F4F7FB] p-3">
                          <p className="text-sm font-extrabold text-ap-azul">
                            Disponível sob consulta
                          </p>
                          <p className="mt-1 text-xs leading-relaxed text-ap-fraco">
                            Solicite um orçamento para comprar esse equipamento.
                          </p>
                        </div>
                        <span className="mt-4 inline-flex items-center gap-1 text-xs font-extrabold uppercase tracking-wide text-ap-azul transition-colors group-hover:text-ap-ambar-esc">
                          Ver ficha completa
                          <span
                            aria-hidden
                            className="transition-transform group-hover:translate-x-0.5"
                          >
                            →
                          </span>
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
