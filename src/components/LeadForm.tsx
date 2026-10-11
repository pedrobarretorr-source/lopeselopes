import { useState } from "react";
import { toast } from "sonner";
import { useServerFn } from "@tanstack/react-start";
import { submitLead } from "@/lib/leads.functions";
import { validaCNPJ, zapLink } from "@/lib/ap";

interface Props {
  origem: string;
  rotuloCta?: string;
  simulacao?: Record<string, unknown>;
  mensagemPadrao?: string;
  textoZap?: string;
  compacto?: boolean;
  tituloOk?: string;
  onSucesso?: (lead: { nome: string; empresa: string; telefone: string }) => void;
}

const inputCls =
  "w-full rounded-lg border-2 border-border bg-white px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-ap-azul";

export function LeadForm({
  origem,
  rotuloCta = "Solicitar proposta",
  simulacao,
  mensagemPadrao,
  textoZap,
  compacto,
  onSucesso,
}: Props) {
  const enviar = useServerFn(submitLead);
  const [nome, setNome] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [mensagem, setMensagem] = useState(mensagemPadrao ?? "");
  const [lgpd, setLgpd] = useState(false);
  const [hp, setHp] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [ok, setOk] = useState(false);

  async function aoEnviar(e: React.FormEvent) {
    e.preventDefault();
    if (!validaCNPJ(cnpj)) {
      toast.error("CNPJ inválido — revise ou deixe em branco.");
      return;
    }
    setEnviando(true);
    try {
      await enviar({
        data: {
          nome,
          empresa,
          telefone,
          email: email || undefined,
          cnpj: cnpj || undefined,
          mensagem: mensagem || undefined,
          origem,
          pagina: window.location.pathname,
          simulacao,
          lgpd_aceite: lgpd,
          website: hp,
        },
      });
      setOk(true);
      toast.success("Recebido! Nossa equipe comercial entra em contato.");
      onSucesso?.({ nome, empresa, telefone });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro ao enviar. Tente pelo WhatsApp.");
    } finally {
      setEnviando(false);
    }
  }

  if (ok) {
    return (
      <div className="rounded-xl border-2 border-ap-ok/40 bg-ap-ok/10 p-5 text-center">
        <p className="text-base font-extrabold text-ap-azul-esc">
          Recebemos seu contato, {nome.split(" ")[0]}.
        </p>
        <p className="mt-1 text-sm text-ap-fraco">
          A equipe comercial retorna em horário comercial. Se for urgente:
        </p>
        <a
          href={zapLink(
            textoZap ??
              `Olá! Sou ${nome}, da ${empresa}. Acabei de enviar meus dados pelo site e gostaria de agilizar.`,
          )}
          target="_blank"
          rel="noopener"
          className="mt-3 inline-flex items-center gap-2 rounded-md bg-ap-ambar px-4 py-2.5 text-sm font-extrabold text-ap-azul-esc transition-colors hover:bg-ap-ambar-esc"
        >
          Chamar no WhatsApp
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={aoEnviar} className={compacto ? "space-y-2.5" : "space-y-3"}>
      {/* honeypot */}
      <input
        type="text"
        value={hp}
        onChange={(e) => setHp(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />
      <div className={compacto ? "grid gap-2.5" : "grid gap-3 sm:grid-cols-2"}>
        <input
          required
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Seu nome *"
          className={inputCls}
          aria-label="Nome"
        />
        <input
          required
          value={empresa}
          onChange={(e) => setEmpresa(e.target.value)}
          placeholder="Empresa *"
          className={inputCls}
          aria-label="Empresa"
        />
        <input
          required
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
          placeholder="Telefone / WhatsApp *"
          className={inputCls}
          aria-label="Telefone"
          type="tel"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail"
          className={inputCls}
          aria-label="E-mail"
          type="email"
        />
        <input
          value={cnpj}
          onChange={(e) => setCnpj(e.target.value)}
          placeholder="CNPJ (opcional)"
          className={inputCls}
          aria-label="CNPJ (opcional)"
        />
      </div>
      {!compacto && (
        <textarea
          value={mensagem}
          onChange={(e) => setMensagem(e.target.value)}
          placeholder="Descreva sua necessidade (opcional)"
          rows={3}
          className={inputCls}
          aria-label="Mensagem"
        />
      )}
      <label className="flex items-start gap-2 text-xs leading-relaxed text-ap-fraco">
        <input
          type="checkbox"
          checked={lgpd}
          onChange={(e) => setLgpd(e.target.checked)}
          required
          className="mt-0.5"
        />
        Autorizo a Lopes & Lopes a usar meus dados para contato comercial, conforme a LGPD.
      </label>
      <button
        type="submit"
        disabled={enviando}
        className="w-full rounded-md bg-ap-azul px-5 py-3 text-sm font-extrabold uppercase tracking-wide text-white transition-colors hover:bg-ap-azul-med disabled:opacity-60"
      >
        {enviando ? "Enviando…" : rotuloCta}
      </button>
    </form>
  );
}
