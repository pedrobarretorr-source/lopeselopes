import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { MODELOS, OPS, SEG } from "@/data/site";
import { IconeLinha } from "@/components/IconeLinha";
import { zapLink } from "@/lib/ap";

export const Route = createFileRoute("/segmentos/$seg")({
  loader: ({ params }) => {
    const seg = SEG[params.seg];
    const op = OPS.find((o) => o.id === params.seg);
    if (!seg && !op) throw notFound();
    return { id: params.seg, seg, op };
  },
  head: ({ loaderData }) => {
    const titulo = loaderData?.seg?.h ?? loaderData?.op?.n ?? "Segmento";
    const desc = loaderData?.seg?.s ?? loaderData?.op?.d ?? "";
    return {
      meta: [
        { title: `${titulo} — máquinas e soluções | Lopes & Lopes` },
        { name: "description", content: desc.slice(0, 155) },
        { property: "og:title", content: `${titulo} | Lopes & Lopes` },
        { property: "og:description", content: desc.slice(0, 155) },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: SegmentoPage,
});

function SegmentoPage() {
  const { id, seg, op } = Route.useLoaderData();
  const titulo = seg?.h ?? op?.n ?? id;
  const desc = seg?.s ?? op?.d ?? "";
  const modelos = MODELOS.filter((m) => m.op === id);
  const temCentral = op?.central || ["mineracao", "agregados", "cimento"].includes(id);

  return (
    <div>
      <section className="corte-b bg-ap-noite pb-14 pt-10 text-white">
        <div className="mx-auto max-w-6xl px-4">
          <nav className="text-xs text-white/55" aria-label="Trilha">
            <Link to="/" className="hover:text-ap-ambar">
              Início
            </Link>{" "}
            / <span>{titulo}</span>
          </nav>
          <div className="mt-5 flex items-start gap-4">
            {op && (
              <IconeLinha
                id={op.svg}
                className="hidden h-12 w-12 shrink-0 text-ap-ambar sm:block"
              />
            )}
            <div>
              <h1 className="max-w-3xl text-2xl leading-tight md:text-4xl">{titulo}</h1>
              <p className="mt-3 max-w-2xl text-sm text-white/70 md:text-base">{desc}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-10">
        {temCentral && (
          <Link
            to="/central"
            className="group mt-8 flex flex-col gap-3 rounded-xl border-2 border-ap-ambar bg-ap-ambar/5 p-6 transition-shadow hover:shadow-md sm:flex-row sm:items-center"
          >
            <div className="flex-1">
              <h2 className="text-base font-extrabold text-ap-azul-esc group-hover:text-ap-azul">
                Britagem é o coração desta operação?
              </h2>
              <p className="mt-1 text-sm text-ap-fraco">
                A Central de Britagem tem catálogo completo, simulador de linha e peças de desgaste
                por modelo.
              </p>
            </div>
            <span className="rounded-md bg-ap-ambar px-5 py-3 text-center text-sm font-extrabold text-ap-azul-esc transition-colors group-hover:bg-ap-ambar-esc">
              Abrir a Central →
            </span>
          </Link>
        )}

        {modelos.length > 0 && (
          <section className="mt-10">
            <h2 className="text-lg font-black text-ap-azul-esc">
              Máquinas para {titulo.toLowerCase()}
            </h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {modelos.map((m) => (
                <div
                  key={m.cod}
                  className="flex flex-col rounded-xl border-2 border-border bg-white p-5 shadow-sm"
                >
                  <p className="text-[11px] font-extrabold uppercase tracking-wide text-ap-fraco">
                    {m.linha}
                  </p>
                  <h3 className="mt-1 text-lg font-black text-ap-azul-esc">{m.cod}</h3>
                  <p className="mt-2 flex-1 text-sm text-ap-fraco">{m.d}</p>
                  <a
                    href={zapLink(
                      `Olá! Trabalho com ${titulo.toLowerCase()} e quero cotação da ${m.cod}.`,
                    )}
                    target="_blank"
                    rel="noopener"
                    className="mt-4 text-xs font-extrabold uppercase tracking-wide text-ap-azul hover:underline"
                  >
                    Cotar →
                  </a>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="mt-10">
          <a
            href={zapLink(
              `Olá! Trabalho com ${titulo.toLowerCase()} e quero falar com a Lopes & Lopes.`,
            )}
            target="_blank"
            rel="noopener"
            className="corte inline-block bg-ap-ambar px-6 py-3.5 text-sm font-extrabold uppercase tracking-wide text-ap-azul-esc transition-colors hover:bg-ap-ambar-esc"
          >
            Falar com especialista
          </a>
        </div>
      </div>
    </div>
  );
}
