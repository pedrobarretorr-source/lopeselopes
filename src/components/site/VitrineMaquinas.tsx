import { useState } from "react";
import { IMG } from "@/data/central/images";
import { fotoReal } from "@/data/central/fotos";
import { IconeLinha } from "@/components/IconeLinha";

interface ModeloVitrine {
  cod: string;
  /** slug para o registro FOTOS (fotos reais enviadas depois) */
  slug: string;
  desc: string;
  /** chave em IMG (Central de Britagem), quando houver foto de catálogo */
  img?: string;
}

interface CategoriaVitrine {
  id: string;
  titulo: string;
  resumo: string;
  /** ícone de linha usado como silhueta quando não há foto */
  svg: string;
  href: string;
  /** capa própria do painel (public/); sem ela, usa a foto do 1º modelo */
  capa?: string;
  /** faixa sólida azul no topo do painel — substitui numeração/título/resumo */
  faixa?: string;
  /** pelo menos 2 modelos; a expansão mostra todos (grade 2 colunas) */
  modelos: [ModeloVitrine, ModeloVitrine, ...ModeloVitrine[]];
}

/** Resumo mesclado do portfólio — mineração + linha amarela (spec 2026-09-05). */
const CATEGORIAS: CategoriaVitrine[] = [
  {
    id: "britadores",
    titulo: "Britadores",
    resumo: "Mandíbula e cone, móveis e fixos",
    svg: "brit",
    href: "/central/catalogo?tipo=britador",
    capa: "/maquinas/britagem-hero.webp",
    faixa: "Portfólio completo de britagem",
    modelos: [
      {
        cod: "XPE0912",
        slug: "xpe0912",
        desc: "Mandíbula sobre esteiras — primário",
        img: "xpe0912-hero",
      },
      {
        cod: "XPY1300",
        slug: "xpy1300",
        desc: "Cone sobre esteiras — secundário de alta redução",
        img: "xpy1300-hero",
      },
    ],
  },
  {
    id: "rental",
    titulo: "Rental",
    resumo: "Locação com manutenção e suporte Lopes & Lopes",
    svg: "esc",
    href: "/rental",
    capa: "/maquinas/rental-hero.webp",
    faixa: "Locação de equipamentos",
    modelos: [
      { cod: "XE215BR", slug: "xe215br", desc: "Escavadeira 21,5 t — pronta mobilização" },
      { cod: "LW500FV", slug: "lw500fv", desc: "Pá carregadeira 5,0 t — locação mensal" },
    ],
  },
  {
    id: "caminhoes",
    titulo: "Caminhões elétricos",
    resumo: "Transporte de mina, zero diesel",
    svg: "cam",
    href: "/maquinas/catalogo?linha=Minera%C3%A7%C3%A3o%20%C2%B7%20fora%20de%20estrada",
    capa: "/maquinas/eletricos-hero.webp",
    faixa: "Máquinas Elétricas",
    modelos: [
      { cod: "XGE95", slug: "xge95", desc: "100% elétrico · 95.000 kg · 43 km" },
      { cod: "XDE130", slug: "xde130", desc: "Elétrico-diesel · alta capacidade" },
      { cod: "E729R", slug: "e729r", desc: "Caminhão pipa 100% elétrico" },
    ],
  },
  {
    id: "carregadeiras",
    titulo: "Carregadeiras",
    resumo: "Da compacta à frente de lavra",
    svg: "car",
    href: "/maquinas/catalogo?linha=Carregadeiras",
    capa: "/maquinas/pos-venda-hero.jpeg",
    faixa: "Suporte Dedicado",
    modelos: [
      { cod: "XC968-EV", slug: "xc968-ev", desc: "18,8 t · 414 hp · zero diesel" },
      { cod: "LW500BRII", slug: "lw500brii", desc: "17.800 kg · 220 hp · 3,2 m³" },
      { cod: "LW500FV", slug: "lw500fv", desc: "5,0 t · carregamento pesado" },
    ],
  },
];

/** Foto do modelo na prioridade oficial: FOTOS (real) → IMG (catálogo) → null. */
function fotoModelo(m: ModeloVitrine): string | null {
  return fotoReal(m.slug) ?? (m.img ? (IMG[m.img] ?? null) : null);
}

function MiniModelo({ m, svg }: { m: ModeloVitrine; svg: string }) {
  const foto = fotoModelo(m);
  return (
    <div className="min-w-0">
      <div className="flex h-20 items-center justify-center overflow-hidden rounded-lg bg-white/10 md:h-24">
        {foto ? (
          <img src={foto} alt={m.cod} loading="lazy" className="h-full w-full object-cover" />
        ) : (
          <IconeLinha id={svg} className="h-9 w-9 text-white/45" />
        )}
      </div>
      <p className="mt-1.5 font-sans text-[13px] font-extrabold text-white">{m.cod}</p>
      <p className="text-[11px] leading-snug text-white/65">{m.desc}</p>
    </div>
  );
}

/**
 * Vitrine da home — 4 categorias em acordeão horizontal (desktop) que expande
 * no hover/foco; no mobile, toque expande verticalmente. Spec: docs/superpowers/
 * specs/2026-09-05-vitrine-maquinas-design.md
 */
/** Largura do painel aberto (% da fila, desktop). */
const ABERTA = 40;

/**
 * Largura de cada painel (desktop) — expansão para UM lado só: os painéis à
 * esquerda do ativo não mudam (a borda esquerda do ativo fica parada e ele
 * cresce para a direita); o último, sem espaço à direita, abre para a esquerda.
 * As larguras sempre somam 100% — nada sai da coluna central do site.
 */
function larguraPainel(i: number, ativa: number | null, total: number): string {
  if (ativa === null) return `${100 / total}%`;
  const base = 100 / total;
  if (i === ativa) return `${ABERTA}%`;
  if (ativa === total - 1) return `${(100 - ABERTA) / (total - 1)}%`;
  if (i < ativa) return `${base}%`;
  return `${(100 - base * ativa - ABERTA) / (total - 1 - ativa)}%`;
}

export function VitrineMaquinas() {
  const [ativa, setAtiva] = useState<number | null>(null);

  return (
    <section
      className="pb-10 pt-8 md:pb-14 md:pt-10"
      aria-label="Resumo do portfólio — mineração e linha amarela"
    >
      {/* Fila ocupa a coluna central inteira */}
      <div className="mx-auto max-w-7xl px-4">
        <div
          className="flex flex-col gap-3 lg:h-[440px] lg:flex-row lg:gap-0 lg:overflow-hidden lg:rounded-xl"
          onMouseLeave={() => setAtiva(null)}
        >
          {CATEGORIAS.map((c, i) => {
            const on = ativa === i;
            const capa = c.capa ?? fotoModelo(c.modelos[0]);
            /* Divisões diagonais (desktop): cada painel é um paralelogramo; bordas
             externas da fila ficam retas. O ml negativo cola os painéis por completo
             (1px de sobreposição — sem linha visível; a divisão é o próprio conteúdo). */
            const clip =
              i === 0
                ? "lg:[clip-path:polygon(0_0,100%_0,calc(100%-3rem)_100%,0_100%)]"
                : i === CATEGORIAS.length - 1
                  ? "lg:[clip-path:polygon(3rem_0,100%_0,100%_100%,0_100%)]"
                  : "lg:[clip-path:polygon(3rem_0,100%_0,calc(100%-3rem)_100%,0_100%)]";
            return (
              <article
                key={c.id}
                onMouseEnter={() => setAtiva(i)}
                onFocusCapture={() => setAtiva(i)}
                style={{ "--b": larguraPainel(i, ativa, CATEGORIAS.length) } as React.CSSProperties}
                className={`relative flex flex-col overflow-hidden rounded-xl bg-ap-noite text-white lg:rounded-none lg:[container-type:inline-size] lg:[flex:0_0_calc(var(--b)+36.75px)] lg:transition-[flex-basis] lg:duration-500 motion-reduce:transition-none ${clip} ${
                  i > 0 ? "lg:ml-[calc(-3rem-1px)]" : ""
                }`}
              >
                {/* Cabeçalho do card — no mobile é o botão que alterna a expansão */}
                <button
                  type="button"
                  aria-expanded={on}
                  aria-controls={`vitrine-${c.id}`}
                  onClick={() => setAtiva(on ? null : i)}
                  className="relative block w-full text-left focus-visible:outline-none"
                >
                  <div className="relative h-44 w-full overflow-hidden lg:h-[440px]">
                    {capa ? (
                      <img
                        src={capa}
                        alt=""
                        aria-hidden
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <IconeLinha id={c.svg} className="h-16 w-16 text-white/25" />
                      </div>
                    )}

                    {c.faixa ? (
                      /* Faixa azul embutida na imagem: sai da borda esquerda, ponta
                         cortada em diagonal; ao abrir o painel, a ponta se estende. */
                      <h3
                        className={`absolute left-0 top-4 whitespace-nowrap bg-ap-azul-vivo py-2 pl-4 font-sans text-[12px] font-extrabold uppercase tracking-wide text-white [clip-path:polygon(0_0,100%_0,calc(100%-14px)_100%,0_100%)] transition-all duration-500 motion-reduce:transition-none lg:text-[clamp(8px,3.2cqi,12px)] ${
                          on ? "pr-12" : "pr-6"
                        } ${
                          /* Painéis 2+: o fundo da faixa corre até a borda e o corte
                             diagonal do próprio painel apara o início — rente à emenda,
                             como no painel 1. O padding empurra o texto pra área visível. */
                          i > 0 ? "lg:pl-14" : ""
                        }`}
                      >
                        {c.faixa}
                      </h3>
                    ) : (
                      /* Numeração + título (painéis 2+ compensam o corte diagonal à esquerda) */
                      <div className={`absolute inset-x-0 top-0 p-4 ${i > 0 ? "lg:pl-14" : ""}`}>
                        <span
                          aria-hidden
                          className={`font-display text-xl ${on ? "text-ap-ambar" : "text-white/35"}`}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <h3 className="mt-1 font-sans text-lg font-extrabold leading-tight text-white">
                          {c.titulo}
                        </h3>
                        <p className="mt-0.5 text-xs text-white/65">{c.resumo}</p>
                      </div>
                    )}

                    {/* Fio âmbar do card ativo */}
                    <span
                      aria-hidden
                      className={`absolute inset-x-0 bottom-0 h-1 bg-ap-ambar transition-opacity duration-300 ${on ? "opacity-100" : "opacity-0"}`}
                    />
                  </div>
                </button>

                {/* Expansão: vertical animada no mobile; overlay na base do card no desktop */}
                <div
                  id={`vitrine-${c.id}`}
                  className={`grid transition-[grid-template-rows] duration-400 motion-reduce:transition-none ${
                    on ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  } lg:absolute lg:inset-x-0 lg:bottom-0 lg:z-10 lg:block lg:bg-gradient-to-t lg:from-ap-noite lg:via-ap-noite/95 lg:to-transparent lg:pt-8 lg:transition-opacity lg:duration-300 ${
                    on
                      ? "lg:pointer-events-auto lg:opacity-100 lg:delay-200"
                      : "lg:pointer-events-none lg:opacity-0"
                  }`}
                >
                  <div className="overflow-hidden lg:overflow-visible">
                    <div className={`p-4 lg:min-w-[26rem] ${i > 0 ? "lg:pl-8" : ""}`}>
                      <div className="grid grid-cols-2 gap-3">
                        {c.modelos.map((m) => (
                          <MiniModelo key={m.cod} m={m} svg={c.svg} />
                        ))}
                      </div>
                      <a
                        href={c.href}
                        tabIndex={on ? 0 : -1}
                        className="mt-3 inline-block text-xs font-extrabold uppercase tracking-wide text-ap-ambar hover:underline"
                      >
                        Ver {c.titulo.toLowerCase()} →
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
