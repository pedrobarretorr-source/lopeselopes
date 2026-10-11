# Plataforma AP Peças & Máquinas — migração completa para app web

Migrar os dois protótipos single-file (site institucional + Central de Britagem) para uma aplicação web real com rotas indexáveis, preservando as invariantes de produto do documento técnico, e ativar banco de leads próprio via Lovable Cloud.

## 1. Extração de conteúdo (fundação)

- Extrair dos HTMLs enviados todos os dados estruturados e convertê-los em módulos TypeScript tipados e versionados:
  - **Central**: 67 modelos (specs, famílias, etapas, presets de rocha, tabelas APF), peças/kits/sistemas, 11 posts do blog.
  - **Site único**: segmentos (pedreira/mineração/construção), catálogo de 28 modelos da linha amarela, textos das 4 portas.
- Extrair as ~46 imagens base64 embutidas para arquivos de imagem hospedados como assets (fora do bundle JS).
- Manter a regra "specs sem confirmação viram consulta por WhatsApp" (não inventar números).

## 2. Identidade visual (invariante 8)

- Tokens no CSS global: azul `#023785`, azul escuro, âmbar `#F6AB04`, corte diagonal (`clip-path`), fonte Archivo, selo ⚡ para elétricos.
- Layout mobile-first de campo: WhatsApp ao alcance do polegar, telefone clicável, nada dependente de hover.

## 3. Rotas reais (substituindo hash-routing — o problema nº 1 de SEO)

```text
/                        Home institucional (4 portas + urgência + captura)
/segmentos/$seg          pedreiras | mineracao | construcao (SEO de cauda longa)
/maquinas                Hub Máquinas AP (linha amarela, 28 modelos)
/maquinas/$linha/$mod    Fichas indexáveis da linha amarela
/central                 Central de Britagem (home por etapa da operação)
/central/catalogo        Catálogo completo (67 modelos, filtros)
/central/familia/$fam    Página de família (tabela, curva granulométrica, desgaste)
/central/modelo/$id      Ficha + estimador granulométrico por APF
/central/simulador       Simulador de 7 perguntas com gate de lead
/central/pecas           Peças e kits por sistema
/central/comparar        Comparador (até 3 modelos)
/pecas                   Hub de peças (britagem · linha amarela · outras marcas)
/pos-venda               Escada: Reposição Rápida → Kit Programado → Plano AP
/conteudo                Blog (hub)
/conteudo/$slug          Os 11 posts migrados
/quem-somos              Institucional
```

- Cada rota com `head()` próprio (title, description, og, twitter) em pt-BR; `sitemap.xml`, `robots.txt` e schema.org (Organization, Product, BreadcrumbList, Article).
- Compatibilidade: links antigos com `#/...` redirecionam para as rotas novas.

## 4. Funcionalidades migradas

- **Simulador**: motor de recomendação (rocha × top size × produção × produtos → linha primário/secundário/classificação; calcário prioriza impacto; capacidade real = catálogo × fator da rocha). Resultado declarado como "ponto de partida comercial" — nunca promessa de engenharia.
- **Gate de lead**: nome, empresa, telefone obrigatórios + CNPJ com validação de dígito verificador; contrato do link compartilhável preservado (quem abre link compartilhado pula o gate e não vê dados do remetente).
- **Estimador granulométrico** por APF nas fichas (mandíbula, cone, impacto, giratório).
- **Comparador** lado a lado (até 3 modelos), com CTA de WhatsApp.
- **Busca global** com normalização de acentos (modelos, famílias, peças, posts).
- **Urgência onipresente**: "equipamento parado" em 1 clique de qualquer tela → wa.me pré-preenchido (31 99516-5511).
- **Captura dupla em toda página**: WhatsApp (rápido) + formulário (planejado). Nenhuma página é beco sem saída.

## 5. Backend de leads (Lovable Cloud)

- Ativar Lovable Cloud; criar tabela `leads` (nome, empresa, telefone, CNPJ, consentimento LGPD, origem/UTM, payload da simulação, timestamps).
- Formulários e gate do simulador gravam no banco via função de servidor (sem expor dados: INSERT público, leitura restrita).
- Consentimento explícito e finalidade declarada no formulário (LGPD); CNPJ fora de qualquer analytics.
- Página interna simples para a equipe consultar os leads capturados.
- Integração Pipedrive fica como evolução posterior (requer chave de API) — o banco já guarda tudo para sync futuro.

## Ordem de execução

1. Extrair dados/imagens → módulos tipados + tokens de design + layout raiz (header 4 portas, barra de urgência, footer).
2. Central de Britagem completa (catálogo → família → modelo → simulador → peças → comparar).
3. Rotas institucionais (home, segmentos, máquinas, peças, pós-venda, conteúdo, quem-somos) + busca + redirects de hash.
4. Lovable Cloud + captura de leads + LGPD.
5. SEO final: heads por rota, sitemap, schema.org, verificação no preview.

## Fora de escopo nesta fase

Integração Pipedrive, loja Shopify, ERP Fácil Sistemas, Plano AP (cérebro por horímetro), analytics GA4 — todos previstos no roadmap do documento como fases seguintes.
