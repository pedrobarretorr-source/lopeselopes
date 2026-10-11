import { createFileRoute, Link } from "@tanstack/react-router";
import { BlocoCaptura } from "@/components/BlocoCaptura";
import { SecaoTitulo } from "@/components/site/SecaoTitulo";
import { zapLink } from "@/lib/ap";

export const Route = createFileRoute("/pecas/")({
  head: () => ({
    meta: [
      { title: "Peças XCMG com cotação rápida | Lopes & Lopes" },
      {
        name: "description",
        content:
          "Peças XCMG para linha amarela e britagem. Informe modelo, código ou necessidade e receba atendimento comercial por formulário ou WhatsApp.",
      },
      { property: "og:title", content: "Peças XCMG com cotação rápida | Lopes & Lopes" },
      {
        property: "og:description",
        content:
          "Cotação de peças XCMG por formulário ou WhatsApp, com apoio para identificar aplicação, disponibilidade e prazo.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PecasPage,
});

const FRENTES = [
  {
    titulo: "Peças para britagem",
    texto:
      "Mandíbulas, mantos, côncavos, barras de impacto, telas e itens de desgaste por sistema e modelo.",
    to: "/central/pecas",
    cta: "Ver desgaste de britagem",
    fotos: [
      "/pecas/revestimentos/mandibula.jpeg",
      "/pecas/revestimentos/cone.jpeg",
      "/pecas/revestimentos/martelo.jpeg",
    ],
  },
  {
    titulo: "Peças para linha amarela",
    texto:
      "Filtros, hidráulica, motor, material rodante, dentes, lâminas e itens de manutenção para máquinas XCMG.",
    to: "/pecas/linha-amarela",
    cta: "Ver linha amarela",
    fotos: [
      "/pecas/filtros/filtro-ar.webp",
      "/pecas/filtros/filtro-oleo.webp",
      "/pecas/revestimentos/mandibula-amarela.jpeg",
    ],
  },
] as const;

const DADOS = [
  "Modelo da máquina",
  "Código da peça, se tiver",
  "Horímetro ou urgência da parada",
  "Cidade e estado para cálculo de prazo",
];

function PecasPage() {
  return (
    <div>
      {/* Hero padrão — grudado no header, mesma linguagem da home */}
      <section className="relative overflow-hidden bg-ap-noite text-white">
        <img
          src="/maquinas/pos-venda-hero.jpeg"
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-ap-noite via-ap-noite/85 to-ap-azul/40" />
        <div className="relative z-10 mx-auto max-w-6xl px-4 py-10 md:py-14">
          <p className="eyebrow flex items-center gap-3 text-ap-ambar">
            <span className="h-px w-8 bg-ap-ambar" />
            Peças XCMG
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-3xl leading-[1.05] md:text-4xl">
            Cotação direto com a equipe — sem loja, sem carrinho
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-white/75 md:text-base">
            Envie o modelo, código ou descrição da peça. A equipe Lopes & Lopes confirma aplicação,
            estoque, prazo e a alternativa correta antes da compra.
          </p>
          <a
            href={zapLink("Olá! Preciso cotar uma peça XCMG. Modelo/código: ")}
            target="_blank"
            rel="noopener"
            className="corte mt-6 inline-block bg-ap-ambar px-6 py-3.5 text-sm font-extrabold uppercase tracking-wide text-ap-azul-esc transition-colors hover:bg-ap-ambar-esc"
          >
            Cotar pelo WhatsApp
          </a>
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
                Desgaste de britagem e manutenção da linha amarela — peças genuínas XCMG com estoque
                próprio e envio nacional.
              </p>
            </div>
          </div>

          <div className="mx-auto max-w-6xl px-4 pb-16 pt-2">
            {/* Frentes de peças */}
            <section className="mt-8">
              <SecaoTitulo eyebrow="Frentes de peças" titulo="Ache sua peça por linha" />
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {FRENTES.map((frente) => (
                  <Link
                    key={frente.to}
                    to={frente.to}
                    className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_16px_40px_-22px_rgba(1,16,46,.6)] ring-1 ring-black/5 transition-all hover:-translate-y-0.5 hover:ring-ap-ambar"
                  >
                    {/* Faixa de fotos coladas — sem divisão entre elas */}
                    <div className="grid grid-cols-3" aria-hidden>
                      {frente.fotos.map((f) => (
                        <img
                          key={f}
                          src={f}
                          alt=""
                          loading="lazy"
                          className="aspect-[4/3] w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      ))}
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="text-lg font-extrabold text-ap-azul-esc">{frente.titulo}</h3>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-ap-fraco">
                        {frente.texto}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wide text-ap-azul transition-colors group-hover:text-ap-azul-esc">
                        {frente.cta} →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            {/* Cotação */}
            <section className="mt-14">
              <SecaoTitulo eyebrow="Cotação" titulo="Como pedir sua cotação" />
              <div className="mt-6 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
                <div className="rounded-2xl bg-white p-6 shadow-[0_16px_40px_-22px_rgba(1,16,46,.6)] ring-1 ring-black/5">
                  <h3 className="text-lg font-extrabold text-ap-azul-esc">
                    O que enviar para agilizar
                  </h3>
                  <ul className="mt-4 space-y-3 text-sm text-ap-fraco">
                    {DADOS.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span
                          className="mt-1 h-2 w-2 shrink-0 rounded-full bg-ap-ambar"
                          aria-hidden
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <BlocoCaptura
                  origem="pecas"
                  titulo="Solicitar cotação de peça"
                  sub="Preencha os dados e descreva a peça, código ou modelo da máquina. A equipe comercial retorna com disponibilidade e prazo."
                  textoZap="Olá! Preciso cotar uma peça XCMG. Modelo/código: "
                  rotuloCta="Solicitar cotação"
                  escuro
                />
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
