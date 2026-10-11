import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { BLOG, type Post } from "@/data/central/blog";
import { IMG } from "@/data/central/images";
import { BlocoCaptura } from "@/components/BlocoCaptura";

export const Route = createFileRoute("/conteudo/")({
  head: () => ({
    meta: [
      { title: "Blog técnico sobre britagem e mineração | Lopes & Lopes" },
      {
        name: "description",
        content:
          "Artigos práticos sobre britagem, peneiramento, peças de desgaste e máquinas amarelas — sem enrolação, direto do chão de obra.",
      },
      { property: "og:title", content: "Blog técnico | Lopes & Lopes" },
      {
        property: "og:description",
        content: "Artigos práticos sobre britagem, mineração e máquinas pesadas.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ConteudoHubPage,
});

const CATS = [...new Set(BLOG.map((p) => p.cat))];

const fmtData = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

function CardPost({ p }: { p: Post }) {
  const capa = IMG[p.capa];
  return (
    <Link
      to="/conteudo/$slug"
      params={{ slug: p.slug }}
      className="group flex flex-col overflow-hidden rounded-xl border-2 border-border bg-white shadow-sm transition-all hover:border-ap-ambar hover:shadow-lg"
    >
      {capa && (
        <div className="relative h-40 overflow-hidden bg-ap-noite">
          <img
            src={capa}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover opacity-90 transition-transform duration-500 group-hover:scale-105"
          />
          <span className="absolute left-3 top-3 rounded bg-ap-noite/85 px-2 py-1 text-[10px] font-extrabold uppercase tracking-wide text-ap-ambar">
            {p.cat}
          </span>
        </div>
      )}
      <div className="flex flex-1 flex-col p-5">
        {!capa && (
          <span className="text-[11px] font-extrabold uppercase tracking-wide text-ap-ambar-esc">
            {p.cat}
          </span>
        )}
        <h2 className="mt-2 text-base font-extrabold leading-snug text-ap-azul-esc group-hover:text-ap-azul">
          {p.titulo}
        </h2>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-ap-fraco">{p.resumo}</p>
        <div className="mt-4 flex items-center justify-between text-[11px] font-bold text-ap-fraco">
          <span>{fmtData(p.data)}</span>
          <span className="font-extrabold uppercase tracking-wide text-ap-azul">
            Ler · {p.leitura} min →
          </span>
        </div>
      </div>
    </Link>
  );
}

function ConteudoHubPage() {
  const [cat, setCat] = useState<string | null>(null);
  const posts = BLOG.filter((p) => !cat || p.cat === cat);
  const [destaque, ...restantes] = posts;

  return (
    <div>
      {/* Cabeçalho editorial */}
      <section className="corte-b bg-ap-noite pb-14 pt-12 text-white">
        <div className="mx-auto max-w-6xl px-4">
          <p className="eyebrow text-ap-ambar">Blog técnico</p>
          <h1 className="mt-3 max-w-2xl text-3xl leading-tight md:text-4xl">
            O que aprendemos no chão de obra
          </h1>
          <p className="mt-3 max-w-xl text-sm text-white/70 md:text-base">
            Artigos curtos e diretos para quem opera, compra ou mantém equipamento pesado.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-10">
        {/* Filtros */}
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por categoria">
          <button
            onClick={() => setCat(null)}
            className={`rounded-full border-2 px-4 py-1.5 text-xs font-extrabold uppercase tracking-wide transition-colors ${
              !cat
                ? "border-ap-azul bg-ap-azul text-white"
                : "border-border bg-white text-ap-fraco hover:border-ap-azul hover:text-ap-azul"
            }`}
          >
            Todas
          </button>
          {CATS.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`rounded-full border-2 px-4 py-1.5 text-xs font-extrabold uppercase tracking-wide transition-colors ${
                cat === c
                  ? "border-ap-azul bg-ap-azul text-white"
                  : "border-border bg-white text-ap-fraco hover:border-ap-azul hover:text-ap-azul"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Destaque */}
        {destaque && (
          <Link
            to="/conteudo/$slug"
            params={{ slug: destaque.slug }}
            className="group mt-8 grid overflow-hidden rounded-xl border-2 border-border bg-white shadow-sm transition-all hover:border-ap-ambar hover:shadow-xl md:grid-cols-2"
          >
            {IMG[destaque.capa] && (
              <div className="relative min-h-56 overflow-hidden bg-ap-noite">
                <img
                  src={IMG[destaque.capa]}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover opacity-90 transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            )}
            <div className="flex flex-col justify-center p-6 md:p-10">
              <div className="flex items-center gap-3 text-[11px] font-extrabold uppercase tracking-wide">
                <span className="text-ap-ambar-esc">{destaque.cat}</span>
                <span className="text-ap-fraco">{fmtData(destaque.data)}</span>
              </div>
              <h2 className="mt-3 text-xl leading-tight text-ap-azul-esc group-hover:text-ap-azul md:text-2xl">
                {destaque.titulo}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-ap-fraco">{destaque.resumo}</p>
              <span className="mt-5 text-xs font-extrabold uppercase tracking-wide text-ap-azul">
                Ler artigo · {destaque.leitura} min →
              </span>
            </div>
          </Link>
        )}

        {/* Grade */}
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {restantes.map((p) => (
            <CardPost key={p.slug} p={p} />
          ))}
        </div>
      </div>

      <BlocoCaptura
        origem="blog-hub"
        titulo="Receba os próximos artigos"
        sub="Conteúdo técnico direto, sem spam. Deixe seu contato e avisamos quando sair artigo novo."
        rotuloCta="Quero receber"
        escuro
      />
    </div>
  );
}
