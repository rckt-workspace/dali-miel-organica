# Compra directa aislada del carrito

## Objetivo
Hacer que “Comprar ahora” lleve al checkout con un único producto indicado en la URL, sin agregarlo ni alterar el carrito global.

## Cambios
- Actualizar todos los botones “Comprar ahora” de tarjetas y detalle de producto para navegar a `/checkout` con `producto`, `cantidad`, `presentacion` y `modo=directo`, sin llamar a `add`.
- Validar los parámetros de búsqueda en la ruta de checkout y construir una selección directa únicamente desde el catálogo oficial.
- En modo directo, mostrar y enviar a Wompi solo el producto de la URL; en modo normal, conservar el flujo actual del carrito.
- Propagar el modo directo a la URL de confirmación para impedir que una compra directa vacíe el carrito global después del pago.
- Documentar la separación entre checkout normal y compra directa.

## Validación
- Ejecutar lint, chequeo de tipos y build.
- Probar en navegador: añadir dos productos distintos al carrito, comprar directamente un tercero, comprobar que checkout solo muestra el tercero y que `/carrito` conserva únicamente los dos primeros.
- Revisar el flujo tanto en escritorio como en móvil.

## Detalles técnicos
- Se usarán `validateSearch`, `Route.useSearch()` y navegación tipada de TanStack Router.
- Los precios seguirán calculándose y validándose en el servidor desde el catálogo; la URL nunca será autoridad del precio.
