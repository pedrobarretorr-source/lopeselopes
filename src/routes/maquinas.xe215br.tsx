import { createFileRoute, redirect } from "@tanstack/react-router";

// A página artesanal da XE215BR virou a rota dinâmica de modelos.
// Redirect permanente preserva o SEO da URL antiga.
export const Route = createFileRoute("/maquinas/xe215br")({
  beforeLoad: () => {
    throw redirect({ to: "/maquinas/modelo/$cod", params: { cod: "xe215br" }, replace: true });
  },
});
