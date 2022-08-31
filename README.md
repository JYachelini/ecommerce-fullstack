# Ecommerce Fullstack

Esta aplicación fullstack es para el trabajo final del curso de Backend en Coderhouse.

El backend esta hecho con NestJS.

#### El frontend no esta completo, estan hechas las funcionalidades básicas para mostrar que es lo que se hace con la API. Sin embargo, voy a continuar trabajando en el front para hacer una linda aplicación.

## Documentación

[Link postman](https://documenter.getpostman.com/view/20155763/VUxPt6Y6)

## Variables de entorno

Para ejecutar el proyecto, se necesitan agregar las siguientes variables de entorno

`NODE_ENV` Obligatoriamente tiene que tener `dev` o `prod`.

`PORT` Puede estar vacio.

`FRONTEND_POR` Puede estar vacio.

`MONGODB_URI` Tiene que tener una URL valida para la conexión de Mongo Atlas.

`JWT_SECRET` Es la firma para generar el token de acceso.

`JWT_REFRESH_SECRET` Es la firma para generar el token de actualización.

`MAIL_HOST` Es el host del Mail.

`MAIL_PORT` Es el puerto del Mail.

`ADMIN_MAIL` Es el email del administrador.

`ADMIN_MAIL_PASSWORD` Es la contraseña del email.

## Ejecutar localmente

Clonar el proyecto

```bash
  git clone https://github.com/JYachelini/ecommerce-fullstack
```

Ir a la carpeta del proyecto

```bash
  cd ecommerce-fullstack
```

Instalar las dependencias del backend

```bash
  cd backend
  npm i
```

Instalar las dependencias del frontend

```bash
  cd frontend
  npm i
```

Ejecutar el backend

```bash
  cd backend
  npm start
```

Ejecutar el frontend

```bash
  cd frontend
  npm start
```

## Demo

- [Backend](https://ecommerce-fullstack-yache.herokuapp.com)
- [Frontend](https://jyachelini.github.io/ecommerce-fullstack/)

## Features para agregar

- Modo Light/dark
- Mejor diseño para UX
- Metodos de pago incluidos como MP.
- Agregar modales, por ejemplo para el login y register.

## Bugs para arreglar

- Se pueden agregar productos random en el carrito. No te deja que este vacio pero no hay validación de que estos productos existen.

## Autor

- [@JYachelini](https://github.com/JYachelini)
