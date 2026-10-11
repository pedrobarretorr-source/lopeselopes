import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const LeadSchema = z.object({
  nome: z.string().trim().min(2, "Informe seu nome").max(120),
  empresa: z.string().trim().min(2, "Informe a empresa").max(160),
  telefone: z.string().trim().min(8, "Telefone inválido").max(20),
  email: z.string().trim().email("E-mail inválido").max(160).optional().or(z.literal("")),
  cnpj: z.string().trim().max(18).optional().or(z.literal("")),
  mensagem: z.string().trim().max(2000).optional(),
  origem: z.string().trim().max(60).default("site"),
  pagina: z.string().trim().max(300).optional(),
  simulacao: z.record(z.string(), z.unknown()).optional(),
  lgpd_aceite: z.literal(true, { message: "É preciso aceitar o uso dos dados para contato" }),
  // honeypot anti-spam — sempre deve vir vazio
  website: z.string().max(0).optional(),
});

export const submitLead = createServerFn({ method: "POST" })
  .validator((input: unknown) => LeadSchema.parse(input))
  .handler(async ({ data }) => {
    if (data.website) return { ok: true }; // bot: finge sucesso sem gravar

    const { createClient } = await import("@supabase/supabase-js");
    const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
    const supabase = createClient(process.env["SUPABASE_URL"]!, key, {
      auth: { persistSession: false },
      global: {
        fetch: (input, init) => {
          const h = new Headers(init?.headers);
          if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`)
            h.delete("Authorization");
          h.set("apikey", key);
          return fetch(input, { ...init, headers: h });
        },
      },
    });

    const { website: _hp, ...lead } = data;
    const { error } = await supabase.from("leads").insert({
      ...lead,
      email: lead.email || null,
      cnpj: lead.cnpj || null,
      simulacao: lead.simulacao ?? null,
    });
    if (error) {
      console.error("submitLead:", error);
      throw new Error("Não conseguimos registrar seu contato. Tente pelo WhatsApp.");
    }
    return { ok: true };
  });
