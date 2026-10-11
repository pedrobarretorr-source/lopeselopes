import { createFileRoute } from "@tanstack/react-router";
import { Simulador } from "@/components/central/Simulador";

export const Route = createFileRoute("/central/simulador")({
  head: () => ({
    meta: [
      { title: "Simulador de linha de britagem — descubra a configuração ideal | Lopes & Lopes" },
      {
        name: "description",
        content:
          "Responda 7 perguntas sobre sua operação e receba a linha de britagem XCMG recomendada, com estimativa de produção por hora. Grátis, direto no site.",
      },
      { property: "og:title", content: "Simulador de linha de britagem XCMG | Lopes & Lopes" },
      {
        property: "og:description",
        content:
          "7 perguntas → linha de britagem recomendada com modelos reais e estimativa de t/h.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SimuladorPage,
});

function SimuladorPage() {
  return (
    <div className="py-10 md:py-14">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <p className="eyebrow">Simulador de britagem</p>
        <h1 className="mt-2 text-2xl font-black text-ap-azul-esc md:text-4xl">
          Qual linha de britagem a sua operação precisa?
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-ap-fraco">
          7 perguntas rápidas sobre rocha, volume e produto. No final, você vê a linha sugerida com
          modelos reais do catálogo XCMG e a estimativa de produção.
        </p>
      </div>
      <div className="mt-8">
        <Simulador />
      </div>
    </div>
  );
}
