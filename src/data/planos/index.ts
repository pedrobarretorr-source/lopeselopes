// Índice leve das famílias do plano de manutenção de fábrica.
// Os dados de cada família são carregados sob demanda via import() dinâmico.

export interface ItemPlano {
  /** Grupo: Motor, Hidráulico, Ar condicionado… */
  g: string;
  /** Descrição do item (ex.: "Filtro de óleo LF3970") */
  d: string;
  /** Código da peça */
  c: string;
  /** Códigos substitutos */
  s: string[];
  /** Quantidade por troca */
  q: number;
  /** Intervalos (horas) em que o item é trocado: [100,500,1000,1500,2000] */
  t: number[];
  /** Quantidade de trocas acumuladas até 1.000h (quando informado) */
  t1?: number;
  /** Quantidade de trocas acumuladas até 2.000h (quando informado) */
  t2?: number;
}

export interface ModeloPlano {
  /** Nome do modelo conforme fábrica (ex.: "XE215DA QSB7 - LATAM") */
  n: string;
  /** Intervalos disponíveis na tabela do modelo (vazio = kit de referência) */
  ints: number[];
  itens: ItemPlano[];
}

export interface FamiliaPlano {
  slug: string;
  nome: string;
  /** Chave de ícone em SVGS (site.ts) */
  icone: string;
  total: number;
}

export const FAMILIAS: FamiliaPlano[] = [
  { slug: "escavadeira", nome: "Escavadeiras", icone: "esc", total: 27 },
  { slug: "carregadeira", nome: "Carregadeiras", icone: "car", total: 24 },
  { slug: "retroescavadeira", nome: "Retroescavadeiras", icone: "esc", total: 6 },
  { slug: "motoniveladora", nome: "Motoniveladoras", icone: "niv", total: 5 },
  { slug: "rolo", nome: "Rolos compactadores", icone: "rol", total: 7 },
  { slug: "plataforma", nome: "Plataformas elevatórias", icone: "emp", total: 11 },
  { slug: "empilhadeira", nome: "Empilhadeiras", icone: "emp", total: 18 },
  { slug: "manipulador", nome: "Manipuladores telescópicos", icone: "emp", total: 5 },
  { slug: "trator", nome: "Tratores", icone: "cam", total: 6 },
  { slug: "reach-stacker", nome: "Reach stackers", icone: "emp", total: 1 },
  { slug: "fresadora", nome: "Fresadoras", icone: "rol", total: 2 },
  { slug: "guindaste", nome: "Guindastes", icone: "gui", total: 8 },
  { slug: "caminhao", nome: "Caminhões", icone: "cam", total: 9 },
  { slug: "pavimentadora", nome: "Pavimentadoras", icone: "rol", total: 1 },
  { slug: "recicladora", nome: "Recicladoras", icone: "rol", total: 2 },
  { slug: "antigas", nome: "Gerações anteriores", icone: "esc", total: 21 },
];

/** Intervalos-padrão exibidos no seletor (quando o modelo tem tabela por horas). */
export const INTERVALOS_PADRAO = [100, 500, 1000, 1500, 2000] as const;

export const fmtHoras = (h: number): string => `${h.toLocaleString("pt-BR")}h`;

/** Carrega os modelos de uma família sob demanda (chunk separado por família). */
export function carregarFamilia(slug: string): Promise<{ MODELOS: ModeloPlano[] }> {
  switch (slug) {
    case "escavadeira":
      return import("./escavadeira");
    case "carregadeira":
      return import("./carregadeira");
    case "retroescavadeira":
      return import("./retroescavadeira");
    case "motoniveladora":
      return import("./motoniveladora");
    case "rolo":
      return import("./rolo");
    case "plataforma":
      return import("./plataforma");
    case "empilhadeira":
      return import("./empilhadeira");
    case "manipulador":
      return import("./manipulador");
    case "trator":
      return import("./trator");
    case "reach-stacker":
      return import("./reach-stacker");
    case "fresadora":
      return import("./fresadora");
    case "guindaste":
      return import("./guindaste");
    case "caminhao":
      return import("./caminhao");
    case "pavimentadora":
      return import("./pavimentadora");
    case "recicladora":
      return import("./recicladora");
    case "antigas":
      return import("./antigas");
    default:
      return Promise.resolve({ MODELOS: [] });
  }
}

/** Itens do kit para um intervalo específico. */
export function itensDoIntervalo(modelo: ModeloPlano, horas: number): ItemPlano[] {
  return modelo.itens.filter((it) => it.t.includes(horas));
}

/** Itens do kit completo até 2.000h, com quantidade acumulada (t2) quando informada. */
export function itensKitCompleto(modelo: ModeloPlano): { item: ItemPlano; qtdTotal: number }[] {
  return modelo.itens.map((item) => ({
    item,
    qtdTotal: item.t2 && item.t2 > 0 ? item.t2 * item.q : item.q,
  }));
}
