import { createFileRoute, Link } from "@tanstack/react-router";
import { CAT, ETAPAS, FAM } from "@/data/central/catalogo";
import { BLOG } from "@/data/central/blog";
import { IMG } from "@/data/central/images";
import { CardFamilia } from "@/components/central/CardFamilia";
import { BlocoCaptura } from "@/components/BlocoCaptura";
import { SecaoTitulo } from "@/components/site/SecaoTitulo";

export const Route = createFileRoute("/central/")({
  head: () => ({
    meta: [
      { title: "Central de Britagem XCMG — Catálogo, simulador e peças | Lopes & Lopes" },
      {
        name: "description",
        content:
          "Catálogo completo de britadores e peneiras XCMG: 67 modelos móveis e fixos, simulador de linha de britagem, estimativa granulométrica e peças de desgaste. Atendimento Lopes & Lopes em todo o Brasil.",
      },
      { property: "og:title", content: "Central de Britagem XCMG | Lopes & Lopes" },
      {
        property: "og:description",
        content:
          "67 modelos de britadores e peneiras XCMG, simulador de linha e peças de desgaste com estoque próprio.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CentralHome,
});

function CentralHome() {
  const familias = Object.keys(FAM);
  const movel = familias.filter((f) => f.startsWith("movel"));
  const fixa = familias.filter((f) => f.startsWith("fixa"));
  const posts = [...BLOG].sort((a, b) => b.data.localeCompare(a.data)).slice(0, 3);
  const nDisponivel = CAT.filter((m) => m.status === "disponivel").length;

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-ap-noite to-ap-azul-vivo text-white">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_92%_-10%,rgba(0,84,166,0.5),transparent_55%)]" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-8 px-4 py-14 md:grid-cols-[1.2fr_1fr] md:py-20">
          <div>
            <p className="flex items-center gap-3 text-[0.72rem] font-extrabold uppercase tracking-[0.16em] text-ap-ambar">
              <span className="h-2.5 w-6 -skew-x-[22deg] rounded-[2px] bg-ap-ambar" />
              Central de Britagem XCMG
            </p>
            <h1 className="mt-4 font-display text-3xl leading-[1.05] md:text-5xl">
              Do desmonte à brita vendida: a linha inteira, num só lugar.
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/75 md:text-base">
              {CAT.length} modelos entre britadores, peneiras e alimentadores — {nDisponivel} com
              disponibilidade imediata. Simule sua linha, compare modelos e encontre a peça de
              desgaste certa.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/central/simulador"
                className="corte bg-ap-ambar px-6 py-3.5 text-sm font-extrabold uppercase tracking-wide text-ap-azul-esc transition-colors hover:bg-ap-ambar-esc"
              >
                Simular minha linha
              </Link>
              <Link
                to="/central/catalogo"
                className="rounded-md border-2 border-white/30 px-6 py-3.5 text-sm font-extrabold uppercase tracking-wide text-white transition-colors hover:border-ap-ambar hover:text-ap-ambar"
              >
                Ver catálogo
              </Link>
            </div>
          </div>
          {IMG["xpe0912-hero"] && (
            <img
              src={IMG["xpe0912-hero"]}
              alt="Britador móvel de mandíbulas XCMG XPE0912 em operação"
              className="hidden w-full rounded-2xl shadow-2xl ring-1 ring-white/10 md:block"
            />
          )}
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 pb-16">
        {/* Etapas */}
        <section className="mt-12" aria-label="Etapas da britagem">
          <SecaoTitulo eyebrow="A linha" titulo="A britagem em 5 etapas" />
          <ol className="mt-6 grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {ETAPAS.map((e, i) => (
              <li key={e.id}>
                <Link
                  to="/central/etapa/$etapa"
                  params={{ etapa: e.id }}
                  className="group block h-full rounded-2xl bg-white p-4 shadow-[0_12px_30px_-18px_rgba(1,16,46,.6)] ring-1 ring-black/5 transition-all hover:-translate-y-0.5 hover:ring-ap-ambar"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-ap-azul text-sm font-black text-white">
                    {i + 1}
                  </span>
                  <h3 className="mt-2 text-sm font-extrabold text-ap-azul-esc">{e.nome}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-ap-fraco">{e.desc}</p>
                </Link>
              </li>
            ))}
          </ol>
        </section>

        {/* Famílias móveis */}
        <section className="mt-14" aria-label="Linha móvel">
          <SecaoTitulo eyebrow="Sobre esteiras" titulo="Linha móvel — a planta vai até a rocha" />
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {movel.map((f) => (
              <CardFamilia key={f} fam={f} />
            ))}
          </div>
        </section>

        {/* Famílias fixas */}
        <section className="mt-14" aria-label="Linha fixa">
          <SecaoTitulo eyebrow="Planta fixa" titulo="Linha fixa — alto volume contínuo" />
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {fixa.map((f) => (
              <CardFamilia key={f} fam={f} />
            ))}
          </div>
        </section>

        {/* CTA simulador — banda escura de destaque */}
        <section className="corte-b mt-14 overflow-hidden rounded-2xl bg-ap-azul-esc text-white ring-1 ring-white/10">
          <div className="flex flex-wrap items-center gap-6 p-6 md:p-8">
            <div className="min-w-64 flex-1">
              <p className="eyebrow-amb">Ferramenta gratuita</p>
              <h2 className="mt-2 font-display text-2xl md:text-3xl">
                Em 7 perguntas, sua linha estimada.
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#B7C8E5]">
                Rocha, volume, produtos que você quer vender — o simulador monta a linha com modelos
                reais do catálogo e estima a produção por hora.
              </p>
            </div>
            <Link
              to="/central/simulador"
              className="rounded-md bg-ap-ambar px-6 py-3.5 text-sm font-extrabold uppercase tracking-wide text-ap-azul-esc transition-colors hover:bg-ap-ambar-esc"
            >
              Começar simulação
            </Link>
          </div>
        </section>

        {/* Peças + Conteúdo */}
        <section className="mt-14">
          <SecaoTitulo eyebrow="Continue" titulo="Peças e conteúdo técnico" />
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl bg-white p-6 shadow-[0_16px_40px_-22px_rgba(1,16,46,.6)] ring-1 ring-black/5">
              <p className="eyebrow">Peças de desgaste</p>
              <h3 className="mt-2 text-xl font-black text-ap-azul-esc">
                Mandíbulas, mantos, telas — a pronta entrega
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ap-fraco">
                Peças por sistema, kits de manutenção e a lógica de reposição que evita parada. Tudo
                amarrado ao modelo da sua máquina.
              </p>
              <Link
                to="/central/pecas"
                className="mt-4 inline-block rounded-md bg-ap-azul px-5 py-2.5 text-sm font-extrabold text-white transition-colors hover:bg-ap-azul-med"
              >
                Ver peças por sistema
              </Link>
            </div>
            <div className="rounded-2xl bg-white p-6 shadow-[0_16px_40px_-22px_rgba(1,16,46,.6)] ring-1 ring-black/5">
              <p className="eyebrow">Conteúdo técnico</p>
              <h3 className="mt-2 text-xl font-black text-ap-azul-esc">
                O que a equipe de pedreira lê
              </h3>
              <ul className="mt-3 space-y-2.5">
                {posts.map((p) => (
                  <li key={p.slug}>
                    <Link
                      to="/conteudo/$slug"
                      params={{ slug: p.slug }}
                      className="text-sm font-bold text-ap-azul hover:underline"
                    >
                      {p.titulo}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                to="/conteudo"
                className="mt-4 inline-block text-sm font-extrabold text-ap-azul hover:underline"
              >
                Todo o conteúdo →
              </Link>
            </div>
          </div>
        </section>
      </div>

      <BlocoCaptura
        origem="central-home"
        titulo="Prefere falar com quem entende de pedreira?"
        sub="Conte a operação no WhatsApp ou deixe seus dados — a equipe comercial da Lopes & Lopes responde com a linha certa para o seu caso."
        textoZap={
          "Olá! Estou na Central de Britagem da Lopes & Lopes e quero conversar sobre uma linha de britagem."
        }
        escuro
      />
    </div>
  );
}
