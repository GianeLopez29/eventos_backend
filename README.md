# Sistema de Gestión de Eventos - Backend

API REST para gestión de eventos con autenticación JWT y verificación por email.

## Características

- ✅ Arquitectura en capas (routes → controllers → services → repositories)
- ✅ Autenticación JWT con verificación por email
- ✅ Hash de contraseñas con bcrypt
- ✅ CRUD completo para eventos y categorías
- ✅ Middlewares de validación y manejo de errores
- ✅ Envío de emails con nodemailer
- ✅ Base de datos MongoDB con Mongoose

## Tecnologías

- Node.js + Express
- MongoDB + Mongoose
- JWT + bcrypt
- Nodemailer
- Express Validator

## Instalación

1. Clonar el repositorio
2. Instalar dependencias:
```bash
npm install
```

3. Configurar variables de entorno (.env):
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/eventos_db
JWT_SECRET=tu_jwt_secret_muy_seguro
JWT_EXPIRE=7d
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=tu_email@gmail.com
EMAIL_PASS=tu_app_password
CLIENT_URL=http://localhost:3000
```

4. Ejecutar en desarrollo:
```bash
npm run dev
```

## Endpoints de la API

### Autenticación
- `POST /api/auth/register` - Registrar usuario
- `POST /api/auth/login` - Iniciar sesión
- `GET /api/auth/verify-email/:token` - Verificar email
- `GET /api/auth/profile` - Obtener perfil (requiere auth)

### Categorías
- `GET /api/categories` - Listar categorías
- `GET /api/categories/:id` - Obtener categoría
- `POST /api/categories` - Crear categoría (admin)
- `PUT /api/categories/:id` - Actualizar categoría (admin)
- `DELETE /api/categories/:id` - Eliminar categoría (admin)

### Eventos
- `GET /api/events` - Listar eventos
- `GET /api/events/:id` - Obtener evento
- `GET /api/events/my-events` - Mis eventos (requiere auth)
- `POST /api/events` - Crear evento (requiere auth)
- `PUT /api/events/:id` - Actualizar evento (requiere auth)
- `DELETE /api/events/:id` - Eliminar evento (requiere auth)

### Salud
- `GET /api/health` - Estado de la API

## Estructura del Proyecto

```
src/
├── config/
│   └── db.js              # Configuración MongoDB
├── models/
│   ├── User.js            # Modelo de usuario
│   ├── Category.js        # Modelo de categoría
│   └── Event.js           # Modelo de evento
├── repositories/
│   ├── userRepository.js
│   ├── categoryRepository.js
│   └── eventRepository.js
├── services/
│   ├── authService.js
│   ├── categoryService.js
│   └── eventService.js
├── controllers/
│   ├── authController.js
│   ├── categoryController.js
│   └── eventController.js
├── routes/
│   ├── authRoutes.js
│   ├── categoryRoutes.js
│   └── eventRoutes.js
├── middleware/
│   ├── auth.js            # Autenticación JWT
│   ├── errorHandler.js    # Manejo de errores
│   └── validation.js      # Validación de datos
├── utils/
│   ├── jwt.js             # Utilidades JWT
│   └── email.js           # Envío de emails
└── index.js               # Servidor principal
```

## Modelos de Datos

### Usuario
```javascript
{
  nombre: String,
  email: String (único),
  password: String (hasheado),
  isVerified: Boolean,
  verificationToken: String,
  role: String (user/admin)
}
```

### Categoría
```javascript
{
  nombre: String (único),
  descripcion: String,
  color: String
}
```

### Evento
```javascript
{
  titulo: String,
  descripcion: String,
  fecha: Date,
  hora: String,
  ubicacion: String,
  precio: Number,
  capacidad: Number,
  categoria: ObjectId (ref: Category),
  organizador: ObjectId (ref: User),
  imagen: String,
  estado: String (activo/cancelado/finalizado)
}
```

## Seguridad

- Contraseñas hasheadas con bcrypt (12 rounds)
- JWT con expiración configurable
- Verificación obligatoria por email
- Validación de entrada en todos los endpoints
- CORS configurado
- Manejo centralizado de errores

## Scripts

- `npm start` - Ejecutar en producción
- `npm run dev` - Ejecutar en desarrollo con nodemon