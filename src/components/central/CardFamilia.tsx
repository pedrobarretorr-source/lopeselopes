import { Link } from "@tanstack/react-router";
import { CAT, FAM } from "@/data/central/catalogo";
import { IMG } from "@/data/central/images";

export function CardFamilia({ fam }: { fam: string }) {
  const f = FAM[fam];
  if (!f) return null;
  const modelos = CAT.filter((m) => m.fam === fam);
  const foto = f.img && IMG[f.img] ? f.img : null;

  return (
    <Link
      to="/central/familia/$fam"
      params={{ fam }}
      className="group flex flex-col overflow-hidden rounded-xl border-2 border-border bg-white shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="flex h-32 items-center justify-center bg-ap-azul-claro p-3">
        {foto ? (
          <img
            src={IMG[foto]}
            alt={f.nome}
            loading="lazy"
            className="max-h-full max-w-full object-contain transition-transform group-hover:scale-105"
          />
        ) : (
          <span className="text-3xl font-black text-ap-azul/20">{f.titulo ?? f.nome}</span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <span className="eyebrow">{f.cat ?? "Catálogo"}</span>
        <h3 className="mt-1 text-base font-extrabold leading-snug text-ap-azul-esc">{f.nome}</h3>
        <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-ap-fraco">{f.cliente}</p>
        <span className="mt-auto pt-3 text-xs font-extrabold uppercase tracking-wide text-ap-azul">
          {modelos.length} {modelos.length === 1 ? "modelo" : "modelos"} →
        </span>
      </div>
    </Link>
  );
}
