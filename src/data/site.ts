// Dados do site institucional — extraídos de ap-site-unico.html.
export interface Segmento {
  h: string;
  s: string;
}

export const SEG: Record<string, Segmento> = {
  pedreira: {
    h: "Equipamentos, peças e pós-venda planejado para a produção de agregados",
    s: "Da frente de lavra à expedição: a linha XCMG completa, peças de reposição com disponibilidade e um pós-venda que antecipa a manutenção.",
  },
  mineracao: {
    h: "Equipamentos, peças e pós-venda planejado para a sua operação de mineração",
    s: "Do desmonte ao beneficiamento: equipamentos XCMG, peças de desgaste e reposição programada pelo horímetro da sua frota.",
  },
  construcao: {
    h: "A linha amarela XCMG com pós-venda que planeja com você",
    s: "Escavadeiras, carregadeiras e motoniveladoras — com kits de manutenção programados e reposição sem imprevisto.",
  },
};

export interface Operacao {
  id: string;
  n: string;
  d: string;
  svg: string;
  central?: boolean;
}

export const OPS: Operacao[] = [
  {
    id: "britar",
    n: "Britar e classificar",
    d: "Britadores e peneiras — Central de Britagem",
    svg: "brit",
    central: true,
  },
  {
    id: "escavar",
    n: "Escavar",
    d: "Escavadeiras de 2,7 a 121 t",
    svg: "esc",
  },
  {
    id: "carregar",
    n: "Carregar",
    d: "Pás carregadeiras e minicarregadeiras",
    svg: "car",
  },
  {
    id: "nivelar",
    n: "Nivelar",
    d: "Motoniveladoras GR1803 a GR1905",
    svg: "niv",
  },
  {
    id: "compactar",
    n: "Compactar e pavimentar",
    d: "Rolos e equipamentos de pavimentação",
    svg: "rol",
  },
  {
    id: "icar",
    n: "Içar",
    d: "Guindastes de 25 a 90 t",
    svg: "gui",
  },
  {
    id: "perfurar",
    n: "Perfurar",
    d: "Perfuratrizes para desmonte e fundação",
    svg: "per",
  },
  {
    id: "movimentar",
    n: "Movimentar e elevar",
    d: "Empilhadeiras, plataformas e manipuladores",
    svg: "emp",
  },
  {
    id: "transportar",
    n: "Transportar",
    d: "Caminhões fora de estrada e elétricos",
    svg: "cam",
  },
];

export interface ModeloAmarelo {
  cod: string;
  linha: string;
  op: string;
  d: string;
  svg: string;
  ev?: boolean;
  gen?: boolean;
}

export const MODELOS: ModeloAmarelo[] = [
  {
    cod: "XE27U",
    linha: "Escavadeiras",
    op: "escavar",
    d: "Miniescavadeira · espaços restritos e acabamento",
    svg: "esc",
  },
  {
    cod: "XE55DA",
    linha: "Escavadeiras",
    op: "escavar",
    d: "Classe 5,5 t · compacta e versátil",
    svg: "esc",
  },
  {
    cod: "XE150",
    linha: "Escavadeiras",
    op: "escavar",
    d: "Classe 15 t · obra e agro",
    svg: "esc",
  },
  {
    cod: "XE215BR",
    linha: "Escavadeiras",
    op: "escavar",
    d: "Classe 21,5 t · a mais procurada da linha",
    svg: "esc",
  },
  {
    cod: "XE370BR",
    linha: "Escavadeiras",
    op: "escavar",
    d: "Classe 37 t · produção pesada",
    svg: "esc",
  },
  {
    cod: "XE380G",
    linha: "Escavadeiras",
    op: "escavar",
    d: "38,7 t · 340 hp · caçamba 2,1 m³",
    svg: "esc",
    gen: true,
  },
  {
    cod: "XE490DK",
    linha: "Escavadeiras",
    op: "escavar",
    d: "Classe 49 t · grandes movimentações",
    svg: "esc",
  },
  {
    cod: "XE1350",
    linha: "Escavadeiras",
    op: "escavar",
    d: "Classe 121 t · mineração de grande porte",
    svg: "esc",
  },
  {
    cod: "LW180KV",
    linha: "Carregadeiras",
    op: "carregar",
    d: "Compacta · pátios e ração de obra",
    svg: "car",
  },
  {
    cod: "LW300KV",
    linha: "Carregadeiras",
    op: "carregar",
    d: "3,0 t · 130 hp · caçamba 1,8 m³",
    svg: "car",
  },
  {
    cod: "LW500FV",
    linha: "Carregadeiras",
    op: "carregar",
    d: "5,0 t · carregamento pesado",
    svg: "car",
  },
  {
    cod: "LW500BRII",
    linha: "Carregadeiras",
    op: "carregar",
    d: "17.800 kg · 220 hp · caçamba 3,2 m³",
    svg: "car",
  },
  {
    cod: "XC968-EV",
    linha: "Carregadeiras",
    op: "carregar",
    d: "18,8 t · 414 hp · zero diesel",
    svg: "car",
    ev: true,
  },
  {
    cod: "XC7-SR08",
    linha: "Carregadeiras",
    op: "carregar",
    d: "Minicarregadeira · versatilidade de implementos",
    svg: "car",
  },
  {
    cod: "XC870BR-II",
    linha: "Retroescavadeiras",
    op: "escavar",
    d: "7,7 t · 98,5 hp · obra, agro e serviços",
    svg: "esc",
  },
  {
    cod: "GR1803BR",
    linha: "Motoniveladoras",
    op: "nivelar",
    d: "180 hp · estradas vicinais e praças",
    svg: "niv",
  },
  {
    cod: "GR1905BR",
    linha: "Motoniveladoras",
    op: "nivelar",
    d: "190 hp · terraplenagem e acabamento",
    svg: "niv",
  },
  {
    cod: "XS123PDBR",
    linha: "Rolos e pavimentação",
    op: "compactar",
    d: "12 t · pé de carneiro · aterros",
    svg: "rol",
  },
  {
    cod: "XMR403SVT",
    linha: "Rolos e pavimentação",
    op: "compactar",
    d: "Mini rolo combinado · vias urbanas",
    svg: "rol",
  },
  {
    cod: "QY25BR",
    linha: "Guindastes",
    op: "icar",
    d: "25 t · montagem e movimentação",
    svg: "gui",
  },
  {
    cod: "QY30BR",
    linha: "Guindastes",
    op: "icar",
    d: "30 t · lança 41 m + jib 8,3 m",
    svg: "gui",
  },
  {
    cod: "QY75BR",
    linha: "Guindastes",
    op: "icar",
    d: "75 t · lança 45 m + jib 16 m",
    svg: "gui",
  },
  {
    cod: "QY90BR",
    linha: "Guindastes",
    op: "icar",
    d: "90 t · lança 47 m + jib 17,5 m",
    svg: "gui",
  },
  {
    cod: "Linha de perfuratrizes",
    linha: "Perfuratrizes",
    op: "perfurar",
    d: "Desmonte de rocha e fundações · sob consulta",
    svg: "per",
    gen: true,
  },
  {
    cod: "XCF35KT",
    linha: "Empilhadeiras",
    op: "movimentar",
    d: "3,5 t · logística e indústria",
    svg: "emp",
  },
  {
    cod: "XGA16E",
    linha: "Plataformas e manipuladores",
    op: "movimentar",
    d: "Plataforma articulada 16 m",
    svg: "emp",
  },
  {
    cod: "XT4018K",
    linha: "Plataformas e manipuladores",
    op: "movimentar",
    d: "Manipulador telescópico · agro e obra",
    svg: "emp",
  },
  {
    cod: "XDR100",
    linha: "Mineração · fora de estrada",
    op: "transportar",
    d: "Caminhão rígido · transporte de mina",
    svg: "cam",
  },
  {
    cod: "XDE130",
    linha: "Mineração · fora de estrada",
    op: "transportar",
    d: "Caminhão elétrico-diesel · alta capacidade",
    svg: "cam",
  },
  {
    cod: "XGE95",
    linha: "Mineração · fora de estrada",
    op: "transportar",
    d: "Caminhão de mineração 100% elétrico · 95.000 kg · 43 km",
    svg: "cam",
    ev: true,
  },
  {
    cod: "E729R",
    linha: "Mineração · fora de estrada",
    op: "transportar",
    d: "Caminhão pipa 100% elétrico",
    svg: "cam",
    ev: true,
  },
];

export const SVGS: Record<string, string> = {
  esc: '<path d="M3 18h12l3 3H3zM5 18v-4h6v4M11 14l5-7 4 2-4 6M16 7l-2-3"/>',
  car: '<path d="M3 19h14M4 19v-5h8v5M12 14l6-2v7M18 12l3 1M6 14V9h4v5"/>',
  niv: '<path d="M2 18h20M5 18v-3h9v3M8 15l6-6M14 9h5l2 4"/>',
  rol: '<circle cx="7" cy="16" r="4"/><path d="M11 16h9l1-5-6-4-5 3"/>',
  gui: '<path d="M4 20h16M7 20V8l10-5M17 3v9M17 12l-3 2M14 8l3 4"/>',
  brit: '<path d="M4 20h16M6 20v-8l6-7 6 7v8M9 12l3 3 3-3M12 15v5"/>',
  per: '<path d="M6 20h12M12 20V8M12 8l-4-4M12 8l4-4M9 12h6M9 16h6"/>',
  emp: '<path d="M4 20h10M5 20v-7h6v7M11 13l5 1v6M16 6v8M16 6h3v4"/>',
  cam: '<path d="M2 17h13v-7H2zM15 12h4l3 3v2h-7M5 17a2 2 0 1 0 .1 0M17 17a2 2 0 1 0 .1 0"/>',
};
