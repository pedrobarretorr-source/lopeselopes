import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { BLOG, postPorSlug } from "@/data/central/blog";
import { IMG } from "@/data/central/images";
import { BlocoCaptura } from "@/components/BlocoCaptura";
import { ProgressoLeitura } from "@/components/blog/ProgressoLeitura";
import { SumarioArtigo, extrairSumario } from "@/components/blog/SumarioArtigo";
import { zapLink } from "@/lib/ap";

export const Route = createFileRoute("/conteudo/$slug")({
  loader: ({ params }) => {
    const post = postPorSlug(params.slug);
    if (!post) throw notFound();
    return post;
  },
  head: ({ loaderData }) => {
    const capa = loaderData ? IMG[loaderData.capa] : undefined;
    return {
      meta: [
        { title: loaderData ? `${loaderData.titulo} | Lopes & Lopes` : "Artigo | Lopes & Lopes" },
        { name: "description", content: loaderData?.resumo ?? "" },
        { property: "og:title", content: loaderData?.titulo ?? "Artigo | Lopes & Lopes" },
        { property: "og:description", content: loaderData?.resumo ?? "" },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
        ...(capa
          ? [
              { property: "og:image", content: capa },
              { name: "twitter:image", content: capa },
            ]
          : []),
      ],
    };
  },
  component: ArtigoPage,
});

const fmtData = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

function ArtigoPage() {
  const post = Route.useLoaderData();
  const relacionados = BLOG.filter((p) => p.slug !== post.slug && p.cat === post.cat).slice(0, 3);
  const { html, itens } = extrairSumario(post.corpo);
  const capa = IMG[post.capa];

  return (
    <div>
      <ProgressoLeitura />

      {/* Hero do artigo */}
      <section className="bg-ap-noite pb-12 pt-10 text-white">
        <div className="mx-auto max-w-3xl px-4">
          <nav className="text-xs text-white/55" aria-label="Trilha">
            <Link to="/conteudo" className="hover:text-ap-ambar">
              Blog
            </Link>{" "}
            / <span>{post.cat}</span>
          </nav>
          <p className="eyebrow mt-5 text-ap-ambar">
            {post.cat} · {post.leitura} min de leitura
          </p>
          <h1 className="mt-3 text-2xl leading-tight md:text-4xl">{post.titulo}</h1>
          <p className="mt-4 text-sm italic leading-relaxed text-white/70 md:text-base">
            {post.resumo}
          </p>
          <p className="mt-4 text-xs font-bold uppercase tracking-wide text-white/45">
            {fmtData(post.data)}
          </p>
        </div>
        {capa && (
          <div className="mx-auto mt-8 max-w-4xl px-4">
            <img
              src={capa}
              alt={`Imagem de capa do artigo: ${post.titulo}`}
              className="corte aspect-[21/9] w-full rounded-xl object-cover"
            />
          </div>
        )}
      </section>

      {/* Corpo + sumário lateral */}
      <div className="mx-auto max-w-6xl px-4 py-10 lg:grid lg:grid-cols-[1fr_260px] lg:gap-10">
        <div className="mx-auto w-full max-w-3xl">
          <article
            className="prose-ap text-sm leading-relaxed text-ap-azul-esc md:text-base [&_h2]:mt-10 [&_h2]:text-xl [&_h2]:text-ap-azul-esc [&_h3]:mt-6 [&_h3]:text-base [&_h3]:font-extrabold [&_p]:mt-4 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mt-1 [&_b]:text-ap-azul-esc"
            dangerouslySetInnerHTML={{ __html: html }}
          />

          <ul className="mt-10 flex flex-wrap gap-2">
            {post.tags.map((t) => (
              <li
                key={t}
                className="rounded-full bg-ap-azul-claro px-3 py-1 text-xs font-bold text-ap-azul"
              >
                {t}
              </li>
            ))}
          </ul>

          {/* CTA contextual */}
          <div className="mt-10 rounded-xl border-2 border-ap-ambar/40 bg-ap-noite p-6 text-white">
            <h2 className="text-lg">Ficou com dúvida sobre {post.cat.toLowerCase()}?</h2>
            <p className="mt-2 text-sm text-white/70">
              A equipe Lopes & Lopes responde no WhatsApp — sem robô, sem fila. Mande sua dúvida
              sobre este artigo.
            </p>
            <a
              href={zapLink(`Olá! Li o artigo "${post.titulo}" e tenho uma dúvida.`)}
              target="_blank"
              rel="noopener"
              className="corte mt-4 inline-block bg-ap-ambar px-5 py-3 text-xs font-extrabold uppercase tracking-wide text-ap-azul-esc transition-colors hover:bg-ap-ambar-esc"
            >
              Chamar no WhatsApp
            </a>
          </div>
        </div>

        <aside className="mt-10 lg:mt-0">
          <div className="lg:sticky lg:top-24">
            <SumarioArtigo itens={itens} />

            {relacionados.length > 0 && (
              <div className="mt-6 rounded-xl border-2 border-border bg-white p-5">
                <h2 className="text-[11px] font-extrabold uppercase tracking-[0.13em] text-ap-fraco">
                  Leia também
                </h2>
                <ul className="mt-3 space-y-3">
                  {relacionados.map((p) => (
                    <li key={p.slug}>
                      <Link
                        to="/conteudo/$slug"
                        params={{ slug: p.slug }}
                        className="group flex gap-3"
                      >
                        {IMG[p.capa] && (
                          <img
                            src={IMG[p.capa]}
                            alt=""
                            loading="lazy"
                            className="h-12 w-16 shrink-0 rounded-md object-cover"
                          />
                        )}
                        <span className="text-xs font-bold leading-snug text-ap-azul group-hover:text-ap-ambar-esc">
                          {p.titulo}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </aside>
      </div>

      <BlocoCaptura
        origem={`artigo-${post.slug}`}
        titulo="Receba os próximos artigos"
        sub="Conteúdo técnico direto, sem spam. Deixe seu contato e avisamos quando sair artigo novo."
        rotuloCta="Quero receber"
        escuro
      />
    </div>
  );
}
