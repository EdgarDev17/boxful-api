# Boxful Backend Application

Aplicación backend desarrollada para **Boxful** utilizando **NestJS** y **Prisma**.

## Requisitos previos

Asegúrate de tener instalado Node.js y npm en tu máquina.

## Instalación de dependencias

```bash
$ npm install
```

## Compila y ejecuta el proyecto

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Base de datos

Para poder ejecutar el proyecto debes instalar la base de datos MongoDB.


# API Documentación
## Autenticar Usuario
Base URL: `/auth`

### Iniciar Sesion
- **URL**: `/auth/signin`
- **Method**: `POST`
- **Authentication**: Local Guard

### Registrarse
- **URL**: `/auth/signup`
- **Method**: `POST`
- **Authentication**: Nunguna

## Orders
Base URL: `/orders`

## Ordenes

### Obtener todas las ordenes
- **URL**: `/orders`
- **Method**: `GET`
- **Authentication**: JWT

### Obtener orden por ID
- **URL**: `/orders/:id`
- **Method**: `GET`
- **Authentication**: JWT

### Obtener orden por ID de usuario
- **URL**: `/orders/user/:userId`
- **Method**: `GET`
- **Authentication**: JWT

### Crear Orden
- **URL**: `/orders`
- **Method**: `POST`
- **Authentication**: JWT
