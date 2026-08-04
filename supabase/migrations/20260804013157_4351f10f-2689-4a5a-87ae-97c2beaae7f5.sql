DROP POLICY IF EXISTS "Anyone can submit a wholesale lead" ON public.leads_b2b;

CREATE POLICY "Anyone can submit a valid wholesale lead"
ON public.leads_b2b
FOR INSERT
TO anon, authenticated
WITH CHECK (
  length(btrim(empresa)) BETWEEN 2 AND 120
  AND length(btrim(contacto)) BETWEEN 2 AND 120
  AND length(btrim(email)) BETWEEN 5 AND 200
  AND email ~ '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  AND length(btrim(telefono)) BETWEEN 6 AND 30
  AND length(btrim(tipo_negocio)) BETWEEN 2 AND 80
  AND (volumen IS NULL OR length(volumen) <= 120)
  AND (mensaje IS NULL OR length(mensaje) <= 2000)
);