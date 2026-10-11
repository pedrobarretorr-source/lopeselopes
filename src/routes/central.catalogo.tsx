import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import { CAT } from "@/data/central/catalogo";
import { CardModelo } from "@/components/central/CardModelo";
import { BarraComparador } from "@/components/central/BarraComparador";
import { norm } from "@/lib/ap";

type Busca = {
  inst?: string | undefined;
  tipo?: string | undefined;
  q?: string | undefined;
  disponivel?: boolean | undefined;
};

const TIPOS_BRITADORES = new Set(["mandibula", "giratorio", "cone", "impacto", "vsi"]);
const TIPOS_VALIDOS = new Set([
  ...TIPOS_BRITADORES,
  "britador",
  "peneira",
  "alimentador",
  "lavagem",
  "transportador",
]);
const INST_VALIDAS = new Set(["movel", "fixa"]);

export const Route = createFileRoute("/central/catalogo")({
  validateSearch: (s: Record<string, unknown>): Busca => ({
    inst: typeof s["inst"] === "string" && INST_VALIDAS.has(s["inst"]) ? s["inst"] : undefined,
    tipo: typeof s["tipo"] === "string" && TIPOS_VALIDOS.has(s["tipo"]) ? s["tipo"] : undefined,
    q: typeof s["q"] === "string" ? s["q"] : undefined,
    disponivel: s["disponivel"] === true || s["disponivel"] === "true" ? true : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Catálogo de britadores e peneiras XCMG — 67 modelos | Lopes & Lopes" },
      {
        name: "description",
        content:
          "Todos os modelos de britadores de mandíbulas, cônicos, VSI, impacto, giratórios, peneiras e alimentadores XCMG — móveis e fixos — com capacidade, boca e disponibilidade.",
      },
      { property: "og:title", content: "Catálogo de britadores e peneiras XCMG | Lopes & Lopes" },
      {
        property: "og:description",
        content:
          "67 modelos XCMG com capacidade, boca de alimentação e disponibilidade. Compare e escolha.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CatalogoPage,
});

function CatalogoPage() {
  const search = Route.useSearch();

  const inst = search.inst ?? "";
  const tipo = search.tipo ?? "";
  const q = search.q ?? "";
  const soDisponivel = Boolean(search.disponivel);

  const lista = useMemo(() => {
    const nq = norm(q);
    return CAT.filter(
      (m) =>
        (!inst || m.inst === inst) &&
        (!tipo || (tipo === "britador" ? TIPOS_BRITADORES.has(m.tipo) : m.tipo === tipo)) &&
        (!soDisponivel || m.status === "disponivel") &&
        (!nq || norm(`${m.mod} ${m.fam} ${m.boca}`).includes(nq)),
    );
  }, [inst, tipo, q, soDisponivel]);

  return (
    <div>
      {/* Hero padrão — grudado no header, mesma linguagem da home */}
      <section className="relative overflow-hidden bg-ap-noite text-white">
        <img
          src="/maquinas/britagem-hero.webp"
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-ap-noite via-ap-noite/85 to-ap-azul/40" />
        <div className="relative z-10 mx-auto max-w-6xl px-4 py-10 md:py-14">
          <p className="eyebrow flex items-center gap-3 text-ap-ambar">
            <span className="h-px w-8 bg-ap-ambar" />
            Catálogo completo
          </p>
          <h1 className="mt-3 text-2xl font-black md:text-3xl">
            Britadores, peneiras e alimentadores XCMG
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-white/75 md:text-base">
            {CAT.length} modelos — móveis e fixos — com capacidade, boca de alimentação e
            disponibilidade. Selecione até 3 com o botão <b>+</b> para comparar lado a lado.
          </p>
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
                Do primário à classificação final — {CAT.length} modelos XCMG com capacidade, boca
                de alimentação e disponibilidade.
              </p>
            </div>
          </div>

          <div className="mx-auto max-w-6xl px-4 pb-28 pt-8">
            {/* Grade */}
            {lista.length === 0 ? (
              <p className="mt-10 text-center text-sm text-ap-fraco">
                Nenhum modelo com esses filtros.
              </p>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {lista.map((m) => (
                  <CardModelo key={m.id} m={m} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <BarraComparador />
    </div>
  );
}
