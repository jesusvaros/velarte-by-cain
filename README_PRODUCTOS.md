# Guía de Edición de Productos (Velarte by Cain)

Este documento explica cómo añadir o modificar productos en el archivo `src/content/products.json`.

## Instrucciones Básicas
1. Abre el archivo `src/content/products.json`.
2. Para añadir un nuevo producto, copia un bloque existente (entre llaves `{ ... }`) y pégalo antes del corchete de cierre final `]`.
3. **Importante**: Asegúrate de que todos los bloques de productos estén separados por comas.

## Estructura de un Producto
Cada producto tiene las siguientes propiedades:

*   **`slug`**: Identificador único para la URL (ej: `mi-nueva-vela`). No uses espacios ni caracteres especiales.
*   **`name`**: El nombre del producto que verán los clientes.
*   **`shortDescription`**: Un resumen corto que aparece en el catálogo.
*   **`description`**: Descripción detallada que aparece en la página individual del producto.
*   **`images`**: Lista que contiene la ruta de la imagen principal (ej: `["/images/mi-imagen.jpg"]`).
*   **`gallery`**: Lista de imágenes adicionales para la galería.
*   **`priceFrom`**: El precio base que se muestra en el catálogo.
*   **`category`**: La categoría del producto. Valores válidos: `velas-subdain`, `wax-melts`, `wax-sachets`, `complementos`, `eventos`.
*   **`tags`**: Etiquetas para ayudar en búsquedas (ej: `["Velas", "Artesanal"]`).
*   **`scents`** (Opcional): Lista de aromas disponibles. Cada aroma necesita:
    *   `id`: Identificador interno (ej: `vainilla`).
    *   `name`: Nombre visible (ej: `Vainilla`).
    *   `image`: Ruta de la imagen específica de ese aroma.
*   **`variants`** (Opcional): Diferentes formatos o tamaños. Cada variante necesita:
    *   `id`: Identificador interno (ej: `caja-grande`).
    *   `label`: Nombre del formato (ej: `Caja Grande (180g)`).
    *   `price`: Precio específico de esa variante.

## Ejemplo de un nuevo aroma
Para añadir un sabor/aroma a un producto existente, simplemente añádelo a la lista `scents`:
```json
{ "id": "nuevo-aroma", "name": "Nombre del Aroma", "image": "/images/ruta-imagen.jpg" }
```
