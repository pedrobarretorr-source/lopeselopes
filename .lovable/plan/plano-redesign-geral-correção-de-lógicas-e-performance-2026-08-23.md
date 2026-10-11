# Plano — Redesign geral, correção de lógicas e performance

## Diagnóstico confirmado (bug real encontrado)

**Filtros de máquinas com lógica errada — confirmado no código:**
- A operação **"Britar e classificar"** (`op: "britar"`) existe em `OPS`, mas **nenhum modelo** em `MODELOS` pertence a ela. Resultado: no hub `/maquinas` o card mostra "0 modelos" e leva a um catálogo vazio; no catálogo `/maquinas/catalogo` o chip "Britar e classificar" zera a lista.
- O campo `central: true` existe nos dados mas **nunca é usado** — era para desviar essa operação para a Central de Britagem.
- No catálogo, é possível combinar filtros incompatíveis (ex.: operação "Escavar" + linha "Guindastes") que resultam em lista vazia sem explicação.

**Estado geral:** build OK, zero erros de runtime. Home, `/pecas` e header já seguem o padrão industrial premium; as demais páginas (máquinas, blog, pós-venda, central, quem-somos, segmentos) ainda estão no layout simples anterior.

## 1. Correção das lógicas (prioridade)

- **Filtros de máquinas:** excluir operações com `central: true` dos chips do catálogo de linha amarela; no hub, o card "Britar e classificar" passa a levar para `/central` com contagem real de modelos da Central (67). Ao selecionar uma operação, desabilitar/ocultar linhas incompatíveis (e vice-versa) e mostrar estado vazio com botão "Limpar filtros".
- **Revisão funcional completa** (verificação no preview após as mudanças): busca global, comparador (adicionar/remover/limpar), simulador (fluxo completo + link compartilhável), estimador APF, lista de cotação (adicionar, quantidades, mensagem WhatsApp), formulários de lead, redirects `/loja` → `/pecas`, páginas de modelo/família/etapa da Central.

## 2. Páginas de máquinas — redesign industrial premium

- **Hub `/maquinas`:** hero escuro (`ap-noite`) com eyebrow âmbar, destaque XE215BR em card grande com corte diagonal, grid de operações com ícones e contagem correta, linhas como chips.
- **Catálogo `/maquinas/catalogo`:** cards redesenhados (ícone da operação, badges Elétrica/Nova geração, hover com borda âmbar), barra de filtros fixa e legível, contador de resultados.
- **XE215BR:** revisar e alinhar ao padrão (hero escuro, ficha técnica em tabela, CTA âmbar).

## 3. Pós-venda interativo

Transformar a página estática em experiência interativa:

- **Calculadora de custo de máquina parada:** usuário informa produção/hora e margem por tonelada → mostra quanto custa cada dia parado e compara com o plano de manutenção. Fecha com CTA "Acionar suporte".
- **Linha do tempo do plano de manutenção:** trilha visual interativa (250h → 500h → 1000h…) mostrando o que é trocado em cada intervalo.
- **Pilares em acordeão/abas** em vez de 6 cards estáticos, com CTA contextual em cada um.
- **FAQ** com perguntas reais de pós-venda (garantia, prazo de peça, atendimento fora de BH).

## 4. Blog — design e disposição

- **Índice `/conteudo`:** post mais recente em destaque grande (hero editorial), demais em grade; chips de categoria refinados; tempo de leitura e data visíveis.
- **Página do artigo:** tipografia de leitura (medida ~65 caracteres, hierarquia clara), barra de progresso de leitura, índice lateral (sumário dos h2) em desktop, "Leia também" em cards com categoria, CTA de WhatsApp contextual por assunto do artigo.

## 5. Menu / navegação

- **Menu mobile com gaveta (hambúrguer):** hoje a navegação depende de rolagem horizontal; criar drawer com os 4 itens + busca + CTA de urgência.
- Header: estados ativos mais claros, item "Blog" (já renomeado), dropdown acessível se necessário. Manter barra de urgência.

## 6. Design geral das demais páginas

Aplicar o padrão industrial premium (fundo `ap-noite` nos heros, Archivo Black nos títulos, âmbar nos CTAs, corte diagonal) de forma consistente em: Central (home, catálogo, modelo, família, comparador, simulador), `quem-somos`, `segmentos`, `linha-amarela` e `sitemap`. Ajustes de espaçamento, hierarquia e densidade — sem mudar conteúdo nem lógica de dados.

## 7. Performance (site rápido, sem delay)

- Auditoria do bundle: dados estáticos grandes (`catalogo.ts`, `blog.ts`) — avaliar code splitting por rota (TanStack já divide por rota; garantir que a Home não carregue o catálogo inteiro da Central).
- Imagens: `loading="lazy"` + dimensões explícitas em todas as imagens abaixo da dobra; otimizar hero.
- Consultas Shopify: cache já configurado (staleTime 10 min); revisar paginação e prefetch de produto ao passar o mouse no card.
- Fontes: `display=swap` já ativo; pré-carregar Archivo Black.
- Medição antes/depois no preview (tempo de carregamento inicial e navegação entre rotas).

## Detalhes técnicos

- Arquivos principais: `src/routes/maquinas.index.tsx`, `maquinas.catalogo.tsx`, `maquinas.xe215br.tsx`, `conteudo.index.tsx`, `conteudo.$slug.tsx`, `pos-venda.tsx`, `src/components/layout/SiteHeader.tsx`, `src/data/site.ts` (sem mudar dados, só consumo do flag `central`).
- Novos componentes: `MenuMobile.tsx`, `CalculadoraParada.tsx`, `ProgressoLeitura.tsx`, `SumarioArtigo.tsx`.
- Nenhuma mudança de backend, leads ou Shopify (somente leitura já existente).
- Ordem de execução: (1) correções de lógica → (2) menu → (3) máquinas → (4) pós-venda → (5) blog → (6) demais páginas → (7) performance + verificação final com Playwright.
