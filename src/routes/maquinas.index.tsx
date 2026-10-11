import { createFileRoute, Link } from "@tanstack/react-router";
import { MODELOS, OPS } from "@/data/site";
import { IconeLinha } from "@/components/IconeLinha";
import { BlocoCaptura } from "@/components/BlocoCaptura";
import { zapLink } from "@/lib/ap";

export const Route = createFileRoute("/maquinas/")({
  head: () => ({
    meta: [
      { title: "Máquinas XCMG — escavadeiras, carregadeiras e linha de mineração | Lopes & Lopes" },
      {
        name: "description",
        content:
          "Catálogo XCMG: escavadeiras, carregadeiras, rolos, motoniveladoras, caminhões fora de estrada e a XE215BR, escavadeira pronta para pedreira.",
      },
      { property: "og:title", content: "Máquinas XCMG | Lopes & Lopes" },
      {
        property: "og:description",
        content: "Linha completa XCMG: construção, mineração e a XE215BR.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MaquinasHubPage,
});

type Frente = {
  nome: string;
  tag: string;
  desc: string;
  img: string;
  search: { op?: string; linha?: string };
};

/** Menu de frentes — 3 cards flutuantes com imagem de fundo (troque os arquivos em /public/maquinas). */
const FRENTES: Frente[] = [
  {
    nome: "Mineração",
    tag: "Fora de estrada · desmonte",
    desc: "Do desmonte ao beneficiamento — a linha pesada XCMG.",
    img: "/maquinas/mineracao.jpg",
    search: { linha: "Mineração · fora de estrada" },
  },
  {
    nome: "Terraplanagem",
    tag: "Escavar · carregar · nivelar",
    desc: "Escavadeiras, carregadeiras e motoniveladoras.",
    img: "/maquinas/terraplanagem.jpg",
    search: { op: "escavar" },
  },
  {
    nome: "Pavimentação",
    tag: "Compactar · pavimentar",
    desc: "Rolos e equipamentos de pavimentação.",
    img: "/maquinas/pavimentacao.jpg",
    search: { op: "compactar" },
  },
];

function MaquinasHubPage() {
  const linhas = [...new Set(MODELOS.map((m) => m.linha))];
  const total = MODELOS.length;

  return (
    <div className="bg-ap-azul-vivo">
      {/* ── Hero ── faixa escura que desce para o azul da página */}
      <section className="relative overflow-hidden bg-gradient-to-b from-ap-noite to-ap-azul-vivo text-white">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_88%_-10%,rgba(0,84,166,0.5),transparent_55%)]" />
        <div className="relative mx-auto max-w-6xl px-4 pb-36 pt-14">
          <p className="flex items-center gap-3 text-[0.72rem] font-extrabold uppercase tracking-[0.16em] text-ap-ambar">
            <span className="h-2.5 w-6 -skew-x-[22deg] rounded-[2px] bg-ap-ambar" />
            Máquinas XCMG
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl leading-[1.03] md:text-5xl lg:text-6xl">
            A máquina certa para cada frente
          </h1>
          <p className="mt-4 max-w-2xl text-sm text-white/75 md:text-base">
            Construção, mineração, pavimentação e movimentação — novas e seminovas, com entrega
            técnica e pós-venda da Lopes & Lopes em todo o Brasil.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href={zapLink("Olá! Quero cotar uma máquina XCMG.")}
              target="_blank"
              rel="noopener"
              className="corte inline-block bg-ap-ambar px-6 py-3.5 text-sm font-extrabold uppercase tracking-wide text-ap-azul-esc transition-colors hover:bg-ap-ambar-esc"
            >
              Cotar pelo WhatsApp
            </a>
            <Link
              to="/maquinas/catalogo"
              className="inline-block rounded-md border-2 border-white/25 px-6 py-3 text-sm font-extrabold uppercase tracking-wide text-white transition-colors hover:border-ap-ambar hover:text-ap-ambar"
            >
              Ver catálogo completo
            </Link>
          </div>
        </div>
      </section>

      {/* ── Primeira dobra: menu de frentes (3 cards flutuantes) ── */}
      <div className="relative z-10 mx-auto -mt-24 max-w-6xl px-4">
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FRENTES.map((f) => (
            <li key={f.nome}>
              <Link
                to="/maquinas/catalogo"
                search={f.search}
                aria-label={`Máquinas para ${f.nome}`}
                className="group relative flex h-56 flex-col justify-end overflow-hidden rounded-2xl shadow-[0_26px_60px_-24px_rgba(1,16,46,.85)] ring-1 ring-white/10 transition-transform duration-300 hover:-translate-y-1 md:h-64"
              >
                {/* Imagem de fundo (degrada para o azul se faltar o arquivo) */}
                <div
                  className="absolute inset-0 bg-ap-noite bg-cover bg-center transition-transform duration-[600ms] group-hover:scale-105"
                  style={{ backgroundImage: `url(${f.img})` }}
                />
                {/* Overlay para legibilidade */}
                <div className="absolute inset-0 bg-gradient-to-t from-ap-noite via-ap-noite/55 to-ap-noite/10" />
                {/* Acento diagonal âmbar (assinatura) */}
                <span className="absolute right-4 top-4 h-2.5 w-10 -skew-x-[22deg] rounded-[2px] bg-ap-ambar" />

                <div className="relative p-5">
                  <p className="text-[0.66rem] font-extrabold uppercase tracking-[0.16em] text-ap-ambar">
                    {f.tag}
                  </p>
                  <h2 className="mt-1 font-display text-2xl text-white md:text-[1.7rem]">
                    {f.nome}
                  </h2>
                  <p className="mt-1 text-xs text-white/75">{f.desc}</p>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wide text-white transition-colors group-hover:text-ap-ambar">
                    Ver máquinas
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="transition-transform group-hover:translate-x-1"
                    >
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* ── Corpo azul, seções divididas, componentes claros ── */}
      <div className="mx-auto max-w-6xl px-4 pb-16">
        {/* Destaque XE215BR — card claro, contraste no azul */}
        <Link
          to="/maquinas/modelo/$cod"
          params={{ cod: "xe215br" }}
          className="group relative mt-16 flex flex-col gap-5 overflow-hidden rounded-2xl border-l-4 border-ap-ambar bg-white p-6 shadow-[0_24px_60px_-24px_rgba(1,16,46,.7)] transition-shadow hover:shadow-[0_28px_70px_-24px_rgba(1,16,46,.8)] md:flex-row md:items-center md:p-7"
        >
          <div className="flex-1">
            <p className="eyebrow-amb">Pronta para pedreira</p>
            <h2 className="mt-2 text-xl text-ap-azul-esc group-hover:text-ap-azul md:text-2xl">
              XE215BR — a escavadeira de 21 t feita para o Brasil
            </h2>
            <p className="mt-2 max-w-xl text-sm text-ap-fraco">
              Estrutura reforçada, bomba de alta vazão e pacote de pedreira de fábrica. A mais
              procurada da linha — veja a ficha técnica completa.
            </p>
          </div>
          <span className="corte shrink-0 bg-ap-ambar px-6 py-3.5 text-center text-sm font-extrabold uppercase tracking-wide text-ap-azul-esc transition-colors group-hover:bg-ap-ambar-esc">
            Ver a XE215BR →
          </span>
        </Link>

        {/* Seção: por operação */}
        <section className="mt-16">
          <header className="flex flex-wrap items-end justify-between gap-3 border-b border-white/15 pb-4">
            <div>
              <p className="flex items-center gap-3 text-[0.72rem] font-extrabold uppercase tracking-[0.16em] text-ap-ambar">
                <span className="h-2.5 w-6 -skew-x-[22deg] rounded-[2px] bg-ap-ambar" />
                Escolha pela sua operação
              </p>
              <h2 className="mt-2 font-display text-2xl text-white md:text-3xl">
                Cada frente tem sua linha
              </h2>
            </div>
            <Link
              to="/maquinas/catalogo"
              className="text-xs font-extrabold uppercase tracking-wide text-ap-ambar transition-colors hover:text-white"
            >
              Ver todas ({total}) →
            </Link>
          </header>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {OPS.filter((op) => !op.central).map((op) => {
              const n = MODELOS.filter((m) => m.op === op.id).length;
              return (
                <Link
                  key={op.id}
                  to="/maquinas/catalogo"
                  search={{ op: op.id }}
                  className="group flex flex-col rounded-xl bg-white p-5 shadow-[0_12px_30px_-18px_rgba(1,16,46,.6)] ring-1 ring-black/5 transition-all hover:-translate-y-0.5 hover:ring-ap-ambar"
                >
                  <IconeLinha
                    id={op.svg}
                    className="block h-9 w-9 text-ap-azul transition-colors group-hover:text-ap-azul-esc"
                  />
                  <h3 className="mt-3 text-sm font-extrabold text-ap-azul-esc">{op.n}</h3>
                  <p className="mt-1 text-xs text-ap-fraco">
                    {n} {n === 1 ? "modelo" : "modelos"}
                  </p>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Seção: por linha */}
        <section className="mt-14">
          <header className="border-b border-white/15 pb-4">
            <p className="flex items-center gap-3 text-[0.72rem] font-extrabold uppercase tracking-[0.16em] text-ap-ambar">
              <span className="h-2.5 w-6 -skew-x-[22deg] rounded-[2px] bg-ap-ambar" />
              Ou navegue por linha
            </p>
            <h2 className="mt-2 font-display text-2xl text-white md:text-3xl">
              Direto ao tipo de equipamento
            </h2>
          </header>
          <ul className="mt-6 flex flex-wrap gap-2.5">
            {linhas.map((l) => (
              <li key={l}>
                <Link
                  to="/maquinas/catalogo"
                  search={{ linha: l }}
                  className="inline-block rounded-full bg-white px-4 py-1.5 text-xs font-extrabold text-ap-azul ring-1 ring-black/5 transition-colors hover:bg-ap-ambar hover:text-ap-azul-esc"
                >
                  {l}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <BlocoCaptura
        origem="maquinas-hub"
        titulo="Não achou a configuração?"
        sub="A Lopes & Lopes consulta o catálogo completo XCMG — inclusive importação sob encomenda."
        rotuloCta="Consultar"
        escuro
      />
    </div>
  );
}
