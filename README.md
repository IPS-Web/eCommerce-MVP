# 🛍️ eCommerce MVP

Una plataforma de comercio electrónico moderna construida con Next.js 15, TypeScript y Tailwind CSS, con integración de IA para resúmenes de pedidos.

![Next.js](https://img.shields.io/badge/Next.js-15.3.3-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.1-38B2AC?style=flat-square&logo=tailwind-css)
![Google AI](https://img.shields.io/badge/Google_AI-Gemini_2.5-orange?style=flat-square&logo=google)

## ✨ Características

- 🎨 **Diseño Moderno**: UI limpia y responsive con colores Indigo y Teal
- 🛒 **Carrito de Compras**: Funcionalidad completa de agregar, modificar y eliminar productos
- 💳 **Checkout**: Proceso de finalización de compra con formularios de envío
- 🤖 **IA Integrada**: Resúmenes automáticos de pedidos usando Google Gemini AI
- 🌍 **Multiidioma**: Soporte para inglés y español
- 📱 **Responsive**: Optimizado para móviles, tablets y escritorio
- ⚡ **Rendimiento**: Construido con Next.js 15 y Turbopack para desarrollo rápido

## 🚀 Inicio Rápido

### Prerrequisitos

- [Node.js](https://nodejs.org/) (versión 18 o superior)
- [npm](https://www.npmjs.com/) o [yarn](https://yarnpkg.com/)
- Clave API de Google AI (opcional, para funcionalidad de IA)

### Instalación

1. **Clona el repositorio**
   ```bash
   git clone https://github.com/tu-usuario/eCommerce-MVP.git
   cd eCommerce-MVP
   ```

2. **Instala las dependencias**
   ```bash
   npm install
   # o
   yarn install
   ```

3. **Configura las variables de entorno** (opcional)
   ```bash
   cp .env.example .env.local
   # Edita .env.local y agrega tu clave API de Google AI
   ```

4. **Ejecuta el servidor de desarrollo**
   ```bash
   npm run dev
   # o
   yarn dev
   ```

5. **Abre tu navegador**
   
   Navega a [http://localhost:9002](http://localhost:9002) para ver la aplicación.

## 📸 Capturas de Pantalla

### Página Principal
![Página Principal](docs/screenshots/homepage.png)
*Hero section con productos destacados y navegación moderna*

### Catálogo de Productos
![Catálogo](docs/screenshots/products.png)
*Vista del catálogo con filtros y búsqueda*

### Carrito de Compras
![Carrito](docs/screenshots/cart.png)
*Interfaz del carrito con resumen de pedido*

### Proceso de Checkout
![Checkout](docs/screenshots/checkout.png)
*Formulario de checkout con información de envío*

## 🏗️ Arquitectura del Proyecto

```
src/
├── app/                    # App Router de Next.js
│   ├── cart/              # Página del carrito
│   ├── checkout/          # Proceso de checkout
│   ├── products/          # Catálogo de productos
│   └── layout.tsx         # Layout principal
├── components/            # Componentes reutilizables
│   ├── ui/               # Componentes base (shadcn/ui)
│   ├── products/         # Componentes de productos
│   ├── checkout/         # Componentes de checkout
│   └── layout/           # Header y Footer
├── context/              # Context API de React
├── hooks/                # Custom hooks
├── lib/                  # Utilidades y datos
└── ai/                   # Integración con IA
```

## 🛠️ Tecnologías Utilizadas

- **Frontend**: Next.js 15, React 18, TypeScript
- **Estilos**: Tailwind CSS, Radix UI, shadcn/ui
- **Estado**: React Context API
- **IA**: Google Gemini AI con Genkit
- **Iconos**: Lucide React
- **Formularios**: React Hook Form con Zod
- **Deployment**: Firebase App Hosting

## 📝 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Servidor de desarrollo en puerto 9002
npm run build        # Build de producción
npm run start        # Servidor de producción
npm run lint         # Linter de código

# IA (Genkit)
npm run genkit:dev   # Servidor de desarrollo de IA
npm run genkit:watch # Watch mode para IA

# Utilidades
npm run typecheck    # Verificación de tipos TypeScript
```

## 🌍 Internacionalización

El proyecto incluye soporte completo para:
- **Inglés** (en)
- **Español** (es)

Los usuarios pueden cambiar el idioma desde el header de la aplicación.

## 🤖 Funcionalidad de IA

La aplicación utiliza Google Gemini AI para:
- Generar resúmenes automáticos de pedidos
- Proporcionar descripciones inteligentes
- Mejorar la experiencia del usuario

### Configuración de IA

1. Obtén una clave API de [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Agrega la clave a tu archivo `.env.local`:
   ```env
   GOOGLE_AI_API_KEY=tu_clave_aqui
   ```

## 🎨 Personalización

### Colores
Los colores principales se pueden personalizar en `tailwind.config.ts`:
- **Primario**: Indigo profundo (#3F51B5)
- **Acento**: Teal (#009688)
- **Fondo**: Indigo claro (#E8EAF6)

### Fuentes
El proyecto usa PT Sans para un look moderno y cálido. Se puede cambiar en `tailwind.config.ts`.

## 🚀 Deployment

### Firebase App Hosting

El proyecto está configurado para deployment en Firebase App Hosting:

1. Instala Firebase CLI:
   ```bash
   npm install -g firebase-tools
   ```

2. Inicia sesión en Firebase:
   ```bash
   firebase login
   ```

3. Despliega:
   ```bash
   firebase deploy
   ```

### Otros Proveedores

También es compatible con:
- Vercel
- Netlify
- AWS Amplify
- Docker

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

## 👥 Contacto

Tu Nombre - [@tu_twitter](https://twitter.com/tu_twitter) - email@ejemplo.com

Link del Proyecto: [https://github.com/tu-usuario/eCommerce-MVP](https://github.com/tu-usuario/eCommerce-MVP)

## 🙏 Agradecimientos

- [Next.js](https://nextjs.org/) por el framework
- [Tailwind CSS](https://tailwindcss.com/) por los estilos
- [shadcn/ui](https://ui.shadcn.com/) por los componentes
- [Google AI](https://ai.google.dev/) por la integración de IA