import { Link } from "@tanstack/react-router";
import { useComparador } from "./comparador";

/** Barra flutuante do comparador — aparece quando há modelos selecionados. */
export function BarraComparador() {
  const { ids, limpar } = useComparador();
  if (!ids.length) return null;
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t-4 border-ap-ambar bg-ap-azul-esc px-4 py-3 text-white shadow-2xl">
      <div className="mx-auto flex max-w-6xl items-center gap-3">
        <span className="text-sm font-bold">
          {ids.length} {ids.length === 1 ? "modelo" : "modelos"} no comparador
        </span>
        <Link
          to="/central/comparar"
          className="ml-auto rounded-md bg-ap-ambar px-4 py-2 text-sm font-extrabold text-ap-azul-esc transition-colors hover:bg-ap-ambar-esc"
        >
          Comparar agora
        </Link>
        <button
          onClick={limpar}
          className="text-xs font-bold text-[#B7C8E5] underline-offset-2 hover:underline"
        >
          Limpar
        </button>
      </div>
    </div>
  );
}
