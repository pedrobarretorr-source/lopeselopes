export interface ItemSumario {
  id: string;
  texto: string;
}

/**
 * Extrai os h2 do corpo HTML e devolve { html, itens } — o html vem com
 * ids injetados nos h2 para navegação por âncora do sumário.
 */
export function extrairSumario(corpo: string): { html: string; itens: ItemSumario[] } {
  const itens: ItemSumario[] = [];
  let i = 0;
  const html = corpo.replace(/<h2>(.*?)<\/h2>/g, (_m, texto: string) => {
    const id = `s${i++}`;
    itens.push({ id, texto: texto.replace(/<[^>]+>/g, "") });
    return `<h2 id="${id}">${texto}</h2>`;
  });
  return { html, itens };
}

/** Sumário lateral (desktop) com âncoras para as seções do artigo. */
export function SumarioArtigo({ itens }: { itens: ItemSumario[] }) {
  if (itens.length < 2) return null;
  return (
    <nav aria-label="Sumário" className="rounded-xl border-2 border-border bg-white p-5">
      <p className="text-[11px] font-extrabold uppercase tracking-[0.13em] text-ap-fraco">
        Neste artigo
      </p>
      <ul className="mt-3 space-y-2">
        {itens.map((it) => (
          <li key={it.id}>
            <a
              href={`#${it.id}`}
              className="block border-l-2 border-border pl-3 text-xs font-bold leading-snug text-ap-fraco transition-colors hover:border-ap-ambar hover:text-ap-azul-esc"
            >
              {it.texto}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
