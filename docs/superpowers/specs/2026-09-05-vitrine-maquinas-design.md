# Vitrine de máquinas da home — acordeão horizontal

Data: 2026-09-05 · Status: aprovado pelo usuário (chat)

## Objetivo

Preencher a área reservada da home (abaixo do hero) com um resumo mesclado do
portfólio — mineração + linha amarela — em 4 painéis com efeito expansivo.

## Conteúdo

4 categorias × 2 modelos cada:

| Categoria | Modelos | Fotos | Link |
|---|---|---|---|
| Britadores | XPE0912 (mandíbula · primário), XPY1300 (cone · secundário) | IMG `xpe0912-hero`, `xpy1300-hero` | `/central/catalogo?tipo=britador` |
| Peneiras | XFT1548 (horizontal), XFY2160K (banana) | IMG `xft1548-hero`, `xfy2160k-hero` | `/central/catalogo?tipo=peneira` |
| Caminhões elétricos | XDE130 (elétrico-diesel), E729R (pipa 100% elétrico) | placeholder até fotos | `/maquinas/catalogo?linha=Mineração · fora de estrada` |
| Carregadeiras | XC968-EV (18,8 t · zero diesel), LW500FV (5,0 t) | placeholder até fotos | `/maquinas/catalogo?linha=Carregadeiras` |

Prioridade de imagem por modelo: `fotoReal(slug)` (registro `FOTOS`) → `IMG[id-hero]`
→ silhueta `IconeLinha` sobre fundo `ap-noite`. Fotos enviadas depois entram sem
alterar o componente (basta registrar em `fotos.ts`).

## Interação

- **Desktop (`lg+`)**: 4 painéis em linha (`flex-basis 0`); o ativo (hover,
  focus-within ou clique) vai a `flex-grow 2.6`, vizinhos permanecem `1`.
  Transição de `flex` ~500ms. Painel revelado (2 modelos + descrições + link)
  faz fade-in sobre gradiente escuro na base do card.
- **Mobile (`<lg`)**: painéis empilhados; cabeçalho do card é `<button
  aria-expanded aria-controls>`; toque alterna expansão vertical animada via
  `grid-template-rows 0fr→1fr` (altura automática — nada é cortado).
- **Acessibilidade**: expansão por teclado (focus), `prefers-reduced-motion`
  remove transições (`motion-reduce:`), links reais dentro da expansão,
  contraste AA sobre `ap-noite`.

## Visual

Cards escuros `bg-ap-noite` na linguagem do hero: foto com overlay em
gradiente, numeração 01–04 em Archivo Black, título branco, fio âmbar no
ativo. Cabeçalho da seção: eyebrow "Portfólio", h2 "Mineração e linha
amarela, num resumo", link "Ver tudo" para o catálogo.

## Técnica

- Novo `src/components/site/VitrineMaquinas.tsx` (dados + card no mesmo arquivo).
- Estado `ativa: number | null` (React); sem dependências novas.
- Substitui a `<section aria-label="Seção em construção">` de `src/routes/index.tsx`.
- Verificação: `tsc --noEmit`, conferência visual nos 3 breakpoints.
