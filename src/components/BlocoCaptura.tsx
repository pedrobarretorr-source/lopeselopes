import { zapLink } from "@/lib/ap";
import { LeadForm } from "@/components/LeadForm";

interface Props {
  titulo?: string;
  sub?: string;
  origem: string;
  textoZap?: string;
  rotuloCta?: string;
  escuro?: boolean;
}

/** Captura dupla: botão WhatsApp direto + formulário que grava no banco (invariante 3). */
export function BlocoCaptura({
  titulo = "Fale com a Lopes & Lopes",
  sub,
  origem,
  textoZap,
  rotuloCta,
  escuro,
}: Props) {
  return (
    <section
      className={`corte-b mx-auto my-12 max-w-6xl px-4 ${escuro ? "" : ""}`}
      aria-label="Contato comercial"
    >
      <div className={`rounded-2xl p-6 md:p-10 ${escuro ? "bg-ap-azul-esc" : "bg-ap-azul-claro"}`}>
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div>
            <h2
              className={`text-2xl font-black leading-tight md:text-3xl ${escuro ? "text-white" : "text-ap-azul-esc"}`}
            >
              {titulo}
            </h2>
            {sub && (
              <p
                className={`mt-2 text-sm leading-relaxed ${escuro ? "text-[#B7C8E5]" : "text-ap-fraco"}`}
              >
                {sub}
              </p>
            )}
            <a
              href={zapLink(
                textoZap ??
                  "Olá! Vim pelo site da Lopes & Lopes e quero falar com a equipe comercial.",
              )}
              target="_blank"
              rel="noopener"
              className="mt-5 inline-flex items-center gap-2 rounded-md bg-ap-ambar px-5 py-3 text-sm font-extrabold text-ap-azul-esc transition-colors hover:bg-ap-ambar-esc"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M12 2a10 10 0 0 0-8.7 15L2 22l5.2-1.3A10 10 0 1 0 12 2Zm5.5 14.2c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.1-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.4l.9 2.1c.1.2.1.4 0 .6l-.4.6-.5.5c-.1.1-.2.3-.1.5.1.3.7 1.2 1.6 2 1.1 1 2 1.3 2.3 1.4.3.2.4.1.6-.1l.9-1c.2-.3.4-.2.7-.1l2 1c.3.1.5.2.6.4 0 .1 0 .7-.2 1.3Z" />
              </svg>
              Prefiro WhatsApp direto
            </a>
            <p className={`mt-3 text-xs ${escuro ? "text-[#B7C8E5]/70" : "text-ap-fraco"}`}>
              Resposta rápida em horário comercial.
            </p>
          </div>
          <div className="rounded-xl bg-white p-5 shadow-lg md:p-6">
            <LeadForm
              origem={origem}
              compacto
              {...(rotuloCta ? { rotuloCta } : {})}
              {...(textoZap ? { textoZap } : {})}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
