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