import { createFileRoute, Link } from "@tanstack/react-router";
import { KITS, SISTEMAS } from "@/data/central/pecas";
import { IMG } from "@/data/central/images";
import { BlocoCaptura } from "@/components/BlocoCaptura";

export const Route = createFileRoute("/central/pecas")({
  head: () => ({
    meta: [
      { title: "Peças de desgaste para britagem — mandíbulas, mantos, telas | Lopes & Lopes" },
      {
        name: "description",
        content:
          "Peças de desgaste e kits de manutenção para britadores e peneiras XCMG: mandíbulas, mantos e côncavos, barras de impacto, telas e correias. Estoque próprio e envio para todo o Brasil.",
      },
      { property: "og:title", content: "Peças de desgaste para britagem | Lopes & Lopes" },
      {
        property: "og:description",
        content: "Mandíbulas, mantos, telas e kits com estoque próprio.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PecasHubPage,
});

function PecasHubPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <p className="eyebrow">Peças de desgaste</p>
      <h1 className="mt-2 text-2xl font-black text-ap-azul-esc md:text-3xl">
        A peça certa, por sistema — antes da parada
      </h1>
      <p className="mt-2 max-w-2xl text-sm text-ap-fraco">
        Cada sistema abaixo mostra o que desgasta, o sinal de troca e o material correto. Escolha
        pelo sistema ou vá direto pelo modelo da sua máquina.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {SISTEMAS.map((s) => (
          <Link
            key={s.id}
            to="/central/pecas/$sis"
            params={{ sis: s.id }}
            className="group flex flex-col overflow-hidden rounded-xl border-2 border-border bg-white shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="flex h-36 items-center justify-center bg-white p-3">
              {IMG[s.img] ? (
                <img
                  src={IMG[s.img]}
                  alt={s.nome}
                  loading="lazy"
                  className="h-full w-full object-contain transition-transform group-hover:scale-105"
                />
              ) : (
                <span className="text-2xl font-black text-ap-azul/25">{s.nome}</span>
              )}
            </div>
            <div className="flex flex-1 flex-col p-4">
              <h2 className="text-sm font-extrabold text-ap-azul-esc">{s.nome}</h2>
              <p className="mt-1 text-xs text-ap-fraco">{s.aplica}</p>
              <span className="mt-auto pt-3 text-xs font-extrabold uppercase tracking-wide text-ap-azul">
                {s.itens.length} itens →
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Kits */}
      <h2 className="mt-12 text-lg font-black text-ap-azul-esc">Kits de manutenção</h2>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {KITS.map((k) => (
          <div key={k.id} className="rounded-xl border-2 border-border bg-white p-5">
            <h3 className="text-base font-extrabold text-ap-azul-esc">{k.nome}</h3>
            <p className="mt-1 text-xs text-ap-fraco">{k.quando}</p>
            <ul className="mt-3 space-y-1 text-sm text-ap-azul-esc">
              {k.itens.map((i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-ap-ambar">▸</span> {i}
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs text-ap-fraco">
              <b>Para:</b> {k.para.join(", ")}
            </p>
          </div>
        ))}
      </div>

      <BlocoCaptura
        origem="pecas-hub"
        titulo="Não achou a peça? A Lopes & Lopes encontra."
        sub="Mande o modelo da máquina e a peça que precisa — consultamos o catálogo XCMG e respondemos com prazo."
        textoZap="Olá! Preciso de uma peça de desgaste para britagem. Modelo da máquina: "
        rotuloCta="Consultar disponibilidade"
        escuro
      />
    </div>
  );
}
