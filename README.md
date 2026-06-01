# 🎬 Amargo Studios - Backend API

API REST profesional construida bajo **Clean Architecture** para la gestión integral de clientes, cotizaciones y seguimientos de la agencia audiovisual Amargo Studios.

## 📋 Tabla de Contenidos

- [Tecnologías](#-tecnologías)
- [Requisitos](#-requisitos)
- [Instalación](#-instalación)
- [Configuración](#-configuración)
- [Ejecutar](#-ejecutar)
- [Estructura](#-estructura)
- [API Endpoints](#-api-endpoints)
- [Autenticación](#-autenticación)
- [Arquitectura](#-clean-architecture)
- [Testing](#-testing)

## 🛠️ Tecnologías

| Componente | Versión | Propósito |
|-----------|---------|----------|
| **Node.js** | ≥18 | Runtime |
| **Express** | 5.2 | Framework HTTP |
| **TypeScript** | 6.0 | Tipado estático |
| **PostgreSQL** | 13+ | Base de datos |
| **Prisma ORM** | 6.2 | Acceso a datos |
| **JWT** | 9.0 | Autenticación |
| **bcryptjs** | 3.0 | Hash seguro de contraseñas |
| **Zod** | 3.23 | Validación de esquemas |
| **Helmet** | 8.2 | Headers de seguridad |
| **ESLint** | 10.4 | Linting |
| **Prettier** | 3.8 | Formateo de código |

## 📋 Requisitos

- **Node.js** 18 o superior
- **npm** 9+ o **yarn**
- **PostgreSQL** 13+ (local o nube como Supabase)
- **Git**

## 🚀 Instalación

### 1. Clonar el repositorio

```bash
git clone <repo-url>
cd AmargoStudios-Backend
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Copia el archivo `.env.example` a `.env`:

```bash
cp .env.example .env
```

Edita `.env` con tus valores:

```env
# Base de Datos
DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/amargo_studios"

# Autenticación JWT
JWT_SECRET="tu-secreto-super-seguro-cambiar-en-produccion"

# Servidor
PORT=3001
NODE_ENV="development"
```

**⚠️ Importante**: Nunca commiteyes `.env` a git. Asegúrate que esté en `.gitignore`.

### 4. Configurar base de datos

```bash
# Ejecutar migraciones
npm run db:migrate

# Poblar datos de prueba (opcional)
npm run db:seed
```

## ▶️ Ejecutar

### Desarrollo (con hot reload)

```bash
npm run dev
```

El servidor estará disponible en: `http://localhost:3001`

### Producción

```bash
# Compilar TypeScript
npm run build

# Ejecutar versión compilada
npm run start
```

## ⚙️ Configuración Adicional

### Prisma Studio (Base de datos visual)

```bash
npm run studio
```

Abre `http://localhost:5555` en el navegador.

### Migraciones de base de datos

```bash
# Crear migración automática
npm run db:migrate -- --name nombre_migracion

# Resetear base de datos (borrar todo)
npm run db:reset
```

## Scripts Disponibles

- `npm run dev`: Inicia el servidor de desarrollo con recarga automática usando `tsx`.
- `npm run build`: Compila el código TypeScript a JavaScript en la carpeta `dist`.
- `npm run start`: Inicia el servidor de producción usando el código compilado.
- `npm run prisma:generate`: Genera el cliente de Prisma basado en el esquema.
- `npm run prisma:migrate`: Crea y aplica migraciones a la base de datos PostgreSQL.
- `npm run lint`: Ejecuta el validador estático ESLint.
- `npm run format`: Da formato automático al código con Prettier.

## Endpoints Principales (API v1)

### Autenticación
- `POST /api/v1/auth/register` - Registro de nuevos usuarios administradores/clientes.
- `POST /api/v1/auth/login` - Login que retorna el token JWT y el perfil del usuario.

### Clientes
- `POST /api/v1/clientes` - Crear un cliente nuevo.
- `GET /api/v1/clientes` - Obtener lista paginada de clientes (con filtros opcionales de nombre y empresa).
- `GET /api/v1/clientes/:id` - Detalle de un cliente específico.
- `PUT /api/v1/clientes/:id` - Modificar datos de un cliente.
- `DELETE /api/v1/clientes/:id` - Eliminar un cliente (solo administradores).

### Cotizaciones
- `POST /api/v1/cotizaciones` - Crear una nueva cotización asociada a un cliente.
- `GET /api/v1/cotizaciones` - Listar cotizaciones paginadas (con filtros opcionales por estado, cliente y fechas).
- `GET /api/v1/cotizaciones/:id` - Detalle de una cotización (incluye datos del cliente y asignatario).
- `PUT /api/v1/cotizaciones/:id` - Actualizar cotización (estado, asignación de perfil, etc.).
- `DELETE /api/v1/cotizaciones/:id` - Eliminar cotización (solo administradores).

### Notas de Seguimiento
- `POST /api/v1/seguimiento` - Crear nota de seguimiento asociada a un cliente.
- `GET /api/v1/seguimiento` - Obtener notas de seguimiento de un cliente mediante el query parameter `cliente_id`.
- `DELETE /api/v1/seguimiento/:id` - Eliminar nota de seguimiento (solo el autor o administradores).

### Perfiles de Usuario
- `GET /api/v1/perfiles/:id` - Obtener perfil público de un usuario.
- `PUT /api/v1/perfiles/:id` - Actualizar información del perfil propio (o administradores).
