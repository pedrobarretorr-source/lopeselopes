# Configurador de Plano de Manutenção no Pós-venda

## Objetivo
Transformar a seção de manutenção da página `/pos-venda` em um configurador interativo que replica a lógica do documento da fábrica (PLANO_DE_MANUTENÇÃO_-_FILTROS.xlsx): o cliente escolhe **família → modelo → intervalo de horas**, vê o kit de filtros correspondente e cota pelo WhatsApp — com captura de lead no banco antes/durante o envio.

## O que o documento da fábrica contém (extração)
- **16 famílias**: Escavadeira (27 modelos), Carregadeira (24), Empilhadeira (18), Guindaste (8), Caminhão (9), Rolo (7), Retroescavadeira (6), Trator (6), Motoniveladora (5), Manipulador Telescópico (5), Plataforma (11), Fresadora (2), Recicladora (2), Reach Stacker (1), Pavimentadora (1), Máquinas Antigas (21).
- **153 modelos**, cada um com tabela de itens: grupo (Motor / Hidráulico / Ar condicionado), descrição, código XCMG, códigos substitutos, quantidade e marcação de troca nos intervalos **100h / 500h / 1.000h / 1.500h / 2.000h**, além de "quantidade de trocas até 1.000h / 2.000h".
- Observações: "Máquinas Antigas" não tem colunas de intervalo (só códigos — serão exibidas como "kit de referência, cotar por item"). Aba "Fluidos" está vazia e a de "Ar Condicionado" é referência cruzada — o ar-condicionado já aparece como grupo dentro dos modelos, então essas duas abas não viram passo separado.

## Estrutura da solução

### 1. Dados — `src/data/planos/`
Script de extração (Python) converte o xlsx em módulos TypeScript tipados, **um arquivo por família** (`escavadeira.ts`, `carregadeira.ts`, ...) + `index.ts` leve com a lista de famílias (nome, ícone, nº de modelos). O configurador carrega a família sob demanda via `import()` dinâmico — mesmo padrão do BuscaOverlay, mantendo o bundle inicial rápido.

```text
src/data/planos/
  index.ts            -> famílias: slug, nome, icone, totalModelos
  escavadeira.ts      -> modelos + itens (grupo, descricao, codigo, substitutos, qtd, intervalos)
  carregadeira.ts
  ... (16 arquivos)
```

### 2. Componente — `src/components/pos-venda/ConfiguradorPlano.tsx`
Fluxo em etapas, fiel ao documento da fábrica:

1. **Passo 1 — Família**: grade de cartões (estilo "menu" da planilha) com ícone da linha e nome.
2. **Passo 2 — Modelo**: lista rolável com busca instantânea (ex.: digitar "xe215" filtra). Mostra motor/chassi quando consta no título.
3. **Passo 3 — Intervalo**: seletor de horas (100h / 500h / 1.000h / 1.500h / 2.000h / "Kit completo até 2.000h").
4. **Resultado — Kit do plano**: tabela agrupada (Motor, Hidráulico, Ar condicionado) com descrição, código, quantidade e marcação dos intervalos; rodapé com total de itens.
5. **Cotação + lead**: botão "Cotar este plano pelo WhatsApp" que abre mini-formulário (nome, empresa, telefone/WhatsApp). Ao enviar:
   - grava lead via `submitLead` existente com `origem: "plano-manutencao"` e o payload `simulacao` contendo família, modelo, intervalo e itens do kit;
   - abre o WhatsApp com mensagem montada: modelo, intervalo e lista dos itens (qtd × descrição — código).
   - botão secundário "só chamar no WhatsApp" para quem não quer deixar dados.

Trilha de progresso no topo (1 Família → 2 Modelo → 3 Intervalo → Kit) com botão voltar em cada etapa. Mobile-first, visual industrial premium (ap-noite/âmbar, Archivo Black/Hind).

### 3. Página `/pos-venda` (`src/routes/pos-venda.tsx`)
- Substituir a seção estática `TrilhaManutencao` pelo `ConfiguradorPlano` (a trilha genérica 250h/500h... sai de cena — o configurador é a versão real, com dados de fábrica).
- Atualizar título/descrição da seção: "Monte o plano de manutenção da sua máquina" + eyebrow "Dados de fábrica XCMG".
- Atualizar `head()` da rota mencionando o configurador de plano de manutenção.
- Demais seções (calculadora de parada, pilares, FAQ, BlocoCaptura) permanecem.

## Regras respeitadas
- Sem checkout/e-commerce: cotação é sempre WhatsApp + lead no banco.
- Sem citar localização (MG/BH) nem perfil de distribuidor/representante XCMG — textos neutros ("dados de fábrica", "kit genuíno").
- Performance: dados pesados só carregam quando o cliente escolhe a família.

## Verificação
- Build limpo + Playwright: fluxo completo família → modelo → intervalo → kit → envio do lead (conferir registro na tabela `leads` com payload correto) e mensagem do WhatsApp montada; testar modelo antigo (sem intervalos) e busca de modelo.
