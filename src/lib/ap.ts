// Utilitários compartilhados da plataforma Lopes & Lopes.

export const ZAP = "5531995165511";
export const FONE_DISPLAY = "(31) 99516-5511";
export const EMAIL_VENDAS = "vendas@apmmaq.com.br";

export function zapLink(texto: string): string {
  return `https://wa.me/${ZAP}?text=${encodeURIComponent(texto)}`;
}

/**
 * Canais oficiais nas redes sociais — fonte única da verdade.
 * TODO: substituir as URLs pelos perfis reais da Lopes & Lopes.
 */
export const REDES = [
  { id: "instagram", nome: "Instagram", url: "https://instagram.com/apmmaq" },
  { id: "linkedin", nome: "LinkedIn", url: "https://www.linkedin.com/company/apmmaq" },
  { id: "facebook", nome: "Facebook", url: "https://facebook.com/apmmaq" },
] as const;

export const fmt = (v: number, d = 0): string =>
  (isFinite(v) ? v : 0).toLocaleString("pt-BR", {
    minimumFractionDigits: d,
    maximumFractionDigits: d,
  });

export const norm = (s: string): string =>
  (s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

/** slug de URL de um modelo de máquina: "XE215BR" → "xe215br" */
export const slugModelo = (cod: string): string =>
  norm(cod)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

/** Validação de CNPJ com dígito verificador (opcional: vazio é válido). */
export function validaCNPJ(c: string): boolean {
  c = (c || "").replace(/\D/g, "");
  if (!c) return true;
  if (c.length !== 14 || /^(\d)\1+$/.test(c)) return false;
  const calc = (n: number) => {
    let s = 0;
    let p = n - 7;
    for (let i = n; i >= 1; i--) {
      s += Number(c[n - i]) * p--;
      if (p < 2) p = 9;
    }
    const r = s % 11;
    return r < 2 ? 0 : 11 - r;
  };
  return calc(12) === Number(c[12]) && calc(13) === Number(c[13]);
}
