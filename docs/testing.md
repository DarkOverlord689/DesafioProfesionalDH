🧪 Plan de Pruebas - Sprint 1
1. Prueba de Validación de Duplicados (Historia #3)
Escenario: Intentar registrar un producto con un nombre que ya existe en la base de datos.

Pasos:

Ir a /administracion.

Ingresar un nombre ya existente (ej: "Hotel Darksishi Central").

Completar campos y dar clic en "Guardar".

Resultado Esperado: El sistema debe bloquear la inserción (Error 400 en Backend) y no duplicar el registro.

Estado: ✅ Pasó.

2. Prueba de Estructura de Grilla y Aleatoriedad (Historia #4)
Escenario: Verificar la disposición visual y la carga aleatoria de productos.

Pasos:

Entrar al Home.

Contar productos y disposición.

Recargar la página (F5).

Resultado Esperado: Se visualizan exactamente 2 columnas y 5 filas (10 productos). Al recargar, el orden de los productos debe cambiar.

Estado: ✅ Pasó.

3. Prueba de Paginación Funcional (Historia #8)
Escenario: Navegar a través del catálogo limitado a 10 ítems.

Pasos:

Verificar que solo hay 10 productos visibles.

Clic en botón "Siguiente".

Clic en botón "Inicio".

Resultado Esperado: El sistema debe mostrar los siguientes 10 productos. El botón "Inicio" debe resetear al usuario a la primera página. Los botones se deshabilitan correctamente en los límites.

Estado: ✅ Pasó.

4. Prueba de Eliminación con Confirmación (Historia #11)
Escenario: Borrar un producto existente desde el panel de administración.

Pasos:

Clic en el botón "Eliminar" de un registro.

Aceptar el cuadro de diálogo de confirmación (window.confirm).

Resultado Esperado: El registro desaparece de la tabla y se elimina de la base de datos MySQL.

Estado: ✅ Pasó.

5. Prueba de Cabecera Dinámica (Historia #5)
Escenario: Verificar que la cabecera del detalle muestra la información correcta del producto seleccionado.

Pasos: Clic en "Ver detalle" de un hotel, observar título y categoría.

Resultado Esperado: Los datos deben coincidir exactamente con el ID seleccionado desde la base de datos.

Estado: ✅ Pasó.

6. Prueba de Botón de Retorno (Historia #5)
Escenario: Validar la navegación hacia atrás desde la vista de detalle.

Pasos: Estando en la vista de detalle, hacer clic en el botón "❮ Volver".

Resultado Esperado: El sistema debe utilizar el historial del navegador (useNavigate(-1)) para regresar al Home sin recargar.

Estado: ✅ Pasó.

7. Prueba de Galería de 5 Imágenes (Historia #6)
Escenario: Validar la disposición visual de la galería requerida por el cliente.

Pasos: Abrir cualquier producto y contar las imágenes en pantalla.

Resultado Esperado: Se visualiza 1 imagen principal grande y 4 imágenes secundarias en una grilla lateral.

Estado: ✅ Pasó.

8. Prueba de Overlay "Ver más" (Historia #6)
Escenario: Verificar la presencia del texto de expansión en la galería.

Pasos: Observar la última imagen de la grilla secundaria (esquina inferior derecha).

Resultado Esperado: La imagen debe tener un fondo oscurecido con el texto "Ver más" o "+2 Fotos".

Estado: ✅ Pasó.

9. Prueba de Integración de Endpoints (Backend)
Escenario: Consumo del nuevo endpoint específico para detalle por ID.

Pasos: Revisar la pestaña "Network" del navegador al cargar un producto.

Resultado Esperado: La petición se realiza a /api/productos/detalle/{id} devolviendo un JSON con estado 200.

Estado: ✅ Pasó.

10. Prueba de Consistencia de Datos
Escenario: Asegurar que los datos mostrados en el Home coinciden con el Detalle.

Pasos: Anotar el nombre de un hotel en el Home y entrar a su detalle.

Resultado Esperado: Toda la información (nombre, descripción, imagen) debe ser consistente entre ambas vistas.

Estado: ✅ Pasó.

11. Prueba de Diseño Responsivo
Escenario: Verificar el comportamiento de la vista de detalle en dispositivos móviles.

Pasos: Abrir las herramientas de desarrollador y activar la vista "Mobile" (iPhone/Android).

Resultado Esperado: La galería de imágenes debe apilarse correctamente y el botón de volver debe seguir siendo accesible.

Estado: ✅ Pasó.
