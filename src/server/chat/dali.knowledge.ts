export const DALI_GROUNDED_KNOWLEDGE = `
INFORMACIÓN VERIFICADA DE DALI MIEL ORGÁNICA

ORIGEN Y MARCA:
- DALI es una marca colombiana y llanera
- Apiarios ubicados en los bosques tropicales de Colombia, en la Orinoquia
- Miel cultivada y cosechada en Colombia
- Marca con denominación de origen

CATÁLOGO DE PRODUCTOS:

Categoría: MIEL PURA

1. Acacia
   - Slug: /producto/acacia
   - Perfil de sabor: Notas maderosas y robustas al paladar
   - Presentación: 500 GR
   - Línea: Miel Pura

2. Multifloral
   - Slug: /producto/multifloral
   - Perfil de sabor: Notas frutales y florales al paladar
   - Presentación: 500 GR
   - Línea: Miel Pura

3. Caucho
   - Slug: /producto/caucho
   - Perfil de sabor: Notas cítricas y suaves al paladar
   - Presentación: 500 GR
   - Línea: Miel Pura

Categoría: MIEL PICANTE (Infusionadas con chile)

4. Chile Morita
   - Slug: /producto/chile-morita
   - Descripción: Miel orgánica infusionada con chile morita
   - Perfil: Toque ahumado y picante (picor medio)
   - Presentación: 300g
   - Línea: Miel Picante

5. Chile de Árbol
   - Slug: /producto/chile-de-arbol
   - Descripción: Miel orgánica infusionada con chile de árbol
   - Perfil: Picor vivo y directo (picor intenso)
   - Presentación: 300g
   - Línea: Miel Picante

CARACTERÍSTICAS VERIFICADAS:
- Mieles 100% naturales, sin procesos industriales
- Mieles sin aditivos
- Producción en Colombia

INFORMACIÓN NO DISPONIBLE (no especular):
- Precios exactos
- Disponibilidad actual en stock
- Promociones o descuentos
- Detalles de envío o políticas de devolución
- Claims o beneficios médicos no sustentados
- Características de otros orígenes o marcas

RESTRICCIONES:
- NUNCA afirmar que DALI es de otro país (no es mexicana, argentina, etc.)
- NUNCA cambiar los perfiles de sabor documentados
- NUNCA inventar variedades nuevas
- NUNCA hacer claims de salud sin sustento científico
- NUNCA mostrar metadata técnica del proveedor en respuestas
`;

export function getDaliContext(): string {
  return DALI_GROUNDED_KNOWLEDGE;
}
