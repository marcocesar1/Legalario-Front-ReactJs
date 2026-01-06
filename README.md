# 🚀 Proyecto Frontend con Vite

Este proyecto es una aplicación frontend construida con **Vite**, diseñada para consumir una API REST.

Url de la aplicación en producción:

[https://695c74fdb892be0008a2805a--legalario-front.netlify.app/](https://695c74fdb892be0008a2805a--legalario-front.netlify.app/)

---

## 📋 Requisitos previos

Antes de comenzar, asegúrate de tener instalado lo siguiente:

- **Node.js v20**

Puedes verificar tu versión ejecutando:

```bash
node -v

# Debería mostrar algo como:
v20.x.x
```

---

## 🚀 Iniciar el proyecto

Copia el archivo `.env.example` a `.env`.

```bash
cp .env.example .env
```

Cambia el valor de `VITE_APP_BASE_URL` en `.env` para apuntar a la URL de tu backend.

Una vez clonado, ejecuta el siguiente comando para instalar las dependencias:

```bash
npm install
```

Una vez instaladas las dependencias, ejecuta el siguiente comando para iniciar el proyecto:

```bash
npm run dev
```

Esto iniciará el servidor de desarrollo y abrirá la aplicación en tu navegador.

## Librerías y herramientas utilizadas

- [Vite](https://vitejs.dev/): Una herramienta de desarrollo front-end rápida y flexible.
- [React](https://react.dev/): Una biblioteca de JavaScript para construir interfaces de usuario.
- [Ant Design](https://ant.design/): Una biblioteca de componentes UI de código abierto.
- [Zustand](https://github.com/pmndrs/zustand): Un manejador de estado de aplicaciones de JavaScript.
- [TanStack Query](https://tanstack.com/query/latest): Una librería de React para la consulta de datos.
