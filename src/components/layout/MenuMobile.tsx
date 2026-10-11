import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect } from "react";
import { zapLink } from "@/lib/ap";
import { Logo } from "@/components/Logo";

const NAV = [
  {
    to: "/maquinas",
    label: "Máquinas",
    desc: "Linha amarela XCMG e a XE215BR",
    match: ["/maquinas"],
  },
  {
    to: "/central",
    label: "Britagem",
    desc: "Central de Britagem: catálogo, simulador e peças",
    match: ["/central"],
  },
  { to: "/pecas", label: "Peças", desc: "Catálogo com cotação via WhatsApp", match: ["/pecas"] },
  {
    to: "/rental",
    label: "Rental",
    desc: "Locação de máquinas com suporte Lopes & Lopes",
    match: ["/rental"],
  },
  {
    to: "/conteudo",
    label: "Blog",
    desc: "Artigos técnicos do chão de obra",
    match: ["/conteudo"],
  },
  {
    to: "/quem-somos",
    label: "Sobre nós",
    desc: "A história e o time da Lopes & Lopes",
    match: ["/quem-somos"],
  },
] as const;

interface Props {
  aberto: boolean;
  aoFechar: () => void;
}

/** Gaveta de navegação mobile — fecha ao navegar ou com Escape. */
export function MenuMobile({ aberto, aoFechar }: Props) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (aberto) aoFechar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") aoFechar();
    };
    if (aberto) {
      window.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [aberto, aoFechar]);

  if (!aberto) return null;

  return (
    <div
      className="fixed inset-0 z-[70] md:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Menu de navegação"
    >
      <button
        aria-label="Fechar menu"
        onClick={aoFechar}
        className="absolute inset-0 h-full w-full bg-ap-noite/70 backdrop-blur-sm"
      />
      <nav className="absolute right-0 top-0 flex h-full w-[85%] max-w-sm flex-col bg-ap-noite text-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <Logo />
          <button
            onClick={aoFechar}
            aria-label="Fechar"
            className="flex h-10 w-10 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
            >
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-4">
          <ul className="space-y-1">
            {NAV.map((n, i) => {
              const on = n.match.some((m) => pathname.startsWith(m));
              return (
                <li key={n.to}>
                  <Link
                    to={n.to}
                    className={`flex items-center gap-3 rounded-lg border-l-2 px-3 py-3.5 transition-colors ${
                      on ? "border-ap-ambar bg-white/10" : "border-transparent hover:bg-white/5"
                    }`}
                  >
                    <span
                      aria-hidden
                      className={`font-display text-xs ${on ? "text-ap-ambar" : "text-white/30"}`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1">
                      <span
                        className={`block text-sm font-extrabold ${on ? "text-ap-ambar" : "text-white"}`}
                      >
                        {n.label}
                      </span>
                      <span className="block text-[11px] text-white/55">{n.desc}</span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="space-y-2 border-t border-white/10 p-4">
          <a
            href={zapLink("URGENTE — equipamento parado. Modelo: ")}
            target="_blank"
            rel="noopener"
            className="corte flex items-center justify-center gap-2 bg-ap-ambar px-5 py-3.5 text-sm font-extrabold uppercase tracking-wide text-ap-azul-esc"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z" />
            </svg>
            Equipamento parado? Chamar agora
          </a>
          <a
            href={zapLink("Olá! Vim pelo site e quero falar com a Lopes & Lopes.")}
            target="_blank"
            rel="noopener"
            className="flex items-center justify-center gap-2 rounded-md border border-white/15 px-5 py-3 text-xs font-bold text-white/80 transition-colors hover:border-ap-ambar hover:text-ap-ambar"
          >
            WhatsApp (31) 9 9516-5511
          </a>
        </div>
      </nav>
    </div>
  );
}
