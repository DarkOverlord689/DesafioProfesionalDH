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

18. Prueba de Visualización de Características (Historia #18) Escenario: El usuario ingresa al detalle de un producto para conocer sus servicios adicionales.

Pasos: Desde el Home, hacer clic en "Ver detalle" de un producto que tenga características asignadas (ej: WiFi, Aire Acondicionado).

Desplazarse hasta el nuevo bloque titulado "Características".

Verificar que cada elemento muestre su nombre y el icono de FontAwesome correspondiente.

Redimensionar la ventana del navegador para validar la adaptabilidad.

Resultado Esperado: Se visualiza un grid responsivo con iconos dorados (#dbb155). El diseño se ajusta de 4 a 1 columna en dispositivos móviles sin perder legibilidad.

Estado: ✅ Pasó.

19. Prueba de Filtrado por Categoría (Historia #20) Escenario: El usuario desea ver únicamente "Hoteles" en la lista de recomendaciones.

Pasos: En la sección superior del Home, hacer clic en la tarjeta de la categoría "Hoteles".

Observar el cambio en la lista de productos y en la barra de información.

Hacer clic en "Limpiar Filtros" o seleccionar otra categoría.

Resultado Esperado: - La tarjeta seleccionada resalta con un borde dorado.

La lista de productos se actualiza mostrando solo los que pertenecen a esa categoría.

El contador indica correctamente: "Mostrando X de Y productos totales".

Al limpiar el filtro, la lista vuelve a su estado original (10 productos por paginación).

Estado: ✅ Pasó.

20. Prueba de Registro y Seguridad (Historia #13)
Escenario: El usuario crea una cuenta nueva desde el Frontend.

Pasos: Ir a /registro.
Completar: Nombre, Apellido, Email y Password.
Click en "Registrarse".

Resultado Esperado: * Frontend: Muestra mensaje de éxito y redirige al Home en 3s.

Base de Datos: El registro aparece en la tabla usuarios.

Seguridad: La columna password muestra un hash de BCrypt (ej: $2a$10...), nunca el texto plano.

Estado: ✅ PASÓ.

21. Prueba de Notificación Automática (Historia #19)
Escenario: El sistema envía un correo de bienvenida tras el registro.

Pasos: Realizar un registro exitoso.
Abrir el Inbox de Mailtrap.

Resultado Esperado: * Llega un correo con el asunto "Bienvenido a Darksishop".

El cuerpo del mensaje incluye el nombre del usuario registrado.

Estado: ✅ PASÓ.

22. Prueba de Visualización de Usuarios (Historia #14)
Escenario: El Administrador consulta la lista completa de usuarios registrados.

Pasos:

Iniciar sesión con cuenta de ADMIN.

Ir al panel de /administracion.

Hacer clic en la pestaña "Gestionar Usuarios".

Resultado Esperado:

Frontend: Se despliega una tabla con ID, Nombre, Email y Rol de todos los usuarios.

API: El endpoint /api/usuarios responde un Status 200 con el JSON de la lista.

Estado: ✅ PASÓ.

23. Prueba de Cambio de Rol / Permisos (Historia #15)
Escenario: El Administrador otorga permisos de nivel superior a un usuario estándar.

Pasos:

Ubicar un usuario con rol "USER" en la tabla.

Hacer clic en el botón "Hacer Admin".

Confirmar la acción en el alert.

Resultado Esperado:

Base de Datos: El campo rol del usuario cambia de "USER" a "ADMIN" instantáneamente.

Interfaz: El botón del usuario cambia de color o desaparece para indicar que ya es Admin.

Estado: ✅ PASÓ.

24. Prueba de Protección de Rutas (Historia #16)
Escenario: Un usuario sin permisos intenta acceder a la consola de administración.

Pasos:

Iniciar sesión como usuario común ("USER") o cerrar sesión.

Intentar escribir manualmente en el navegador: localhost:5173/administracion.

Resultado Esperado:

Frontend: El sistema detecta la falta de permisos y redirige automáticamente al Home (/).

Seguridad: No se permite visualizar ningún componente del panel administrativo.

Estado: ✅ PASÓ.

25. Prueba de Búsqueda y Selección de Fechas (Historia #22)

Escenario: El usuario filtra productos por nombre y fechas.

Pasos: 

Escribir en el buscador (verificar que salgan sugerencias).

Seleccionar un rango en el calendario doble.

Clic en "Buscar".

Resultado Esperado: La lista de recomendaciones se actualiza mostrando solo los productos que coinciden con el texto. El calendario retiene el rango seleccionado.

Estado: ✅ PASÓ.

26. Prueba de Visualización de Políticas (Historia #26)

Escenario: El usuario entra al detalle de un producto para conocer las reglas.

Pasos: 
Ir al Home y hacer clic en "Ver detalle" de cualquier producto.
Desplazarse hasta el final de la página.

Resultado Esperado: * Se visualiza el bloque "Qué tenés que saber" con el título subrayado.

La información está organizada en 3 columnas claras.

El bloque ocupa todo el ancho de la pantalla (100% container).

Estado: ✅ PASÓ.