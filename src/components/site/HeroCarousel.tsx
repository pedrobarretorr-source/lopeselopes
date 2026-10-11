import { useCallback, useEffect, useRef, useState } from "react";
import heroImg from "@/assets/site/hero-pedreira.jpg";

interface Slide {
  /** Arte própria do slide (public/). Sem ela, usa a textura padrão da pedreira. */
  bgDesktop?: string;
  bgMobile?: string;
}

/** Slides só com arte — a copy foi removida (novo formato a definir). */
const SLIDES: Slide[] = [{}];

type Stat = { rotulo: string; alvo?: number; suf?: string; txt?: string };
const STATS: Stat[] = [
  { alvo: 400, suf: "+", rotulo: "peças em catálogo" },
  { alvo: 67, suf: "", rotulo: "modelos de britagem" },
  { alvo: 24, suf: "h", rotulo: "resposta a urgência" },
  { txt: "BR", rotulo: "estoque próprio, envio nacional" },
];

const DUR = 6500;

/** Conta de 0 até o alvo uma vez, na entrada. Respeita prefers-reduced-motion. */
function Contador({ alvo, suf }: { alvo: number; suf: string }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(alvo);
      return;
    }
    let raf = 0;
    let inicio = 0;
    const passo = (t: number) => {
      if (!inicio) inicio = t;
      const p = Math.min(1, (t - inicio) / 1100);
      setN(Math.round(alvo * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(passo);
    };
    raf = requestAnimationFrame(passo);
    return () => cancelAnimationFrame(raf);
  }, [alvo]);
  return (
    <>
      {n}
      {suf}
    </>
  );
}

/** Hero da home — carrossel de 3 posicionamentos, animado e acessível. */
export function HeroCarousel() {
  const [active, setActive] = useState(0);
  const [pausado, setPausado] = useState(false);
  const toqueX = useRef<number | null>(null);

  const irPara = useCallback((dir: 1 | -1) => {
    setActive((a) => (a + dir + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    if (pausado) return;
    const id = window.setTimeout(() => setActive((a) => (a + 1) % SLIDES.length), DUR);
    return () => window.clearTimeout(id);
  }, [active, pausado]);

  return (
    <section
      aria-roledescription="carrossel"
      aria-label="Destaques Lopes & Lopes"
      tabIndex={0}
      onMouseEnter={() => setPausado(true)}
      onMouseLeave={() => setPausado(false)}
      onFocusCapture={() => setPausado(true)}
      onBlurCapture={() => setPausado(false)}
      onTouchStart={(e) => (toqueX.current = e.touches[0]?.clientX ?? null)}
      onTouchEnd={(e) => {
        const fim = e.changedTouches[0]?.clientX;
        if (toqueX.current == null || fim == null) return;
        const dx = fim - toqueX.current;
        if (Math.abs(dx) > 40) irPara(dx < 0 ? 1 : -1);
        toqueX.current = null;
      }}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") irPara(1);
        if (e.key === "ArrowLeft") irPara(-1);
      }}
      className="relative flex aspect-[5/4] flex-col bg-ap-noite text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ap-ambar/70 md:aspect-[3/1] md:min-h-[340px]"
    >
      {/* Fundo: arte própria do slide ativo (desktop/mobile) ou textura padrão da pedreira */}
      {SLIDES[active]?.bgDesktop ? (
        <>
          <picture>
            {SLIDES[active].bgMobile && (
              <source media="(max-width: 767px)" srcSet={SLIDES[active].bgMobile} />
            )}
            <img
              src={SLIDES[active].bgDesktop}
              alt=""
              aria-hidden
              className="absolute inset-0 h-full w-full object-cover"
            />
          </picture>
        </>
      ) : (
        <>
          <img
            src={heroImg}
            alt=""
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-ap-noite via-ap-noite/85 to-ap-azul/40" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_18%,rgba(0,84,166,0.38),transparent_55%)]" />
        </>
      )}

      {/* Assinatura: sweep diagonal a cada troca — só nos slides sem arte própria */}
      {!SLIDES[active]?.bgDesktop && (
        <div
          key={`sweep-${active}`}
          aria-hidden
          className="hero-sweep pointer-events-none absolute right-[-6%] top-0 hidden h-full w-[44%] md:block"
        />
      )}

      {/* Barra de progresso do autoplay */}
      <div className="absolute inset-x-0 top-0 z-20 h-1 bg-white/10">
        <div
          key={active}
          style={{ animationDuration: `${DUR}ms` }}
          className={`hero-progress h-full bg-ap-ambar ${pausado ? "hero-progress--paused" : ""}`}
        />
      </div>

      {/* Copy dos slides removida — novo formato a definir. O h1 invisível preserva
          a semântica/SEO da página; o espaçador empurra o rodapé do hero pra base. */}
      <h1 className="sr-only">
        Lopes & Lopes — máquinas, peças e engenharia para mineração e construção
      </h1>
      <div className="flex-1" aria-hidden />

      {/* Rodapé fixo: números da marca + controles */}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-4">
        <div className="flex flex-col gap-4 border-t border-white/12 pt-4 md:flex-row md:items-center md:justify-between">
          <dl className="hidden gap-x-8 gap-y-3 sm:grid sm:grid-cols-4 md:flex md:gap-10">
            {STATS.map((s) => (
              <div key={s.rotulo}>
                <dd className="font-display text-xl text-ap-ambar md:text-2xl">
                  {s.txt ?? <Contador alvo={s.alvo!} suf={s.suf ?? ""} />}
                </dd>
                <dt className="mt-0.5 text-[10.5px] font-bold uppercase tracking-[0.14em] text-[#8FA3C4]">
                  {s.rotulo}
                </dt>
              </div>
            ))}
          </dl>

          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Slide anterior"
              onClick={() => irPara(-1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 text-white/80 transition-colors hover:border-white hover:bg-white/10 hover:text-white"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 6l-6 6 6 6" />
              </svg>
            </button>

            <div className="flex items-center gap-2" role="tablist" aria-label="Escolher slide">
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  role="tab"
                  aria-selected={i === active}
                  aria-label={`Slide ${i + 1}`}
                  onClick={() => setActive(i)}
                  className={`h-2.5 -skew-x-[22deg] rounded-[2px] transition-all duration-300 ${
                    i === active ? "w-9 bg-ap-ambar" : "w-4 bg-white/25 hover:bg-white/45"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              aria-label="Próximo slide"
              onClick={() => irPara(1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 text-white/80 transition-colors hover:border-white hover:bg-white/10 hover:text-white"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 6l6 6-6 6" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Fio âmbar de acabamento na base */}
      <div className="relative z-10 h-1 bg-ap-ambar" />
    </section>
  );
}
