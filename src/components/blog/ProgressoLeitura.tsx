import { useEffect, useState } from "react";

/** Barra fina de progresso de leitura, fixa no topo (abaixo do header sticky). */
export function ProgressoLeitura() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const total = el.scrollHeight - el.clientHeight;
      setPct(total > 0 ? Math.min(100, (el.scrollTop / total) * 100) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed left-0 right-0 top-0 z-[60] h-1 bg-transparent" aria-hidden>
      <div
        className="h-full bg-ap-ambar transition-[width] duration-100"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
