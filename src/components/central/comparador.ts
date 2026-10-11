import { useCallback, useEffect, useState } from "react";
import { CAT } from "@/data/central/catalogo";

const KEY = "ap_comp";

function ler(): string[] {
  try {
    return JSON.parse(sessionStorage.getItem(KEY) ?? "[]");
  } catch {
    return [];
  }
}

/** Comparador de modelos — persiste em sessionStorage, limite 3 (invariante 5). */
export function useComparador() {
  const [ids, setIds] = useState<string[]>([]);

  useEffect(() => {
    setIds(ler());
    const onStorage = () => setIds(ler());
    window.addEventListener("storage", onStorage);
    window.addEventListener("ap_comp", onStorage);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("ap_comp", onStorage);
    };
  }, []);

  const gravar = useCallback((prox: string[]) => {
    sessionStorage.setItem(KEY, JSON.stringify(prox));
    setIds(prox);
    window.dispatchEvent(new Event("ap_comp"));
  }, []);

  const alternar = useCallback(
    (id: string): "adicionado" | "removido" | "cheio" => {
      const atuais = ler();
      if (atuais.includes(id)) {
        gravar(atuais.filter((x) => x !== id));
        return "removido";
      }
      if (atuais.length >= 3) return "cheio";
      gravar([...atuais, id]);
      return "adicionado";
    },
    [gravar],
  );

  const limpar = useCallback(() => gravar([]), [gravar]);

  return {
    ids,
    modelos: ids.map((id) => CAT.find((m) => m.id === id)).filter((m) => m != null),
    alternar,
    limpar,
  };
}
