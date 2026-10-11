import { useRouterState } from "@tanstack/react-router";
import { zapLink } from "@/lib/ap";

/**
 * Botão flutuante de WhatsApp — presente em todas as páginas.
 * A mensagem muda conforme a seção do site (contexto melhora conversão).
 */
const MENSAGENS: Array<{ prefixo: string; texto: string }> = [
  {
    prefixo: "/central/simulador",
    texto: "Olá! Estou fazendo o simulador de britagem e quero ajuda.",
  },
  {
    prefixo: "/central",
    texto: "Olá! Estou na Central de Britagem e quero falar com um especialista.",
  },
  { prefixo: "/pecas", texto: "Olá! Estou procurando peças e quero uma cotação." },
  { prefixo: "/maquinas", texto: "Olá! Quero cotar uma máquina XCMG." },
  { prefixo: "/pos-venda", texto: "Olá! Preciso de suporte/pós-venda." },
  { prefixo: "/conteudo", texto: "Olá! Li um artigo do blog e quero falar com a Lopes & Lopes." },
];

export function ZapFlutuante() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const msg =
    MENSAGENS.find((m) => pathname.startsWith(m.prefixo))?.texto ??
    "Olá! Vim pelo site da Lopes & Lopes e quero atendimento.";

  return (
    <a
      href={zapLink(msg)}
      target="_blank"
      rel="noopener"
      aria-label="Falar no WhatsApp agora"
      className="group fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-[#25D366] py-3 pl-3.5 pr-4 text-white shadow-[0_8px_24px_rgba(1,16,46,.35)] transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ap-azul print:hidden"
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M12.04 2a9.9 9.9 0 0 0-8.4 15.15L2 22l4.97-1.58A9.9 9.9 0 1 0 12.04 2Zm5.8 14.06c-.24.68-1.4 1.3-1.94 1.35-.5.05-1.13.24-3.8-.8-3.2-1.26-5.23-4.53-5.39-4.74-.16-.21-1.3-1.72-1.3-3.29 0-1.57.82-2.34 1.11-2.66.29-.32.63-.4.85-.4h.61c.2 0 .46-.07.72.55.27.63.9 2.18.98 2.34.08.16.13.35.02.56-.1.21-.16.34-.32.53-.16.19-.34.42-.48.56-.16.16-.33.34-.14.66.19.32.83 1.37 1.78 2.22 1.23 1.1 2.26 1.44 2.58 1.6.32.16.5.14.69-.08.19-.21.79-.92 1-1.24.21-.32.42-.26.71-.16.29.11 1.85.87 2.17 1.03.32.16.53.24.61.37.08.14.08.79-.16 1.47Z" />
      </svg>
      <span className="hidden text-[13px] font-extrabold sm:inline">Falar agora</span>
    </a>
  );
}
