// ============================================================================
// FOTOS REAIS DOS MODELOS — registro manual
// ============================================================================
// Como adicionar a foto real de um modelo:
//
//   1. Envie a foto no chat dizendo o modelo (ex.: "foto do XGY1100")
//      ou suba o arquivo para a pasta de assets do projeto.
//   2. A foto entra neste mapa com a chave = id do modelo (minúsculo):
//      - Central de Britagem: mesmo id de src/data/central/catalogo.ts
//        (ex.: "xgy1100");
//      - Linha amarela (máquinas): slug do modelo, ex.: "xe215br",
//        "xc968-ev" (ver slugModelo em src/data/maquinas-detalhes.ts).
//
// Prioridade de exibição em TODOS os cards e páginas de modelo:
//   FOTOS[id]  →  foto real que você enviou (sempre vence)
//   IMG[id-hero|id-unit]  →  imagem original do catálogo (Central)
//   IMG[img da família]  →  capa da família (fallback, nunca fica sem imagem)
//
// Exemplo de entrada (quando houver foto):
//   import xgy1100 from "@/assets/fotos/xgy1100.jpg.asset.json";
//   export const FOTOS: Record<string, string> = { xgy1100: xgy1100.url };
// ============================================================================

export const FOTOS: Record<string, string> = {
  xe215br: "/maquinas/xe215br.jpg",
  xe380g: "/maquinas/escavadeiras/xe380g.jpg",
  xge95: "/maquinas/eletricos/xge95.jpeg",
  lw500brii: "/maquinas/carregadeiras/lw500brii.jpeg",
};

/** Foto real do modelo, se você já enviou. Caso contrário, null. */
export const fotoReal = (id: string): string | null => FOTOS[id] ?? null;
