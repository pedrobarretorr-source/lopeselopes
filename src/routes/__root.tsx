import {
  Outlet,
  Link,
  createRootRoute,
  useRouter,
  useNavigate,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { Toaster } from "sonner";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { ZapFlutuante } from "@/components/ZapFlutuante";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Página não encontrada</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          A página que você procura não existe ou foi movida.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Voltar ao início
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          Esta página não carregou
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Algo saiu errado do nosso lado. Tente atualizar ou volte ao início.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Tentar de novo
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Voltar ao início
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Lopes & Lopes — equipamentos e peças XCMG no Brasil" },
      {
        name: "description",
        content:
          "Equipamentos e peças XCMG para pedreiras, mineração e construção em todo o Brasil. Máquinas, peças de desgaste e pós-venda com estoque próprio.",
      },
      { property: "og:title", content: "Lopes & Lopes — equipamentos e peças XCMG no Brasil" },
      {
        property: "og:description",
        content:
          "Equipamentos e peças XCMG para pedreiras, mineração e construção em todo o Brasil. Máquinas, peças de desgaste e pós-venda com estoque próprio.",
      },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "pt_BR" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "icon", type: "image/png", sizes: "48x48", href: "/favicon-48x48.png" },
      { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png" },
      { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png" },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
      { rel: "manifest", href: "/site.webmanifest" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Archivo+Black&family=Archivo:ital,wght@0,400;0,600;0,700;0,800;0,900;1,400&family=Hind:wght@400;500;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

/** Redireciona hashes legados das versões SPA antigas para as rotas reais. */
function useHashLegado() {
  const navigate = useNavigate();
  useEffect(() => {
    const h = window.location.hash;
    if (!h) return;
    let destino: string | null = null;
    const seg = h.replace(/^#\/?/, "").split("/").filter(Boolean);
    if (h.startsWith("#/")) {
      // Site único (hashes com barra)
      const mapa: Record<string, string> = {
        "": "/",
        maquinas: "/maquinas",
        "modelo/xe215br": "/maquinas/modelo/xe215br",
        pecas: "/pecas/linha-amarela",
        "pos-venda": "/pos-venda",
        conteudo: "/conteudo",
        "quem-somos": "/quem-somos",
        segmentos: "/#segmentos",
      };
      destino = mapa[seg.join("/")] ?? null;
      if (!destino && seg[0] === "segmentos" && seg[1]) destino = `/segmentos/${seg[1]}`;
    } else {
      // Central de Britagem (hashes simples)
      const simples: Record<string, string> = {
        "": "/central",
        catalogo: "/central/catalogo",
        pecas: "/central/pecas",
        simulador: "/central/simulador",
        blog: "/conteudo",
        comp: "/central/comparar",
      };
      const chave = seg.join("/");
      destino = simples[chave] ?? null;
      if (!destino && seg[0] === "pecas" && seg[2]) destino = `/central/pecas/${seg[1]}/${seg[2]}`;
      else if (!destino && seg[0] === "pecas" && seg[1]) destino = `/central/pecas/${seg[1]}`;
      else if (!destino && seg[0] === "post" && seg[1]) destino = `/conteudo/${seg[1]}`;
      else if (!destino && seg[0] === "modelo" && seg[1]) destino = `/central/modelo/${seg[1]}`;
      else if (!destino && seg[0] === "fam" && seg[1]) destino = `/central/familia/${seg[1]}`;
      else if (!destino && seg[0] === "etapa" && seg[1]) destino = `/central/etapa/${seg[1]}`;
      else if (!destino && seg[0] === "s" && seg[1]) destino = `/central/simulacao/${seg[1]}`;
      // Hash desconhecido (ex.: âncora futura): não redireciona.
    }
    if (destino) {
      navigate({ to: destino, replace: true });
    }
  }, [navigate]);
}

function RootComponent() {
  useHashLegado();

  return (
    <>
      <SiteHeader />
      <main className="flow-root bg-ap-azul-vivo">
        {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
        <Outlet />
      </main>
      <SiteFooter />
      <ZapFlutuante />
      <Toaster richColors position="top-center" />
    </>
  );
}
