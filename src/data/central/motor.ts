// Motor técnico compartilhado — mesma matemática do console/ferramenta original.
// Estimativas comerciais de partida; dimensionamento final é da XCMG (invariante 6).

import { CAT, type Modelo } from "./catalogo";
import { ROCHAS } from "./simulador";

const TAB_A: Record<number, number> = {
  1.2: 0.75,
  1.4: 0.88,
  1.6: 1.0,
  1.8: 1.13,
  2.0: 1.25,
  2.2: 1.38,
  2.4: 1.5,
};
const TAB_B: Record<number, number> = { 10: 1.15, 12: 1.1, 14: 1.0, 18: 0.9, 22: 0.8 };

function interpola(tab: Record<number, number>, x: number): number {
  const xs = Object.keys(tab)
    .map(Number)
    .sort((a, b) => a - b);
  const primeiro = xs[0]!;
  const ultimo = xs[xs.length - 1]!;
  if (x <= primeiro) return tab[primeiro]!;
  if (x >= ultimo) return tab[ultimo]!;
  for (let i = 0; i < xs.length - 1; i++) {
    const a = xs[i]!;
    const b = xs[i + 1]!;
    if (x >= a && x <= b) {
      const t = (x - a) / (b - a);
      return tab[a]! + t * (tab[b]! - tab[a]!);
    }
  }
  return 1;
}

export function fatoresPadrao(r: { dens: number; wi: number }): number {
  return interpola(TAB_A, r.dens) * interpola(TAB_B, r.wi) * 0.95 * 0.96;
}

export interface EstagioPlanejado {
  nome: string;
  entrada: number;
  saida: number;
  rr: number;
}

export function planeja(top: number, alvo: number): EstagioPlanejado[] {
  const lim = [8, 7, 5, 4];
  const nom = ["Primária", "Secundária", "Terciária", "Quaternária"];
  const out: EstagioPlanejado[] = [];
  let a = top;
  let i = 0;
  while (a > alvo && i < lim.length) {
    const rr = Math.min(lim[i]!, a / alvo);
    out.push({ nome: nom[i]!, entrada: a, saida: a / rr, rr });
    a = a / rr;
    i++;
  }
  if (!out.length) out.push({ nome: "Primária", entrada: top, saida: alvo, rr: top / alvo });
  return out;
}

function p80Cone(apf: number, e: number, wi: number): number | null {
  const den = 7 * e - 2 * apf;
  return den <= 0 ? null : (7 * apf * e * (0.02 * wi + 0.7)) / den;
}

/** Distribuição estimada (Gaudin–Schuhmann calibrada por tipo). Retorna % passante em d mm. */
export function curvaEstim(tipo: string, apf: number, wi: number): (d: number) => number {
  let p80: number;
  let n: number;
  if (tipo === "mandibula") {
    p80 = 1.3 * apf;
    n = 0.85;
  } else if (tipo === "giratorio") {
    p80 = apf * (0.04 * wi + 0.4);
    n = 0.9;
  } else if (tipo === "cone") {
    const e = Math.max(Math.ceil(0.35 * apf), Math.round(apf * 0.6) + 12);
    p80 = p80Cone(apf, e, wi) || 1.15 * apf;
    n = 1.15;
  } else {
    p80 = 0.8 * apf;
    n = 1.0;
  }
  const dmax = p80 / Math.pow(0.8, 1 / n);
  return (d: number) => (d >= dmax ? 100 : 100 * Math.pow(d / dmax, n));
}

export const FAIXAS: [string, number, number][] = [
  ["Pó de pedra", 0, 4.8],
  ["Brita 0", 4.8, 9.5],
  ["Brita 1", 9.5, 19],
  ["Brita 2", 19, 25],
  ["Brita 3", 25, 50],
  ["Acima", 50, 9999],
];

/* ===================== Resultado do simulador ===================== */

export interface RespostasSim {
  objetivo?: string;
  pedra?: string;
  volume?: number;
  bloco?: string;
  produtos?: string[];
  hoje?: string;
  trava?: string;
}

export interface LinhaItem {
  estagio: string;
  m: Modelo | null;
}

export interface ResultadoSim {
  rocha: { nome: string; wi: number; ai: number; dens: number };
  tMes: number;
  tHora: number;
  top: number;
  alvo: number;
  est: EstagioPlanejado[];
  linha: LinhaItem[];
  gargaloCat: number;
  realMin: number;
  realMax: number;
  atende: boolean;
  abras: "alta" | "media" | "baixa";
}

export function calcularLinha(r: RespostasSim): ResultadoSim {
  const rocha = (ROCHAS[r.pedra ?? "granito"] ?? ROCHAS["granito"])!;
  const tMes = (r.volume || 40) * 20 * 22;
  const tHora = tMes / (8 * 22);
  const top = parseInt(r.bloco || "700", 10);
  const alvos: Record<string, number> = {
    areia: 4.8,
    b0: 9.5,
    b1: 19,
    b2: 25,
    b3: 50,
    rachao: 76,
    gran: 32,
  };
  const alvo = Math.min(...(r.produtos?.length ? r.produtos : ["b1"]).map((p) => alvos[p] || 19));
  const est = planeja(top, alvo);
  const prod = fatoresPadrao(rocha);
  const capCat = (tHora * 1.5) / prod;
  const abras = rocha.ai >= 0.35 ? "alta" : rocha.ai < 0.1 ? "baixa" : "media";

  function pega(tipos: string[], alimNec: number, capNec: number): Modelo | null {
    for (const t of tipos) {
      const hit = CAT.filter(
        (m) =>
          m.tipo === t &&
          m.inst === "movel" &&
          m.alim >= alimNec &&
          m.capMax >= capNec &&
          m.status === "disponivel",
      ).sort((a, b) => a.capMax - capNec - (b.capMax - capNec))[0];
      if (hit) return hit;
    }
    for (const t of tipos) {
      const hit = CAT.filter(
        (m) => m.tipo === t && m.alim >= alimNec && m.capMax >= capNec && m.status === "disponivel",
      ).sort((a, b) => a.capMax - capNec - (b.capMax - capNec))[0];
      if (hit) return hit;
    }
    return null;
  }

  const linha: LinhaItem[] = [];
  est.forEach((s, i) => {
    let tipos: string[];
    if (i === 0) tipos = ["mandibula"];
    else if (s.saida < 5) tipos = ["vsi"];
    else if (abras === "baixa") tipos = ["impacto", "cone"];
    else tipos = ["cone"];
    const alimNec = i === 0 ? top : Math.ceil(est[i - 1]!.saida * 2);
    const m = pega(tipos, alimNec, i === 0 ? capCat : capCat * 0.9);
    linha.push({ estagio: s.nome, m });
  });
  for (let i = linha.length - 1; i > 0; i--) {
    const atual = linha[i]!;
    const anterior = linha[i - 1]!;
    if (atual.m && anterior.m && atual.m.id === anterior.m.id) {
      anterior.estagio = "Rebritagem";
      linha.splice(i, 1);
    }
  }
  const pen = pega(["peneira"], 0, capCat * 1.3);
  if (pen) linha.push({ estagio: "Classificação", m: pen });

  const britadores = linha.filter((l) => l.m && l.m.tipo !== "peneira");
  const gargaloCat = Math.min(...britadores.map((l) => l.m!.capMax));
  const realMax = (gargaloCat * prod) / 1.5;
  const realMin = (Math.min(...britadores.map((l) => l.m!.capMin)) * prod) / 1.5;
  const atende = realMax >= tHora;

  return { rocha, tMes, tHora, top, alvo, est, linha, gargaloCat, realMin, realMax, atende, abras };
}

/* ===================== Link compartilhável (contrato _sh:1) ===================== */

export function codificarCompartilhamento(r: RespostasSim): string {
  const payload = JSON.stringify({ ...r, _sh: 1 });
  return btoa(unescape(encodeURIComponent(payload)));
}

export function decodificarCompartilhamento(s: string): RespostasSim | null {
  try {
    const rr = JSON.parse(decodeURIComponent(escape(atob(s))));
    delete rr._sh;
    return rr as RespostasSim;
  } catch {
    return null;
  }
}
