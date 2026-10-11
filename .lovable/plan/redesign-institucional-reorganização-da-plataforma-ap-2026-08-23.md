# Redesign institucional + reorganização da plataforma AP

Direção aprovada: **Industrial Premium** — Archivo Black (títulos), Hind (texto), seções full-width alternando escuro/claro, paleta `#01102E` / `#023785` / `#F6AB04` / `#F4F7FB`, mantendo o corte diagonal da marca.

## 1. Nova identidade visual (todo o site)

- Trocar a tipografia: Archivo Black para títulos e Hind para texto (via `<link>` no `__root.tsx`).
- Refinar tokens em `src/styles.css`: azul-noite `#01102E` como fundo institucional, âmbar `#F6AB04` como acento cirúrgico (nunca em blocos grandes), superfícies claras `#F4F7FB`.
- Atualizar header, footer, cards, botões e badges para o novo padrão: seções full-width em faixas alternadas escuro/claro, tipografia grande e pesada, linhas finas de separação, hierarquia clara.
- Micro-interações discretas: reveal on scroll, hover states consistentes, transições suaves.

## 2. Home definida como página institucional flagship

Reestruturar `/` com narrativa completa de marketing:

1. **Hero institucional** — proposta de valor + CTAs (WhatsApp e Central de Britagem).
2. **Barra de números** — prova de autoridade: 72 modelos no catálogo, estoque em BH, atendimento em campo (somente fatos reais, sem inventar métricas).
3. **As 4 portas** (Central, Máquinas, Peças, Pós-venda) — invariante do produto.
4. **Segmentos atendidos** com ícones.
5. **Máquinas em destaque** com corte visual mais forte.
6. **Faixa de peças/cotação rápida** levando ao catálogo.
7. **Blog técnico** (3 últimos artigos).
8. **Bloco de captura** (lead) + CTA final.

## 3. Fim da duplicidade: Peças e Loja viram uma coisa só

- Fundir `/loja` em `/pecas`: o catálogo Shopify (busca, filtros por tipo, paginação) passa a viver dentro de `/pecas`, junto da apresentação institucional de peças de desgaste e da amarração por modelo (da Central).
- Página de produto passa a ser `/pecas/produto/$handle`.
- `/loja` e `/loja/$handle` viram **redirects permanentes** para os novos endereços (preserva links e SEO).
- Menu: remove "Loja", mantém "Peças" como destino único.

## 4. Compra sem checkout: carrinho vira cotação por WhatsApp

- Remover toda a lógica de checkout Shopify (criação de cart no Shopify, `checkoutUrl`, sincronização remota).
- O carrinho vira **"Lista de cotação"** local: cliente monta a lista de peças e o botão **"Pedir cotação no WhatsApp"** abre o WhatsApp com a mensagem já preenchida (nome, código e quantidade de cada item).
- Na página do produto: botões **"Adicionar à cotação"** e **"Cotar agora"** (WhatsApp direto com o código da peça).
- Drawer do carrinho redesenhado como lista de cotação com o novo visual.

## 5. Menu: renomear "Conteúdo" para "Blog"

- Header e footer passam a exibir **"Blog"** apontando para `/conteudo` (rota mantida, só muda o rótulo).

## 6. Imagens: mecanismo simples para você adicionar as fotos reais

Sem geração de imagens. Em vez disso:

- Convenção documentada: você envia a foto no chat (ou sobe o arquivo) dizendo o modelo — ex.: "foto do XGY1100" — e ela entra automaticamente no modelo certo.
- Registro central `src/data/central/fotos.ts`: mapa `id do modelo → foto`. Vazio hoje; cada foto sua é adicionada ali.
- Ordem de exibição em todos os cards/páginas de modelo: **foto real que você enviou → imagem original do catálogo → imagem da família** (fallback que já existe). Assim nenhum card fica sem imagem, e suas fotos assumem a prioridade assim que entram.
- Peças da loja continuam usando as fotos cadastradas na sua loja Shopify (você gerencia por lá).

## 7. Auditoria completa de lógica e funcionalidades

Revisão ponta a ponta com correção do que aparecer:

- Simulador de britagem (7 perguntas → linha recomendada → link compartilhável).
- Estimador granulométrico (régua APF) e curvas de produto.
- Comparador de modelos (seleção, barra, página de comparação).
- Busca global (overlay) — cobertura de modelos, peças, blog e páginas.
- Captura de leads (formulário, validação, honeypot, gravação no banco) e painel `/equipe/leads`.
- Lista de cotação (novo fluxo WhatsApp) em desktop e mobile.
- Sitemap, metadados de SEO de todas as rotas, redirects legados de hash.
- Verificação de duplicidades restantes e build limpo.

## 8. Técnicas de marketing aplicadas

- Botão flutuante de WhatsApp global (com label contextual por página).
- CTAs contextuais em todas as páginas (cada página termina com próximo passo claro).
- Faixa de urgência "Equipamento parado?" já existente — integrada ao novo design.
- Lead magnets: simulador e estimador promovidos na home como ferramentas gratuitas.
- SEO técnico: metadados únicos por rota, heading hierarchy correta, alt texts, dados estruturados.
- **Sem reviews ou depoimentos fabricados** — prova de autoridade apenas com fatos reais (representação XCMG, estoque local, campo).

## Detalhes técnicos

- Fontes: `Archivo Black` + `Hind` via Google Fonts `<link>` em `__root.tsx` (nunca `@import` remoto no CSS).
- Tokens em `src/styles.css` com `@theme inline` (Tailwind v4), valores oklch.
- Rotas novas: `pecas.index.tsx` (fusão), `pecas.produto.$handle.tsx`; redirects em `loja.index.tsx` e `loja.$handle.tsx` via `redirect()` do TanStack Router.
- `cartStore.ts` simplificado: estado local persistido (zustand/persist), sem chamadas à API de cart do Shopify; `useCartSync` removido do `__root.tsx`.
- Mensagem de cotação montada com `zapLink()` (helper existente em `src/lib/ap.ts`).
- `src/lib/shopify.ts` mantém apenas leitura (produtos, busca, tipos, produto por handle).
- Cada rota mantém `head()` próprio com title/description/og distintos.
