# 🏨 Darksishop

Aplicación web para la reserva de alojamientos y hoteles. Permite a los usuarios registrarse, explorar productos por categorías o ciudades, realizar reservas con confirmación automática por email y gestionar sus favoritos.  
Los administradores pueden gestionar el inventario de productos, categorías y servicios adicionales.

---

## ⚙️ Tecnologías

### 🖥️ Frontend
- React 19 + Vite 8
- Tailwind CSS / Styled Components
- Axios
- React Router 7.1

### ☕ Backend
- Java 21
- Spring Boot 4.0.5
- Spring Security + JWT
- Spring Data JPA
- MySQL
- Java Mail Sender (SMTP)

---

## 🚀 Instalación local

### 🧩 Requisitos previos
- Node.js 18+
- Java 17+
- MySQL
- Mailtrap (para pruebas de correo)

---

## 📦 Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/darksishop.git
cd darksishop
```

---

## 📁 Backend (/backend)

```bash
cd backend
```

### 🗄️ Configurar base de datos
```sql
CREATE DATABASE darksishop;
```

### ⚙️ Configurar variables de entorno

Editar archivo:
```
src/main/resources/application.properties
```

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/darksishop
spring.datasource.username=root
spring.datasource.password=123456

# Mailtrap
spring.mail.host=sandbox.smtp.mailtrap.io
spring.mail.port=2525
spring.mail.username=tu_usuario
spring.mail.password=tu_password
```

### ▶️ Ejecutar backend
```bash
./mvnw spring-boot:run
```

📍 Disponible en: http://localhost:8080

---

## 🖼️ Frontend (/frontend)

```bash
cd frontend
npm install
```

### ⚙️ Variables de entorno

Crear archivo:
```bash
touch .env
```

```env
VITE_API_URL=http://localhost:8080
```

### ▶️ Ejecutar frontend
```bash
npm run dev
```

📍 Disponible en: http://localhost:5173

## 📬 Endpoints (API REST)

| Método | Endpoint | Descripción | Auth |
| :--- | :--- | :--- | :---: |
| **POST** | `/auth/register` | Registro de nuevo usuario | ❌ |
| **POST** | `/auth/login` | Login y generación de JWT | ❌ |
| **GET** | `/productos` | Listado de alojamientos | ❌ |
| **GET** | `/productos/{id}` | Detalle de alojamiento | ❌ |
| **POST** | `/productos` | Crear nuevo alojamiento | ✅ (ADMIN) |
| **PUT** | `/productos/{id}` | Editar alojamiento | ✅ (ADMIN) |
| **DELETE** | `/productos/{id}` | Eliminar alojamiento | ✅ (ADMIN) |
| **GET** | `/categorias` | Listar todas las categorías | ❌ |
| **POST** | `/reservas` | Crear reserva + Envío de Email | ✅ (USER) |
| **GET** | `/reservas/usuario/{id}` | Historial de reservas del usuario | ✅ (USER) |
---

## 🧪 Testing y Validación

El proceso de verificación se ha documentado detalladamente siguiendo las Historias de Usuario (HU). Puedes consultar los registros completos en los siguientes archivos:

* 📘 **[Bitácora de Desarrollo](https://github.com/DarkOverlord689/DesafioProfesionalDH/blob/main/docs/bitacora.md)**: Registro paso a paso de la implementación de cada funcionalidad.
* 🧪 **[Plan de Testing](https://github.com/DarkOverlord689/DesafioProfesionalDH/blob/main/docs/testing.md)**: Casos de prueba, criterios de aceptación y resultados finales (PASÓ/FALLÓ).
---

## 👤 Autor
- @Darksi
---

## 📄 Licencia
MIT

---

## 📞 Soporte

¿Encontraste un bug o tienes una sugerencia?

- 🐛 Reportar bug  
- 💡 Solicitar feature  

📧 Email: soporte@darksishop.com
