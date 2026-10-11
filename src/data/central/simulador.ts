// Perguntas do simulador e presets de rocha — extraídos do template da Central.
export interface Rocha {
  nome: string;
  wi: number;
  ai: number;
  dens: number;
}

export const ROCHAS: Record<string, Rocha> = {
  granito: {
    nome: "Granito / gnaisse",
    wi: 15.5,
    ai: 0.5,
    dens: 1.6,
  },
  basalto: {
    nome: "Basalto",
    wi: 13,
    ai: 0.25,
    dens: 1.75,
  },
  calcario: {
    nome: "Calcário / dolomito",
    wi: 10.5,
    ai: 0.04,
    dens: 1.52,
  },
  seixo: {
    nome: "Seixo rolado",
    wi: 12,
    ai: 0.3,
    dens: 1.7,
  },
  ferro: {
    nome: "Minério de ferro",
    wi: 13,
    ai: 0.36,
    dens: 2.15,
  },
  rcd: {
    nome: "Concreto / entulho",
    wi: 9,
    ai: 0.05,
    dens: 1.35,
  },
};

export interface PassoOpcao {
  val: string;
  t: string;
  d: string;
}
export interface Passo {
  id: string;
  titulo: string;
  tipo: "um" | "multi" | "volume";
  ops?: [string, string, string][];
}

export const PASSOS: Passo[] = [
  {
    id: "objetivo",
    titulo: "O que você quer resolver?",
    tipo: "um",
    ops: [
      ["nova", "Montar uma planta nova", "Vou começar a britar"],
      ["mais", "Produzir mais", "A linha atual não dá conta"],
      ["produto", "Vender um produto novo", "Brita 0, areia, produto que falta"],
      ["trocar", "Substituir equipamento", "Máquina velha ou parada"],
    ],
  },
  {
    id: "pedra",
    titulo: "Que rocha você processa?",
    tipo: "um",
    ops: [
      ["granito", "Granito / gnaisse", "Dura, risca vidro — a mais comum no Brasil"],
      ["basalto", "Basalto", "Escura e pesada"],
      ["calcario", "Calcário / dolomito", "Clara, risca com canivete"],
      ["seixo", "Seixo rolado", "Pedra de rio, arredondada"],
      ["ferro", "Minério de ferro", "Itabirito, hematita"],
      ["rcd", "Concreto / entulho", "Reciclagem de demolição"],
    ],
  },
  {
    id: "volume",
    titulo: "Quanto você precisa produzir?",
    tipo: "volume",
  },
  {
    id: "bloco",
    titulo: "Qual o tamanho do maior bloco que chega?",
    tipo: "um",
    ops: [
      ["300", "Até uma bola de futebol", "~300 mm — material pré-reduzido"],
      ["500", "Até meio metro", "~500 mm"],
      ["700", "Até uma mesa de centro", "~700 mm — desmonte típico"],
      ["1000", "Blocos grandes", "~1.000 mm — desmonte grosso"],
    ],
  },
  {
    id: "produtos",
    titulo: "O que você quer vender?",
    tipo: "multi",
    ops: [
      ["rachao", "Rachão / bica corrida", "Base e aterro"],
      ["b3", "Brita 3", "Lastro e drenagem"],
      ["b2", "Brita 2", "Concreto pesado"],
      ["b1", "Brita 1", "A mais vendida — concreto"],
      ["b0", "Brita 0", "Pré-moldados e blocos"],
      ["areia", "Pó / areia de brita", "Asfalto e argamassa"],
      ["gran", "Minério classificado", "Granulado para beneficiamento"],
    ],
  },
  {
    id: "hoje",
    titulo: "O que você tem hoje?",
    tipo: "um",
    ops: [
      ["nada", "Nada ainda", "Planta nova do zero"],
      ["prim", "Só o primário", "Vendo bica corrida"],
      ["linha", "Linha completa", "Primário, rebritagem e peneira"],
      ["parada", "Linha antiga", "Equipamento no fim da vida"],
    ],
  },
  {
    id: "trava",
    titulo: "Onde a produção trava hoje?",
    tipo: "um",
    ops: [
      ["alim", "Na alimentação", "Britador espera material"],
      ["brit", "No britador", "Engasga ou não vence"],
      ["pen", "Na peneira", "Afoga, contamina produto"],
      ["patio", "No pátio", "Produz mas não expede"],
      ["nao", "Não sei dizer", "Quero descobrir"],
    ],
  },
] as unknown as Passo[];
