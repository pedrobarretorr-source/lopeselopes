# Catálogo de máquinas: design profissional + página por modelo

## O que será feito

### 1. Filtros: de duas fileiras de chips para um painel único
- Hoje existem duas fileiras de chips (Operação + Linha) ocupando meia tela — visual poluído e confuso.
- Novo padrão: **barra de filtro única e compacta**, fixa no topo da lista:
  - Dois seletores elegantes ("O que você precisa fazer?" → operação · "Linha" → equipamento), com contagem de modelos por opção.
  - No desktop os seletores ficam lado a lado na barra; no mobile abrem como painel deslizante.
  - Filtro ativo vira uma etiqueta âmbar removível + contador de resultados + "Limpar".
- A lógica de compatibilidade (operação "Britar" nunca gera lista vazia) é mantida — só muda a apresentação.

### 2. Cards do catálogo mais profissionais
- Card redesenhado: painel escuro `#01102E` com o ícone da linha em destaque (ou foto real, quando houver), código do modelo em Archivo Black, classe/descrição, selos (Elétrica / Nova geração) e botão **"Ver detalhes"**.
- O botão "Cotar pelo WhatsApp" **sai do card** — a cotação acontece na página do modelo, depois da apresentação.

### 3. Página individual para cada máquina (`/maquinas/modelo/<codigo>`)
Nova rota dinâmica para os 28 modelos, alimentada por um módulo de dados enriquecido (`src/data/maquinas-detalhes.ts`):
- **Hero escuro** com eyebrow da linha, nome do modelo, promessa de uso e selo "Representação XCMG · Minas Gerais".
- **Apresentação**: texto de posicionamento + 3–4 destaques do modelo (por que esse modelo, para qual operação).
- **Tabela de especificações** de referência (classe, potência, capacidade) — sinalizada como "valores de referência, configuração final conforme pedido".
- **Aplicações típicas** (pedreira, obra, agro…) ligando aos segmentos do site.
- **Só então o botão de cotação** (WhatsApp + formulário de lead via BlocoCaptura).
- Fotos: mesmo esquema da Central — registro manual em `fotos.ts` com prioridade Manual > painel de marca (SVG). Quando você subir a foto real, ela aparece automaticamente.
- A XE215BR (única página rica hoje) vira conteúdo-âncora dentro do novo sistema; a URL antiga `/maquinas/xe215br` redireciona para a nova.
- A "Linha de perfuratrizes" (que é uma família, não modelo) ganha página no formato "sob consulta".
- SEO: cada página com título/descrição próprios, `og:type: product` e dados estruturados (schema.org Product) — 28 novas páginas indexáveis no Google.

### 4. Reforço de marca: XCMG + Minas Gerais
- Hero do catálogo e de cada modelo com a linha "Representação XCMG em Minas Gerais" (selo/ba<rra de autoridade).
- Faixa de autoridade no catálogo: estoque de peças em BH, atendimento em campo em MG, pós-venda AP.

### 5. Ajustes finos
- Sitemap atualizado com as novas páginas de modelo.
- Hub `/maquinas` passa a apontar os cards para as páginas de modelo quando fizer sentido.
- Verificação completa: build, navegação mobile/desktop, filtros, redirects e páginas de modelo testadas no navegador.

## Detalhes técnicos
- Nova rota: `src/routes/maquinas.modelo.$cod.tsx` (dados via loader, sem delay).
- Novo dado: `src/data/maquinas-detalhes.ts` — um objeto por modelo (tagline, apresentação, destaques, specs, aplicações); modelos sem ficha detalhada recebem apresentação gerada a partir da linha + descrição existente, sem inventar números.
- Reescrita de `src/routes/maquinas.catalogo.tsx` (barra de filtro única + cards novos).
- `src/routes/maquinas.xe215br.tsx` vira redirect permanente; conteúdo migrado para o módulo de dados.
- Extensão de `src/data/central/fotos.ts` para aceitar fotos da linha amarela.
- Atualização de `src/routes/sitemap.tsx`.
- Zero impacto no bundle inicial: página de modelo carrega só os dados do modelo visitado.
