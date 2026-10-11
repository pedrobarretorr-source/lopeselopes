import { createFileRoute, Link } from "@tanstack/react-router";
import { HeroCarousel } from "@/components/site/HeroCarousel";
import { VitrineMaquinas } from "@/components/site/VitrineMaquinas";
import { FONE_DISPLAY, zapLink } from "@/lib/ap";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lopes & Lopes — máquinas, peças e engenharia para mineração e construção" },
      {
        name: "description",
        content:
          "Máquinas XCMG para todo o Brasil: britadores e peneiras móveis e fixas, máquinas amarelas, peças de desgaste e pós-venda que atende. Central de Britagem com simulador de linha.",
      },
      { property: "og:title", content: "Lopes & Lopes — máquinas, peças e engenharia" },
      {
        property: "og:description",
        content: "Máquinas XCMG para todo o Brasil. Britagem, máquinas, peças e pós-venda.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

type ItemVitrinePeca = {
  nome: string;
  img?: string;
};

const VITRINE_PECAS: { categoria: string; itens: ItemVitrinePeca[] }[] = [
  {
    categoria: "Peças de desgaste",
    itens: [
      { nome: "Mandíbulas", img: "/pecas/revestimentos/mandibula.jpeg" },
      { nome: "Mantos e côncavos", img: "/pecas/revestimentos/cone.jpeg" },
      { nome: "Martelos de impacto", img: "/pecas/revestimentos/martelo.jpeg" },
      { nome: "Revestimentos", img: "/pecas/revestimentos/mandibula-amarela.jpeg" },
      { nome: "Dentes de caçamba" },
      { nome: "Lâminas e cantos" },
    ],
  },
  {
    categoria: "Filtros e lubrificação",
    itens: [
      { nome: "Filtro de ar", img: "/pecas/filtros/filtro-ar.webp" },
      { nome: "Filtro de óleo", img: "/pecas/filtros/filtro-oleo.webp" },
      { nome: "Filtro de combustível", img: "/pecas/filtros/filtro-combustivel.webp" },
      { nome: "Óleos e graxas", img: "/pecas/filtros/oleos-graxas.webp" },
      { nome: "Filtro hidráulico" },
      { nome: "Filtro de cabine" },
    ],
  },
  {
    categoria: "Hidráulica e motor",
    itens: [
      { nome: "Bombas hidráulicas" },
      { nome: "Mangueiras e conexões" },
      { nome: "Cilindros" },
      { nome: "Componentes de motor" },
      { nome: "Válvulas e comandos" },
      { nome: "Kits de reparo" },
    ],
  },
];

function HomePage() {
  return (
    <div>
      {/* Hero — grudado no header, largura total (mais largo que o conteúdo abaixo) */}
      <div className="overflow-hidden">
        <HeroCarousel />
      </div>

      {/* Coluna central: começa colada na base do hero (sem divisão); as laterais preservam o fundo azul do site */}
      <div className="px-3 pb-3 md:px-6 md:pb-6">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-b-2xl bg-white shadow-2xl shadow-ap-azul-esc/25">
          {/* Banner de copy — inicia exatamente onde a parte branca começa,
              em trapézio \__/ : topo largo, base estreita, lados em diagonal. */}
          <div className="mx-auto max-w-3xl px-4 [filter:drop-shadow(0_3px_8px_rgba(1,16,46,0.30))_drop-shadow(0_0_18px_rgba(1,16,46,0.18))]">
            <div className="bg-ap-azul-vivo px-9 py-4 text-center text-white [clip-path:polygon(0_0,100%_0,calc(100%-26px)_100%,26px_100%)] md:px-12 md:py-5">
              {/* TODO: substituir pela copy definitiva */}
              <p className="text-sm leading-relaxed md:text-[15px]">
                Máquinas, peças e engenharia para mineração e construção — com pós-venda que
                acompanha a sua operação.
              </p>
            </div>
          </div>

          {/* Vitrine do portfólio — acordeão de categorias (mineração + linha amarela) */}
          <VitrineMaquinas />

          {/* Vitrine de peças */}
          <section className="bg-white py-10 md:py-14">
            <div className="mx-auto max-w-6xl px-4">
              {/* Área reservada — conteúdo de outro assunto, a definir */}
              <div className="mx-auto flex min-h-[120px] max-w-3xl items-center justify-center rounded-xl border-2 border-dashed border-border text-sm text-ap-fraco">
                Área para novo conteúdo
              </div>

              <div className="mt-8 grid gap-6 md:grid-cols-3">
                {VITRINE_PECAS.map((c) => (
                  <div key={c.categoria} className="overflow-hidden rounded-xl bg-white shadow-sm">
                    {/* Faixa do título — a única "borda" do card é essa parte superior */}
                    <h3 className="bg-ap-azul-vivo px-4 py-2.5 font-sans text-sm font-extrabold uppercase tracking-wide text-white">
                      {c.categoria}
                    </h3>
                    {/* Mosaico 3×2 — fotos coladas entre si e nas laterais do card */}
                    <div className="grid grid-cols-3">
                      {c.itens.map((item) => (
                        <figure key={item.nome} className="min-w-0">
                          {item.img ? (
                            <img
                              src={item.img}
                              alt={item.nome}
                              loading="lazy"
                              className="aspect-square w-full object-cover transition-transform duration-300 hover:scale-105"
                            />
                          ) : (
                            <div className="flex aspect-square items-center justify-center bg-ap-azul-claro px-1.5 text-center text-[10px] font-semibold leading-tight text-ap-fraco">
                              {item.nome}
                            </div>
                          )}
                          <figcaption className="sr-only">{item.nome}</figcaption>
                        </figure>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Placa azul: faixa do título + trapézio \__/ com a copy, colados */}
              <div className="mx-auto mt-10 max-w-3xl text-center md:mt-12">
                <div className="[filter:drop-shadow(0_3px_8px_rgba(1,16,46,0.30))_drop-shadow(0_0_18px_rgba(1,16,46,0.18))]">
                  {/* Faixa do título */}
                  <div className="bg-ap-azul-vivo px-6 pb-1.5 pt-3.5 md:pt-4">
                    <h2 className="text-xl text-white md:text-2xl">
                      Fornecimento de peças e pós-venda dedicado
                    </h2>
                  </div>
                  {/* Trapézio com o resto da copy */}
                  <div className="bg-ap-azul-vivo px-9 pb-5 pt-2 [clip-path:polygon(0_0,100%_0,calc(100%-26px)_100%,26px_100%)] md:px-12">
                    <div className="space-y-2 text-sm leading-relaxed text-white/85 md:text-[15px]">
                      <p>
                        A <strong className="font-bold text-white">Lopes & Lopes</strong> é
                        especializada em pós-venda para operações pesadas:{" "}
                        <strong className="font-bold text-white">
                          fornecimento de peças, manutenção programada e materiais de desgaste
                        </strong>
                        , com atendimento ágil e conhecimento técnico aplicado à operação.
                      </p>
                      <p>
                        Mais do que fornecer componentes, somos parceiros na disponibilidade dos
                        seus equipamentos — menos paradas não planejadas, manutenção mais eficiente.
                      </p>
                      <p className="font-bold text-white">
                        Lopes & Lopes. Pós-venda eficiente para operações que não podem parar.
                      </p>
                    </div>
                  </div>
                </div>
                <Link
                  to="/pecas"
                  className="mt-5 inline-block text-sm font-extrabold text-ap-azul hover:underline"
                >
                  Ver catálogo de peças →
                </Link>
              </div>
            </div>
          </section>

          {/* Fale conosco */}
          <section className="mx-auto max-w-6xl px-4 py-12 md:py-16" aria-label="Contato">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-2xl text-ap-azul-esc md:text-3xl">Fale conosco</h2>
              <p className="mt-3 text-sm leading-relaxed text-ap-fraco md:text-base">
                Um especialista está pronto para atender a sua operação — máquina, peça ou dúvida
                técnica, com resposta rápida em horário comercial.
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <a
                  href={zapLink("Olá! Quero falar com um especialista da Lopes & Lopes.")}
                  target="_blank"
                  rel="noopener"
                  className="corte inline-flex items-center gap-2 bg-ap-ambar px-6 py-3.5 text-sm font-extrabold uppercase tracking-wide text-ap-azul-esc transition-colors hover:bg-ap-ambar-esc"
                >
                  Falar com um especialista
                </a>
                <a
                  href="tel:+5531995165511"
                  className="inline-flex items-center rounded-md border-2 border-border px-6 py-3 text-sm font-extrabold text-ap-azul-esc transition-colors hover:border-ap-azul"
                >
                  {FONE_DISPLAY}
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
