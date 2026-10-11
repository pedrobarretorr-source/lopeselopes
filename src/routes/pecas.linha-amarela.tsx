import { createFileRoute } from "@tanstack/react-router";
import { BlocoCaptura } from "@/components/BlocoCaptura";

export const Route = createFileRoute("/pecas/linha-amarela")({
  head: () => ({
    meta: [
      { title: "Peças para máquinas XCMG — linha amarela | Lopes & Lopes" },
      {
        name: "description",
        content:
          "Filtros, hidráulica, material rodante e componentes de motor para escavadeiras, carregadeiras, rolos e caminhões XCMG. Cote com a Lopes & Lopes.",
      },
      { property: "og:title", content: "Peças de linha amarela XCMG | Lopes & Lopes" },
      {
        property: "og:description",
        content: "Filtros, hidráulica e material rodante para máquinas XCMG.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LinhaAmarelaPage,
});

const GRUPOS = [
  {
    h: "Filtração",
    itens: [
      "Filtros de óleo, combustível, ar e hidráulico",
      "Kits de filtro por intervalo (250 / 500 / 1.000 h)",
      "Elementos originais XCMG",
    ],
  },
  {
    h: "Hidráulica",
    itens: [
      "Bombas, motores e válvulas",
      "Vedações e kits de cilindro",
      "Mangueiras e conexões de alta pressão",
    ],
  },
  {
    h: "Material rodante",
    itens: [
      "Sapatas, elos e buchas",
      "Roletes superiores e inferiores",
      "Rodas-guia, motrizes e tensores",
    ],
  },
  {
    h: "Motor e transmissão",
    itens: [
      "Componentes de motor Cummins/Weichai",
      "Bombas d'água, turbos e injeção",
      "Embreagens e componentes de transmissão",
    ],
  },
  {
    h: "Elétrica e eletrônica",
    itens: [
      "Módulos, sensores e chicotes",
      "Motores de partida e alternadores",
      "Painéis e displays",
    ],
  },
  {
    h: "GET — ferramentas de penetração",
    itens: [
      "Dentes e adaptadores de caçamba",
      "Lâminas e protetores",
      "Unhas e segmentos para carregadeiras",
    ],
  },
];

function LinhaAmarelaPage() {
  return (
    <div>
      <section className="corte-b bg-ap-noite pb-14 pt-12 text-white">
        <div className="mx-auto max-w-6xl px-4">
          <p className="eyebrow text-ap-ambar">Linha amarela</p>
          <h1 className="mt-3 text-3xl leading-tight md:text-4xl">Peças para máquinas XCMG</h1>
          <p className="mt-3 max-w-2xl text-sm text-white/70">
            Do filtro de 250 horas ao componente de motor: consulte pelo modelo ou pelo código da
            peça.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {GRUPOS.map((g) => (
            <div key={g.h} className="rounded-xl border-2 border-border bg-white p-5">
              <h2 className="text-base font-extrabold text-ap-azul-esc">{g.h}</h2>
              <ul className="mt-3 space-y-1.5 text-sm text-ap-fraco">
                {g.itens.map((i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-ap-ambar">▸</span> {i}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <BlocoCaptura
          origem="pecas-amarela"
          titulo="Cote pelo modelo ou código da peça"
          sub="A Lopes & Lopes consulta o catálogo XCMG e responde com disponibilidade e prazo — inclusive importação assistida."
          textoZap="Olá! Preciso de peças para máquina XCMG. Modelo: "
          rotuloCta="Consultar peça"
          escuro
        />
      </div>
    </div>
  );
}
