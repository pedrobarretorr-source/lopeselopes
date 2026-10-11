import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/Logo";
import { REDES, zapLink } from "@/lib/ap";
import { MenuMobile } from "@/components/layout/MenuMobile";

/** Glyphs das redes sociais (24×24, fill currentColor). */
function IconeRede({ id }: { id: string }) {
  const cls = "h-[15px] w-[15px]";
  if (id === "instagram") {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={cls}>
        <path d="M7.03.084c-1.277.06-2.149.264-2.91.563-.789.31-1.457.72-2.122 1.388S.936 3.34.63 4.13c-.3.76-.5 1.632-.563 2.91C.005 8.32 0 8.727 0 12s.005 3.68.067 4.96c.062 1.277.264 2.15.563 2.911.31.789.72 1.457 1.388 2.122.665.665 1.333 1.078 2.122 1.388.76.3 1.633.5 2.91.563 1.28.062 1.687.067 4.96.067s3.68-.005 4.96-.067c1.277-.062 2.15-.264 2.911-.563.789-.31 1.457-.72 2.122-1.388.665-.665 1.078-1.333 1.388-2.122.3-.76.5-1.634.563-2.911.062-1.28.067-1.687.067-4.96s-.005-3.68-.067-4.96c-.062-1.277-.264-2.15-.563-2.911-.31-.789-.72-1.457-1.388-2.122C21.31.936 20.641.522 19.85.222c-.76-.3-1.634-.5-2.911-.563C15.65.006 15.242 0 12 0S8.32.005 7.03.084zm.14 21.693c-1.17-.054-1.805-.249-2.228-.413-.56-.218-.96-.477-1.38-.896-.42-.42-.68-.82-.896-1.38-.164-.423-.36-1.058-.413-2.228-.058-1.265-.07-1.645-.07-4.848s.012-3.583.07-4.848c.053-1.17.249-1.805.413-2.228.218-.56.477-.96.896-1.38.42-.42.82-.679 1.38-.896.423-.164 1.058-.36 2.228-.413 1.265-.058 1.645-.07 4.848-.07s3.583.012 4.848.07c1.17.053 1.806.249 2.228.413.56.217.96.477 1.38.896.42.42.679.819.896 1.38.164.422.36 1.057.413 2.227.058 1.265.07 1.645.07 4.848s-.012 3.583-.07 4.848c-.053 1.17-.249 1.806-.413 2.228-.218.56-.477.96-.896 1.38-.42.419-.82.678-1.38.896-.422.164-1.058.36-2.228.413-1.265.058-1.645.07-4.848.07s-3.583-.012-4.848-.07zM16.806 4.994a1.44 1.44 0 1 0 2.88 0 1.44 1.44 0 0 0-2.88 0zM5.838 12a6.162 6.162 0 1 0 12.324 0 6.162 6.162 0 0 0-12.324 0zM8 12a4 4 0 1 1 8 0 4 4 0 0 1-8 0z" />
      </svg>
    );
  }
  if (id === "linkedin") {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={cls}>
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={cls}>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

/** Bandeirinhas minimalistas das praças atendidas — Brasil e Minas Gerais. */
function BandeirasAtendimento() {
  const flag = "h-[13px] w-[20px] rounded-[2px] lg:h-[17px] lg:w-[26px]";
  return (
    <span className="flex items-center gap-1" role="img" aria-label="Atendemos Brasil e Minas Gerais">
      {/* Brasil */}
      <svg viewBox="0 0 60 40" className={flag} aria-hidden>
        <rect width="60" height="40" fill="#009B3A" />
        <path d="M30 4.5 55 20 30 35.5 5 20Z" fill="#FEDF00" />
        <circle cx="30" cy="20" r="8.6" fill="#002776" />
      </svg>
      {/* Minas Gerais — campo branco com triângulo vermelho invertido */}
      <svg viewBox="0 0 60 40" className={flag} aria-hidden>
        <rect width="60" height="40" fill="#fff" />
        <path d="M14 9 46 9 30 34Z" fill="#C4122F" />
      </svg>
    </span>
  );
}

/** Tagline digitada da barra do topo — escreve até o ponto final, pausa e reinicia. */
const TAGLINE_PRE = "Soluções para operações que não podem parar, ";
const TAGLINE_NEG = "nunca."; // trecho em negrito
const TAGLINE = TAGLINE_PRE + TAGLINE_NEG;

function TaglineDigitada() {
  const [n, setN] = useState(0);
  const [animar, setAnimar] = useState(true);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setAnimar(false);
  }, []);

  useEffect(() => {
    if (!animar) return;
    /** Cadência de máquina de escrever, por posição do próximo caractere. */
    const atraso = (i: number): number => {
      if (i >= TAGLINE.length) return 3000; // frase completa: pausa longa e recomeça
      if (i > 0 && TAGLINE[i - 1] === ",") return 850; // pausa na vírgula — ênfase no "nunca"
      if (i >= TAGLINE_PRE.length) return 150; // "nunca." batido mais lento, tecla a tecla
      return 55 + Math.random() * 65; // ritmo irregular, como datilografia
    };
    const t = window.setTimeout(() => setN((v) => (v < TAGLINE.length ? v + 1 : 0)), atraso(n));
    return () => window.clearTimeout(t);
  }, [n, animar]);

  if (!animar) {
    return (
      <span className="text-[12.5px] font-normal tracking-wide lg:text-[13px]">
        {TAGLINE_PRE}
        <strong className="font-bold">{TAGLINE_NEG}</strong>
      </span>
    );
  }

  return (
    <span className="grid text-[12.5px] font-normal tracking-wide lg:text-[13px]">
      {/* Frase completa invisível: reserva a largura e evita a barra "dançar" ao digitar */}
      <span aria-hidden className="invisible col-start-1 row-start-1">
        {TAGLINE_PRE}
        <strong className="font-bold">{TAGLINE_NEG}</strong>
      </span>
      <span className="col-start-1 row-start-1">
        <span className="sr-only">{TAGLINE}</span>
        <span aria-hidden>
          {TAGLINE_PRE.slice(0, Math.min(n, TAGLINE_PRE.length))}
          {n > TAGLINE_PRE.length && (
            <strong className="font-bold">{TAGLINE_NEG.slice(0, n - TAGLINE_PRE.length)}</strong>
          )}
          <span className="caret-blink ml-0.5 inline-block h-[1em] w-[2px] translate-y-[2px] bg-white" />
        </span>
      </span>
    </span>
  );
}

const NAV = [
  { to: "/maquinas", label: "Máquinas", match: ["/maquinas"] },
  { to: "/central", label: "Britagem", match: ["/central"] },
  { to: "/pecas", label: "Peças", match: ["/pecas"] },
  { to: "/rental", label: "Rental", match: ["/rental"] },
  { to: "/conteudo", label: "Blog", match: ["/conteudo"] },
  { to: "/quem-somos", label: "Sobre nós", match: ["/quem-somos"] },
] as const;

const MAQUINAS_OPCOES = [
  { label: "Escavadeiras", href: "/maquinas/catalogo?linha=Escavadeiras" },
  { label: "Carregadeiras", href: "/maquinas/catalogo?linha=Carregadeiras" },
  { label: "Motoniveladoras", href: "/maquinas/catalogo?linha=Motoniveladoras" },
  { label: "Trator de Esteira", href: "/maquinas/catalogo" },
  {
    label: "Caminhões",
    href: "/maquinas/catalogo?linha=Minera%C3%A7%C3%A3o%20%C2%B7%20fora%20de%20estrada",
  },
  { label: "Britadores", href: "/central/catalogo?tipo=britador" },
  { label: "Peneiras", href: "/central/catalogo?tipo=peneira" },
] as const;

const BRITAGEM_OPCOES = [{ label: "Central de Britagem", href: "/central/pecas" }] as const;

export function SiteHeader() {
  const [menuAberto, setMenuAberto] = useState(false);
  const [maquinasAberto, setMaquinasAberto] = useState(false);
  const [britagemAberto, setBritagemAberto] = useState(false);
  const [rolado, setRolado] = useState(false);
  const maquinasRef = useRef<HTMLDivElement>(null);
  const britagemRef = useRef<HTMLDivElement>(null);
  const maquinasCloseTimer = useRef<number | null>(null);
  const britagemCloseTimer = useRef<number | null>(null);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const cancelarFechamentoMaquinas = () => {
    if (maquinasCloseTimer.current === null) return;
    window.clearTimeout(maquinasCloseTimer.current);
    maquinasCloseTimer.current = null;
  };

  const agendarFechamentoMaquinas = () => {
    cancelarFechamentoMaquinas();
    maquinasCloseTimer.current = window.setTimeout(() => {
      setMaquinasAberto(false);
      maquinasCloseTimer.current = null;
    }, 550);
  };

  const cancelarFechamentoBritagem = () => {
    if (britagemCloseTimer.current === null) return;
    window.clearTimeout(britagemCloseTimer.current);
    britagemCloseTimer.current = null;
  };

  const agendarFechamentoBritagem = () => {
    cancelarFechamentoBritagem();
    britagemCloseTimer.current = window.setTimeout(() => {
      setBritagemAberto(false);
      britagemCloseTimer.current = null;
    }, 550);
  };

  useEffect(() => {
    const onScroll = () => setRolado(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMaquinasAberto(false);
    setBritagemAberto(false);
    cancelarFechamentoMaquinas();
    cancelarFechamentoBritagem();
  }, [pathname]);

  useEffect(() => {
    return () => {
      cancelarFechamentoMaquinas();
      cancelarFechamentoBritagem();
    };
  }, []);

  useEffect(() => {
    if (!maquinasAberto) return;

    const onPointerDown = (e: MouseEvent) => {
      if (!maquinasRef.current?.contains(e.target as Node)) setMaquinasAberto(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMaquinasAberto(false);
    };

    window.addEventListener("mousedown", onPointerDown);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("mousedown", onPointerDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [maquinasAberto]);

  useEffect(() => {
    if (!britagemAberto) return;

    const onPointerDown = (e: MouseEvent) => {
      if (!britagemRef.current?.contains(e.target as Node)) setBritagemAberto(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setBritagemAberto(false);
    };

    window.addEventListener("mousedown", onPointerDown);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("mousedown", onPointerDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [britagemAberto]);

  return (
    <>
      {/* Barra de urgência — onipresente, 1 clique (invariante 4) */}
      <div className="relative z-[60] bg-ap-azul-vivo text-[12px] text-white shadow-[0_1px_0_0_rgba(0,0,0,0.22),0_4px_10px_-5px_rgba(0,26,77,0.75)]">
        <div className="relative mx-auto flex max-w-6xl items-center gap-x-3 px-4 py-1">
          {/* Bloco esquerdo: canais em cima; bandeiras logo abaixo (só no mobile) */}
          <div className="flex shrink-0 flex-col gap-0.5">
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wide opacity-80">
                Canais Oficiais
              </span>
              <ul className="flex items-center gap-0.5">
                {REDES.map((r) => (
                  <li key={r.id}>
                    <a
                      href={r.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={r.nome}
                      title={r.nome}
                      className="flex h-6 w-6 items-center justify-center rounded-full text-white/85 transition-colors hover:bg-white/15 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-white lg:h-7 lg:w-7"
                    >
                      <IconeRede id={r.id} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <span className="lg:hidden">
              <BandeirasAtendimento />
            </span>
          </div>

          {/* Tagline — ao lado do bloco esquerdo no mobile; centro absoluto no desktop */}
          <a
            href={zapLink("Olá! Quero conhecer o pós-venda premium da Lopes & Lopes.")}
            target="_blank"
            rel="noopener"
            className="flex min-w-0 flex-1 items-start justify-center self-start pt-[3px] font-normal text-white hover:underline lg:absolute lg:left-1/2 lg:top-1/2 lg:w-auto lg:flex-none lg:-translate-x-1/2 lg:-translate-y-1/2 lg:items-center lg:self-auto lg:pt-0"
          >
            <TaglineDigitada />
          </a>

          {/* Países atendidos — desktop, à direita */}
          <span className="ml-auto hidden lg:block">
            <BandeirasAtendimento />
          </span>
        </div>
      </div>

      <header
        className={`sticky top-0 z-50 text-ap-azul-esc transition-all duration-300 ${
          rolado ? "bg-[#DCDCDC] shadow-[0_10px_32px_-14px_rgba(1,16,46,.35)]" : "bg-[#DCDCDC]"
        }`}
      >
        <div className="relative mx-auto flex min-h-[78px] max-w-6xl items-center gap-4 px-4 py-2 md:h-[87px] md:min-h-0 md:py-0">
          {/* Logo: centralizada no mobile, alinhada à esquerda a partir de md.
              No desktop a faixa tem altura fixa e a logo (maior) extrapola sem engordar o header. */}
          <Link
            to="/"
            className="absolute left-1/2 top-1/2 flex -translate-x-1/2 translate-y-[calc(-50%_+_4px)] items-center md:static md:left-auto md:top-auto md:translate-x-0 md:translate-y-[4px] md:-ml-1"
            aria-label="Lopes & Lopes — início"
          >
            <Logo imgClassName="h-[clamp(5.58rem,4.47rem+5.49vw,8.58rem)]" />
          </Link>

          <nav className="ml-auto flex items-center gap-0.5">
            {/* Navegação desktop — indicador âmbar sublinhado */}
            <div className="hidden items-center md:flex">
              {NAV.map((n) => {
                const on = n.match.some((m) => pathname.startsWith(m));
                if (n.to === "/maquinas") {
                  return (
                    <div
                      key={n.to}
                      ref={maquinasRef}
                      className="relative"
                      onMouseEnter={() => {
                        cancelarFechamentoMaquinas();
                        setMaquinasAberto(true);
                      }}
                      onMouseLeave={agendarFechamentoMaquinas}
                      onFocus={() => {
                        cancelarFechamentoMaquinas();
                        setMaquinasAberto(true);
                      }}
                      onBlur={(e) => {
                        if (!e.currentTarget.contains(e.relatedTarget)) setMaquinasAberto(false);
                      }}
                    >
                      <button
                        type="button"
                        aria-expanded={maquinasAberto}
                        aria-haspopup="menu"
                        className={`group relative inline-flex items-center gap-1 whitespace-nowrap px-3.5 py-2.5 text-[12.5px] font-bold uppercase tracking-[0.08em] transition-colors ${
                          on ? "text-ap-azul-esc" : "text-ap-azul-esc/55 hover:text-ap-azul-esc"
                        }`}
                      >
                        {n.label}
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2.6}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className={`h-3.5 w-3.5 transition-transform ${maquinasAberto ? "rotate-180" : ""}`}
                          aria-hidden
                        >
                          <path d="m6 9 6 6 6-6" />
                        </svg>
                        <span
                          aria-hidden
                          className={`absolute inset-x-3.5 bottom-0.5 h-0.5 rounded-full bg-ap-azul transition-all duration-300 ${
                            on || maquinasAberto
                              ? "scale-x-100 opacity-100"
                              : "scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-70"
                          }`}
                        />
                      </button>

                      {maquinasAberto && (
                        <div className="absolute left-0 top-full pt-3">
                          <div
                            role="menu"
                            className="w-64 overflow-hidden rounded-lg border border-black/10 bg-white py-2 shadow-[0_18px_48px_-18px_rgba(1,16,46,.45)]"
                          >
                            {MAQUINAS_OPCOES.map((opcao) => (
                              <a
                                key={opcao.label}
                                href={opcao.href}
                                role="menuitem"
                                className="block px-4 py-2.5 text-sm font-bold text-ap-azul-esc/75 transition-colors hover:bg-ap-azul/5 hover:text-ap-azul-esc"
                              >
                                {opcao.label}
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }
                if (n.to === "/central") {
                  return (
                    <div
                      key={n.to}
                      ref={britagemRef}
                      className="relative"
                      onMouseEnter={() => {
                        cancelarFechamentoBritagem();
                        setBritagemAberto(true);
                      }}
                      onMouseLeave={agendarFechamentoBritagem}
                      onFocus={() => {
                        cancelarFechamentoBritagem();
                        setBritagemAberto(true);
                      }}
                      onBlur={(e) => {
                        if (!e.currentTarget.contains(e.relatedTarget)) setBritagemAberto(false);
                      }}
                    >
                      <button
                        type="button"
                        aria-expanded={britagemAberto}
                        aria-haspopup="menu"
                        className={`group relative inline-flex items-center gap-1 whitespace-nowrap px-3.5 py-2.5 text-[12.5px] font-bold uppercase tracking-[0.08em] transition-colors ${
                          on ? "text-ap-azul-esc" : "text-ap-azul-esc/55 hover:text-ap-azul-esc"
                        }`}
                      >
                        {n.label}
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2.6}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className={`h-3.5 w-3.5 transition-transform ${britagemAberto ? "rotate-180" : ""}`}
                          aria-hidden
                        >
                          <path d="m6 9 6 6 6-6" />
                        </svg>
                        <span
                          aria-hidden
                          className={`absolute inset-x-3.5 bottom-0.5 h-0.5 rounded-full bg-ap-azul transition-all duration-300 ${
                            on || britagemAberto
                              ? "scale-x-100 opacity-100"
                              : "scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-70"
                          }`}
                        />
                      </button>

                      {britagemAberto && (
                        <div className="absolute left-0 top-full pt-3">
                          <div
                            role="menu"
                            className="w-64 overflow-hidden rounded-lg border border-black/10 bg-white py-2 shadow-[0_18px_48px_-18px_rgba(1,16,46,.45)]"
                          >
                            {BRITAGEM_OPCOES.map((opcao) => (
                              <a
                                key={opcao.label}
                                href={opcao.href}
                                role="menuitem"
                                className="block px-4 py-2.5 text-sm font-bold text-ap-azul-esc/75 transition-colors hover:bg-ap-azul/5 hover:text-ap-azul-esc"
                              >
                                {opcao.label}
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }
                return (
                  <Link
                    key={n.to}
                    to={n.to}
                    className={`group relative whitespace-nowrap px-3.5 py-2.5 text-[12.5px] font-bold uppercase tracking-[0.08em] transition-colors ${
                      on ? "text-ap-azul-esc" : "text-ap-azul-esc/55 hover:text-ap-azul-esc"
                    }`}
                  >
                    {n.label}
                    <span
                      aria-hidden
                      className={`absolute inset-x-3.5 bottom-0.5 h-0.5 rounded-full bg-ap-azul transition-all duration-300 ${
                        on
                          ? "scale-x-100 opacity-100"
                          : "scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-70"
                      }`}
                    />
                  </Link>
                );
              })}
            </div>
            {/* Hambúrguer mobile */}
            <button
              onClick={() => setMenuAberto(true)}
              aria-label="Abrir menu"
              aria-expanded={menuAberto}
              className="flex h-10 w-10 items-center justify-center rounded-full text-ap-azul-esc/70 transition-colors hover:bg-black/5 hover:text-ap-azul-esc md:hidden"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.6"
                strokeLinecap="round"
              >
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            </button>
          </nav>
        </div>
        <div className="h-0.5 bg-gradient-to-r from-ap-azul via-ap-azul/50 to-transparent" />
      </header>

      <MenuMobile aberto={menuAberto} aoFechar={() => setMenuAberto(false)} />
    </>
  );
}
