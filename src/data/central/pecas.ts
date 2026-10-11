// Peças, kits e sistemas — extraído de extras.json.
export interface ItemPeca {
  nome: string;
  funcao: string;
  troca: string;
  mat?: string;
}
export interface SistemaPecas {
  id: string;
  nome: string;
  aplica: string;
  img: string;
  intro: string;
  itens: ItemPeca[];
}
export interface Kit {
  id: string;
  nome: string;
  para: string[];
  itens: string[];
  quando: string;
}

export const SISTEMAS: SistemaPecas[] = [
  {
    id: "mandibula",
    nome: "Mandíbulas",
    aplica: "Linhas XPE (móvel) e XGE (fixa)",
    img: "peca-mandibula",
    intro:
      "O primário trabalha com o material mais bruto da planta — e as mandíbulas são o item de desgaste que dita o ritmo de manutenção.",
    itens: [
      {
        nome: "Mandíbula fixa e móvel",
        funcao: "O par que quebra a pedra por compressão",
        troca:
          "Perfil arredondado nos dentes, produto lamelar, capacidade caindo com a mesma regulagem",
        mat: "Aço alto manganês Mn14Cr2 a Mn22Cr2 — encrua com o trabalho",
      },
      {
        nome: "Cunhas e placas laterais",
        funcao: "Protegem a carcaça e travam o conjunto",
        troca: "Folga entre mandíbula e carcaça, desgaste visível nas bordas",
        mat: "Aço antidesgaste",
      },
      {
        nome: "Placa de articulação (toggle)",
        funcao: "Transmite o movimento e é o fusível mecânico do britador",
        troca: "Trincas, deformação ou após entrada de inquebrável",
        mat: "Ferro fundido calibrado",
      },
      {
        nome: "Molas e tirantes",
        funcao: "Mantêm a tensão do sistema de articulação",
        troca: "Perda de tensão, batidas no retorno da mandíbula",
        mat: "Aço mola",
      },
    ],
  },
  {
    id: "cone",
    nome: "Cônicos",
    aplica: "Linhas XPY (móvel) e XGY (fixa)",
    img: "peca-cone",
    intro:
      "Manto e côncavo formam a câmara de britagem — quando o perfil se perde, o produto sai lamelar e a carga circulante dispara.",
    itens: [
      {
        nome: "Manto",
        funcao: "Superfície móvel de britagem, montada sobre a cabeça do cone",
        troca: "Amperagem instável, produto fora de forma, queda de admissão de material",
        mat: "Aço manganês; ligas com cromo ou insertos TiC para rocha muito abrasiva",
      },
      {
        nome: "Côncavo (revestimento do bojo)",
        funcao: "Superfície fixa contra a qual a rocha é comprimida",
        troca: "Sempre avaliado em par com o manto — perfis descasados desgastam em faixas",
        mat: "Aço manganês Mn18Cr2/Mn22Cr2",
      },
      {
        nome: "Buchas e vedações",
        funcao: "Guiam o movimento excêntrico e protegem a lubrificação",
        troca: "Temperatura de óleo subindo, folga axial, contaminação",
        mat: "Bronze / elastômeros",
      },
      {
        nome: "Placa distribuidora de alimentação",
        funcao: "Distribui o material na câmara para desgaste uniforme",
        troca: "Alimentação segregada, desgaste concentrado num lado da câmara",
        mat: "Aço antidesgaste",
      },
    ],
  },
  {
    id: "impacto",
    nome: "Impacto",
    aplica: "Linhas XPF (móvel) e XGF (fixa)",
    img: "peca-martelo",
    intro:
      "No impacto, as barras são consumíveis de giro rápido — em rocha certa (calcário, RCD) o custo compensa; em rocha abrasiva, não.",
    itens: [
      {
        nome: "Barras de impacto",
        funcao: "Arremessam a pedra contra as placas — o coração da máquina",
        troca: "Desgaste até a marca mínima do fabricante; barras gastas desbalanceiam o rotor",
        mat: "Cromo fundido, manganês ou cerâmica conforme abrasividade",
      },
      {
        nome: "Placas de choque (cortinas)",
        funcao: "Superfície de quebra e controle da granulometria",
        troca: "Perda de perfil, aumento do topo do produto",
        mat: "Aço manganês",
      },
      {
        nome: "Revestimentos laterais da câmara",
        funcao: "Protegem a carcaça",
        troca: "Espessura mínima atingida",
        mat: "Aço antidesgaste",
      },
      {
        nome: "Discos e proteção do rotor",
        funcao: "Estrutura que carrega as barras",
        troca: "Inspeção a cada troca de barras — trinca é parada imediata",
        mat: "Aço estrutural blindado",
      },
    ],
  },
  {
    id: "vsi",
    nome: "VSI — eixo vertical",
    aplica: "Linhas XPL (móvel) e XGL (fixa)",
    img: "fam-vsi-fixo",
    intro:
      "O VSI quebra pedra com pedra — as sapatas do rotor e a blindagem são o consumo principal, e o acerto delas define a qualidade da areia.",
    itens: [
      {
        nome: "Sapatas / pontas do rotor",
        funcao: "Aceleram o material dentro do rotor",
        troca: "Giro programado por horas; sapata gasta vibra e derruba a produção de areia",
        mat: "Carbeto de tungstênio",
      },
      {
        nome: "Placas de desgaste do rotor",
        funcao: "Protegem o corpo do rotor",
        troca: "Junto com as sapatas, em inspeção de rotina",
        mat: "Liga antidesgaste",
      },
      {
        nome: "Blindagem da câmara",
        funcao: "Forma o leito de pedra que recebe o impacto",
        troca: "Quando o leito não se forma mais de modo uniforme",
        mat: "Aço antidesgaste",
      },
      {
        nome: "Distribuidor de alimentação",
        funcao: "Centraliza a entrada no rotor",
        troca: "Alimentação descentrada acelera o desgaste de um lado",
        mat: "Liga antidesgaste",
      },
    ],
  },
  {
    id: "peneira",
    nome: "Peneiras",
    aplica: "Linhas XFY/XFT (móvel), 2XSY/XSX/XST (fixa)",
    img: "fam-peneira-circular",
    intro:
      "A tela é a peça mais barata que mais derruba produção quando falha: tela cega ou furada muda a carga circulante da planta inteira — na pedreira ou na usina de minério.",
    itens: [
      {
        nome: "Telas de aço e poliuretano",
        funcao: "Fazem o corte de cada produto",
        troca:
          "Furo alargado contamina o produto; obstrução (cegamento) derruba a eficiência e sobrecarrega o britador",
        mat: "Aço de alto carbono / PU modular",
      },
      {
        nome: "Borrachas de vedação e canaletas",
        funcao: "Vedam o contato tela-estrutura",
        troca: "Vazamento de finos fora de rota",
        mat: "Borracha",
      },
      {
        nome: "Molas e coxins",
        funcao: "Isolam a vibração da estrutura",
        troca: "Amplitude irregular, trepidação na estrutura",
        mat: "Aço mola / borracha",
      },
      {
        nome: "Excitadores e rolamentos",
        funcao: "Geram o movimento vibratório",
        troca: "Ruído, aquecimento — manutenção preditiva recomendada",
        mat: "Conjunto mecânico selado",
      },
    ],
  },
  {
    id: "alimentador",
    nome: "Alimentadores",
    aplica: "Linhas XWB (barras) e XWZ (vibratório)",
    img: "fam-alimentador-barras",
    intro:
      "O escalpe de barras é o menor investimento da planta e o que mais protege o primário — barras gastas deixam passar terra que vira desgaste lá na frente.",
    itens: [
      {
        nome: "Barras de grelha (grizzly)",
        funcao: "Separam terra e finos antes do primário",
        troca: "Abertura alargada além do projeto",
        mat: "Aço manganês",
      },
      {
        nome: "Chapas de revestimento da moega",
        funcao: "Recebem a descarga do caminhão",
        troca: "Espessura mínima; furo na chapa é dano estrutural na sequência",
        mat: "Aço antidesgaste (Hardox ou similar)",
      },
      {
        nome: "Molas e apoios",
        funcao: "Suspensão do conjunto vibratório",
        troca: "Curso irregular",
        mat: "Aço mola",
      },
    ],
  },
  {
    id: "lavagem",
    nome: "Lavagem de areia",
    aplica: "Linha XGH",
    img: "fam-lavagem-areia",
    intro:
      "No circuito de lavagem, o desgaste vem da polpa abrasiva — poliuretano e bomba são o giro constante.",
    itens: [
      {
        nome: "Painéis de poliuretano",
        funcao: "Superfície de desaguamento",
        troca: "Corte no painel contamina a areia com água e finos",
        mat: "PU",
      },
      {
        nome: "Rotor e carcaça da bomba de polpa",
        funcao: "Movem a mistura água-areia",
        troca: "Queda de vazão e pressão",
        mat: "Liga anti-abrasão",
      },
      {
        nome: "Hidrociclone (ápex e vortex)",
        funcao: "Recupera o fino acima de 74 µm",
        troca: "Corte fora de especificação",
        mat: "PU / cerâmica",
      },
    ],
  },
  {
    id: "consumiveis",
    nome: "Consumíveis e motorização",
    aplica: "Todas as linhas",
    img: "xys1020-hero",
    intro:
      "O giro mensal silencioso: filtro, correia e lubrificante param máquina grande quando faltam — e são os itens mais fáceis de programar.",
    itens: [
      {
        nome: "Correias e polias",
        funcao: "Transmissão de potência",
        troca: "Trincas, patinação, desgaste do canal",
      },
      {
        nome: "Filtros (ar, óleo, diesel, hidráulico)",
        funcao: "Proteção de motor e sistema hidráulico",
        troca: "Pelo plano de horas — nunca pelo aspecto",
      },
      {
        nome: "Lubrificantes e graxas",
        funcao: "Vida dos mancais e do sistema de britagem",
        troca: "Análise de óleo periódica paga a própria conta",
      },
      {
        nome: "Roletes, tambores e raspadores",
        funcao: "Transportadores de correia",
        troca: "Rolete travado rasga correia — inspeção visual diária",
      },
    ],
  },
] as unknown as SistemaPecas[];

export const KITS: Kit[] = [
  {
    id: "kit-mandibula",
    nome: "Kit desgaste · Primário de mandíbulas",
    para: ["mandibula"],
    itens: [
      "Par de mandíbulas (fixa + móvel)",
      "Jogo de cunhas e placas laterais",
      "Placa de articulação",
      "Jogo de molas e tirantes",
    ],
    quando:
      "A cada troca de mandíbulas — tipicamente 400 a 1.500 h conforme a abrasividade da rocha",
  },
  {
    id: "kit-cone",
    nome: "Kit desgaste · Cônico",
    para: ["cone"],
    itens: [
      "Manto",
      "Côncavo",
      "Kit de vedações",
      "Composto de fixação (backing) ou anéis de travamento",
    ],
    quando:
      "Manto e côncavo sempre em par — perfis descasados desgastam em faixas e derrubam a forma do produto",
  },
  {
    id: "kit-impacto",
    nome: "Kit desgaste · Impacto",
    para: ["impacto"],
    itens: [
      "Jogo de barras de impacto",
      "Placas de choque das cortinas",
      "Revestimentos laterais",
      "Ferragem de fixação",
    ],
    quando: "Barras por marca de desgaste mínimo; placas a cada 2–3 trocas de barras",
  },
  {
    id: "kit-vsi",
    nome: "Kit desgaste · VSI",
    para: ["vsi"],
    itens: [
      "Jogo de sapatas do rotor",
      "Placas de desgaste do rotor",
      "Blindagem da câmara (parcial)",
      "Distribuidor",
    ],
    quando: "Sapatas por horas de rotor; inspeção de balanceamento a cada troca",
  },
  {
    id: "kit-peneira",
    nome: "Kit classificação · Peneira",
    para: ["peneira"],
    itens: [
      "Jogo de telas por deck (aço ou PU)",
      "Borrachas de vedação e canaletas",
      "Jogo de molas/coxins",
    ],
    quando:
      "Tela pela primeira malha fora de especificação — é a peça que dimensiona a carga circulante da planta",
  },
  {
    id: "kit-preventiva",
    nome: "Kit preventiva · 500 h",
    para: [
      "mandibula",
      "cone",
      "impacto",
      "vsi",
      "peneira",
      "alimentador",
      "lavagem",
      "consumiveis",
    ],
    itens: [
      "Filtros do plano de 500 h",
      "Lubrificantes e graxas",
      "Correias de reposição",
      "Itens de inspeção (raspadores, vedações)",
    ],
    quando: "Programado por horímetro — o kit espera a máquina, nunca o contrário",
  },
] as unknown as Kit[];

export const TIPO2SIS: Record<string, string> = {
  mandibula: "mandibula",
  giratorio: "cone",
  cone: "cone",
  impacto: "impacto",
  vsi: "vsi",
  peneira: "peneira",
  alimentador: "alimentador",
  lavagem: "lavagem",
  transportador: "consumiveis",
};
