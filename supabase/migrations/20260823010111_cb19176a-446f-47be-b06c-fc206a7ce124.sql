CREATE TABLE public.leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  origem text NOT NULL DEFAULT 'site',
  pagina text,
  nome text NOT NULL,
  empresa text NOT NULL,
  telefone text NOT NULL,
  email text,
  cnpj text,
  mensagem text,
  simulacao jsonb,
  lgpd_aceite boolean NOT NULL DEFAULT false,
  status text NOT NULL DEFAULT 'novo'
);

GRANT INSERT ON public.leads TO anon;
GRANT SELECT, UPDATE ON public.leads TO authenticated;
GRANT ALL ON public.leads TO service_role;

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Visitantes podem enviar leads" ON public.leads
  FOR INSERT TO anon
  WITH CHECK (true);

CREATE POLICY "Equipe autenticada pode ver leads" ON public.leads
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Equipe autenticada pode atualizar status" ON public.leads
  FOR UPDATE TO authenticated
  USING (true)
  WITH CHECK (true);