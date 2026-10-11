// ============================================================================
// FICHAS DE APRESENTAÇÃO DOS MODELOS DE LINHA AMARELA
// ============================================================================
// Cada modelo do catálogo (src/data/site.ts → MODELOS) ganha aqui sua
// apresentação comercial: tagline, texto, destaques, specs de referência e
// aplicações. O que não tem ficha específica recebe o padrão da linha —
// sem inventar números.
//
// Fotos reais: registradas em src/data/central/fotos.ts com a chave =
// slug do modelo (ex.: "xe215br"). Sem foto, a página usa o painel de marca.
// ============================================================================

import type { ModeloAmarelo } from "@/data/site";
import { slugModelo } from "@/lib/ap";

export { slugModelo };

export interface Destaque {
  h: string;
  p: string;
}

export interface ModeloDetalhe {
  tagline: string;
  apresentacao: string[];
  destaques: Destaque[];
  specs: [string, string][];
  aplicacoes: string[];
  /** Banner de combinação com a Central de Britagem (quando faz sentido). */
  combo?: { titulo: string; texto: string } | undefined;
}

const POS_VENDA: Destaque = {
  h: "Pós-venda Lopes & Lopes em todo o Brasil",
  p: "Peças a pronta entrega, assistência em campo em todo o Brasil e reposição programada pelo horímetro.",
};

// Padrões por linha — usados quando o modelo não tem destaques próprios.
const POR_LINHA: Record<string, { destaques: Destaque[]; aplicacoes: string[] }> = {
  Escavadeiras: {
    destaques: [
      {
        h: "Hidráulica de alta vazão",
        p: "Ciclo rápido e resposta firme — mais passadas por hora na frente de trabalho.",
      },
      {
        h: "Estrutura reforçada",
        p: "Lança e braço dimensionados para rocha, rampa e poeira: as condições reais de Minas.",
      },
      POS_VENDA,
    ],
    aplicacoes: ["Pedreiras", "Terraplenagem", "Construção pesada", "Agro"],
  },
  Carregadeiras: {
    destaques: [
      {
        h: "Caçamba otimizada",
        p: "Perfil que enche rápido e retém a carga no transporte até a descarga.",
      },
      {
        h: "Força de desagravamento",
        p: "Penetração firme na pilha e no talude, com menos esforço do motor.",
      },
      POS_VENDA,
    ],
    aplicacoes: ["Pátios de britagem", "Agro", "Obras", "Indústria"],
  },
  Retroescavadeiras: {
    destaques: [
      {
        h: "Duas máquinas em uma",
        p: "Escavação na lança traseira e carregamento na caçamba dianteira.",
      },
      {
        h: "Mobilidade entre frentes",
        p: "Deslocamento rápido por estrada, sem prancha, entre serviços.",
      },
      POS_VENDA,
    ],
    aplicacoes: ["Obras urbanas", "Agro", "Serviços e valas"],
  },
  Motoniveladoras: {
    destaques: [
      { h: "Lâmina de precisão", p: "Controle fino para acabamento de pista e espelho de praça." },
      {
        h: "Tração e estabilidade",
        p: "Chassi articulado com geometria que mantém a lâmina no corte.",
      },
      POS_VENDA,
    ],
    aplicacoes: ["Estradas vicinais", "Terraplenagem", "Praças de pedreira"],
  },
  "Rolos e pavimentação": {
    destaques: [
      {
        h: "Compactação uniforme",
        p: "Sistema vibratório ajustado para cada tipo de solo e espessura de camada.",
      },
      {
        h: "Operação simples",
        p: "Comandos intuitivos e manutenção diária rápida, no nível do solo.",
      },
      POS_VENDA,
    ],
    aplicacoes: ["Aterros", "Vias urbanas", "Bases de pavimentação"],
  },
  Guindastes: {
    destaques: [
      {
        h: "Lança otimizada",
        p: "Excelente alcance com capacidade de carga controlada por computador de bordo.",
      },
      {
        h: "Segurança de operação",
        p: "Limitador de momento e indicadores que protegem a manobra.",
      },
      POS_VENDA,
    ],
    aplicacoes: ["Montagem industrial", "Içamento em obra", "Movimentação de cargas"],
  },
  Perfuratrizes: {
    destaques: [
      {
        h: "Desmonte de rocha",
        p: "Perfuração precisa para desmonte com explosivo e fundações especiais.",
      },
      { h: "Sob consulta", p: "Configuração definida junto à engenharia da sua operação." },
      POS_VENDA,
    ],
    aplicacoes: ["Pedreiras", "Mineração", "Fundações"],
  },
  Empilhadeiras: {
    destaques: [
      {
        h: "Torre robusta",
        p: "Visibilidade e rigidez para empilhamento seguro em galpão e pátio.",
      },
      { h: "Turno inteiro", p: "Dimensionada para operação contínua na logística e na indústria." },
      POS_VENDA,
    ],
    aplicacoes: ["Logística", "Indústria", "Expedição"],
  },
  "Plataformas e manipuladores": {
    destaques: [
      {
        h: "Alcance com controle",
        p: "Movimentos suaves e proporcionais para trabalho em altura.",
      },
      {
        h: "Segurança ativa",
        p: "Sistemas de proteção e nivelamento para a equipe trabalhar tranquila.",
      },
      POS_VENDA,
    ],
    aplicacoes: ["Montagem e manutenção", "Obras", "Agro"],
  },
  "Mineração · fora de estrada": {
    destaques: [
      {
        h: "Chassi fora de estrada",
        p: "Projetado para ciclo contínuo de mina, rampa e piso irregular.",
      },
      {
        h: "Alta disponibilidade",
        p: "Arquitetura simples de manter, com componentes de linha XCMG.",
      },
      POS_VENDA,
    ],
    aplicacoes: ["Mineração", "Pedreiras", "Grandes terraplenagens"],
  },
};

// Fichas específicas por modelo (chave = slug).
const FICHAS: Record<
  string,
  Partial<ModeloDetalhe> & Pick<ModeloDetalhe, "tagline" | "apresentacao">
> = {
  xe27u: {
    tagline: "A compacta que trabalha onde nenhuma outra entra",
    apresentacao: [
      "A XE27U é a miniescavadeira da XCMG para espaços restritos: fundos de vala, demolição interna, paisagismo e acabamento entre estruturas.",
      "Pequena no transporte e forte no implemento, ela resolve os serviços que uma máquina maior nem consegue alcançar.",
    ],
    specs: [
      ["Classe operacional", "≈ 2,7 t"],
      ["Perfil", "Compacta · espaços restritos"],
    ],
    aplicacoes: ["Obras urbanas", "Acabamento", "Paisagismo", "Valas"],
  },
  xe55da: {
    tagline: "Compacta, versátil e pronta para o serviço do dia a dia",
    apresentacao: [
      "A XE55DA atende a faixa de 5,5 toneladas: grande o suficiente para produzir, compacta o suficiente para circular em obra urbana e propriedade rural.",
      "É a escavadeira de entrada para quem precisa de versatilidade — vala, carregamento e acabamento com a mesma máquina.",
    ],
    specs: [
      ["Classe operacional", "≈ 5,5 t"],
      ["Perfil", "Compacta e versátil"],
    ],
    aplicacoes: ["Obras urbanas", "Agro", "Serviços", "Terraplenagem leve"],
  },
  xe150: {
    tagline: "A 15 toneladas que atende obra e agro com a mesma firmeza",
    apresentacao: [
      "Na classe de 15 t, a XE150 equilibra produção e custo de operação: abre vala, carrega caminhão e prepara terreno sem exigir logística pesada.",
      "É o tamanho mais versátil para empreiteiras e produtores rurais que precisam de uma única escavadeira para tudo.",
    ],
    specs: [
      ["Classe operacional", "≈ 15 t"],
      ["Perfil", "Obra e agro"],
    ],
  },
  xe215br: {
    tagline: "A escavadeira que chega na pedreira pronta",
    apresentacao: [
      "Desenvolvida para o mercado brasileiro, com pacote de pedreira de fábrica: alimenta britador, faz desmonte secundário com rompedor e aguenta o ritmo de duas frentes.",
      "Não é adaptação — é configuração de fábrica, validada nas condições brasileiras de calor, poeira, rampa e rocha dura.",
    ],
    destaques: [
      {
        h: "Feita para o Brasil",
        p: "Projeto validado nas condições brasileiras: calor, poeira, rampa e rocha dura.",
      },
      {
        h: "Pacote pedreira",
        p: "Estrutura reforçada, proteção de lança e opcionais de rompedor hidráulico para alimentação de britador.",
      },
      {
        h: "Hidráulica de alta vazão",
        p: "Ciclo rápido e resposta firme — mais passadas por hora na frente de lavra.",
      },
      POS_VENDA,
    ],
    specs: [
      ["Peso operacional", "≈ 21,5 t"],
      ["Potência do motor", "≈ 129 kW"],
      ["Caçamba", "0,9–1,2 m³"],
      ["Alcance máx. de escavação", "≈ 9,9 m"],
      ["Profundidade máx. de escavação", "≈ 6,6 m"],
      ["Força de escavação (caçamba)", "≈ 149 kN"],
    ],
    aplicacoes: ["Pedreiras", "Mineração", "Terraplenagem pesada"],
    combo: {
      titulo: "A dupla que mais sai: XE215BR + britador móvel",
      texto:
        "A combinação mais comum nas pedreiras atendidas pela Lopes & Lopes: a XE215BR alimentando uma UJ300 ou QJ341. Simule a linha completa e veja a produção estimada.",
    },
  },
  xe370br: {
    tagline: "Produção pesada na classe de 37 toneladas",
    apresentacao: [
      "A XE370BR entra onde a frente de trabalho é contínua: desmonte, carregamento de caminhões fora de estrada e grandes volumes de terraplenagem.",
      "É a escavadeira de produção para pedreiras e minerações que medem o dia em metros cúbicos.",
    ],
    specs: [
      ["Classe operacional", "≈ 37 t"],
      ["Perfil", "Produção pesada"],
    ],
    aplicacoes: ["Pedreiras", "Mineração", "Terraplenagem pesada"],
  },
  xe380g: {
    tagline: "38,7 toneladas para produção, mineração e infraestrutura",
    apresentacao: [
      "A XCMG XE380G trabalha na faixa de produção: 38.700 kg, 340 hp e caçamba de 2,1 m³ para mover mais material por ciclo em mineração, terraplenagem e grandes frentes de infraestrutura.",
      "A cabine foi pensada para turno longo. Ar-condicionado automático quente/frio de alta potência, assento com suspensão ampliada e painel touch de 8 polegadas ajudam o operador a manter conforto, leitura clara da máquina e precisão durante a jornada.",
      "Em condições severas, o sistema de filtragem de combustível em três estágios amplia a proteção dos componentes e melhora a compatibilidade com diferentes qualidades de diesel, reforçando a disponibilidade da máquina em poeira, calor e operação contínua.",
    ],
    destaques: [
      {
        h: "Mais volume por passada",
        p: "Conjunto de 38.700 kg, 340 hp e caçamba de 2,1 m³ para escavação, corte e carregamento com alta produtividade.",
      },
      {
        h: "Cabine completa",
        p: "Ar-condicionado automático quente/frio, assento com suspensão ampliada e tela sensível ao toque de 8 polegadas.",
      },
      {
        h: "Proteção no combustível",
        p: "Filtragem em três estágios para preservar componentes críticos e trabalhar melhor com variações na qualidade do diesel.",
      },
      POS_VENDA,
    ],
    specs: [
      ["Peso operacional", "38.700 kg"],
      ["Potência", "340 hp"],
      ["Caçamba", "2,1 m³"],
      ["Classe", "38 t"],
    ],
    aplicacoes: [
      "Mineração",
      "Terraplenagem pesada",
      "Infraestrutura urbana",
      "Rodovias e pontes",
      "Saneamento",
    ],
    combo: {
      titulo: "XE380G no apoio da britagem",
      texto:
        "Porte para carregar caminhões, abrir frente e manter alimentação constante na operação. Uma escolha equilibrada quando a produção pede mais caçamba por ciclo sem entrar na classe de 49 t.",
    },
  },
  xe490dk: {
    tagline: "49 toneladas para as grandes movimentações",
    apresentacao: [
      "A XE490DK atende as frentes de maior volume: desmonte de rocha, pilhas de estéril e carregamento contínuo em operações que não param.",
      "Mais força de escavação, mais caçamba por passada, menos horas para o mesmo volume.",
    ],
    specs: [
      ["Classe operacional", "≈ 49 t"],
      ["Perfil", "Grandes movimentações"],
    ],
    aplicacoes: ["Mineração", "Pedreiras de grande porte"],
  },
  xe1350: {
    tagline: "121 toneladas para mineração de grande porte",
    apresentacao: [
      "A XE1350 é a escavadeira de mina da linha: frente de lavra contínua, grandes caçambas e disponibilidade projetada para regime severo.",
      "Projeto sob consulta com a engenharia Lopes & Lopes — configuração de acordo com o material e o ciclo da sua operação.",
    ],
    specs: [
      ["Classe operacional", "≈ 121 t"],
      ["Perfil", "Mineração de grande porte"],
    ],
    aplicacoes: ["Mineração de grande porte"],
  },
  lw180kv: {
    tagline: "A compacta dos pátios e da ração de obra",
    apresentacao: [
      "A LW180KV é a carregadeira compacta para pátios, ração de obra e serviços onde manobrabilidade vale mais que porte.",
      "Ágil no giro curto e econômica no consumo, ela segura o fluxo interno sem ocupar espaço.",
    ],
    specs: [["Perfil", "Compacta · pátios e serviços"]],
    aplicacoes: ["Pátios", "Obras", "Agro"],
  },
  lw300kv: {
    tagline: "3 toneladas na caçamba, pronta para o carregamento diário",
    apresentacao: [
      "A LW300KV é a pá carregadeira de 3 t para carregamento contínuo: caminhões, moegas e pilhas com ciclo rápido e baixo consumo.",
      "Configuração equilibrada para quem carrega o dia inteiro e mede o resultado em viagens por hora.",
    ],
    specs: [
      ["Capacidade", "3,0 t"],
      ["Potência", "130 hp"],
      ["Caçamba", "1,8 m³"],
    ],
  },
  lw500fv: {
    tagline: "5 toneladas para o carregamento pesado",
    apresentacao: [
      "A LW500FV atende o carregamento pesado: brita, minério e agregados em volume, com estrutura e transmissão dimensionadas para o ciclo duro.",
      "É a carregadeira de produção para pedreiras e indústrias que não podem parar a moega.",
    ],
    specs: [
      ["Capacidade", "5,0 t"],
      ["Perfil", "Carregamento pesado"],
    ],
    aplicacoes: ["Pedreiras", "Mineração", "Indústria"],
  },
  lw500brii: {
    tagline: "Pá carregadeira de 17.800 kg com força, conforto e manutenção facilitada",
    apresentacao: [
      "A Pá Carregadeira LW500BRII XCMG combina operação simples, alta confiabilidade e desempenho constante para carregamento em pátios, obras, pedreiras e operações industriais.",
      "O conjunto mecânico reúne motor Cummins de 220 hp, transmissão ZF e eixos XCMG, entregando robustez para ciclos repetitivos de carga, deslocamento e descarga. A caçamba de 3,2 m³ ajuda a manter produtividade com bom volume por passada.",
      "A cabine fechada tem ar-condicionado, certificações ROPS/FOPS e colunas estreitas de alta resistência, melhorando segurança, visibilidade e conforto ergonômico para o operador durante turnos longos.",
      "Na manutenção, a LW500BRII traz arrefecimento líquido com hélice reversível, capô com elevação elétrica e tanque hidráulico reposicionado atrás da cabine. A redução da volumetria do tanque contribui para menor custo de manutenção sem perder eficiência hidráulica.",
    ],
    destaques: [
      {
        h: "Conjunto confiável",
        p: "Motor Cummins de 220 hp, transmissão ZF e eixos XCMG para operação robusta e consistente.",
      },
      {
        h: "Cabine segura e confortável",
        p: "Cabine fechada com ar-condicionado, ROPS/FOPS e colunas estreitas para ampliar a visibilidade.",
      },
      {
        h: "Manutenção mais acessível",
        p: "Hélice reversível, capô com elevação elétrica e tanque hidráulico reposicionado para facilitar inspeções e reduzir custos.",
      },
      POS_VENDA,
    ],
    specs: [
      ["Peso operacional", "17.800 kg"],
      ["Potência", "220 hp"],
      ["Caçamba", "3,2 m³"],
      ["Motor", "Cummins"],
      ["Transmissão", "ZF"],
    ],
    aplicacoes: ["Pátios de britagem", "Pedreiras", "Obras", "Indústria", "Agro"],
  },
  "xc968-ev": {
    tagline: "18,8 toneladas, 414 hp — e zero diesel",
    apresentacao: [
      "A XC968-EV é a carregadeira 100% elétrica da XCMG: a mesma força de uma grande a diesel, sem combustível, sem escapamento e com manutenção drasticamente menor.",
      "Ideal para operações com meta de descarbonização ou restrição de emissão — e com o pós-venda Lopes & Lopes cuidando da infraestrutura de recarga.",
    ],
    destaques: [
      {
        h: "Zero diesel",
        p: "Operação sem combustível fóssil: menos custo por hora e zero emissão local.",
      },
      {
        h: "414 hp elétricos",
        p: "Torque imediato e força de desagravamento comparável às grandes a diesel.",
      },
      {
        h: "Menos manutenção",
        p: "Sem motor a diesel, filtros e correias: menos itens de parada programada.",
      },
      POS_VENDA,
    ],
    specs: [
      ["Classe operacional", "18,8 t"],
      ["Potência", "414 hp"],
      ["Energia", "100% elétrica"],
    ],
    aplicacoes: ["Pedreiras", "Indústria", "Operações ESG"],
  },
  "xc7-sr08": {
    tagline: "A minicarregadeira dos mil implementos",
    apresentacao: [
      "A XC7-SR08 troca de implemento em minutos: caçamba, garfo, vassoura, trado — uma máquina que vira várias no mesmo turno.",
      "Compacta e ágil, é a curinga de obras urbanas, condomínios logísticos e propriedades rurais.",
    ],
    specs: [["Perfil", "Minicarregadeira · multi-implementos"]],
    aplicacoes: ["Obras urbanas", "Agro", "Logística"],
  },
  "xc870br-ii": {
    tagline: "A retro que atende obra, agro e serviços",
    apresentacao: [
      "A XC870BR-II combina lança de escavação e caçamba dianteira em uma máquina que se desloca sozinha entre as frentes.",
      "Para prefeituras, empreiteiras e produtores rurais, é o melhor custo por serviço executado.",
    ],
    specs: [
      ["Peso operacional", "7,7 t"],
      ["Potência", "98,5 hp"],
    ],
  },
  gr1803br: {
    tagline: "180 hp para estradas vicinais e praças",
    apresentacao: [
      "A GR1803BR é a motoniveladora para manutenção de vicinais, praças de pedreira e acabamento de pista não pavimentada.",
      "Lâmina de resposta precisa e chassi estável: o acabamento sai no corte, sem repasse.",
    ],
    specs: [
      ["Potência", "180 hp"],
      ["Perfil", "Estradas vicinais e praças"],
    ],
  },
  gr1905br: {
    tagline: "190 hp para terraplenagem e acabamento fino",
    apresentacao: [
      "A GR1905BR sobe o nível: mais potência para cortar e espalhar em terraplenagem, mantendo a precisão no acabamento final.",
      "É a niveladora de quem prepara pista, pátio e plataforma com exigência de regularidade.",
    ],
    specs: [
      ["Potência", "190 hp"],
      ["Perfil", "Terraplenagem e acabamento"],
    ],
  },
  xs123pdbr: {
    tagline: "12 toneladas de pé de carneiro para aterros exigentes",
    apresentacao: [
      "O XS123PDBR é o rolo pé de carneiro para compactação de aterros em solos argilosos e camadas espessas.",
      "Onde o aterro precisa atingir densidade de projeto, é ele quem fecha a especificação.",
    ],
    specs: [
      ["Peso operacional", "12 t"],
      ["Tambor", "Pé de carneiro"],
    ],
    aplicacoes: ["Aterros", "Barragens", "Terraplenagem"],
  },
  xmr403svt: {
    tagline: "O mini rolo combinado das vias urbanas",
    apresentacao: [
      "O XMR403SVT combina tambor vibratório e pneus em um rolo compacto para vias urbanas, ciclovias e reparos.",
      "Manobra fácil em espaço curto e acabamento uniforme em camadas finas.",
    ],
    specs: [["Perfil", "Mini rolo combinado"]],
    aplicacoes: ["Vias urbanas", "Reparos", "Ciclovias"],
  },
  qy25br: {
    tagline: "25 toneladas de içamento para montagem e movimentação",
    apresentacao: [
      "O QY25BR é o guindaste de entrada para montagem de estruturas, movimentação de cargas e apoio a obras.",
      "Rápido de posicionar e simples de operar, atende o içamento do dia a dia com segurança.",
    ],
    specs: [["Capacidade", "25 t"]],
  },
  qy30br: {
    tagline: "30 toneladas com lança de 41 metros",
    apresentacao: [
      "O QY30BR combina 30 t de capacidade com lança de 41 m + jib de 8,3 m: alcance de sobra para montagem em altura.",
      "Configuração versátil para obras industriais, galpões e movimentação de peças pesadas.",
    ],
    specs: [
      ["Capacidade", "30 t"],
      ["Lança principal", "41 m"],
      ["Jib", "8,3 m"],
    ],
  },
  qy75br: {
    tagline: "75 toneladas para içamentos de maior porte",
    apresentacao: [
      "O QY75BR entra nas manobras que exigem capacidade e alcance juntos: lança de 45 m com jib de 16 m.",
      "Indicado para montagem industrial, infraestrutura e içamento de módulos pesados.",
    ],
    specs: [
      ["Capacidade", "75 t"],
      ["Lança principal", "45 m"],
      ["Jib", "16 m"],
    ],
  },
  qy90br: {
    tagline: "90 toneladas no topo da linha de guindastes",
    apresentacao: [
      "O QY90BR é o maior da linha: 90 t de capacidade, lança de 47 m e jib de 17,5 m para as manobras mais exigentes.",
      "Projeto de içamento sob consulta com a equipe Lopes & Lopes, incluindo planejamento da manobra.",
    ],
    specs: [
      ["Capacidade", "90 t"],
      ["Lança principal", "47 m"],
      ["Jib", "17,5 m"],
    ],
  },
  "linha-de-perfuratrizes": {
    tagline: "Perfuração para desmonte de rocha e fundações",
    apresentacao: [
      "A linha de perfuratrizes XCMG atende desmonte de rocha em pedreiras e minerações, além de fundações especiais em obras de infraestrutura.",
      "Cada configuração é definida sob consulta, junto à engenharia da sua operação: diâmetro, profundidade e rocha determinam a máquina.",
    ],
    destaques: [
      {
        h: "Projeto sob consulta",
        p: "Diâmetro, profundidade e tipo de rocha definem a configuração — dimensionada com a engenharia Lopes & Lopes.",
      },
      {
        h: "Nova geração",
        p: "Linha atual XCMG com avanço e rotação otimizados para produção por metro perfurado.",
      },
      POS_VENDA,
    ],
    specs: [["Configuração", "Sob consulta, conforme a aplicação"]],
  },
  xcf35kt: {
    tagline: "3,5 toneladas para logística e indústria",
    apresentacao: [
      "A XCF35KT é a empilhadeira de 3,5 t para o giro pesado do armazém: recebimento, empilhamento e expedição sem pausa.",
      "Torre robusta e visibilidade ampla para operar segura em corredor e doca.",
    ],
    specs: [["Capacidade", "3,5 t"]],
  },
  xga16e: {
    tagline: "Plataforma articulada para 16 metros de altura",
    apresentacao: [
      "A XGA16E leva a equipe a 16 m com movimentos proporcionais e suaves — montagem, manutenção e instalações em altura.",
      "Articulação que contorna obstáculos e posiciona a cesta exatamente onde o serviço está.",
    ],
    specs: [
      ["Altura de trabalho", "16 m"],
      ["Tipo", "Plataforma articulada"],
    ],
    aplicacoes: ["Montagem industrial", "Manutenção predial", "Obras"],
  },
  xt4018k: {
    tagline: "Manipulador telescópico para agro e obra",
    apresentacao: [
      "O XT4018K eleva e alcança onde a empilhadeira não chega: cargas paletizadas, big bags e materiais em altura ou à distância.",
      "Com implementos intercambiáveis, atende do galpão de grãos ao canteiro de obras.",
    ],
    specs: [["Tipo", "Manipulador telescópico"]],
    aplicacoes: ["Agro", "Obras", "Logística"],
  },
  xdr100: {
    tagline: "O caminhão rígido para o transporte de mina",
    apresentacao: [
      "O XDR100 é o caminhão fora de estrada para o ciclo de mina: chassi rígido, suspensão dimensionada e estrutura para carga contínua.",
      "Projetado para rampa, piso irregular e regime severo — com reposição de peças pela Lopes & Lopes em todo o Brasil.",
    ],
    specs: [["Tipo", "Caminhão rígido fora de estrada"]],
  },
  xde130: {
    tagline: "Elétrico-diesel de alta capacidade",
    apresentacao: [
      "O XDE130 usa tração elétrica-diesel: o motor a diesel gera energia e os motores elétricos tracionam — mais torque na rampa e freio retardador sem desgaste.",
      "Alta capacidade de transporte com a arquitetura consagrada dos grandes caminhões de mina.",
    ],
    specs: [
      ["Tração", "Elétrico-diesel"],
      ["Perfil", "Alta capacidade"],
    ],
  },
  xge95: {
    tagline: "Caminhão de mineração 100% elétrico para transporte severo",
    apresentacao: [
      "O XGE95 XCMG é um caminhão de mineração 100% elétrico projetado para transporte fora de estrada com zero diesel na operação. Com 95.000 kg e autonomia de até 43 km, atende frentes de mina que exigem força, estabilidade e previsibilidade no ciclo.",
      "Equipado com dois motores de alto torque, o XGE95 foi desenvolvido para trabalhar em ambientes adversos, com variação de altitude, temperatura e piso. A entrega de potência elétrica ajuda o caminhão a manter resposta firme em rampa, carga pesada e operação contínua.",
      "O sistema de recuperação de energia de frenagem aproveita as desacelerações para ampliar o alcance e reduzir desperdício de energia. Na prática, o caminhão transforma parte do esforço de frenagem em eficiência para o ciclo completo da frota.",
    ],
    destaques: [
      {
        h: "100% elétrico",
        p: "Transporte de mina sem diesel na operação, com menor emissão local e menos ruído na frente de trabalho.",
      },
      {
        h: "Dois motores de alto torque",
        p: "Força imediata para rampa, carga e piso irregular, mantendo estabilidade em ambientes severos.",
      },
      {
        h: "Recuperação de frenagem",
        p: "Sistema que reaproveita energia nas desacelerações para maximizar alcance e economia do veículo.",
      },
      POS_VENDA,
    ],
    specs: [
      ["Energia", "100% elétrica"],
      ["Peso", "95.000 kg"],
      ["Autonomia", "43 km"],
      ["Motorização", "Dois motores de alto torque"],
    ],
    aplicacoes: [
      "Mineração",
      "Transporte fora de estrada",
      "Pedreiras de grande porte",
      "Operações com meta ESG",
    ],
  },
  e729r: {
    tagline: "O caminhão pipa 100% elétrico",
    apresentacao: [
      "O E729R faz a irrigação de pista sem diesel: abastecimento elétrico, operação silenciosa e zero emissão local na frente de lavra.",
      "Menos custo por hora e menos manutenção — com suporte da Lopes & Lopes para a infraestrutura de recarga na operação.",
    ],
    destaques: [
      {
        h: "100% elétrico",
        p: "Zero diesel na irrigação de pista: menos custo por hora e zero emissão local.",
      },
      {
        h: "Piso seguro",
        p: "Irrigação constante para pista firme, com menos poeira e mais aderência.",
      },
      POS_VENDA,
    ],
    specs: [["Energia", "100% elétrica"]],
    aplicacoes: ["Mineração", "Pedreiras", "Operações ESG"],
  },
};

/** Ficha completa do modelo: específica quando existe, padrão da linha senão. */
export function detalheDoModelo(m: ModeloAmarelo): ModeloDetalhe {
  const ficha = FICHAS[slugModelo(m.cod)];
  const padrao = POR_LINHA[m.linha] ?? { destaques: [POS_VENDA], aplicacoes: [] };
  return {
    tagline: ficha?.tagline ?? m.d,
    apresentacao: ficha?.apresentacao ?? [m.d],
    destaques: ficha?.destaques ?? padrao.destaques,
    specs: ficha?.specs ?? [],
    aplicacoes: ficha?.aplicacoes ?? padrao.aplicacoes,
    combo: ficha?.combo,
  };
}
