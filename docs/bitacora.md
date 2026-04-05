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

[x] Historia #13: Registro.

[x] Historia #14: Login.

[x] Historia #15: Logout.

[x] Historia #16: Identificar administrador y conceder permisos.

[x] Historia #17: Administrar características de producto.

[x] Historia #18: Visualizar características al producto.

[x] Historia #19: Email

[x] Historia #20: Sección de categorías y filtros.

[x] Historia #21: Agregar Categoría.

[x] Historia #22: Realizar busqueda.

[x] Historia #23: Visualizar disponibilidad.

[x] Historia #24: Marcar como favorito.

[x] Historia #26: Visualización políticas del producto.

Lógica: Integración de AuthContext para restringir la acción a usuarios logueados.

Persistencia: Uso de localStorage para que los favoritos no se borren al recargar la página.

Interfaz: Creación de un botón interactivo (Toggle) con cambio de estado visual (🤍 / ❤️) y posicionamiento absoluto sobre la imagen del producto.

UX: Implementación de alertas de prevención para usuarios no autenticados.