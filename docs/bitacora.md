# 📑 Bitácora de Proyecto - Sprint 1 (Definición Técnica Final)

🎯 1. Definición del Proyecto
Nombre de la Aplicación: Darksishop
Propósito: Plataforma integral de reserva de alojamientos y experiencias.
Estado Actual: MVP funcional con sistema CRUD y navegación SPA.

🛠️ 2. Stack Tecnológico (Consolidado)
Frontend
Framework: React.js + Vite.

Enrutamiento: react-router-dom v6.

Comunicación: Axios (Consumo de API REST).

Backend
Lenguaje: Java 21 (LTS).

Framework: Spring Boot 4.0.5

Persistencia: MySQL 8.0 + Spring Data JPA.

📋 3. Checklist Completo de Historias de Usuario (1-11)
[x] Historia #1: Header fijo con logo y botones de navegación (Home/Admin).

[x] Historia #2: Layout con Main de altura flexible (80vh) para evitar espacios en blanco.

[x] Historia #3: Registro de productos con validación de nombre único en el Backend.

[x] Historia #4: Listado de categorías en el Home (Maquetación inicial).

[x] Historia #5: Página de Detalle de Producto (En desarrollo).

[x] Historia #6: Galería de imágenes para el detalle (Pendiente).

[x] Historia #7: Footer con información de copyright e identidad de marca.

[x] Historia #8: Buscador funcional en el Home (Input de destino y fechas).

[x] Historia #9: Módulo de Administración accesible mediante la ruta /administracion.

[x] Historia #10: Tabla de administración con listado dinámico de ID y Nombre.

[x] Historia #11: Funcionalidad de eliminación de productos con confirmación (window.confirm).

[x] Historia #12: Asignar Categoría.

[x] Historia #17: Administrar características de producto.

[x] Historia #21: Agregar Categoría.


Estética: Diseño Premium Dark con paleta dorada (#dbb155) y gris oscuro (#272a2a).

Componentización: Código refactorizado en carpetas /pages y /components.

Lógica de datos: Implementación de `ORDER BY RAND()` en Backend y `slice()` en Frontend para la paginación.

Validaciones: Control de errores 400 (Bad Request) para duplicados y 200 (OK) para borrados exitosos.

Actividad: Implementación de la Vista de Detalle de Producto.

Problemas encontrados: Error 405 (Method Not Allowed) al intentar consumir el endpoint por ID debido a conflictos de rutas en Spring Boot.

Solución: Se ajustó el @GetMapping en el Backend a /api/productos/detalle/{id} y se actualizó la llamada de Axios en el Frontend. Se aplicó CSS Grid para cumplir con la maqueta de 5 imágenes.

Arquitectura de UI: Implementación de un sistema de Tabs (Pestañas) en la página de Administración para organizar Productos, Categorías y Características sin sobrecargar la vista.

Estado Global Local: Uso de useState para manejar el renderizado condicional de formularios y la actualización inmediata de los selectores tras crear nuevos atributos.

Backend (Spring Boot): * Creación de CategoriaController y CaracteristicaController. Implementación de JpaRepository para las nuevas entidades. Habilitación de @CrossOrigin para permitir la comunicación fluida con React.

Estado: Finalizado y funcional.