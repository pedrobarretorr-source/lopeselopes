# Remover localização (MG/BH) e blindar comunicação contra perfil de dealer

## Contexto

A AP atende todo o Brasil e não deve especificar localização. Por contrato PJ, também não pode se comunicar como distribuidor/dealer. Hoje há 30+ citações de "Minas Gerais", "Belo Horizonte", "MG" e "BH" espalhadas por textos visíveis e metadados SEO — todas serão substituídas por linguagem de alcance nacional e neutra.

Citações de "representante/distribuidor XCMG" já foram removidas na rodada anterior (confirmado por varredura: zero ocorrências). Esta rodada remove a localização.

## O que muda

### 1. Substituir toda menção de localização por alcance nacional

Padrões de substituição:
- "em Minas Gerais" / "em MG" / "em todo o estado" → "em todo o Brasil" / "atendimento nacional"
- "Estoque em Belo Horizonte" / "estoque em BH/MG" → "estoque próprio a pronta entrega" ou "envio para todo o Brasil"
- "sede em Belo Horizonte" → removido (sem especificar cidade)
- FAQ "Vocês atendem fora de Belo Horizonte?" → reescrita como pergunta sobre cobertura nacional

### 2. Arquivos afetados (17)

| Arquivo | O que muda |
|---|---|
| `src/components/layout/SiteHeader.tsx` | Barra de urgência: "Belo Horizonte · atendimento em toda MG" → mensagem nacional (ex.: "Atendimento em todo o Brasil") |
| `src/components/layout/SiteFooter.tsx` | Rodapé: remove "· Belo Horizonte · MG" e "Belo Horizonte, MG" |
| `src/routes/__root.tsx` | Meta global (title, description, og) — remove "em Minas Gerais", "em MG", "Belo Horizonte" |
| `src/routes/index.tsx` | Meta, stat "BH/estoque próprio em MG", card pós-venda "Técnico em campo em MG", eyebrow "Pós-venda em MG" |
| `src/routes/quem-somos.tsx` | Title/description/og, parágrafo "sede em Belo Horizonte…", stat ["MG", "Sede em Belo Horizonte…"] → stat de alcance nacional |
| `src/routes/pos-venda.tsx` | Meta, card "técnicos… Minas Gerais e região", "estoque em Belo Horizonte", 2 FAQs (cobertura e prateleira em BH) |
| `src/routes/maquinas.index.tsx` | Meta ×2, texto "da AP em Minas Gerais" |
| `src/routes/maquinas.catalogo.tsx` | Meta ×3, bullets de confiança "Estoque de peças em Belo Horizonte" e "Atendimento em campo em todo o estado" |
| `src/routes/maquinas.modelo.$cod.tsx` | Title/description dinâmicos, bullet "Atendimento em toda Minas Gerais", sub do CTA "equipe AP em Minas Gerais" |
| `src/routes/pecas.index.tsx` | Meta ×2 ("Estoque em Belo Horizonte") |
| `src/routes/pecas.produto.$handle.tsx` | Meta "equipe AP em Minas Gerais" |
| `src/routes/central.index.tsx` | Meta ×2, h2 "com estoque em MG" |
| `src/routes/central.pecas.tsx` | Meta ×2 ("Estoque em Belo Horizonte", "estoque em MG") |
| `src/routes/central.pecas.$sis.$modelo.tsx` | Meta "com a AP em Belo Horizonte", sub "estoque em BH" |
| `src/routes/central.modelo.$id.tsx` | "com estoque em Belo Horizonte" |
| `src/data/maquinas-detalhes.ts` | Bloco "Pós-venda AP em MG" (título + texto) e linha 426 "reposição… pela AP em Minas Gerais" |
| `src/data/central/simulador.ts` | Descrição de rocha "a mais comum em MG" → "a mais comum no Brasil" |

### 3. O que NÃO muda

- Número de WhatsApp (telefone não é citação de localização)
- Menções a "Brasil/brasileiro" em contexto de produto (ex.: "XE215BR feita para o Brasil", "Catálogo Brasil" nas notas técnicas) — são escopo nacional, não regional
- Nomes técnicos de peças ("Distribuidor de alimentação" — componente mecânico, não claim comercial)
- XCMG como marca de produto

### 4. Memória do projeto

Atualizar a regra permanente: **proibido citar Minas Gerais, Belo Horizonte, MG ou BH** — escopo é sempre nacional ("todo o Brasil"); e reforçar a proibição de se comunicar como distribuidor/dealer/representante oficial XCMG (contrato PJ), mantendo apenas "especializada em equipamentos XCMG".

## Verificação

1. `rg` final confirmando zero ocorrências de "Minas Gerais", "Belo Horizonte", "MG", "BH" em textos e metas
2. Build limpo
3. Playwright: home, quem-somos, pós-venda e uma página de modelo renderizando com os novos textos nacionais
