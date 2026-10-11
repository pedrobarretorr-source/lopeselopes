import { createFileRoute } from "@tanstack/react-router";
import { BlocoCaptura } from "@/components/BlocoCaptura";

export const Route = createFileRoute("/rental")({
  head: () => ({
    meta: [
      { title: "Rental — locação de máquinas | Lopes & Lopes" },
      {
        name: "description",
        content:
          "Locação de máquinas para mineração e construção com suporte Lopes & Lopes: equipamento disponível, manutenção inclusa e atendimento em todo o Brasil.",
      },
    ],
  }),
  component: RentalPage,
});

function RentalPage() {
  return (
    <div className="bg-white">
      <section className="bg-ap-noite py-14 text-white md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <p className="eyebrow text-ap-ambar">Rental Lopes & Lopes</p>
          <h1 className="mt-2 max-w-2xl font-display text-3xl md:text-4xl">
            Locação de máquinas com suporte de verdade
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/75 md:text-base">
            Equipamento disponível quando a sua operação precisa — com manutenção e pós-venda Lopes
            & Lopes inclusos. Página em construção: fale com a equipe para condições de locação.
          </p>
        </div>
      </section>

      <BlocoCaptura
        origem="rental"
        titulo="Quero uma máquina em locação"
        sub="Conte qual equipamento e por quanto tempo — a equipe retorna com as condições."
        textoZap="Olá! Quero saber sobre locação de máquinas (Rental Lopes & Lopes)."
      />
    </div>
  );
}
