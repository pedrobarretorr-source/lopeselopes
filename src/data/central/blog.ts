// Blog da Central — 11 artigos migrados (corpo em HTML confiável do catálogo-fonte).
export interface Post {
  slug: string;
  titulo: string;
  cat: string;
  resumo: string;
  capa: string;
  data: string;
  leitura: number;
  tags: string[];
  corpo: string;
}

export const BLOG: Post[] = [
  {
    slug: "brita-0-1-2-3-guia",
    titulo: "Brita 0, 1, 2, 3 e pó de pedra: para que serve cada faixa",
    cat: "Guia técnico",
    resumo:
      "As faixas granulométricas que o mercado compra, os usos de cada uma e por que a peneira define o que sai do seu pátio.",
    capa: "xft1860-hero",
    data: "2026-08-12",
    leitura: 6,
    tags: ["brita", "granulometria", "NBR 7211", "produtos"],
    corpo:
      '<p class="lead">Quem chega ao balcão pede "brita 1". Quem opera a planta precisa saber exatamente onde começa e onde termina cada faixa — porque é a tela da peneira, não o britador, que define o produto que o pátio vende.</p>\n<h2>As faixas que o mercado compra</h2>\n<table><thead><tr><th>Produto</th><th>Faixa típica</th><th>Principais usos</th></tr></thead><tbody>\n<tr><td><b>Pó de pedra</b></td><td>0 – 4,8 mm</td><td>Asfalto, argamassa, blocos, base de intertravado</td></tr>\n<tr><td><b>Brita 0 (pedrisco)</b></td><td>4,8 – 9,5 mm</td><td>Pré-moldados, lajes finas, asfalto</td></tr>\n<tr><td><b>Brita 1</b></td><td>9,5 – 19 mm</td><td>Concreto estrutural — a mais vendida do Brasil</td></tr>\n<tr><td><b>Brita 2</b></td><td>19 – 25 mm</td><td>Concreto massa, pisos industriais</td></tr>\n<tr><td><b>Brita 3</b></td><td>25 – 50 mm</td><td>Lastro ferroviário, drenagem, gabião</td></tr>\n<tr><td><b>Brita 4 / rachão</b></td><td>50 – 76 mm+</td><td>Base de aterro, enrocamento, bica corrida</td></tr>\n</tbody></table>\n<p>As faixas seguem a lógica da NBR 7211, a norma de agregados para concreto. Na prática comercial regional os limites variam um pouco — o que não varia é o princípio: <b>quem corta a faixa é a malha da tela</b>.</p>\n<h2>Por que isso importa para a planta</h2>\n<p>Cada produto a mais no pátio exige um deck de peneira a mais — ou uma troca de tela programada. Uma planta que vende pó, brita 0 e brita 1 precisa de pelo menos três cortes. E o produto mais fino da lista define quantos estágios de britagem a linha precisa ter: chegar em brita 0 a partir de um bloco de 700 mm pede três estágios de redução; parar na brita 2 pede dois.</p>\n<p>É por isso que a pergunta certa na hora de montar ou ampliar uma planta não é "qual britador eu compro?" — é <b>"o que eu quero vender?"</b>. O produto puxa a planta, nunca o contrário.</p>\n<h2>Perguntas frequentes</h2>\n<details><summary>Posso fazer brita 1 direto do primário?</summary><p>Não com qualidade comercial. O primário entrega tipicamente um produto de 80 a 150 mm com muita lamela. A brita 1 dentro de norma nasce na rebritagem — cônico ou impacto — seguida de classificação.</p></details>\n<details><summary>O que é bica corrida?</summary><p>É o produto sem classificação — tudo que sai do britador, da fração fina ao topo. Serve para base e aterro e é o produto de quem opera só com o primário.</p></details>',
  },
  {
    slug: "quanto-custa-planta-britagem",
    titulo: "Quanto custa montar uma planta de britagem em 2026",
    cat: "Investimento",
    resumo:
      "Os quatro fatores que definem o investimento, a diferença real entre móvel e fixa, e por que a pergunta certa é custo por tonelada.",
    capa: "xpe1215-hero",
    data: "2026-08-05",
    leitura: 7,
    tags: ["investimento", "planta de britagem", "móvel", "fixa"],
    corpo:
      '<p class="lead">É a pergunta mais feita e a mais mal respondida do setor. A verdade honesta: o investimento varia mais de dez vezes entre uma operação de 80 t/h e uma de 500 t/h — e quem define o número não é o vendedor, é a sua rocha e a sua meta.</p>\n<h2>Os quatro fatores que mandam no investimento</h2>\n<p><b>1. A produção-alvo.</b> Toneladas por mês, convertidas em toneladas por hora reais de operação. É o fator que dimensiona o porte de todas as máquinas da linha.</p>\n<p><b>2. O produto mais fino que você quer vender.</b> Ele define o número de estágios. Cada estágio é um britador, um transportador e espaço de pátio a mais.</p>\n<p><b>3. A rocha.</b> Granito e gnaisse pedem britagem cônica (mais investimento, menos custo de desgaste). Calcário aceita impacto (menos investimento por tonelada instalada). Rocha abrasiva com máquina errada devora a margem em peça.</p>\n<p><b>4. O maior bloco do desmonte.</b> Ele define a boca do primário — e a boca define o porte da máquina mais cara da linha.</p>\n<h2>Móvel ou fixa: a diferença que aparece no caixa</h2>\n<p>A planta móvel dispensa obra civil pesada, chega produzindo em dias e muda de frente de lavra sozinha. A fixa exige projeto, fundação e montagem — mas entrega menor custo por tonelada em operação contínua de longo prazo no mesmo local. A regra de bolso honesta: <b>horizonte curto ou lavra que muda, móvel; jazida de décadas com volume alto, fixa</b> — e há muitas operações híbridas, com primário móvel alimentando rebritagem fixa.</p>\n<h2>A pergunta certa: custo por tonelada</h2>\n<p>O investimento é uma foto; o custo por tonelada é o filme. Energia, desgaste, mão de obra, diesel e a taxa de utilização real da planta pesam mais no resultado de cinco anos do que a diferença de preço entre duas propostas. Uma máquina mais cara com melhor curva de energia e desgaste frequentemente vence a mais barata ainda no segundo ano.</p>\n<div class="cta-post"><b>Quer o número da sua operação?</b> O simulador da Central desenha a linha que a sua produção pede em sete perguntas — e o levantamento técnico gratuito fecha o dimensionamento no local.</div>\n<h2>Perguntas frequentes</h2>\n<details><summary>Dá para começar pequeno e crescer?</summary><p>Sim — é o caminho mais comum. Começa-se com primário + peneira vendendo bica corrida e brita graúda, e a rebritagem entra quando o mercado de brita 1 e 0 justifica. O erro a evitar: comprar o primário pequeno demais para a expansão que você já sabe que virá.</p></details>\n<details><summary>Equipamento usado vale a pena?</summary><p>Depende de uma única coisa: histórico de manutenção verificável. Sem ele, o desconto da compra vira parada não programada.</p></details>',
  },
  {
    slug: "conico-ou-impacto",
    titulo: "Britador cônico ou de impacto? A rocha decide por você",
    cat: "Guia técnico",
    resumo:
      "Abrasividade é o critério que separa as duas famílias. Entenda o índice Ai e por que impacto em granito devora barras.",
    capa: "xpy1300-hero",
    data: "2026-07-29",
    leitura: 6,
    tags: ["britador cônico", "britador de impacto", "abrasividade", "desgaste"],
    corpo:
      '<p class="lead">A dúvida mais cara da rebritagem tem resposta técnica objetiva — e ela não está no catálogo de nenhum fabricante. Está na sua rocha, num número chamado índice de abrasão.</p>\n<h2>O critério que decide: abrasividade</h2>\n<p>O índice de abrasão (Ai, de Bond) mede quanto a rocha desgasta o aço. Calcário fica em torno de 0,01–0,03: quase não come metal. Granito e gnaisse ficam entre 0,4 e 0,65: vinte vezes mais. Quartzito passa de 0,7.</p>\n<p>O britador de impacto quebra arremessando a pedra contra barras — todo o trabalho acontece por contato violento entre rocha e metal. Em rocha pouco abrasiva, é imbatível: alta razão de redução, grão cúbico, menos estágios. Em granito, as barras viram consumível de dias, e o custo por tonelada explode.</p>\n<p>O cônico quebra por compressão entre manto e côncavo — o contato é de esmagamento, não de arremesso. O desgaste por tonelada em rocha dura é uma fração do impacto. É por isso que <b>pedreira de granito é território de cônico</b>, e planta de calcário ou reciclagem é território de impacto.</p>\n<h2>A tabela honesta</h2>\n<table><thead><tr><th>Cenário</th><th>Escolha típica</th><th>Por quê</th></tr></thead><tbody>\n<tr><td>Granito, gnaisse, basalto duro</td><td><b>Cônico</b></td><td>Custo de desgaste por tonelada muito menor</td></tr>\n<tr><td>Calcário, dolomito</td><td><b>Impacto</b></td><td>Mais redução por estágio, grão cúbico, menor investimento</td></tr>\n<tr><td>Reciclagem de concreto (RCD)</td><td><b>Impacto</b></td><td>Libera o vergalhão e aceita material heterogêneo</td></tr>\n<tr><td>Minério de ferro</td><td><b>Cônico</b></td><td>Abrasividade média-alta e densidade elevada</td></tr>\n</tbody></table>\n<h2>O erro clássico</h2>\n<p>Comprar impacto para granito porque o investimento inicial é menor. A conta fecha no boleto da máquina e estoura na reposição de barras — mês após mês, pelos anos de vida da planta. Quando alguém oferecer a máquina "mais barata", pergunte sempre: <b>mais barata por tonelada em cinco anos, ou só na nota fiscal?</b></p>\n<details><summary>E o VSI, onde entra?</summary><p>O VSI (eixo vertical) é o especialista do estágio final: areia industrial e correção de forma. Ele quebra pedra contra pedra, o que o torna tolerante à abrasividade — mas seu papel é fazer areia e cubicidade, não substituir o secundário.</p></details>',
  },
  {
    slug: "britador-nao-rende",
    titulo: "Seu britador não rende? Os 5 gargalos que ninguém olha",
    cat: "Operação",
    resumo:
      "Antes de culpar a máquina, meça a planta. Os cinco pontos onde a produção some — e o mais comum não é o britador.",
    capa: "xpe0912-hero",
    data: "2026-07-22",
    leitura: 7,
    tags: ["gargalo", "produtividade", "peneira", "operação"],
    corpo:
      '<p class="lead">"O britador é fraco." É a frase mais dita — e menos verdadeira — das pedreiras brasileiras. Na maioria das visitas técnicas, a máquina acusada está trabalhando com folga; o problema mora em outro elo.</p>\n<h2>1. Alimentação irregular</h2>\n<p>Britador de câmara vazia não produz. Se a pá-carregadeira alimenta direto, a máquina alterna entre afogada e vazia — e a média despenca. Um alimentador vibratório com pilha pulmão é frequentemente o upgrade de melhor retorno da planta inteira.</p>\n<h2>2. A tela da peneira</h2>\n<p>O campeão silencioso. Tela cega (obstruída) ou com eficiência caída devolve ao britador material que já estava no tamanho — a carga circulante sobe, o britador trabalha afogado com material que não precisava britar, e a produção líquida cai. <b>Muita "falta de britador" se resolve com jogo de telas.</b></p>\n<h2>3. Regulagem (APF) fora do ponto</h2>\n<p>Abertura apertada demais para ganhar produto fino derruba a capacidade e dispara a recirculação. Cada milímetro de APF mexe na capacidade e na curva do produto — regulagem é decisão de processo, não de tentativa e erro.</p>\n<h2>4. Desgaste avançado</h2>\n<p>Mandíbula com dente arredondado e manto com perfil perdido continuam "funcionando" — só que com menos mordida, mais lamela e menos toneladas. O ponto econômico de troca chega antes do fim físico da peça.</p>\n<h2>5. O elo depois da britagem</h2>\n<p>Transportador subdimensionado, chute que entope, pátio sem giro: a produção que o britador entrega e a planta não escoa não existe comercialmente.</p>\n<h2>Como descobrir o seu em uma hora</h2>\n<p>Meça a capacidade real de cada elo — alimentação, primário, peneiras, rebritagem, expedição — em toneladas por hora. O menor número é o seu gargalo, e todo investimento fora dele é dinheiro que não vira tonelada. É exatamente essa medição que fazemos no levantamento técnico gratuito.</p>\n<details><summary>Vale a pena aumentar a potência do motor?</summary><p>Quase nunca é o motor. Se a amperagem trabalha folgada, potência extra não muda nada; se trabalha no limite, o problema costuma ser câmara, regulagem ou alimentação — não falta de cavalo.</p></details>',
  },
  {
    slug: "carga-circulante",
    titulo: "Carga circulante: o número invisível que dimensiona sua planta",
    cat: "Guia técnico",
    resumo:
      "Em circuito fechado, o britador processa mais do que a planta produz. Quem ignora isso compra máquina pequena achando que comprou certa.",
    capa: "xfy1536-hero",
    data: "2026-07-15",
    leitura: 5,
    tags: ["carga circulante", "circuito fechado", "peneira", "dimensionamento"],
    corpo:
      '<p class="lead">Existe um número que não aparece em catálogo nenhum e que derruba mais dimensionamento do que qualquer outro: a carga circulante. Se você fecha circuito — e quase toda planta de brita fecha — precisa dele.</p>\n<h2>O que é</h2>\n<p>Em circuito fechado, o que a peneira retém volta ao britador. Esse retorno soma-se à alimentação nova: o britador vê <b>alimentação nova + retorno</b>, sempre. Com valores típicos — 30% da descarga acima da malha e peneira com 90% de eficiência — a carga total sobre o britador fica em torno de <b>150% da alimentação nova</b>.</p>\n<p>Tradução: uma planta que produz 200 t/h de produto final tem um britador de fechamento processando ~300 t/h. Quem dimensiona esse britador pelos 200 compra máquina pequena — e depois culpa a máquina.</p>\n<h2>A peneira manda no número</h2>\n<p>A sensibilidade é brutal: se a eficiência da peneira cai de 90% para 70% — tela parcialmente cega, alimentação irregular, excesso de umidade — a carga circulante salta de 50% para 75% de retorno. O britador afoga <b>sem que nada tenha mudado nele</b>. É o mecanismo exato por trás de tanta troca de britador que não resolve nada: o problema era a tela.</p>\n<h2>Três decisões práticas</h2>\n<p><b>1.</b> Dimensione britador e peneira do circuito fechado pela carga total, nunca pela produção nominal. <b>2.</b> Trate a tela como item de processo, não de manutenção: eficiência dela é capacidade da planta. <b>3.</b> Antes de comprar britador maior, meça a eficiência de peneiramento — é a verificação mais barata da lista.</p>\n<details><summary>Circuito aberto não tem esse problema?</summary><p>Não tem recirculação — mas paga em produto fora de especificação, porque o que passa do tamanho segue adiante. Para produto comercial dentro de norma, o circuito fechado é o padrão.</p></details>',
  },
  {
    slug: "movel-ou-fixa",
    titulo: "Planta móvel ou estacionária: a conta que decide",
    cat: "Investimento",
    resumo:
      "Mobilização, licenciamento, custo por tonelada e horizonte da jazida — o framework honesto para uma decisão de milhões.",
    capa: "xpe1215k-hero",
    data: "2026-07-08",
    leitura: 6,
    tags: ["planta móvel", "planta fixa", "estacionária", "investimento"],
    corpo:
      '<p class="lead">Não existe resposta universal — existe a conta da sua operação. O que existe de universal são os fatores que entram nela, e são cinco.</p>\n<h2>1. Horizonte no local</h2>\n<p>Jazida licenciada para décadas, com mercado consolidado, favorece a fixa: o custo de fundação e montagem se dilui em milhões de toneladas. Contrato de obra, lavra que avança rápido ou mercado em teste favorecem a móvel — que vai embora junto com você.</p>\n<h2>2. Velocidade de partida</h2>\n<p>A móvel chega em carreta e produz na mesma semana. A fixa leva meses entre projeto, obra civil e montagem. Quando o contrato tem multa por prazo, essa diferença paga a decisão sozinha.</p>\n<h2>3. Custo por tonelada em regime</h2>\n<p>Operação contínua no mesmo ponto, a fixa vence: acionamento elétrico da rede, estrutura otimizada, manutenção facilitada. A móvel a diesel carrega o custo do combustível em cada tonelada — as versões com acionamento elétrico externo (linha K) encurtaram muito essa distância, operando plugadas na rede quando paradas.</p>\n<h2>4. Frente de lavra que muda</h2>\n<p>Se o desmonte se afasta da praça, a fixa paga a distância em caminhão interno todos os dias. A móvel anda até a pedra — é a economia estrutural do conceito.</p>\n<h2>5. O híbrido que o mercado adotou</h2>\n<p>A configuração que mais cresce: <b>primário móvel na frente de lavra + rebritagem e classificação fixas na praça</b>. O primário acompanha o desmonte e reduz o transporte interno de material bruto; a praça fixa entrega o custo por tonelada baixo dos produtos finais.</p>\n<div class="cta-post"><b>Na dúvida entre as duas?</b> O simulador monta a linha nas duas configurações e o levantamento técnico compara o custo por tonelada com os seus números.</div>',
  },
  {
    slug: "mercado-agregados-brasil",
    titulo: "Agregados no Brasil: o mercado de 700 milhões de toneladas",
    cat: "Mercado",
    resumo:
      "Areia e brita movimentam mais tonelagem que qualquer outro setor mineral do país — e a demanda reprimida indica espaço para crescer.",
    capa: "xpf1214-hero",
    data: "2026-07-01",
    leitura: 6,
    tags: ["mercado", "agregados", "ANEPAC", "construção civil"],
    corpo:
      '<p class="lead">Quando se fala em mineração no Brasil, pensa-se em ferro e ouro. Em tonelagem, porém, nada se compara ao setor que sustenta cada obra do país: os agregados — areia e brita.</p>\n<h2>O tamanho real do setor</h2>\n<p>Segundo a ANEPAC, associação nacional do setor, o Brasil movimenta atualmente cerca de 700 milhões de toneladas de agregados por ano, com a demanda historicamente dividida em torno de 55–60% de areia e 40–45% de brita. São aproximadamente 3.100 empresas produtoras espalhadas pelo país, num mercado que já superou a casa dos R$ 30 bilhões anuais. Os agregados respondem por mais da metade de toda a produção mineral brasileira em volume.</p>\n<h2>A demanda reprimida é a notícia</h2>\n<p>O consumo per capita brasileiro segue baixo na comparação internacional — sinal de demanda reprimida, não de mercado maduro. Déficit habitacional, saneamento universalizado por marco legal e a carteira de infraestrutura apontam na mesma direção: <b>o país precisa produzir mais agregado do que produz</b>. Para quem opera pedreira, isso significa espaço estrutural de crescimento por anos.</p>\n<h2>O fator logística muda o mapa</h2>\n<p>Agregado é produto de baixo valor por tonelada e alto custo de frete: o raio econômico de uma pedreira raramente passa de 60–80 km. Cada polo de obras precisa de produção própria por perto — e é isso que mantém o setor pulverizado e regional, com oportunidade real para o produtor médio bem equipado, não apenas para os grandes grupos.</p>\n<h2>O que isso muda na sua decisão de investir</h2>\n<p>Mercado estrutural em alta + logística regional = a pergunta não é "se" há demanda, é <b>quem atende a demanda do seu raio com o menor custo por tonelada</b>. Eficiência de planta deixou de ser diferencial técnico e virou a margem inteira do negócio.</p>\n<p class="fonte-post">Referências de mercado: ANEPAC (anepac.org.br) e coberturas setoriais públicas. Números arredondados para leitura.</p>',
  },
  {
    slug: "manutencao-preventiva-britagem",
    titulo: "Manutenção que paga a própria conta: o plano por horas",
    cat: "Operação",
    resumo:
      "Checklist diário, kits por horímetro e o encruamento do manganês — como transformar manutenção de custo em margem.",
    capa: "fam-cone-multi",
    data: "2026-06-24",
    leitura: 7,
    tags: ["manutenção preventiva", "kits", "peças de desgaste", "manganês"],
    corpo:
      '<p class="lead">Parada não programada custa três vezes: a peça em regime de urgência, a equipe parada e as toneladas que não saíram. O plano por horas transforma esses três custos em um só — programado, negociado e sem surpresa.</p>\n<h2>O checklist que evita 80% das paradas</h2>\n<p><b>Diário (10 min):</b> ruído e vibração anormais, temperatura de mancais, aperto visual de fixações, estado das correias, raspadores e roletes dos transportadores.</p>\n<p><b>Semanal:</b> medição de desgaste de mandíbulas/manto/barras nos pontos de referência, inspeção das telas (furo e cegamento), amplitude das peneiras, análise visual do produto (lamela crescendo = perfil de câmara indo embora).</p>\n<p><b>Por horímetro:</b> filtros e lubrificantes no plano de 250/500/1.000 h; vedações e buchas nas janelas do fabricante; análise de óleo a cada troca.</p>\n<h2>Por que o manganês exige rocha na câmara</h2>\n<p>As peças de britagem são de aço alto manganês (ligas Mn14 a Mn22 com cromo) por uma propriedade única: <b>ele encrua trabalhando</b> — a superfície endurece com o impacto e a compressão da própria rocha. Britador operando de câmara vazia ou com alimentação segregada não encrua direito e gasta mais rápido. Alimentação plena e bem distribuída não é só produtividade: é vida útil de peça.</p>\n<h2>Kits por hora: o estoque certo, não o maior</h2>\n<p>O segredo não é encher o almoxarifado — é ter <b>o kit certo esperando a janela certa</b>: kit de mandíbulas completo (par + cunhas + toggle), kit cônico (manto + côncavo + vedações, sempre em par), jogo de telas por deck, kit de 500 h de consumíveis. Peça programada chega no prazo e no preço; peça de urgência chega no frete aéreo.</p>\n<div class="cta-post"><b>A Lopes & Lopes monta o plano de kits da sua planta</b> a partir do modelo, da rocha e do horímetro — e deixa a reposição programada antes da máquina pedir.</div>\n<details><summary>Quando trocar mandíbula: dá para esperar gastar tudo?</summary><p>Não vale a pena. Perfil arredondado reduz a mordida e a capacidade meses antes do fim físico da peça — o ponto econômico de troca chega quando a perda de produção supera o valor residual do aço.</p></details>',
  },
  {
    slug: "areia-de-brita",
    titulo: "Areia de brita: o produto que valoriza cada tonelada",
    cat: "Produtos",
    resumo:
      "Com a areia natural cada vez mais restrita, a areia industrial de VSI virou o produto de maior margem da pedreira moderna.",
    capa: "xpl1000-hero",
    data: "2026-06-17",
    leitura: 5,
    tags: ["areia industrial", "VSI", "areia de brita", "margem"],
    corpo:
      '<p class="lead">A tonelada que sai da pedreira não vale tudo igual. E o produto que mais cresceu em valor na última década não é brita nenhuma — é a areia feita de pedra.</p>\n<h2>Por que a areia industrial cresce</h2>\n<p>A extração de areia natural em rio enfrenta restrição ambiental crescente e distância cada vez maior dos centros consumidores. Resultado: o frete come o preço e a oferta aperta. A areia de brita resolve os dois problemas — nasce dentro da pedreira que já está licenciada e a 40 km da obra.</p>\n<h2>O que faz uma areia boa</h2>\n<p>Concreteira compra curva, não nome: módulo de finura estável, teor de pó controlado e — o diferencial do VSI — <b>grão cúbico</b>. O britador de eixo vertical quebra pedra contra pedra, arredondando arestas; a areia resultante demanda menos água e menos cimento por metro cúbico de concreto. É argumento técnico que vira preço.</p>\n<h2>O circuito típico</h2>\n<p>Pedrisco ou brita 0 alimentando o VSI, peneiramento fino na sequência e, onde o mercado paga areia lavada, o módulo de lavagem com recuperação de finos fecha o circuito — lavando, recuperando o fino que iria embora na água e desaguando numa máquina só.</p>\n<h2>A conta da margem</h2>\n<p>O insumo do VSI é frequentemente o produto de menor giro do pátio (pedrisco encalhado). Transformar o produto que sobra no produto que falta, dentro da mesma planta, é a definição de margem incremental — e é por isso que o estágio de areia costuma ter o payback mais curto da expansão.</p>\n<details><summary>Todo mercado aceita areia de brita?</summary><p>Concreto e asfalto, sim — com especificação técnica a favor. Argamassa de acabamento fino ainda tem praças que preferem a natural; o mapa varia por região, e vale testar com a concreteira local antes de dimensionar o circuito.</p></details>',
  },
  {
    slug: "maior-bloco-gape",
    titulo: "O maior bloco manda na planta: a regra dos 80%",
    cat: "Guia técnico",
    resumo:
      "A medida mais barata e mais ignorada do dimensionamento — e como o desmonte define o custo da britagem antes de a pedra chegar à máquina.",
    capa: "xpe0810-hero",
    data: "2026-06-10",
    leitura: 5,
    tags: ["desmonte", "gape", "primário", "dimensionamento"],
    corpo:
      '<p class="lead">Antes de qualquer catálogo, uma trena na pilha responde a pergunta mais importante do dimensionamento: qual é o maior bloco que o desmonte entrega? É ele que define a boca do primário — e a boca define o porte (e o preço) da máquina mais cara da linha.</p>\n<h2>A regra dos 80%</h2>\n<p>A abertura de alimentação (gape) precisa ser maior que o bloco — e não por pouco. A prática consagrada: <b>o maior bloco deve ocupar no máximo 80% do gape</b>. O bloco precisa descer até a posição de britagem, não apenas caber na abertura. Bloco de 700 mm pede gape de pelo menos 875 mm; medir errado aqui condena a planta a conviver com rompedor hidráulico — hora-máquina e ponteira entrando no custo para sempre.</p>\n<h2>Fragmentar bem é a energia mais barata</h2>\n<p>Cada real investido em plano de fogo bem executado economiza vários na britagem: bloco menor significa primário menor, menos travamento, mais capacidade efetiva. A energia do explosivo custa uma fração da energia elétrica do britador para a mesma fragmentação — <b>a rocha que já chegou quebrada não precisa ser paga de novo na conta de luz</b>.</p>\n<h2>Como medir sem laboratório</h2>\n<p>Fotografe a pilha com um objeto de referência (capacete, pá), meça os cinco maiores blocos visíveis em três desmontes diferentes e trabalhe com o maior valor recorrente — não com a exceção que aparece uma vez por ano (essa é caso de rompedor pontual, não de boca maior). A medição leva uma manhã e trava o dimensionamento inteiro no lugar certo.</p>\n<details><summary>E se o desmonte não é meu (compro rocha de terceiros)?</summary><p>Aí a medição vale dobrado: o contrato de fornecimento deve especificar o top size aceito pela sua boca — senão a divergência vira travamento na sua planta e discussão comercial sem fim.</p></details>',
  },
  {
    slug: "planta-parada-custo",
    titulo: "Máquina parada: quanto custa cada hora e como reagir",
    cat: "Operação",
    resumo:
      "A matemática da parada não programada, a sequência de decisão nas primeiras horas e por que peça programada é seguro, não estoque.",
    capa: "xft1548-hero",
    data: "2026-06-03",
    leitura: 5,
    tags: ["parada", "emergência", "peças", "custo"],
    corpo:
      '<p class="lead">Toda pedreira conhece o silêncio errado — o da planta parada em dia de expedição cheia. O que separa um susto de um prejuízo é o que foi decidido antes de a máquina parar.</p>\n<h2>A conta que ninguém faz até precisar</h2>\n<p>Uma planta de 200 t/h vendendo a R$ 60/t deixa de faturar <b>R$ 12.000 por hora parada</b>. Oito horas de espera por uma peça que não estava no estoque: quase R$ 100 mil que não voltam — mais o frete de urgência, que costuma custar o dobro do frete programado da mesma peça.</p>\n<h2>A sequência das primeiras horas</h2>\n<p><b>1.</b> Diagnóstico antes de desmontar: fotos, medidas, número de série — o fornecedor certo resolve por foto o que o errado resolve em visita. <b>2.</b> Verificar o que existe em estoque próprio e nos parceiros da região. <b>3.</b> Acionar o fornecedor com a informação completa de uma vez (modelo, série, peça, medida) — cada ida-e-volta de pergunta é uma hora de pátio parado. <b>4.</b> Enquanto a peça viaja, preparar a janela: equipe, ferramenta, içamento.</p>\n<h2>O seguro mais barato do setor</h2>\n<p>Os itens que param a planta são conhecidos e listáveis por modelo: jogo de telas, kit de vedações, correias, toggle do primário, filtros. O custo de mantê-los em prateleira é uma fração de uma única parada evitada. <b>Kit programado não é estoque parado — é seguro com prêmio baixo e sinistro certo.</b></p>\n<div class="cta-post"><b>Máquina parada agora?</b> Chame no WhatsApp com foto da peça e número de série — a Lopes & Lopes responde com disponibilidade e prazo na sequência. E depois da urgência, montamos juntos o kit que evita a próxima.</div>',
  },
] as unknown as Post[];

export const postPorSlug = (slug: string) => BLOG.find((p) => p.slug === slug);

export function metaPost(p: Post): string {
  const d = new Date(p.data + "T12:00:00");
  return (
    d.toLocaleDateString("pt-BR", { day: "numeric", month: "long", year: "numeric" }) +
    " · " +
    p.leitura +
    " min de leitura"
  );
}
