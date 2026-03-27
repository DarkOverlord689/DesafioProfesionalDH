🧪 Plan de Pruebas - Sprint 1
1. Prueba de Validación de Duplicados (Historia #3)
Escenario: Intentar registrar un producto con un nombre que ya existe en la base de datos.

Pasos:

Ir a /administracion. (Panel Admin)

Ingresar "Hotel Darksishi Central" (nombre ya existente).

Completar los demás campos y dar clic en "Guardar".

Resultado Esperado: El sistema debe bloquear la inserción y mostrar un mensaje: "Error: El nombre ya existe".

Estado: ✅ Pasó.

2. Prueba de Persistencia (CRUD)
Escenario: Crear un nuevo producto y verificar que se visualiza en la tabla.

Pasos:

Ingresar un producto nuevo (ej: "Resort El Sol").

Verificar que aparezca una nueva fila en la tabla de administración.

Resultado Esperado: El producto debe guardarse en MySQL y renderizarse en el Front.

Estado: ✅ Pasó.

3. Prueba de Eliminación (Historia #11)
Escenario: Borrar un producto existente.

Pasos:

Clic en el botón "Eliminar" de un registro.

Aceptar el cuadro de diálogo de confirmación.

Resultado Esperado: El registro debe desaparecer de la tabla y ser borrado de la base de datos MySQL.

Estado: ✅ Pasó.