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

12. Prueba de Gestión de Categorías (Historia #21)
Escenario: Crear una nueva categoría desde el panel de administración y verificar su persistencia.

Pasos:

Ir a la pestaña "Gestionar Categorías".

Rellenar el formulario con: Título: "Glamping", Descripción: "Tiendas de lujo" y una URL de imagen.

Hacer clic en "Crear Categoría" y aceptar el alert.

Resultado Esperado: La categoría debe guardarse en la base de datos MySQL. Al cambiar a la pestaña de "Productos", la opción "Glamping" debe aparecer automáticamente en el selector (dropdown).

Estado: ✅ Pasó.

13. Prueba de Asignación de Categoría (Historia #12)
Escenario: Crear un producto vinculado a una categoría existente en la base de datos.

Pasos:

En la pestaña "Gestionar Productos", abrir el selector de categorías.

Seleccionar una categoría real (ej: "Hoteles").

Completar el resto de campos (Nombre, Descripción, Imagen) y hacer clic en "Guardar Producto".

Resultado Esperado: El producto debe registrarse exitosamente. En la tabla inferior, la columna "Categoría" debe mostrar el nombre de la categoría asignada (no el ID, sino el título legible).

Estado: ✅ Pasó.    

14. Prueba de Interfaz por Pestañas (UX)
Escenario: Validar que la navegación entre Productos y Categorías sea fluida.

Pasos:

Hacer clic en "Gestionar Productos" y luego en "Gestionar Categorías".

Observar que el formulario cambie sin recargar la página.

Resultado Esperado: El botón activo debe resaltar en verde (#1DB954) y el formulario anterior debe ocultarse por completo.

Estado: ✅ Pasó.

15. Prueba de Registro de Atributos (Historia #17)
Escenario: Crear una característica nueva (ej: WiFi) con su icono de FontAwesome.
Pasos:

En la pestaña "Gestionar Características", ingresar "WiFi" en nombre y "fa-wifi" en icono.

Hacer clic en "Guardar Característica".

Verificar la aparición del elemento en la lista inferior y en el formulario de Productos.
Resultado Esperado: La característica debe guardarse en la DB y aparecer inmediatamente como un checkbox disponible para nuevos productos.
Estado: ✅ Pasó.

16. Prueba de Borrado con Integridad Referencial
Escenario: Intentar eliminar una categoría que contiene productos registrados.
Pasos:

Intentar borrar la categoría "Hoteles" desde la lista de "Categorías Existentes".

Observar el mensaje de error en pantalla.
Resultado Esperado: El sistema debe capturar el error del Backend y mostrar un mensaje indicando que el elemento está siendo usado por un producto, impidiendo que la base de datos quede corrupta.
Estado: ✅ Pasó.

17. Prueba de Persistencia de Categorías (Historia #21)
Escenario: Validar que una categoría creada manualmente aparezca en el selector de productos.
Pasos:

Crear la categoría "Departamentos" en su pestaña correspondiente.

Cambiar a la pestaña "Gestionar Productos".

Desplegar el selector de categorías.
Resultado Esperado: "Departamentos" debe figurar en el listado para ser asignado a cualquier nuevo producto.
Estado: ✅ Pasó.
