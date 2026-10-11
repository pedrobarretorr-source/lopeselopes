import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { BlocoCaptura } from "@/components/BlocoCaptura";
import { CalculadoraParada } from "@/components/pos-venda/CalculadoraParada";
import { TrilhaManutencao } from "@/components/pos-venda/TrilhaManutencao";
import { zapLink } from "@/lib/ap";

export const Route = createFileRoute("/pos-venda")({
  head: () => ({
    meta: [
      { title: "Pós-venda Lopes & Lopes — assistência em campo, garantia e telemetria" },
      {
        name: "description",
        content:
          "O pós-venda que atende o telefone: assistência técnica em campo em todo o Brasil, garantia XCMG, planos de manutenção e telemetria de frota.",
      },
      { property: "og:title", content: "Pós-venda Lopes & Lopes" },
      {
        property: "og:description",
        content: "Assistência em campo, garantia XCMG e telemetria de frota.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PosVendaPage,
});

const PILARES = [
  {
    h: "Assistência em campo",
    p: "Técnicos próprios atendendo em todo o Brasil. Diagnóstico no seu canteiro, não na fila de uma oficina distante.",
    zap: "Olá! Preciso de assistência técnica em campo.",
  },
  {
    h: "Garantia XCMG",
    p: "Gestão completa da garantia de fábrica: a Lopes & Lopes abre, acompanha e fecha o chamado. Você não fala com call center, fala com quem vendeu a máquina.",
    zap: "Olá! Preciso acionar a garantia XCMG.",
  },
  {
    h: "Planos de manutenção",
    p: "Pacotes por intervalo de horas com peças e mão de obra programadas — a parada acontece quando você escolhe, não quando a máquina decide.",
    zap: "Olá! Quero um plano de manutenção programada.",
  },
  {
    h: "Telemetria",
    p: "Acompanhamento remoto de horas, localização e alertas. A Lopes & Lopes liga para você antes do problema, não depois.",
    zap: "Olá! Quero saber mais sobre telemetria de frota.",
  },
  {
    h: "Peças com estoque",
    p: "Desgaste e manutenção programada com estoque próprio a pronta entrega. O que não está na prateleira, entra em importação assistida.",
    zap: "Olá! Preciso de peças com prazo de entrega.",
  },
  {
    h: "Treinamento de operador",
    p: "Entrega técnica e treinamento na operação: a máquina rende mais e quebra menos quando quem opera conhece o equipamento.",
    zap: "Olá! Quero treinamento para meus operadores.",
  },
];

const FAQ = [
  {
    q: "Vocês atendem outras regiões do país?",
    a: "Sim. A assistência em campo cobre todo o Brasil. O deslocamento é planejado pela telemetria: em muitos casos o técnico já chega com a peça certa.",
  },
  {
    q: "Como funciona a garantia XCMG?",
    a: "A Lopes & Lopes cuida de todo o processo: abre o chamado na fábrica, acompanha a análise e executa o reparo. Você não precisa falar com call center nem preencher formulário em inglês.",
  },
  {
    q: "Qual o prazo para uma peça que não está em estoque?",
    a: "Peças de desgaste e manutenção programada costumam estar na prateleira, a pronta entrega. Itens de importação entram no fluxo de importação assistida da Lopes & Lopes, com prazo informado antes do pedido — sem surpresa.",
  },
  {
    q: "O plano de manutenção serve para frota mista?",
    a: "Sim. O plano é montado pelo horímetro de cada máquina, mesmo em frotas com marcas e modelos diferentes. O objetivo é um único calendário de paradas programadas.",
  },
  {
    q: "O que é a telemetria e o que ela monitora?",
    a: "Sensores de fábrica reportam horas trabalhadas, localização, consumo e alertas de falha. A Lopes & Lopes acompanha o painel e entra em contato quando algo sai do padrão — antes da quebra.",
  },
];

function Acordeao({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  const [aberto, setAberto] = useState(false);
  return (
    <div className="rounded-xl border-2 border-border bg-white transition-colors has-[:checked]:border-ap-ambar">
      <button
        onClick={() => setAberto(!aberto)}
        aria-expanded={aberto}
        className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
      >
        <span className="text-sm font-extrabold text-ap-azul-esc">{titulo}</span>
        <svg
          className={`h-4 w-4 shrink-0 text-ap-ambar-esc transition-transform ${aberto ? "rotate-180" : ""}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          aria-hidden
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      {aberto && <div className="border-t border-border px-5 pb-5 pt-4">{children}</div>}
    </div>
  );
}

function PosVendaPage() {
  return (
    <div>
      {/* Hero */}
      <section className="corte bg-ap-noite pb-20 pt-16 text-white">
        <div className="mx-auto max-w-6xl px-4">
          <p className="eyebrow text-ap-ambar">Pós-venda</p>
          <h1 className="mt-3 max-w-3xl text-3xl leading-tight md:text-4xl">
            O pós-venda que atende o telefone
          </h1>
          <p className="mt-4 max-w-xl text-sm text-white/75 md:text-base">
            Máquina parada custa mais que máquina comprada. O pós-venda da Lopes & Lopes existe para
            uma coisa: manter sua operação rodando.
          </p>
          <a
            href={zapLink("Olá! Preciso de suporte pós-venda Lopes & Lopes.")}
            target="_blank"
            rel="noopener"
            className="corte mt-8 inline-block bg-ap-ambar px-6 py-3.5 text-sm font-extrabold uppercase tracking-wide text-ap-azul-esc transition-colors hover:bg-ap-ambar-esc"
          >
            Acionar suporte
          </a>
        </div>
      </section>

      {/* Calculadora interativa */}
      <section className="bg-ap-azul-esc py-14 text-white">
        <div className="mx-auto max-w-6xl px-4">
          <CalculadoraParada />
        </div>
      </section>

      {/* Trilha de manutenção */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <p className="eyebrow">Manutenção programada</p>
        <h2 className="mt-2 max-w-2xl text-2xl text-ap-azul-esc md:text-3xl">
          O que acontece em cada intervalo de horas
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-ap-fraco">
          Selecione o intervalo e veja o que entra no plano — peças, mão de obra e relatório.
        </p>
        <div className="mt-6">
          <TrilhaManutencao />
        </div>
      </section>

      {/* Pilares em acordeão */}
      <section className="mx-auto max-w-6xl px-4 pb-14">
        <p className="eyebrow">O que está incluso</p>
        <h2 className="mt-2 text-2xl text-ap-azul-esc md:text-3xl">
          Seis frentes, um único telefone
        </h2>
        <div className="mt-6 grid gap-3 md:grid-cols-2">
          {PILARES.map((p) => (
            <Acordeao key={p.h} titulo={p.h}>
              <p className="text-sm leading-relaxed text-ap-fraco">{p.p}</p>
              <a
                href={zapLink(p.zap)}
                target="_blank"
                rel="noopener"
                className="mt-3 inline-flex items-center gap-1 text-xs font-extrabold uppercase tracking-wide text-ap-azul hover:text-ap-ambar-esc"
              >
                Falar sobre isso <span aria-hidden>→</span>
              </a>
            </Acordeao>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-6xl px-4 pb-14">
        <p className="eyebrow">Dúvidas frequentes</p>
        <h2 className="mt-2 text-2xl text-ap-azul-esc md:text-3xl">Perguntas de quem opera</h2>
        <div className="mt-6 space-y-3">
          {FAQ.map((f) => (
            <Acordeao key={f.q} titulo={f.q}>
              <p className="text-sm leading-relaxed text-ap-fraco">{f.a}</p>
            </Acordeao>
          ))}
        </div>
      </section>

      <BlocoCaptura
        origem="pos-venda"
        titulo="Fale com o pós-venda"
        sub="Suporte, garantia ou plano de manutenção — deixe seus dados e a equipe retorna."
        rotuloCta="Solicitar retorno"
        escuro
      />
    </div>
  );
}
