🧪 Plan de Pruebas - Sprint 1 -2 - 3
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

27. Prueba de Visualización de Calendario Doble (Historia #23)

Escenario: El usuario revisa la disponibilidad en el detalle del producto.

Pasos: 1. Entrar al detalle de un producto. 2. Ubicar la sección "Fechas disponibles".

Resultado Esperado: Se muestran dos meses simultáneamente en un diseño integrado al tema oscuro.

Estado: ✅ PASÓ.

28. Prueba de Bloqueo de Fechas (Ocupadas) (Historia #23)

Escenario: El sistema debe impedir seleccionar días ya reservados.

Pasos: Intentar hacer clic en una fecha marcada como ocupada (configurada en el array de prueba).

Resultado Esperado: La fecha no es seleccionable y tiene un estilo visual distinto (opacidad o color gris).

Estado: ✅ PASÓ.

29. Prueba de Manejo de Errores (Historia #23)

Escenario: Simulación de caída del servicio de disponibilidad.

Pasos: Forzar el estado de error en el componente.

Resultado Esperado: Aparece un mensaje claro y un botón de "Intentar nuevamente".

Estado: ✅ PASÓ.

30. Prueba de Restricción de Acceso (Historia #24)(Historia #24)

Pasos: Intentar marcar un favorito sin haber iniciado sesión.

Resultado Esperado: El sistema lanza una alerta y no permite el cambio de estado del icono.

Estado: ✅ PASÓ.

31. Prueba de Persistencia de Favoritos (Historia #24)

Pasos: Iniciar sesión, marcar 3 productos como favoritos y refrescar el navegador (F5).

Resultado Esperado: Los 3 productos mantienen el corazón rojo tras la recarga.

Estado: ✅ PASÓ.

32. Prueba de Desmarcado (Toggle) (Historia #24)

Pasos: Hacer clic en un producto ya marcado como favorito.

Resultado Esperado: El icono vuelve a su estado inicial (🤍) y se elimina del almacenamiento local.

Estado: ✅ PASÓ.

33. Prueba de Acceso y Seguridad (Historia #25)

Escenario: Un usuario intenta entrar a /favoritos.

Pasos: 1. Cerrar sesión. 2. Intentar entrar a la URL manualmente. 3. Iniciar sesión y usar el link del Header.

Resultado Esperado: Sin sesión, el ProtectedRoute lo redirige al Login. Con sesión, el link en el Header lo lleva correctamente a su lista.

Estado: ✅ PASÓ.

34. Prueba de Sincronización en Tiempo Real (Historia #25)

Escenario: El usuario desmarca un favorito desde la sección "Mis Favoritos".

Pasos: 1. Ir a la página de favoritos. 2. Hacer clic en "Quitar" o en el corazón rojo.

Resultado Esperado: El producto desaparece de la grilla de favoritos inmediatamente y el contador del localStorage se actualiza.

Estado: ✅ PASÓ.

35. Prueba de Estado Vacío (Empty State) (Historia #25)

Escenario: El usuario no tiene ningún favorito guardado.

Pasos: Eliminar todos los favoritos y entrar a la sección.

Resultado Esperado: Se muestra un mensaje amigable indicando que no hay favoritos y un botón para volver a explorar.

Estado: ✅ PASÓ.

36. Prueba de Activación del Modal (Historia #27)

Escenario: El usuario desea compartir un hotel específico.

Pasos: Hacer clic en el botón "Compartir" ubicado en el encabezado del detalle.

Resultado Esperado: Se despliega el modal con la imagen, nombre y descripción correcta del producto actual.

Estado: ✅ PASÓ.

37. Prueba de Mensaje Personalizado (Historia #27)

Escenario: El usuario quiere añadir un comentario antes de tuitear.

Pasos: 1. Escribir en el textarea: "¡Miren este lugar para las vacaciones!". 2. Clic en el icono de Twitter.

Resultado Esperado: La ventana de Twitter se abre con el texto exacto ingresado por el usuario más el enlace al producto.

Estado: ✅ PASÓ.

38. Prueba de Copiado de Enlace (Historia #27)

Escenario: El usuario prefiere enviar el link por correo o mensaje privado manual.

Pasos: Hacer clic en el botón "Copiar Enlace".

Resultado Esperado: Se muestra un aviso de confirmación ("¡Enlace copiado!") y al pegar (Ctrl+V) en cualquier lugar, aparece la URL del detalle del producto.

Estado: ✅ PASÓ.

39. Prueba de Puntuación Media en Listado (Home) (Historia #28)

Escenario: El usuario navega por la página principal.

Pasos: Observar las tarjetas de productos.

Resultado Esperado: Cada tarjeta muestra un badge con la puntuación (ej: 8.5) y el número de valoraciones, cumpliendo con la visibilidad prominente. ✅ PASÓ.

40. Prueba de Formulario de Reseña (Detalle) (Historia #28)

Escenario: Usuario autenticado entra al detalle del producto.

Pasos: Seleccionar 4 estrellas y escribir "Excelente relación calidad-precio". Clic en enviar.

Resultado Esperado: La reseña se añade instantáneamente al feed inferior y el promedio de la sección se actualiza sin recargar. ✅ PASÓ.

41. Prueba de Seguridad y Acceso (Historia #28)

Escenario: Usuario no autenticado (Guest) intenta puntuar.

Pasos: Ir a la sección de reseñas en el detalle sin haber iniciado sesión.

Resultado Esperado: El formulario está oculto y se visualiza el mensaje "Inicia sesión para dejar una reseña". ✅ PASÓ.

42. Prueba de Diseño Responsivo (Historia #28)

Escenario: Visualización en dispositivo móvil (Vista de inspección Chrome).

Pasos: Reducir el ancho de pantalla a 375px.

Resultado Esperado: El badge de promedio y el título de opiniones se apilan verticalmente para evitar desbordamiento. ✅ PASÓ.

43. Prueba de Acceso Administrativo

Escenario: Un usuario con rol "USER" intenta acceder a la URL de gestión de categorías.

Resultado Esperado: El sistema debe redirigir al Home o mostrar "Acceso Denegado". Solo el "ADMIN" debe ver el botón de eliminar.

Estado: ✅ PASÓ.

44. Prueba de Confirmación Preventiva

Pasos: 1. Ir al Panel Admin. 2. En la lista de categorías, hacer clic en "Eliminar" sobre la categoría "Hoteles".

Resultado Esperado: Debe aparecer un mensaje emergente preguntando: "¿Estás seguro de que deseas eliminar la categoría 'Hoteles'? Esta acción no se puede deshacer".

Estado: ✅ PASÓ.

45. Cancelación de la Acción

Pasos: En el mensaje de confirmación anterior, hacer clic en "Cancelar".

Resultado Esperado: La categoría debe permanecer intacta en la lista y no se debe realizar ninguna petición a la API.

Estado: ✅ PASÓ.

46. Confirmación y Refresco de Interfaz

Pasos: Hacer clic en "Confirmar" eliminación.

Resultado Esperado: 1. Se envía la petición DELETE. 2. Se muestra un mensaje de éxito. 3. La lista de categorías se actualiza automáticamente eliminando la fila correspondiente sin necesidad de recargar manualmente.

Estado: ✅ PASÓ.