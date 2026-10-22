# Sistema de Gestión de Citas Médicas — Front-end

## 1. Descripción del proyecto

Este proyecto corresponde al componente front-end del Sistema de Gestión de Citas Médicas, desarrollado como parte del proyecto formativo del SENA.

La aplicación permite consultar y administrar la información de los pacientes mediante una interfaz web construida con React. El front-end se comunica con un servicio backend desarrollado con Spring Boot, que permite realizar operaciones sobre la base de datos MySQL.

## 2. Funcionalidades implementadas

- Consultar y listar pacientes registrados.
- Registrar nuevos pacientes.
- Editar la información de los pacientes.
- Eliminar pacientes con confirmación previa.
- Buscar pacientes por nombre, apellido o documento.
- Mostrar mensajes de confirmación y errores durante las operaciones.

## 3. Tecnologías utilizadas

- **React:** construcción de la interfaz de usuario.
- **Vite:** herramienta de desarrollo y compilación.
- **JavaScript:** implementación de la lógica del front-end.
- **CSS:** estilos y presentación visual.
- **Git y GitHub:** control de versiones y alojamiento del código fuente.
- **Spring Boot:** servicio backend para la gestión de pacientes.
- **MySQL:** sistema de gestión de la base de datos.

## 4. Requisitos previos

Para ejecutar el proyecto se requiere:

- Node.js y npm instalados.
- El código fuente del front-end.
- El backend Spring Boot configurado y en ejecución.
- El servidor MySQL y la base de datos configurados para el backend.

## 5. Instalación y ejecución

Desde la terminal, ubicarse en la carpeta raíz del front-end y ejecutar:

```bash
npm install
npm run dev
```

Vite mostrará la dirección local de la aplicación. En la configuración de desarrollo utilizada para este proyecto, la dirección es:

http://localhost:5173/

Para consultar, registrar, editar o eliminar pacientes, el backend debe estar disponible en:

http://localhost:8080/

La API de pacientes utilizada por el front-end es:

http://localhost:8080/api/pacientes

## 6. Control de versiones

El código fuente del front-end se encuentra alojado en GitHub:

https://github.com/lauraarango14/SistemaCitasMedicasFrontend

El repositorio permite consultar los archivos del proyecto y su historial de cambios.

## 7. Evidencia académica

**Evidencia:** GA7-220501096-AA4-EV03 — Componente front-end del proyecto formativo y proyectos de clase.

Este proyecto implementa la interfaz web para la administración de pacientes y su comunicación con el backend del sistema de gestión de citas médicas.
