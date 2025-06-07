# Taller de Docker Compose: Aplicación Multi-Contenedor

## 📋 Descripción
Este proyecto demuestra la implementación de una aplicación multi-contenedor utilizando Docker Compose. La aplicación incluye un frontend, backend con API REST, bases de datos MySQL y MongoDB, y servicios adicionales como MailHog para pruebas de correo.

## 🎯 Objetivos del Taller
- Comprender la arquitectura multi-contenedor
- Implementar comunicación entre servicios
- Configurar proxy inverso con Nginx
- Gestionar bases de datos en contenedores
- Implementar sistema de envío de correos de prueba

## 🏗️ Arquitectura

### Servicios Implementados
1. **Frontend**: Interfaz de usuario simple en HTML/JavaScript
   - Puerto: 3000
   - Tecnologías: HTML, JavaScript, Bootstrap

2. **Backend**: API REST con Node.js
   - Puerto: 3000
   - Tecnologías: Express.js, MySQL2, Nodemailer

3. **MySQL**: Base de datos principal
   - Puerto: 3306
   - Credenciales por defecto:
     - Usuario: usuario
     - Contraseña: usuario123
     - Base de datos: empresa

4. **MongoDB**: Base de datos NoSQL
   - Puerto: 27017

5. **Nginx**: Proxy inverso
   - Puerto: 80
   - Gestiona el enrutamiento entre servicios

6. **MailHog**: Servidor SMTP para pruebas
   - Puerto SMTP: 1025
   - Interfaz Web: 8025

7. **phpMyAdmin**: Administración de MySQL
   - Puerto: 8080

8. **AdminMongo**: Administración de MongoDB
   - Puerto: 8082

9. **WordPress**: CMS (Opcional)
   - Puerto: Gestionado por Nginx

## 🐳 Comandos Docker y su propósito

comandos Docker y Docker Compose 
| Comando | Propósito |
|---------|-----------|
| `docker network create docker-compose-taller_appnet` | Crear la red global bridge para que todos los servicios se comuniquen entre sí. |
| `docker-compose up -d --build` | Construir y levantar todos los servicios definidos en el archivo 
| `docker-compose.yml` en segundo plano. |
| `docker-compose down` | Detener y eliminar todos los contenedores, redes y volúmenes definidos en el proyecto. |
| `docker-compose ps` | Listar el estado de todos los servicios/contendores del proyecto. |

| `docker-compose up -d --build backend` | Reconstruir y reiniciar solo el servicio backend. |

| `docker-compose rm <servicio>` | Eliminar un contenedor detenido. |
| `docker volume ls` | Listar todos los volúmenes de Docker|

| `docker-compose build` | Construir o reconstruir las imágenes de los servicios sin levantarlos. |


> **Nota:** La mayoría de estos comandos se ejecutan desde la raíz del proyecto donde está el archivo `docker-compose.yml`.

---

## 📝 PASO A PASO COMPLETO

## 1. Clona el repositorio y navega al directorio del proyecto
```powershell
git clone <url-del-repo>
cd docker-compose-taller
```

## 2. Estructura esperada del proyecto
```
docker-compose-taller/
├── docker-compose.yml
├── backend/
│   ├── Dockerfile
│   ├── index.js
│   └── package.json
├── frontend/
│   ├── Dockerfile
│   ├── index.html
│   └── package.json
└── nginx/
    └── default.conf
```

## 3. Construcción y levantado de servicios
```powershell
docker-compose up -d --build
```
Esto construye las imágenes y levanta todos los servicios: MySQL, phpMyAdmin, WordPress, backend, frontend, Mailhog, Nginx, MongoDB y AdminMongo.

## 4. Verifica que los servicios estén corriendo
```powershell
docker-compose ps
```

## 5. Accede a las interfaces web
- **Frontend:** http://localhost/users
- **Mailhog (correos):** http://localhost:8025
- **phpMyAdmin:** http://localhost:8080
- **AdminMongo:** http://localhost:8082
- **WordPress:** http://localhost/wp-login.php

## 6. Prueba de funcionalidades
### a) CRUD de usuarios
1. Ve a http://localhost/users
2. Crea, edita y elimina usuarios usando el formulario.
3. Los datos se almacenan en MySQL (puedes verificar en phpMyAdmin).

### b) Envío de correo de bienvenida
1. Crea un usuario con un email de prueba (ej: test@example.com)
2. Haz clic en "Send Welcome Email" en la tabla de usuarios.
3. Verifica que el correo llegue a Mailhog (http://localhost:8025)

## 7. Comandos útiles
- **Ver logs de un servicio:**
  ```powershell
  docker-compose logs -f backend
  ```
- **Reconstruir solo el backend:**
  ```powershell
  docker-compose up -d --build backend
  ```
- **Detener todos los servicios:**
  ```powershell
  docker-compose down
  ```

## 8. Solución de problemas
- Si el backend no arranca, revisa dependencias en `backend/package.json` y reconstruye la imagen.
- Si Mailhog rechaza correos, usa emails de prueba como `test@example.com`.
- Si la API da 404/502, revisa la configuración de Nginx y que el backend esté corriendo.
- Si MySQL no responde, espera unos segundos y revisa credenciales en `docker-compose.yml`.

## 9. Personalización
- Puedes modificar los puertos en `docker-compose.yml`.
- Cambia la plantilla de correo en `backend/index.js`.
- Agrega más servicios o funcionalidades según tus necesidades.

---

# El resto del README original continúa abajo

## 🚀 Pasos de Implementación

### 1. Estructura del Proyecto
```
docker-compose-taller/
├── docker-compose.yml
├── backend/
│   ├── Dockerfile
│   ├── index.js
│   └── package.json
├── frontend/
│   ├── Dockerfile
│   ├── index.html
│   └── package.json
└── nginx/
    └── default.conf
```

### 2. Configuración de Servicios

#### Frontend (index.html)
- Implementación de interfaz de usuario
- CRUD de usuarios
- Integración con la API del backend
- Funcionalidad de envío de correos

#### Backend (index.js)
- API REST con Express
- Conexión a MySQL
- Implementación de endpoints CRUD
- Configuración de Nodemailer para MailHog

#### Nginx (default.conf)
- Configuración de proxy inverso
- Enrutamiento de servicios
- Gestión de solicitudes API

### 3. Funcionalidades Implementadas

#### 3.1 Gestión de Usuarios
- Crear usuarios
- Listar usuarios
- Actualizar usuarios
- Eliminar usuarios
- Base de datos MySQL

#### 3.2 Sistema de Correos
- Envío de correos de bienvenida
- Integración con MailHog
- Plantillas HTML personalizadas

## 🛠️ Comandos Principales

### Iniciar el Proyecto
```powershell
docker-compose up -d
```

### Detener el Proyecto
```powershell
docker-compose down
```

### Reconstruir Servicios
```powershell
docker-compose up -d --build
```

### Ver Logs
```powershell
docker-compose logs -f [servicio]
```

## 📌 URLs Importantes

- **Aplicación Principal**: http://localhost/users
- **API Backend**: http://localhost/api
- **MailHog**: http://localhost:8025
- **phpMyAdmin**: http://localhost:8080
- **AdminMongo**: http://localhost:8082
- **WordPress**: http://localhost

## 🔍 Pruebas del Sistema

### 1. Prueba de Usuario
1. Acceder a http://localhost/users
2. Crear un nuevo usuario
3. Verificar en la lista de usuarios
4. Probar edición y eliminación

### 2. Prueba de Correo
1. Seleccionar un usuario
2. Hacer clic en "Send Welcome Email"
3. Verificar en MailHog (http://localhost:8025)

## 🐛 Solución de Problemas Comunes

1. **Error de Conexión a MySQL**
   - Verificar credenciales en docker-compose.yml
   - Esperar inicialización completa de MySQL

2. **Error 404 en API**
   - Verificar configuración de Nginx
   - Comprobar rutas en el backend

3. **Problemas con MailHog**
   - Verificar configuración de puertos
   - Comprobar conexión desde backend

## 📚 Referencias Adicionales

- [Documentación Docker Compose](https://docs.docker.com/compose/)
- [Express.js](https://expressjs.com/)
- [Nodemailer](https://nodemailer.com/)
- [MySQL2](https://github.com/sidorares/node-mysql2)

## 👥 Contribución
Este proyecto fue creado con fines educativos. Siéntete libre de fork y mejorar.

---

## 📝 Conclusión del Taller

Este taller demostró cómo orquestar múltiples servicios usando Docker Compose para simular un entorno empresarial real. Aprendiste a levantar y conectar servicios como bases de datos relacionales y NoSQL, un backend Node.js, un frontend web, un proxy inverso con Nginx, y herramientas de administración y pruebas como Mailhog y phpMyAdmin. 

La arquitectura propuesta permite experimentar con la integración y comunicación entre contenedores, el manejo de redes, la persistencia de datos y la automatización de tareas comunes en el desarrollo y pruebas de aplicaciones distribuidas. Además, se implementó un flujo completo de gestión de usuarios y envío de correos de bienvenida, mostrando la utilidad de Mailhog para pruebas locales sin depender de servicios externos.

Este entorno es fácilmente extensible y sirve como base para proyectos más complejos, facilitando el desarrollo, pruebas y despliegue de aplicaciones modernas en contenedores.

---

## 🧩 Explicación de los Componentes de `docker-compose-taller`

El directorio `docker-compose-taller` contiene todos los archivos y carpetas necesarios para levantar la arquitectura multi-contenedor. A continuación se explica el propósito de cada componente:

- **docker-compose.yml**: Archivo principal de orquestación. Define todos los servicios (contenedores), redes y volúmenes usados en el proyecto. Aquí se configuran las imágenes, variables de entorno, puertos, dependencias y volúmenes persistentes.

- **backend/**: Carpeta con el código fuente del backend (API Node.js):
  - `Dockerfile`: Instrucciones para construir la imagen del backend.
  - `index.js`: Código principal de la API REST (Express), conexión a MySQL, lógica de usuarios y envío de correos.
  - `package.json`: Dependencias y scripts del backend.

- **frontend/**: Carpeta con el frontend web:
  - `Dockerfile`: Instrucciones para construir la imagen del frontend.
  - `index.html`: Interfaz de usuario, gestión de usuarios y botón para enviar correos.
  - `package.json`: Dependencias y scripts del frontend.

- **nginx/**: Configuración del proxy inverso:
  - `default.conf`: Archivo de configuración de Nginx. Define el enrutamiento de peticiones HTTP hacia WordPress, el backend y el frontend.

- **Mailhog**: Servicio SMTP para pruebas de correo. No tiene carpeta propia porque se usa la imagen oficial y se configura en `docker-compose.yml`. Permite visualizar los correos enviados desde el backend sin usar un servidor real.

- **MySQL**: Base de datos relacional para usuarios. Se define en `docker-compose.yml` y almacena los datos de la aplicación.

- **phpMyAdmin**: Interfaz web para administrar MySQL. Permite gestionar la base de datos de forma visual.

- **MongoDB**: Base de datos NoSQL, útil para logs o futuras expansiones. Se define en `docker-compose.yml`.

- **AdminMongo**: Interfaz web para administrar MongoDB.

- **WordPress**: CMS que se conecta a MySQL. Se usa como ejemplo de integración de aplicaciones reales en la misma red de servicios.

- **Volúmenes**: Definidos en `docker-compose.yml` para persistir los datos de MySQL, MongoDB y WordPress aunque los contenedores se eliminen.

- **Redes**: Se define una red bridge compartida para que todos los servicios puedan comunicarse entre sí de forma segura y aislada.

Esta estructura modular permite desarrollar, probar y administrar aplicaciones distribuidas de manera sencilla y escalable usando Docker Compose.
