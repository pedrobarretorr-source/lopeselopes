import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { FAM, fotoModelo, type Modelo } from "@/data/central/catalogo";
import { IMG } from "@/data/central/images";
import { fotoReal } from "@/data/central/fotos";
import { fmt } from "@/lib/ap";
import { useComparador } from "./comparador";

export function CardModelo({ m, compacto }: { m: Modelo; compacto?: boolean }) {
  const { ids, alternar } = useComparador();
  const chave = fotoModelo(m, IMG);
  // Prioridade: foto real enviada pelo cliente → imagem do catálogo → família
  const fotoUrl = fotoReal(m.id) ?? (chave ? IMG[chave] : null);
  const selecionado = ids.includes(m.id);

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border-2 border-border bg-white shadow-sm transition-shadow hover:shadow-md">
      <Link to="/central/modelo/$id" params={{ id: m.id }} className="block">
        <div className="flex h-36 items-center justify-center bg-ap-azul-claro p-3">
          {fotoUrl ? (
            <img
              src={fotoUrl}
              alt={`Britador ${m.mod}`}
              loading="lazy"
              className="max-h-full max-w-full object-contain"
            />
          ) : (
            <span className="text-4xl font-black text-ap-azul/20">{m.mod.slice(0, 3)}</span>
          )}
        </div>
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-2">
          <Link to="/central/modelo/$id" params={{ id: m.id }} className="hover:underline">
            <h3 className="text-base font-extrabold text-ap-azul-esc">{m.mod}</h3>
          </Link>
          <span
            className={`shrink-0 rounded px-1.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wide ${
              m.status === "disponivel"
                ? "bg-ap-ok/15 text-ap-ok"
                : "bg-ap-ambar/20 text-ap-ambar-esc"
            }`}
          >
            {m.status === "disponivel" ? "Disponível" : "Sob consulta"}
          </span>
        </div>
        <p className="mt-0.5 text-xs text-ap-fraco">{FAM[m.fam]?.nome ?? m.fam}</p>
        {!compacto && (
          <dl className="mt-3 grid grid-cols-2 gap-x-3 gap-y-1.5 text-xs">
            <div>
              <dt className="text-ap-fraco">Capacidade</dt>
              <dd className="font-bold text-ap-azul-esc">
                {fmt(m.capMin)}–{fmt(m.capMax)} t/h
              </dd>
            </div>
            <div>
              <dt className="text-ap-fraco">Alimentação</dt>
              <dd className="font-bold text-ap-azul-esc">até {fmt(m.alim)} mm</dd>
            </div>
          </dl>
        )}
        <div className="mt-auto flex gap-2 pt-4">
          <Link
            to="/central/modelo/$id"
            params={{ id: m.id }}
            className="flex-1 rounded-md bg-ap-azul px-3 py-2 text-center text-xs font-extrabold uppercase tracking-wide text-white transition-colors hover:bg-ap-azul-med"
          >
            Ver ficha
          </Link>
          <button
            onClick={() => {
              const r = alternar(m.id);
              if (r === "cheio") toast.warning("O comparador leva no máximo 3 modelos.");
              else if (r === "adicionado") toast.success(`${m.mod} adicionado ao comparador.`);
              else toast.info(`${m.mod} removido do comparador.`);
            }}
            aria-pressed={selecionado}
            title={selecionado ? "Remover do comparador" : "Comparar"}
            className={`rounded-md border-2 px-3 py-2 text-xs font-extrabold transition-colors ${
              selecionado
                ? "border-ap-ambar bg-ap-ambar text-ap-azul-esc"
                : "border-border text-ap-fraco hover:border-ap-azul hover:text-ap-azul"
            }`}
          >
            {selecionado ? "✓" : "+"}
          </button>
        </div>
      </div>
    </article>
  );
}
