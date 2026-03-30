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

Componentización: Código refactorizado en la página de Administración mediante renderizado condicional por pestañas.

Lógica de datos: Implementación de controladores específicos para Categorías y Características en el Backend, vinculando objetos complejos (ManyToMany) mediante checkboxes en el Frontend.

Validaciones: Control de errores de integridad referencial (Foreign Key) para evitar el borrado de categorías o características que tengan productos activos vinculados.

Actividad: Implementación de la Vista de Detalle de Producto.

Problemas encontrados: Error de CORS (Access-Control-Allow-Origin) al intentar registrar nuevas características desde el puerto 5173 hacia el 8080 de Spring Boot.

Solución: Se añadió la anotación @CrossOrigin(origins = "http://localhost:5173") en CategoriaController y CaracteristicaController. Se implementó un sistema de borrado manual de productos previo al borrado de categorías para mantener la integridad de la DB.

Arquitectura de UI: Implementación de un sistema de Tabs (Pestañas) en la página de Administración para organizar Productos, Categorías y Características sin sobrecargar la vista.

Estado Global Local: Uso de useState para manejar el renderizado condicional de formularios (tabActiva) y useEffect para la actualización inmediata de los listados tras crear o eliminar nuevos atributos.

Backend (Spring Boot): * Creación de CategoriaController y CaracteristicaController. Implementación de JpaRepository para las nuevas entidades. Habilitación de @CrossOrigin para permitir la comunicación fluida con React.

Estado: Finalizado y funcional.