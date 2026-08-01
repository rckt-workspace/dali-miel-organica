CREATE TABLE public.leads_b2b (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  empresa TEXT NOT NULL,
  contacto TEXT NOT NULL,
  email TEXT NOT NULL,
  telefono TEXT NOT NULL,
  tipo_negocio TEXT NOT NULL,
  volumen TEXT,
  mensaje TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
GRANT INSERT ON public.leads_b2b TO anon, authenticated;
GRANT ALL ON public.leads_b2b TO service_role;
ALTER TABLE public.leads_b2b ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit a wholesale lead" ON public.leads_b2b FOR INSERT TO anon, authenticated WITH CHECK (true);