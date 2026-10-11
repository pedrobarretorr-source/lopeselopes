import { Link } from "@tanstack/react-router";
import { Logo } from "@/components/Logo";
import { EMAIL_VENDAS, FONE_DISPLAY, zapLink } from "@/lib/ap";

const linkClass = "text-ap-azul-esc/75 transition-colors hover:text-ap-azul hover:underline";

export function SiteFooter() {
  return (
    <footer className="bg-[#DCDCDC] text-ap-azul-esc shadow-[inset_0_1px_0_0_rgba(0,0,0,0.18),inset_0_7px_12px_-8px_rgba(0,26,77,0.6)]">
      <div className="h-0.5 bg-gradient-to-r from-ap-azul via-ap-azul/50 to-transparent" />
      <div className="mx-auto grid max-w-6xl gap-x-8 gap-y-10 px-4 py-12 sm:grid-cols-2 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div>
          <Logo imgClassName="h-[clamp(2rem,1.6rem+1.2vw,3rem)]" />
          <p className="mt-4 text-sm leading-relaxed text-ap-azul-esc/75">
            Equipamentos e soluções para operações pesadas, com atendimento em todo território
            nacional.
          </p>
          <p className="mt-3 text-sm">
            <a
              href="tel:+5531995165511"
              className="font-extrabold text-ap-azul-esc hover:underline"
            >
              {FONE_DISPLAY}
            </a>
            <br />
            <a href={`mailto:${EMAIL_VENDAS}`} className={linkClass}>
              {EMAIL_VENDAS}
            </a>
          </p>
          <a
            href={zapLink(
              "Olá! Vim pelo site da Lopes & Lopes e quero falar com a equipe comercial.",
            )}
            target="_blank"
            rel="noopener"
            className="mt-4 inline-flex items-center gap-2 rounded-md bg-ap-ambar px-4 py-2.5 text-sm font-extrabold text-ap-azul-esc transition-colors hover:bg-ap-ambar-esc"
          >
            WhatsApp comercial
          </a>
        </div>

        <nav aria-label="Máquinas">
          <h4 className="mb-3 text-xs font-extrabold uppercase tracking-[0.13em] text-ap-azul-esc">
            Máquinas
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/central" className={linkClass}>
                Central de Britagem
              </Link>
            </li>
            <li>
              <Link to="/maquinas/catalogo" className={linkClass}>
                Escavadeiras
              </Link>
            </li>
            <li>
              <Link to="/maquinas/catalogo" className={linkClass}>
                Carregadeiras
              </Link>
            </li>
            <li>
              <Link to="/central/simulador" className={linkClass}>
                Simulador de linha
              </Link>
            </li>
          </ul>
        </nav>

        <nav aria-label="Peças">
          <h4 className="mb-3 text-xs font-extrabold uppercase tracking-[0.13em] text-ap-azul-esc">
            Peças
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/pecas" className={linkClass}>
                Catálogo de peças
              </Link>
            </li>
            <li>
              <Link to="/central/pecas" className={linkClass}>
                Desgaste de britagem
              </Link>
            </li>
            <li>
              <Link to="/pecas/linha-amarela" className={linkClass}>
                Linha amarela
              </Link>
            </li>
          </ul>
        </nav>

        <nav aria-label="Lopes & Lopes">
          <h4 className="mb-3 text-xs font-extrabold uppercase tracking-[0.13em] text-ap-azul-esc">
            Lopes & Lopes
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/pos-venda" className={linkClass}>
                Pós-venda Lopes & Lopes
              </Link>
            </li>
            <li>
              <Link to="/conteudo" className={linkClass}>
                Blog técnico
              </Link>
            </li>
            <li>
              <Link to="/quem-somos" className={linkClass}>
                Quem somos
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="relative z-[60] bg-ap-azul-vivo shadow-[0_-1px_0_0_rgba(0,0,0,0.22),0_-4px_10px_-5px_rgba(0,26,77,0.75)]">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-4 text-xs text-white">
          <span>Lopes & Lopes · atendimento nacional</span>
          <span className="text-white/75">
            Simulações e estimativas são ponto de partida comercial. Dimensionamento técnico é da
            XCMG.
          </span>
        </div>
      </div>
    </footer>
  );
}
