# Remover citações de representação XCMG + novo design do cabeçalho e menu

## Objetivo

1. Eliminar do site inteiro (telas e metadados SEO) qualquer citação a "Distribuidor XCMG · Minas Gerais", "Representação XCMG · Minas Gerais" e variações ("distribuidora XCMG", "representante XCMG", "Distribuidor oficial/autorizado").
2. Redesenhar o cabeçalho e o menu mobile com acabamento mais profissional, mantendo a identidade industrial premium (azul-noite + âmbar, Archivo Black/Hind).

Menções a XCMG como **marca de produto** (nomes de máquinas, "garantia de fábrica XCMG", peças genuínas) permanecem — são fatos de catálogo, não declaração de representação.

## Parte 1 — Remoção das citações (11 pontos em 8 arquivos)

| Arquivo | Trecho atual | Substituição |
|---|---|---|
| `SiteHeader.tsx` (barra de urgência) | "Representação XCMG · Minas Gerais" | "Belo Horizonte · atendimento em toda MG" |
| `index.tsx` (eyebrow do hero) | "Distribuidor XCMG · Minas Gerais" | "Máquinas · Peças · Pós-venda em MG" |
| `index.tsx` (diferencial 1) | "Distribuidor XCMG autorizado" / desc | "Peças genuínas e garantia de fábrica" / desc sem claim de distribuidor |
| `index.tsx` (metas) | title/desc/og com "Distribuidor XCMG em Minas Gerais" | Reescritos sem o claim |
| `quem-somos.tsx` | título, description, og, parágrafo 1 ("é distribuidora XCMG em Minas Gerais") e stat ["XCMG", "Distribuidor oficial..."] | "especializada em equipamentos XCMG em MG"; stat vira "Linha completa da maior fabricante da China" |
| `maquinas.catalogo.tsx` | eyebrow "Representação XCMG · Minas Gerais" + meta "representante XCMG em Minas Gerais" | eyebrow "Linha amarela · catálogo completo"; meta sem claim |
| `maquinas.modelo.$cod.tsx` | selo "Representação XCMG · Minas Gerais" | selo "Atendimento em toda Minas Gerais" |
| `central.index.tsx` (meta) | "Representação AP em MG" | "Atendimento AP em MG" |
| `__root.tsx` (metas globais) | "XCMG em Minas Gerais" no title/og | "Equipamentos, peças e pós-venda em Minas Gerais" |

Menções em `src/data/central/pecas.ts` ("Placa distribuidora", "Distribuidor de alimentação") são **nomes de peças** — ficam intactas.

## Parte 2 — Novo cabeçalho (`SiteHeader.tsx`)

```text
┌──────────────────────────────────────────────────────────────┐
│ BH · atendimento em toda MG      ⚡ Equipamento parado? →    │  strip fino
├──────────────────────────────────────────────────────────────┤
│ [AP] AP PEÇAS & MÁQUINAS    Máquinas Peças Pós-venda Blog 🔍🛒│
│      Equipamentos · Peças · Pós-venda  ▂▂ indicador âmbar     │
└──────────────────────────────────────────────────────────────┘
```

- **Strip de urgência**: mais fino (`py-1`), texto à esquerda neutro; CTA âmbar de máquina parada permanece à direita.
- **Sticky refinado**: ao rolar, o header ganha `backdrop-blur` + fundo azul-noite/95 e sombra suave, substituindo a sombra pesada atual (listener de scroll com `useEffect` + estado `scrolled`).
- **Navegação desktop**: abandona o "pill" cheio; item ativo ganha **indicador âmbar sublinhado** (barra de 2px) + texto branco; hover com sublinhado animado (transição de largura). Mais institucional e menos "botão".
- **Ações**: busca e cotação (carrinho) como botões-ícone de 40px com hover circular; badge da lista de cotação em âmbar sólido com contagem.
- **Filete âmbar**: a faixa grossa de 4px vira filete de 2px em gradiente âmbar → transparente, mais elegante.
- **Logo**: mantém logo branca + lockup, com espaçamento e tracking refinados.

## Parte 3 — Menu mobile (`MenuMobile.tsx`)

- Remover qualquer vestígio da citação (não há hoje, confirmar).
- Header da gaveta com a logo branca no lugar do texto "Menu".
- Itens numerados (01–04) estilo industrial, alvos de toque maiores, ativo com filete âmbar lateral em vez de bloco cheio.
- Rodapé da gaveta: CTA de urgência (mantido) + telefone/WhatsApp clicável.

## Verificação

1. `rg -i "distribuidor|representante|representação" src/` — zero ocorrências fora de nomes de peças.
2. Build OK em `/tmp/observability/build-errors.log`.
3. Playwright: screenshots do header desktop (topo + após scroll), menu mobile aberto, home, /quem-somos, /maquinas/catalogo e /maquinas/modelo/xe215br — conferindo ausência das frases e o novo visual.
4. Atualizar a memória do projeto: remover a regra que pedia branding "Representação XCMG · Minas Gerais" e registrar a proibição.
